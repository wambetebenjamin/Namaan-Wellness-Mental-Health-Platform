'use client';

import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { getV2SiteKey, loadRecaptchaV2 } from '@/lib/captcha-client';

/**
 * Visible reCAPTCHA v2 checkbox, shown only when the invisible v3 score came
 * back below the threshold. Rendered inside the form so the submission can be
 * retried with the v2 token.
 */
export default function CaptchaChallenge({
  onToken,
}: {
  onToken: (token: string | null) => void;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const ok = await loadRecaptchaV2();
      if (cancelled) return;
      if (!ok || !hostRef.current || !window.grecaptcha?.render) {
        setFailed(true);
        return;
      }
      const key = getV2SiteKey();
      if (!key) {
        setFailed(true);
        return;
      }
      widgetId.current = window.grecaptcha.render(hostRef.current, {
        sitekey: key,
        theme: 'light',
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(null),
        'error-callback': () => setFailed(true),
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [onToken]);

  if (failed) {
    return (
      <div className="nw-notice" role="status">
        <ShieldCheck size={16} aria-hidden="true" />
        <span>
          We could not load our spam protection. Please call us on{' '}
          <a href="tel:+254112272061">+254 112 272 061</a> or use WhatsApp and we
          will book you in directly.
        </span>
      </div>
    );
  }

  return (
    <div className="nw-field">
      <p className="nw-hint">
        We just need to check you are not a robot. This is a one-off check.
      </p>
      <div ref={hostRef} className="nw-captcha-host" />
    </div>
  );
}
