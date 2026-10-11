'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

/**
 * Cookie consent.
 * Bottom-fixed, full width, calm and unobtrusive.
 * Accept All + Manage Preferences. Modal offers Necessary (locked),
 * Functional and Analytics. Stored in localStorage so it never repeats.
 * Kenya Data Protection Act 2019: consent is explicit, granular,
 * withdrawable and recorded with a timestamp.
 */

type Prefs = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  decidedAt: string;
};

const STORAGE_KEY = 'nw:cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* localStorage unavailable */
    }
    if (stored) return;

    const t = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  function persist(prefs: Omit<Prefs, 'decidedAt'>) {
    const record: Prefs = { ...prefs, necessary: true, decidedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent('nw:consent', { detail: record }));
    setVisible(false);
    setModal(false);
  }

  if (!visible && !modal) return null;

  return (
    <>
      <div
        className={`nw-cookie${visible ? ' is-visible' : ''}`}
        role="region"
        aria-label="Cookie notice"
      >
        <div className="nw-cookie__inner">
          <p className="nw-cookie__text">
            Naaman Wellness uses cookies to remember your preferences and help us
            improve your experience. See our{' '}
            <Link href="/legal/cookie-policy">Cookie Policy</Link>.
          </p>
          <div className="nw-cookie__actions">
            <button
              type="button"
              className="nw-btn nw-btn--ghost"
              onClick={() => setModal(true)}
            >
              Manage Preferences
            </button>
            <button
              type="button"
              className="nw-btn nw-btn--primary"
              onClick={() => persist({ necessary: true, functional: true, analytics: true })}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <div
          className="nw-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="nw-cookie-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(false);
          }}
        >
          <div className="nw-modal__panel">
            <div className="nw-modal__head">
              <h2 id="nw-cookie-title" style={{ fontSize: 'var(--nw-fs-h3)' }}>
                Cookie preferences
              </h2>
              <p className="nw-hint">
                Choose what you are comfortable with. You can change this at any time
                on our Cookie Policy page.
              </p>
            </div>

            <div className="nw-pref">
              <div>
                <div className="nw-pref__name">
                  <Lock size={14} aria-hidden="true" /> Necessary
                </div>
                <p className="nw-pref__desc">
                  Required for the site to function — remembering your cookie choice,
                  session security and form protection. These cannot be switched off.
                </p>
              </div>
              <span className="nw-pref__locked">Always on</span>
            </div>

            <div className="nw-pref">
              <div>
                <div className="nw-pref__name">Functional</div>
                <p className="nw-pref__desc">
                  Remembers preferences such as your language and whether you have seen
                  the intro. Nothing is used to identify you.
                </p>
              </div>
              <button
                type="button"
                className="nw-switch"
                role="switch"
                aria-checked={functional}
                aria-label="Functional cookies"
                onClick={() => setFunctional((v) => !v)}
              />
            </div>

            <div className="nw-pref">
              <div>
                <div className="nw-pref__name">Analytics</div>
                <p className="nw-pref__desc">
                  Anonymous, aggregated statistics that help us understand which
                  resources people find useful. Never linked to your therapy enquiry.
                </p>
              </div>
              <button
                type="button"
                className="nw-switch"
                role="switch"
                aria-checked={analytics}
                aria-label="Analytics cookies"
                onClick={() => setAnalytics((v) => !v)}
              />
            </div>

            <div className="nw-modal__actions">
              <button
                type="button"
                className="nw-btn nw-btn--primary"
                onClick={() => persist({ necessary: true, functional, analytics })}
              >
                Save Preferences
              </button>
              <button
                type="button"
                className="nw-btn nw-btn--secondary"
                onClick={() => persist({ necessary: true, functional: true, analytics: true })}
              >
                Accept All
              </button>
              <button
                type="button"
                className="nw-btn nw-btn--ghost"
                onClick={() => persist({ necessary: true, functional: false, analytics: false })}
              >
                Necessary Only
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
