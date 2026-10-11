import { NextResponse } from 'next/server';
import { verifyCaptcha } from '@/lib/recaptcha';
import { keys, kvLpush, kvSet, newId } from '@/lib/kv';
import { sendMail, bookingConfirmationMail } from '@/lib/mailer';
import { bookingWhatsApp, sendWhatsApp } from '@/lib/whatsapp';
import { getSlots, isValidIsoDate } from '@/lib/availability';
import { getTherapist } from '@/data/therapists';

/**
 * POST /api/booking
 * Saves the booking, sends a gentle email confirmation and a WhatsApp message
 * with the session details.
 *
 * Only a booking reference is returned — never the submitted details.
 */
export const dynamic = 'force-dynamic';

type Payload = {
  therapistSlug: string | null;
  format: string;
  language: string;
  sessionType: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  note: string;
  captchaToken?: string | null;
  captchaVariant?: 'v2' | 'v3';
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const {
    therapistSlug,
    format,
    language,
    sessionType,
    date,
    time,
    name,
    email,
    phone,
    note,
    captchaToken,
    captchaVariant = 'v3',
  } = body;

  /* ------------------------------ Validate ----------------------------- */

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Please tell us your name.' }, { status: 400 });
  }
  if (!email?.trim() || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }
  if (!phone?.trim()) {
    return NextResponse.json(
      { error: 'Please add a phone number for your reminder.' },
      { status: 400 }
    );
  }
  if (!['online', 'in-person'].includes(format)) {
    return NextResponse.json({ error: 'Please choose a session format.' }, { status: 400 });
  }
  if (!['individual', 'couples', 'family', 'group'].includes(sessionType)) {
    return NextResponse.json({ error: 'Please choose a session type.' }, { status: 400 });
  }
  if (!language?.trim()) {
    return NextResponse.json({ error: 'Please choose a language.' }, { status: 400 });
  }
  if (!date || !isValidIsoDate(date)) {
    return NextResponse.json({ error: 'Please choose a date.' }, { status: 400 });
  }
  if (!time) {
    return NextResponse.json({ error: 'Please choose a time.' }, { status: 400 });
  }
  if (therapistSlug && !getTherapist(therapistSlug)) {
    return NextResponse.json({ error: 'Unknown therapist.' }, { status: 400 });
  }

  /* ------------------------------- CAPTCHA ------------------------------ */

  const captcha = await verifyCaptcha(captchaToken, captchaVariant);
  if (!captcha.ok) {
    if (captcha.reason === 'low-score') {
      // Fall back to a visible v2 challenge.
      return NextResponse.json({ ok: false, captchaChallenge: true }, { status: 200 });
    }
    return NextResponse.json(
      { error: 'We could not verify your request. Please try again.' },
      { status: 400 }
    );
  }

  /* --------------------------- Check the slot --------------------------- */

  const open = await getSlots(therapistSlug ?? null, date);
  if (!open.includes(time)) {
    return NextResponse.json(
      {
        error:
          'That time has just been taken. Please choose another and we will confirm straight away.',
      },
      { status: 409 }
    );
  }

  /* ------------------------------ Persist ------------------------------- */

  const reference = newId('NW').slice(0, 13).toUpperCase();
  const therapist = therapistSlug ? getTherapist(therapistSlug) : undefined;
  const therapistName = therapist ? therapist.name : 'To be confirmed';
  const createdAt = new Date().toISOString();

  // Lock the slot. With "no preference" we lock the first therapist who is free.
  const lockSlug = therapistSlug ?? (await firstFreeTherapist(date, time));
  if (lockSlug) {
    await kvSet(keys.slotLock(lockSlug, date, time), { reference, createdAt });
  }

  await kvSet(keys.booking(reference), {
    reference,
    createdAt,
    therapistSlug: lockSlug ?? null,
    therapistName,
    format,
    language,
    sessionType,
    date,
    time,
    // Contact details and the client's note are stored for the appointment
    // only, and are never returned by any API route.
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    note: note?.trim() ?? '',
  });
  await kvLpush(keys.bookingIndex, reference);
  await kvLpush(keys.bookingByDay(date), reference);

  /* ----------------------------- Notifications -------------------------- */

  const prettyDate = new Date(`${date}T00:00:00`).toLocaleDateString('en-KE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const mail = bookingConfirmationMail({
    name: name.trim().split(' ')[0],
    therapistName,
    date: prettyDate,
    time,
    format: format === 'online' ? 'Online (link sent before your session)' : 'In person, Kilimani',
    reference,
  });

  await Promise.allSettled([
    sendMail({ ...mail, to: email.trim(), replyTo: 'hello@naamanwellness.co.ke' }),
    sendWhatsApp(
      bookingWhatsApp({
        name: name.trim().split(' ')[0],
        therapistName,
        date: prettyDate,
        time,
        format: format === 'online' ? 'Online' : 'In person, Kilimani',
        reference,
      }),
      normalisePhone(phone)
    ),
    sendMail({
      to: process.env.MAIL_TO_CLINIC ?? 'hello@naamanwellness.co.ke',
      subject: `New booking ${reference} — ${date} ${time}`,
      text: `A new session has been booked.\n\nReference: ${reference}\nTherapist: ${therapistName}\nDate: ${date} ${time}\nFormat: ${format}\nType: ${sessionType}\nLanguage: ${language}\n\nLog in to the admin view to see contact details.`,
    }),
  ]);

  return NextResponse.json({ ok: true, reference });
}

async function firstFreeTherapist(date: string, time: string): Promise<string | null> {
  const { therapists } = await import('@/data/therapists');
  for (const t of therapists) {
    const slots = await getSlots(t.slug, date);
    if (slots.includes(time)) return t.slug;
  }
  return null;
}

function normalisePhone(raw: string): string | undefined {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.startsWith('254')) return digits;
  if (digits.startsWith('0')) return `254${digits.slice(1)}`;
  return digits;
}
