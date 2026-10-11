'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { getV3Token } from '@/lib/captcha-client';
import CaptchaChallenge from './CaptchaChallenge';

type Status = 'idle' | 'sending' | 'done' | 'error' | 'challenge';

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setInvalid(true);
      setStatus('error');
      setMessage('Please enter an email address you can be reached on.');
      return;
    }
    setInvalid(false);

    setStatus('sending');
    const token = v2Token ?? (await getV3Token('newsletter'));

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          captchaToken: token,
          captchaVariant: v2Token ? 'v2' : 'v3',
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        captchaChallenge?: boolean;
      };

      if (data.captchaChallenge) {
        setStatus('challenge');
        return;
      }

      if (!res.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('We could not reach the server. Please try again when you are ready.');
    }
  }

  if (status === 'done') {
    return (
      <div
        className="nw-notice"
        role="status"
        style={{ width: '100%', gridTemplateColumns: '24px 1fr' }}
      >
        <Check size={16} aria-hidden="true" />
        <span>
          Thank you. Please check your inbox to confirm — that way we know the address
          is right.
        </span>
      </div>
    );
  }

  if (compact) {
    return (
      <form
        onSubmit={submit}
        style={{ minWidth: 'min(320px, 100%)', width: '100%', maxWidth: 420 }}
      >
        {status === 'challenge' && <CaptchaChallenge onToken={setV2Token} />}
        <div className="nw-news__form">
          <label className="nw-visually-hidden" htmlFor="nw-news-email">
            Email address
          </label>
          <input
            id="nw-news-email"
            className="nw-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={invalid}
            aria-describedby={invalid ? 'nw-news-err' : undefined}
            required
          />
          <button
            type="submit"
            className="nw-btn nw-btn--primary"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <Loader2 size={16} className="nw-spin" aria-hidden="true" />
            ) : null}
            Subscribe
          </button>
        </div>
        {message && (
          <p id="nw-news-err" className="nw-error" role="alert">
            {message}
          </p>
        )}
      </form>
    );
  }

  return (
    <form className="nw-news__form" onSubmit={submit} style={{ maxWidth: 520 }}>
      {status === 'challenge' && <CaptchaChallenge onToken={setV2Token} />}
      <label className="nw-visually-hidden" htmlFor="nw-news-email-2">
        Email address
      </label>
      <input
        id="nw-news-email-2"
        className="nw-input"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={invalid}
        aria-describedby={invalid ? 'nw-news-err-2' : undefined}
        required
      />
      <button
        type="submit"
        className="nw-btn nw-btn--primary"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <Loader2 size={16} className="nw-spin" aria-hidden="true" />
        ) : null}
        Subscribe
      </button>
      {message && (
        <p id="nw-news-err-2" className="nw-error" role="alert" style={{ flexBasis: '100%' }}>
          {message}
        </p>
      )}
    </form>
  );
}
