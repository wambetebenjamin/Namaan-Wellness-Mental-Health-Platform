import { NextResponse } from 'next/server';
import { verifyCaptcha } from '@/lib/recaptcha';
import { keys, kvSadd, kvSet } from '@/lib/kv';
import { sendMail } from '@/lib/mailer';

/** POST /api/newsletter — stores the subscriber in Vercel KV. reCAPTCHA verified. */
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: string; captchaToken?: string | null; captchaVariant?: 'v2' | 'v3' };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const email = body.email?.trim() ?? '';
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

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

  const lower = email.toLowerCase();

  await kvSet(keys.subscriber(lower), {
    email: lower,
    subscribedAt: new Date().toISOString(),
    status: 'pending',
  });
  await kvSadd(keys.subscriberIndex, lower);

  await sendMail({
    to: lower,
    subject: 'Please confirm your Naaman Wellness subscription',
    text: [
      'Hello,',
      '',
      'Thank you for signing up for our weekly reflection.',
      '',
      'Please confirm this address by replying to this email, or simply ignore it and we will not add you to the list.',
      '',
      'You can unsubscribe at any time from the link in any newsletter.',
      '',
      'Warmly,',
      'The Naaman Wellness Team',
    ].join('\n'),
  });

  return NextResponse.json({ ok: true });
}
