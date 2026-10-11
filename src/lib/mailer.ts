import nodemailer, { type Transporter } from 'nodemailer';

/**
 * Nodemailer transport. Configured entirely from environment variables.
 * When SMTP is not configured (local development) sendMail() resolves false
 * and logs instead, so submissions still succeed.
 */

let cached: Transporter | null = null;

function transport(): Transporter | null {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  if (cached) return cached;

  cached = nodemailer.createTransport({
    host,
    port: Number.parseInt(process.env.SMTP_PORT ?? '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  return cached;
}

export type Mail = {
  to: string;
  subject: string;
  /** Plain text body. HTML is intentionally not used for mental health mail. */
  text: string;
  replyTo?: string;
};

export async function sendMail(mail: Mail): Promise<boolean> {
  const tx = transport();
  const from = process.env.MAIL_FROM ?? 'Naaman Wellness <hello@naamanwellness.co.ke>';

  if (!tx) {
    console.info('[mailer] SMTP not configured; would have sent:', {
      to: mail.to,
      subject: mail.subject,
    });
    return false;
  }

  try {
    await tx.sendMail({
      from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      replyTo: mail.replyTo,
    });
    return true;
  } catch (err) {
    console.error('[mailer] send failed', err);
    return false;
  }
}

/**
 * Booking confirmation. Deliberately gentle and non-clinical in tone, and
 * contains no details about why the client is coming to therapy.
 */
export function bookingConfirmationMail(input: {
  name: string;
  therapistName: string;
  date: string;
  time: string;
  format: string;
  reference: string;
}): Mail {
  return {
    to: '',
    subject: 'Your session at Naaman Wellness',
    text: [
      `Hello ${input.name},`,
      '',
      'Thank you for booking with us. Your session is confirmed.',
      '',
      `  Therapist : ${input.therapistName}`,
      `  Date      : ${input.date}`,
      `  Time      : ${input.time}`,
      `  Format    : ${input.format}`,
      `  Reference : ${input.reference}`,
      '',
      'If you need to change or cancel, just reply to this email or message us on WhatsApp. There is no charge for changing a session with more than 24 hours notice.',
      '',
      'If you are in crisis or need immediate help, please call Befrienders Kenya on 0800 723 253. Free. 24 hours.',
      '',
      'We look forward to meeting you.',
      '',
      'Warmly,',
      'The Naaman Wellness Team',
      '',
      'Naaman Wellness | Ngong Lane Plaza, Ngong Road, Kilimani, Nairobi',
    ].join('\n'),
  };
}
