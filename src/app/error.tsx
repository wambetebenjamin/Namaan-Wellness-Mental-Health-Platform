'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { site } from '@/data/site';

/**
 * 500 page.
 * "Something went wrong. Please try again when you are ready."
 * No urgency. Try Again button. Support email visible.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="nw-errorpage">
      <div className="nw-errorpage__inner">
        <AlertCircle size={44} aria-hidden="true" style={{ color: 'var(--nw-clay-300)' }} />
        <p className="nw-errorpage__code">500</p>
        <h1 style={{ fontSize: 'var(--nw-fs-h2)' }}>Something went wrong.</h1>
        <p className="nw-lead" style={{ textAlign: 'center' }}>
          Please try again when you are ready. Nothing you were doing has been lost, and
          there is no rush.
        </p>

        <div className="nw-errorpage__actions">
          <button type="button" className="nw-btn nw-btn--primary" onClick={reset}>
            Try Again
          </button>
          <a href="/" className="nw-btn nw-btn--ghost">
            Return to Homepage
          </a>
        </div>

        <p className="nw-errorpage__support">
          If this keeps happening, please email us at{' '}
          <a href={`mailto:${site.supportEmail}`} style={{ textDecoration: 'underline' }}>
            {site.supportEmail}
          </a>{' '}
          and we will look into it.
          <br />
          <br />
          In crisis? Call {site.crisis.name} on {site.crisis.number}. Free. 24 hours.
        </p>
      </div>
    </div>
  );
}
