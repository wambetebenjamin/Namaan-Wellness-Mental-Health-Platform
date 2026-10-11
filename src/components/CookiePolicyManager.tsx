'use client';

import { useEffect, useState } from 'react';

/** Lets a visitor review or withdraw cookie consent from the Cookie Policy page. */
const STORAGE_KEY = 'nw:cookie-consent';

type Prefs = { necessary: true; functional: boolean; analytics: boolean; decidedAt: string };

export default function CookiePolicyManager() {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Prefs;
      setPrefs(parsed);
      setFunctional(parsed.functional);
      setAnalytics(parsed.analytics);
    } catch {
      /* ignore */
    }
  }, []);

  function save(nextFunctional: boolean, nextAnalytics: boolean) {
    const record: Prefs = {
      necessary: true,
      functional: nextFunctional,
      analytics: nextAnalytics,
      decidedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* ignore */
    }
    setPrefs(record);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3200);
  }

  return (
    <div
      style={{
        border: '1px solid var(--nw-border-soft)',
        borderRadius: 'var(--nw-radius)',
        padding: '1.5rem',
        background: 'var(--nw-sand-50)',
        marginTop: '2rem',
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: 'var(--nw-fs-h4)' }}>
        Your current preferences
      </h2>
      <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)', marginBottom: '1.25rem' }}>
        {prefs
          ? `You made a choice on ${new Date(prefs.decidedAt).toLocaleDateString('en-KE', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}. You can change it at any time.`
          : 'You have not set a preference yet. Analytics are off by default.'}
      </p>

      <div className="nw-pref" style={{ borderTop: 0 }}>
        <div>
          <div className="nw-pref__name">Necessary</div>
          <p className="nw-pref__desc">Always on — required for the site to work.</p>
        </div>
        <span className="nw-pref__locked">Always on</span>
      </div>

      <div className="nw-pref">
        <div>
          <div className="nw-pref__name">Functional</div>
          <p className="nw-pref__desc">
            Remembers preferences such as your language and whether you have seen the intro.
          </p>
        </div>
        <button
          type="button"
          className="nw-switch"
          role="switch"
          aria-checked={functional}
          aria-label="Functional cookies"
          onClick={() => {
            const v = !functional;
            setFunctional(v);
            save(v, analytics);
          }}
        />
      </div>

      <div className="nw-pref">
        <div>
          <div className="nw-pref__name">Analytics</div>
          <p className="nw-pref__desc">
            Anonymous, aggregated statistics. Never linked to your therapy enquiry.
          </p>
        </div>
        <button
          type="button"
          className="nw-switch"
          role="switch"
          aria-checked={analytics}
          aria-label="Analytics cookies"
          onClick={() => {
            const v = !analytics;
            setAnalytics(v);
            save(functional, v);
          }}
        />
      </div>

      <div className="nw-modal__actions" style={{ marginTop: '1.25rem' }}>
        <button
          type="button"
          className="nw-btn nw-btn--ghost"
          onClick={() => {
            setFunctional(false);
            setAnalytics(false);
            save(false, false);
          }}
        >
          Withdraw all optional consent
        </button>
      </div>

      <p className="nw-visually-hidden" role="status" aria-live="polite">
        {saved ? 'Your cookie preferences have been saved.' : ''}
      </p>

      {saved && (
        <p className="nw-hint" style={{ marginTop: '0.75rem' }}>
          Your preferences have been saved.
        </p>
      )}
    </div>
  );
}
