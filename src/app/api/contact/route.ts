import { NextResponse } from 'next/server';
import { verifyCaptcha } from '@/lib/recaptcha';
import { keys, kvLpush, kvSet, newId } from '@/lib/kv';
import { sendMail } from '@/lib/mailer';

/** POST /api/contact — general enquiry via Nodemailer. */
export const dynamic = 'force-dynamic';

type Payload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
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

  const { name, email, phone, message } = body;

  if (!name?.trim())
    return NextResponse.json({ error: 'Please tell us your name.' }, { status: 400 });
  if (!email?.trim() || !EMAIL_RE.test(email.trim()))
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  if (!message?.trim() || message.trim().length < 5)
    return NextResponse.json({ error: 'Please add a short message.' }, { status: 400 });

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

  const reference = newId('MSG').slice(0, 14).toUpperCase();

  await kvSet(keys.contact(reference), {
    reference,
    createdAt: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() ?? '',
    message: message.trim(),
  });
  await kvLpush(keys.contactIndex, reference);

  await sendMail({
    to: process.env.MAIL_TO_CLINIC ?? 'hello@naamanwellness.co.ke',
    subject: `Website enquiry from ${name.trim()} (${reference})`,
    text: [
      `Name    : ${name.trim()}`,
      `Email   : ${email.trim()}`,
      `Phone   : ${phone?.trim() || '—'}`,
      '',
      message.trim(),
    ].join('\n'),
    replyTo: email.trim(),
  });

  return NextResponse.json({ ok: true, reference });
}
