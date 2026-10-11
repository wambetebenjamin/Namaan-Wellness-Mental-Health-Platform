/**
 * Client-side reCAPTCHA helper.
 *
 * v3 (invisible) is used for every form. If the server reports a score below
 * the threshold, the caller switches to a visible v2 checkbox challenge.
 *
 * The loader resolves to null when the site key is absent or the script
 * cannot be fetched (offline, blocked network, ad blockers). In that case the
 * form submits without a token and the server decides — so a captcha outage
 * degrades instead of locking someone out of booking therapy.
 */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
      render: (el: HTMLElement, opts: Record<string, unknown>) => number;
      reset: (id?: number) => void;
      getResponse: (id?: number) => string;
    };
  }
}

let v3Promise: Promise<boolean> | null = null;
let v2Promise: Promise<boolean> | null = null;

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const V2_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) return resolve(true);

    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);

    // Do not hang indefinitely on a blocked network.
    window.setTimeout(() => resolve(Boolean(window.grecaptcha)), 6000);
  });
}

/** Load and prime the invisible v3 widget. */
export function loadRecaptchaV3(): Promise<boolean> {
  if (!SITE_KEY) return Promise.resolve(false);
  if (v3Promise) return v3Promise;

  v3Promise = loadScript(
    `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`
  ).then((ok) => {
    if (!ok || !window.grecaptcha) return false;
    return new Promise<boolean>((resolve) => {
      window.grecaptcha!.ready(() => resolve(true));
      window.setTimeout(() => resolve(Boolean(window.grecaptcha)), 6000);
    });
  });

  return v3Promise;
}

/** Generate a v3 token for an action. Returns null when unavailable. */
export async function getV3Token(action: string): Promise<string | null> {
  const ok = await loadRecaptchaV3();
  if (!ok || !window.grecaptcha || !SITE_KEY) return null;
  try {
    return await window.grecaptcha.execute(SITE_KEY, { action });
  } catch {
    return null;
  }
}

/** Load the visible v2 checkbox widget used as a fallback. */
export function loadRecaptchaV2(): Promise<boolean> {
  if (!V2_SITE_KEY) return Promise.resolve(false);
  if (v2Promise) return v2Promise;

  v2Promise = loadScript('https://www.google.com/recaptcha/api.js?onload=nwV2Ready&render=explicit')
    .then((ok) => ok && Boolean(window.grecaptcha));

  return v2Promise;
}

export function getV2SiteKey(): string | undefined {
  return V2_SITE_KEY;
}
