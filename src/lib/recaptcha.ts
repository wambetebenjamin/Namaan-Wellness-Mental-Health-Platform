/**
 * Server-side reCAPTCHA verification.
 *
 * The secret key is read from the environment on the server only and is never
 * exposed to the client. A v3 token that scores below RECAPTCHA_MIN_SCORE
 * causes the caller to fall back to a visible reCAPTCHA v2 challenge.
 */

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const DEFAULT_MIN_SCORE = 0.5;

export type VerifyResult =
  | { ok: true; score: number; action?: string }
  | { ok: false; score: number; reason: 'missing-token' | 'missing-secret' | 'network' | 'low-score' | 'invalid' | 'timeout' };

function minScore(): number {
  const raw = process.env.RECAPTCHA_MIN_SCORE;
  const parsed = raw === undefined ? Number.NaN : Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : DEFAULT_MIN_SCORE;
}

/** True only in local development AND when explicitly opted into. */
export function captchaBypassed(): boolean {
  return (
    process.env.NODE_ENV !== 'production' &&
    process.env.CAPTCHA_DEV_BYPASS === 'true'
  );
}

/**
 * Verify a reCAPTCHA response token.
 * @param token  The `g-recaptcha-response` value.
 * @param variant 'v3' (invisible, scored) or 'v2' (checkbox challenge).
 */
export async function verifyCaptcha(
  token: string | undefined | null,
  variant: 'v3' | 'v2' = 'v3'
): Promise<VerifyResult> {
  if (captchaBypassed()) {
    return { ok: true, score: 1, action: 'dev-bypass' };
  }

  if (!token) {
    return { ok: false, score: 0, reason: 'missing-token' };
  }

  const secret =
    variant === 'v2'
      ? process.env.RECAPTCHA_V2_SECRET_KEY
      : process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    // Fail closed in production so a missing secret is never silent.
    // Outside production (local dev, preview builds without secrets bound)
    // an unconfigured CAPTCHA must not block the form.
    if (process.env.NODE_ENV === 'production') {
      return { ok: false, score: 0, reason: 'missing-secret' };
    }
    return { ok: true, score: 1, action: 'dev-no-secret' };
  }

  const body = new URLSearchParams({ secret, response: token });

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timer);

    if (!res.ok) {
      return { ok: false, score: 0, reason: 'network' };
    }

    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      'error-codes'?: string[];
    };

    if (!data.success) {
      const codes = data['error-codes'] ?? [];
      return {
        ok: false,
        score: 0,
        reason: codes.includes('timeout-or-duplicate') ? 'timeout' : 'invalid',
      };
    }

    const score = typeof data.score === 'number' ? data.score : 1;

    if (variant === 'v3' && score < minScore()) {
      return { ok: false, score, reason: 'low-score' };
    }

    return { ok: true, score, action: data.action };
  } catch {
    return { ok: false, score: 0, reason: 'network' };
  }
}
