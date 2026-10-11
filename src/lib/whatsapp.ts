/**
 * Outbound WhatsApp notifications via the WhatsApp Cloud API.
 * The access token stays server-side. When the API is not configured the
 * message is logged and the request still succeeds.
 */

const API_VERSION = 'v21.0';

export type WhatsAppResult = { ok: true; id?: string } | { ok: false; error: string };

function config() {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_NOTIFY_NUMBER;
  if (!token || !phoneNumberId || !to) return null;
  return { token, phoneNumberId, to };
}

export async function sendWhatsApp(text: string, to?: string): Promise<WhatsAppResult> {
  const cfg = config();
  const recipient = to ?? cfg?.to;

  if (!cfg || !recipient) {
    console.info('[whatsapp] not configured; would have sent:', text);
    return { ok: false, error: 'not-configured' };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${cfg.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: recipient,
          type: 'text',
          text: { preview_url: false, body: text },
        }),
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('[whatsapp] send failed', res.status, err);
      return { ok: false, error: 'send-failed' };
    }

    const data = (await res.json()) as { messages?: { id: string }[] };
    return { ok: true, id: data.messages?.[0]?.id };
  } catch (err) {
    console.error('[whatsapp] network error', err);
    return { ok: false, error: 'network' };
  }
}

/**
 * Client-facing booking message. Contains session logistics only — never any
 * detail about why the client is attending therapy.
 */
export function bookingWhatsApp(input: {
  name: string;
  therapistName: string;
  date: string;
  time: string;
  format: string;
  reference: string;
}): string {
  return [
    `Hello ${input.name}, thank you for booking with Naaman Wellness.`,
    '',
    `Therapist: ${input.therapistName}`,
    `Date: ${input.date}`,
    `Time: ${input.time}`,
    `Format: ${input.format}`,
    `Reference: ${input.reference}`,
    '',
    'Reply to this message if you would like to change or cancel. There is no charge with more than 24 hours notice.',
    '',
    'If you are in crisis or need immediate help, please call Befrienders Kenya on 0800 723 253. Free. 24 hours.',
  ].join('\n');
}

export function corporateEnquiryWhatsApp(input: {
  company: string;
  contact: string;
  employees: string;
  startDate: string;
}): string {
  return [
    'New corporate wellness enquiry',
    '',
    `Company: ${input.company}`,
    `Contact: ${input.contact}`,
    `Employees: ${input.employees}`,
    `Preferred start: ${input.startDate}`,
  ].join('\n');
}
