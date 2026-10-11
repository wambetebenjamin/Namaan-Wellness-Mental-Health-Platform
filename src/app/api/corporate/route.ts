import { NextResponse } from 'next/server';
import { verifyCaptcha } from '@/lib/recaptcha';
import { keys, kvLpush, kvSet, newId } from '@/lib/kv';
import { sendMail } from '@/lib/mailer';
import { corporateEnquiryWhatsApp, sendWhatsApp } from '@/lib/whatsapp';

/** POST /api/corporate — saves the enquiry and notifies the clinic. */
export const dynamic = 'force-dynamic';

type Payload = {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  employees: string;
  concerns?: string[];
  startDate?: string;
  message?: string;
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

  const { company, contact, email, phone, employees, concerns, startDate, message } = body;

  if (!company?.trim())
    return NextResponse.json({ error: 'Please tell us your company name.' }, { status: 400 });
  if (!contact?.trim())
    return NextResponse.json({ error: 'Please add a contact name.' }, { status: 400 });
  if (!email?.trim() || !EMAIL_RE.test(email.trim()))
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  if (!employees?.trim())
    return NextResponse.json({ error: 'Please give a rough number of employees.' }, { status: 400 });

  const captcha = await verifyCaptcha(body.captchaToken, body.captchaVariant ?? 'v3');
  if (!captcha.ok) {
    if (captcha.reason === 'low-score') {
      return NextResponse.json({ ok: false, captchaChallenge: true }, { status: 200 });
    }
    return NextResponse.json(
      { error: 'We could not verify your request. Please try again.' },
      { status: 400 }
    );
  }

  const reference = newId('CORP').slice(0, 15).toUpperCase();
  const createdAt = new Date().toISOString();

  await kvSet(keys.corporate(reference), {
    reference,
    createdAt,
    company: company.trim(),
    contact: contact.trim(),
    email: email.trim(),
    phone: phone?.trim() ?? '',
    employees: employees.trim(),
    concerns: concerns ?? [],
    startDate: startDate ?? '',
    message: message?.trim() ?? '',
  });
  await kvLpush(keys.corporateIndex, reference);

  const summary = [
    'New corporate wellness enquiry',
    '',
    `Reference : ${reference}`,
    `Company   : ${company.trim()}`,
    `Contact   : ${contact.trim()}`,
    `Email     : ${email.trim()}`,
    `Phone     : ${phone?.trim() || '—'}`,
    `Employees : ${employees.trim()}`,
    `Concerns  : ${(concerns ?? []).join(', ') || '—'}`,
    `Start     : ${startDate || '—'}`,
    '',
    message?.trim() ?? '',
  ].join('\n');

  await Promise.allSettled([
    sendMail({
      to: process.env.MAIL_TO_CLINIC ?? 'hello@naamanwellness.co.ke',
      subject: `Corporate enquiry — ${company.trim()} (${reference})`,
      text: summary,
      replyTo: email.trim(),
    }),
    sendWhatsApp(
      corporateEnquiryWhatsApp({
        company: company.trim(),
        contact: contact.trim(),
        employees: employees.trim(),
        startDate: startDate || 'Flexible',
      })
    ),
  ]);

  return NextResponse.json({ ok: true, reference });
}
