import { NextResponse } from 'next/server';
import { verifyCaptcha } from '@/lib/recaptcha';

/**
 * POST /api/captcha
 * Standalone server-side reCAPTCHA verification endpoint, used by any form
 * that verifies the token separately from its own submission.
 *
 * Body: { token: string, variant?: 'v2' | 'v3' }
 * Response: { ok: true, score } | { ok: false, reason, captchaChallenge: true }
 *
 * The secret never leaves the server and is never echoed back.
 */
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: { token?: string; variant?: 'v2' | 'v3' };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  }

  const result = await verifyCaptcha(body.token, body.variant ?? 'v3');

  if (!result.ok && result.reason === 'low-score') {
    return NextResponse.json({ ok: false, reason: 'low-score', captchaChallenge: true });
  }

  return NextResponse.json(
    result.ok ? { ok: true, score: result.score } : { ok: false, reason: result.reason }
  );
}
