'use client';

import './globals.css';

/**
 * Last-resort error boundary for failures in the root layout itself.
 * Keeps the crisis line visible even when everything else fails.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'hello@naamanwellness.co.ke';

  return (
    <html lang="en-KE">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif',
            background: '#fdfbf7',
            color: '#3b4a5a',
          }}
        >
          <div
            style={{
              maxWidth: 560,
              textAlign: 'center',
              display: 'grid',
              gap: '1.25rem',
              justifyItems: 'center',
            }}
          >
            <div
              style={{
                background: '#f4ece1',
                color: '#6b5540',
                fontSize: 12,
                padding: '0.5rem 1rem',
                borderRadius: 6,
                width: '100%',
              }}
            >
              If you are in crisis or need immediate help, please call Befrienders Kenya:{' '}
              <a href="tel:+254800723253" style={{ fontWeight: 700 }}>
                0800 723 253
              </a>
              . Free. 24 hours.
            </div>

            <p style={{ fontSize: '3rem', margin: 0, color: '#a8c4a6' }}>500</p>
            <h1 style={{ fontSize: '1.6rem', margin: 0 }}>Something went wrong.</h1>
            <p style={{ lineHeight: 1.75, margin: 0 }}>
              Please try again when you are ready. There is no rush.
            </p>

            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: 48,
                padding: '0.75rem 1.5rem',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.045em',
                textTransform: 'uppercase',
                borderRadius: 999,
                border: 0,
                background: '#a06544',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>

            <p style={{ fontSize: 12, color: '#7d8b99', lineHeight: 1.7 }}>
              If this keeps happening, please email us at{' '}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
