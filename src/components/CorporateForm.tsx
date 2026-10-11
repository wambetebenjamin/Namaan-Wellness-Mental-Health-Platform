'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { getV3Token } from '@/lib/captcha-client';
import CaptchaChallenge from './CaptchaChallenge';

type Status = 'idle' | 'sending' | 'done' | 'error' | 'challenge';
type Errors = Partial<Record<'company' | 'contact' | 'email' | 'employees', string>>;

const CONCERNS = [
  'Burnout and exhaustion',
  'Stress and workload',
  'Anxiety and low mood',
  'Grief and bereavement',
  'Conflict at work',
  'Leadership pressure',
  'General wellbeing',
  'Not sure yet',
];

export default function CorporateForm() {
  const [values, setValues] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    employees: '',
    concerns: [] as string[],
    startDate: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [notice, setNotice] = useState('');
  const [v2Token, setV2Token] = useState<string | null>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!values.company.trim()) next.company = 'Please tell us your company name.';
    if (!values.contact.trim()) next.contact = 'Please add a contact name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = 'Please enter a work email address.';
    if (!values.employees.trim()) next.employees = 'Please give a rough number.';
    return next;
  }

  function toggleConcern(c: string) {
    setValues((v) => ({
      ...v,
      concerns: v.concerns.includes(c)
        ? v.concerns.filter((x) => x !== c)
        : [...v.concerns, c],
    }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    setNotice('');
    const token = v2Token ?? (await getV3Token('corporate'));

    try {
      const res = await fetch('/api/corporate', {
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
          Thank you. Your enquiry is with us and we will be in touch within two working
          days to arrange a conversation about what your team needs.
        </span>
      </div>
    );
  }

  return (
    <form className="nw-form" onSubmit={submit} noValidate>
      {status === 'challenge' && <CaptchaChallenge onToken={setV2Token} />}

      <div className="nw-form__row">
        <div className="nw-field">
          <label className="nw-label" htmlFor="co-company">
            Company name
          </label>
          <input
            id="co-company"
            className="nw-input"
            value={values.company}
            onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'co-company-err' : undefined}
            autoComplete="organization"
          />
          {errors.company && (
            <p id="co-company-err" className="nw-error" role="alert">
              {errors.company}
            </p>
          )}
        </div>

        <div className="nw-field">
          <label className="nw-label" htmlFor="co-contact">
            Contact name
          </label>
          <input
            id="co-contact"
            className="nw-input"
            value={values.contact}
            onChange={(e) => setValues((v) => ({ ...v, contact: e.target.value }))}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? 'co-contact-err' : undefined}
            autoComplete="name"
          />
          {errors.contact && (
            <p id="co-contact-err" className="nw-error" role="alert">
              {errors.contact}
            </p>
          )}
        </div>
      </div>

      <div className="nw-form__row">
        <div className="nw-field">
          <label className="nw-label" htmlFor="co-email">
            Work email
          </label>
          <input
            id="co-email"
            className="nw-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'co-email-err' : undefined}
          />
          {errors.email && (
            <p id="co-email-err" className="nw-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="nw-field">
          <label className="nw-label" htmlFor="co-phone">
            Phone <span className="nw-label__optional">(optional)</span>
          </label>
          <input
            id="co-phone"
            className="nw-input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          />
        </div>
      </div>

      <div className="nw-form__row">
        <div className="nw-field">
          <label className="nw-label" htmlFor="co-employees">
            Number of employees
          </label>
          <select
            id="co-employees"
            className="nw-select"
            value={values.employees}
            onChange={(e) => setValues((v) => ({ ...v, employees: e.target.value }))}
            aria-invalid={Boolean(errors.employees)}
            aria-describedby={errors.employees ? 'co-employees-err' : undefined}
          >
            <option value="">Please choose</option>
            <option>1 – 20</option>
            <option>21 – 50</option>
            <option>51 – 150</option>
            <option>151 – 500</option>
            <option>500+</option>
          </select>
          {errors.employees && (
            <p id="co-employees-err" className="nw-error" role="alert">
              {errors.employees}
            </p>
          )}
        </div>

        <div className="nw-field">
          <label className="nw-label" htmlFor="co-start">
            Preferred start date{' '}
            <span className="nw-label__optional">(optional)</span>
          </label>
          <input
            id="co-start"
            className="nw-input"
            type="date"
            value={values.startDate}
            onChange={(e) => setValues((v) => ({ ...v, startDate: e.target.value }))}
          />
        </div>
      </div>

      <fieldset className="nw-field" style={{ border: 0 }}>
        <legend className="nw-label" style={{ padding: 0, marginBottom: '0.6rem' }}>
          Primary concerns <span className="nw-label__optional">(optional)</span>
        </legend>
        <div className="nw-tags" style={{ gap: '0.5rem' }}>
          {CONCERNS.map((c) => (
            <button
              key={c}
              type="button"
              className="nw-tag"
              aria-pressed={values.concerns.includes(c)}
              onClick={() => toggleConcern(c)}
              style={{
                minHeight: 44,
                cursor: 'pointer',
                font: 'inherit',
                fontSize: 'var(--nw-fs-meta)',
                background: values.concerns.includes(c)
                  ? 'var(--nw-sage-600)'
                  : 'var(--nw-sage-50)',
                color: values.concerns.includes(c) ? '#fff' : 'var(--nw-sage-700)',
                borderColor: values.concerns.includes(c)
                  ? 'var(--nw-sage-600)'
                  : 'var(--nw-sage-100)',
                transition: 'all var(--nw-dur-2) var(--nw-ease)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="nw-field">
        <label className="nw-label" htmlFor="co-message">
          Anything else? <span className="nw-label__optional">(optional)</span>
        </label>
        <textarea
          id="co-message"
          className="nw-textarea"
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
        />
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
          Send Enquiry
        </button>
      </div>

      <p className="nw-form-note" style={{ textAlign: 'left' }}>
        We will only use these details to respond to your enquiry. Employee sessions are
        always confidential — we never share who attended with their employer.
      </p>
    </form>
  );
}
