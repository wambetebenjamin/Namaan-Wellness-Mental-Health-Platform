'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { getV3Token } from '@/lib/captcha-client';
import CaptchaChallenge from './CaptchaChallenge';

type Status = 'idle' | 'sending' | 'done' | 'error' | 'challenge';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [notice, setNotice] = useState('');
  const [v2Token, setV2Token] = useState<string | null>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = 'Please enter an email address we can reply to.';
    if (values.message.trim().length < 5)
      next.message = 'Please add a short message so we can help.';
    return next;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    setNotice('');
    const token = v2Token ?? (await getV3Token('contact'));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          captchaToken: token,
          captchaVariant: v2Token ? 'v2' : 'v3',
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        captchaChallenge?: boolean;
      };

      if (data.captchaChallenge) return setStatus('challenge');

      if (!res.ok || !data.ok) {
        setStatus('error');
        setNotice(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('done');
    } catch {
      setStatus('error');
      setNotice('We could not reach the server. Please try again when you are ready.');
    }
  }

  if (status === 'done') {
    return (
      <div className="nw-notice" role="status">
        <Check size={16} aria-hidden="true" />
        <span>
          Thank you — your message is with us. We reply within one working day. If it is
          urgent, please use the crisis line at the top of this page.
        </span>
      </div>
    );
  }

  return (
    <form className="nw-form" onSubmit={submit} noValidate>
      {status === 'challenge' && <CaptchaChallenge onToken={setV2Token} />}

      <div className="nw-field">
        <label className="nw-label" htmlFor="c-name">
          Your name
        </label>
        <input
          id="c-name"
          className="nw-input"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'c-name-err' : undefined}
          autoComplete="name"
        />
        {errors.name && (
          <p id="c-name-err" className="nw-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="nw-form__row">
        <div className="nw-field">
          <label className="nw-label" htmlFor="c-email">
            Email
          </label>
          <input
            id="c-email"
            className="nw-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'c-email-err' : undefined}
          />
          {errors.email && (
            <p id="c-email-err" className="nw-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="nw-field">
          <label className="nw-label" htmlFor="c-phone">
            Phone <span className="nw-label__optional">(optional)</span>
          </label>
          <input
            id="c-phone"
            className="nw-input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          />
        </div>
      </div>

      <div className="nw-field">
        <label className="nw-label" htmlFor="c-message">
          How can we help?
        </label>
        <textarea
          id="c-message"
          className="nw-textarea"
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'c-message-err' : 'c-message-hint'}
        />
        {errors.message ? (
          <p id="c-message-err" className="nw-error" role="alert">
            {errors.message}
          </p>
        ) : (
          <p id="c-message-hint" className="nw-hint">
            Please do not include anything you would rather not share by email.
          </p>
        )}
      </div>

      {notice && (
        <p className="nw-error" role="alert">
          {notice}
        </p>
      )}

      <div>
        <button
          type="submit"
          className="nw-btn nw-btn--primary"
          disabled={status === 'sending'}
        >
          {status === 'sending' && <Loader2 size={16} className="nw-spin" aria-hidden="true" />}
          Send Message
        </button>
      </div>
    </form>
  );
}
