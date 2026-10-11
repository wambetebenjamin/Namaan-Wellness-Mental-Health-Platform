'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, Loader2, MapPin, Users, Video, AlertCircle } from 'lucide-react';
import { therapists, type Therapist } from '@/data/therapists';
import { getV3Token } from '@/lib/captcha-client';
import CaptchaChallenge from './CaptchaChallenge';

type Status = 'idle' | 'sending' | 'done' | 'error' | 'challenge';
type Errors = Partial<Record<'therapist' | 'format' | 'language' | 'sessionType' | 'slot' | 'name' | 'email' | 'phone', string>>;

const STEPS = ['Therapist', 'Session', 'Date & time', 'About you', 'Confirm'];

const FORMATS = [
  { value: 'online', label: 'Online', desc: 'A private video session, anywhere in Kenya', icon: Video },
  { value: 'in-person', label: 'In person', desc: 'Our practice in Kilimani, Nairobi', icon: MapPin },
];

const LANGUAGES = [
  { value: 'English', label: 'English' },
  { value: 'Kiswahili', label: 'Kiswahili' },
];

const SESSION_TYPES = [
  { value: 'individual', label: 'Individual', desc: 'Just you and your therapist' },
  { value: 'couples', label: 'Couples', desc: 'You and your partner' },
  { value: 'family', label: 'Family', desc: 'Two or more family members' },
  { value: 'group', label: 'Group', desc: 'A facilitated small group' },
];

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [notice, setNotice] = useState('');
  const [v2Token, setV2Token] = useState<string | null>(null);
  const [reference, setReference] = useState('');

  // Choices
  const [therapistSlug, setTherapistSlug] = useState<string>('');
  const [format, setFormat] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  const [sessionType, setSessionType] = useState<string>('individual');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  // Availability
  const [days, setDays] = useState<{ date: string; count: number }[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingDays, setLoadingDays] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const therapist: Therapist | undefined = useMemo(
    () => therapists.find((t) => t.slug === therapistSlug),
    [therapistSlug]
  );

  const loadDays = useCallback(async () => {
    setLoadingDays(true);
    try {
      const params = new URLSearchParams();
      if (therapistSlug) params.set('therapist', therapistSlug);
      const res = await fetch(`/api/availability?${params}`, { cache: 'no-store' });
      const data = (await res.json()) as { days?: { date: string; count: number }[] };
      setDays(data.days ?? []);
    } catch {
      setDays([]);
    } finally {
      setLoadingDays(false);
    }
  }, [therapistSlug]);

  const loadSlots = useCallback(async () => {
    if (!date) return setSlots([]);
    setLoadingSlots(true);
    try {
      const params = new URLSearchParams({ date });
      if (therapistSlug) params.set('therapist', therapistSlug);
      const res = await fetch(`/api/availability?${params}`, { cache: 'no-store' });
      const data = (await res.json()) as { slots?: string[] };
      setSlots(data.slots ?? []);
    } catch {
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [date, therapistSlug]);

  useEffect(() => {
    if (step === 2) void loadDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    void loadSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function validateStep(current: number): Errors {
    const next: Errors = {};
    if (current === 1) {
      if (!format) next.format = 'Please choose how you would like to meet.';
      if (!language) next.language = 'Please choose a language.';
      if (!sessionType) next.sessionType = 'Please choose a session type.';
    }
    if (current === 2) {
      if (!date) next.slot = 'Please choose a date.';
      else if (!time) next.slot = 'Please choose a time.';
    }
    if (current === 3) {
      if (!name.trim()) next.name = 'Please tell us your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
        next.email = 'Please enter an email address we can send your confirmation to.';
      if (!phone.trim()) next.phone = 'Please add a phone number for your reminder.';
    }
    return next;
  }

  function next() {
    const found = validateStep(step);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    setNotice('');
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    setErrors({});
    setNotice('');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateStep(3);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    setNotice('');
    const token = v2Token ?? (await getV3Token('booking'));

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          therapistSlug: therapistSlug || null,
          format,
          language,
          sessionType,
          date,
          time,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          note: note.trim(),
          captchaToken: token,
          captchaVariant: v2Token ? 'v2' : 'v3',
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        captchaChallenge?: boolean;
        reference?: string;
      };

      if (data.captchaChallenge) return setStatus('challenge');

      if (!res.ok || !data.ok) {
        setStatus('error');
        setNotice(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setReference(data.reference ?? '');
      setStatus('done');
    } catch {
      setStatus('error');
      setNotice('We could not reach the server. Please try again when you are ready.');
    }
  }

  /* ------------------------- Confirmation ------------------------- */

  if (status === 'done') {
    return (
      <div className="nw-panel" role="status">
        <span
          style={{
            width: 52,
            height: 52,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            background: 'var(--nw-sage-100)',
            color: 'var(--nw-sage-700)',
          }}
        >
          <Check size={26} aria-hidden="true" />
        </span>
        <h2 style={{ fontSize: 'var(--nw-fs-h3)' }}>Your session is booked</h2>
        <p style={{ color: 'var(--nw-text-soft)' }}>
          We have sent a confirmation to <strong>{email}</strong> and a WhatsApp message
          with your session details. There is nothing else you need to do right now.
        </p>
        {reference && (
          <div className="nw-review">
            <div className="nw-review__row">
              <span className="nw-review__key">Reference</span>
              <span className="nw-review__val">{reference}</span>
            </div>
            <div className="nw-review__row">
              <span className="nw-review__key">Therapist</span>
              <span className="nw-review__val">
                {therapist ? therapist.name : 'To be matched to you'}
              </span>
            </div>
            <div className="nw-review__row">
              <span className="nw-review__key">When</span>
              <span className="nw-review__val">
                {date} at {time}
              </span>
            </div>
            <div className="nw-review__row">
              <span className="nw-review__key">Format</span>
              <span className="nw-review__val">
                {format === 'online' ? 'Online' : 'In person, Kilimani'}
              </span>
            </div>
          </div>
        )}
        <p className="nw-form-note" style={{ textAlign: 'left' }}>
          If you need to change or cancel, reply to the confirmation email or message us
          on WhatsApp. There is no charge with more than 24 hours notice.
        </p>
      </div>
    );
  }

  /* ----------------------------- Steps ---------------------------- */

  return (
    <div className="nw-booking">
      {/* Step rail */}
      <ol className="nw-steps-rail" aria-label="Booking progress">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              className={`nw-rail-item${i < step ? ' nw-rail-item--done' : ''}`}
              aria-current={i === step ? 'step' : undefined}
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              style={i > step ? { opacity: 0.45, cursor: 'default' } : undefined}
            >
              <span className="nw-rail-item__num">
                {i < step ? <Check size={15} aria-hidden="true" /> : i + 1}
              </span>
              <span className="nw-rail-item__label">{label}</span>
            </button>
          </li>
        ))}
      </ol>

      <form
        className="nw-panel"
        onSubmit={step === 4 ? submit : (e) => e.preventDefault()}
        noValidate
      >
        {/* ---------- Step 1: Therapist ---------- */}
        {step === 0 && (
          <>
            <div className="nw-panel__head">
              <p className="nw-eyebrow">Step 1 of 5</p>
              <h2 style={{ fontSize: 'var(--nw-fs-h3)' }}>Choose a therapist</h2>
              <p style={{ color: 'var(--nw-text-soft)' }}>
                If you are not sure who to see, choose &ldquo;No preference&rdquo; and we
                will match you with someone suited to what you have told us.
              </p>
            </div>

            <div className="nw-options">
              <button
                type="button"
                className="nw-option"
                aria-pressed={therapistSlug === ''}
                onClick={() => setTherapistSlug('')}
              >
                <span className="nw-option__icon">
                  <Users size={22} aria-hidden="true" />
                </span>
                <span>
                  <span className="nw-option__title">No preference</span>
                  <span className="nw-option__desc">
                    Match me with a suitable therapist
                  </span>
                </span>
                <Check className="nw-option__check" size={20} aria-hidden="true" />
              </button>

              {therapists.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  className="nw-option"
                  aria-pressed={therapistSlug === t.slug}
                  onClick={() => setTherapistSlug(t.slug)}
                >
                  <span className="nw-option__avatar">
                    <Image
                      src={t.image}
                      alt=""
                      width={52}
                      height={52}
                      style={{ objectFit: 'cover' }}
                    />
                  </span>
                  <span>
                    <span className="nw-option__title">{t.name}</span>
                    <span className="nw-option__desc">
                      {t.role} · {t.specialisations.join(', ')}
                    </span>
                  </span>
                  <Check className="nw-option__check" size={20} aria-hidden="true" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* ---------- Step 2: Session ---------- */}
        {step === 1 && (
          <>
            <div className="nw-panel__head">
              <p className="nw-eyebrow">Step 2 of 5</p>
              <h2 style={{ fontSize: 'var(--nw-fs-h3)' }}>How would you like to meet?</h2>
            </div>

            <fieldset className="nw-field" style={{ border: 0 }}>
              <legend className="nw-label" style={{ padding: 0, marginBottom: '0.6rem' }}>
                Session format
              </legend>
              <div className="nw-options nw-options--2">
                {FORMATS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    className="nw-option"
                    aria-pressed={format === f.value}
                    onClick={() => setFormat(f.value)}
                    style={{ gridTemplateColumns: '52px 1fr auto' }}
                  >
                    <span className="nw-option__icon">
                      <f.icon size={22} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="nw-option__title">{f.label}</span>
                      <span className="nw-option__desc">{f.desc}</span>
                    </span>
                    <Check className="nw-option__check" size={20} aria-hidden="true" />
                  </button>
                ))}
              </div>
              {errors.format && (
                <p className="nw-error" role="alert">
                  {errors.format}
                </p>
              )}
            </fieldset>

            <fieldset className="nw-field" style={{ border: 0 }}>
              <legend className="nw-label" style={{ padding: 0, marginBottom: '0.6rem' }}>
                Preferred language
              </legend>
              <div className="nw-options nw-options--2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    className="nw-toggle"
                    aria-pressed={language === l.value}
                    onClick={() => setLanguage(l.value)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="nw-field" style={{ border: 0 }}>
              <legend className="nw-label" style={{ padding: 0, marginBottom: '0.6rem' }}>
                Session type
              </legend>
              <div className="nw-options nw-options--2">
                {SESSION_TYPES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    className="nw-option"
                    aria-pressed={sessionType === s.value}
                    onClick={() => setSessionType(s.value)}
                    style={{ gridTemplateColumns: '1fr auto' }}
                  >
                    <span>
                      <span className="nw-option__title">{s.label}</span>
                      <span className="nw-option__desc">{s.desc}</span>
                    </span>
                    <Check className="nw-option__check" size={20} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {/* ---------- Step 3: Date & time ---------- */}
        {step === 2 && (
          <>
            <div className="nw-panel__head">
              <p className="nw-eyebrow">Step 3 of 5</p>
              <h2 style={{ fontSize: 'var(--nw-fs-h3)' }}>Choose a date and time</h2>
              <p style={{ color: 'var(--nw-text-soft)' }}>
                Times shown are East Africa Time (EAT).
              </p>
            </div>

            <div className="nw-calendar">
              {loadingDays ? (
                <div className="nw-skeleton" style={{ height: 62 }} aria-hidden="true" />
              ) : (
                <div className="nw-days">
                  {days.map((d) => {
                    const dt = new Date(`${d.date}T00:00:00`);
                    return (
                      <button
                        key={d.date}
                        type="button"
                        className="nw-day"
                        aria-pressed={date === d.date}
                        disabled={d.count === 0}
                        onClick={() => {
                          setDate(d.date);
                          setTime('');
                        }}
                      >
                        <span className="nw-day__dow">
                          {dt.toLocaleDateString('en-KE', { weekday: 'short' })}
                        </span>
                        <span className="nw-day__num">{dt.getDate()}</span>
                        <span className="nw-day__dots">
                          {d.count === 0 ? 'Full' : `${d.count} free`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {date && (
                <div className="nw-field">
                  <p className="nw-label">
                    Available times on{' '}
                    {new Date(`${date}T00:00:00`).toLocaleDateString('en-KE', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                  {loadingSlots ? (
                    <div className="nw-slots" aria-busy="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="nw-skeleton" style={{ height: 48 }} />
                      ))}
                    </div>
                  ) : slots.length ? (
                    <div className="nw-slots">
                      {slots.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="nw-slot"
                          aria-pressed={time === s}
                          onClick={() => setTime(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="nw-hint">
                      No times left on this day. Please choose another date.
                    </p>
                  )}
                </div>
              )}

              {errors.slot && (
                <p className="nw-error" role="alert">
                  {errors.slot}
                </p>
              )}
            </div>
          </>
        )}

        {/* ---------- Step 4: About you ---------- */}
        {step === 3 && (
          <>
            <div className="nw-panel__head">
              <p className="nw-eyebrow">Step 4 of 5</p>
              <h2 style={{ fontSize: 'var(--nw-fs-h3)' }}>About you</h2>
              <p style={{ color: 'var(--nw-text-soft)' }}>
                Just enough to confirm your session and send you a reminder.
              </p>
            </div>

            <div className="nw-field">
              <label className="nw-label" htmlFor="b-name">
                Your name
              </label>
              <input
                id="b-name"
                className="nw-input"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'b-name-err' : undefined}
              />
              {errors.name && (
                <p id="b-name-err" className="nw-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="nw-form__row">
              <div className="nw-field">
                <label className="nw-label" htmlFor="b-email">
                  Email
                </label>
                <input
                  id="b-email"
                  className="nw-input"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'b-email-err' : undefined}
                />
                {errors.email && (
                  <p id="b-email-err" className="nw-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="nw-field">
                <label className="nw-label" htmlFor="b-phone">
                  Phone
                </label>
                <input
                  id="b-phone"
                  className="nw-input"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="e.g. 0712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'b-phone-err' : undefined}
                />
                {errors.phone && (
                  <p id="b-phone-err" className="nw-error" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="nw-field">
              <label className="nw-label" htmlFor="b-note">
                Anything you would like your therapist to know?{' '}
                <span className="nw-label__optional">
                  (optional — you really can leave this blank)
                </span>
              </label>
              <textarea
                id="b-note"
                className="nw-textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <p className="nw-hint">
                Entirely up to you. Many people prefer to say this in the session itself,
                and that is completely fine.
              </p>
            </div>
          </>
        )}

        {/* ---------- Step 5: Confirm ---------- */}
        {step === 4 && (
          <>
            <div className="nw-panel__head">
              <p className="nw-eyebrow">Step 5 of 5</p>
              <h2 style={{ fontSize: 'var(--nw-fs-h3)' }}>Check and confirm</h2>
              <p style={{ color: 'var(--nw-text-soft)' }}>
                Nothing has been booked yet. Have a look over the details below.
              </p>
            </div>

            <div className="nw-review">
              <div className="nw-review__row">
                <span className="nw-review__key">Therapist</span>
                <span className="nw-review__val">
                  {therapist ? therapist.name : 'No preference — we will match you'}
                </span>
              </div>
              <div className="nw-review__row">
                <span className="nw-review__key">Format</span>
                <span className="nw-review__val">
                  {format === 'online' ? 'Online' : 'In person, Kilimani'}
                </span>
              </div>
              <div className="nw-review__row">
                <span className="nw-review__key">Language</span>
                <span className="nw-review__val">{language}</span>
              </div>
              <div className="nw-review__row">
                <span className="nw-review__key">Session type</span>
                <span className="nw-review__val">
                  {SESSION_TYPES.find((s) => s.value === sessionType)?.label}
                </span>
              </div>
              <div className="nw-review__row">
                <span className="nw-review__key">Date &amp; time</span>
                <span className="nw-review__val">
                  {date
                    ? new Date(`${date}T00:00:00`).toLocaleDateString('en-KE', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '—'}{' '}
                  at {time || '—'}
                </span>
              </div>
              <div className="nw-review__row">
                <span className="nw-review__key">Your details</span>
                <span className="nw-review__val">
                  {name}
                  <br />
                  {email}
                  <br />
                  {phone}
                </span>
              </div>
            </div>

            {status === 'challenge' && <CaptchaChallenge onToken={setV2Token} />}

            <div className="nw-notice">
              <AlertCircle size={16} aria-hidden="true" />
              <span>
                Naaman Wellness is not a crisis service. If you are in crisis or need
                immediate help, please call Befrienders Kenya on 0800 723 253 — free,
                24 hours.
              </span>
            </div>

            {notice && (
              <p className="nw-error" role="alert">
                {notice}
              </p>
            )}

            <p className="nw-form-note" style={{ textAlign: 'left' }}>
              By confirming, you agree to our{' '}
              <a href="/legal/terms" style={{ textDecoration: 'underline' }}>
                Terms of Use
              </a>{' '}
              including our cancellation policy, and our{' '}
              <a href="/legal/privacy-policy" style={{ textDecoration: 'underline' }}>
                Privacy Policy
              </a>
              .
            </p>
          </>
        )}

        {/* ---------- Controls ---------- */}
        <div className="nw-panel__foot">
          {step > 0 ? (
            <button type="button" className="nw-btn nw-btn--ghost" onClick={back}>
              <ChevronLeft size={16} aria-hidden="true" />
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 4 ? (
            <button type="button" className="nw-btn nw-btn--primary" onClick={next}>
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="nw-btn nw-btn--primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' && (
                <Loader2 size={16} className="nw-spin" aria-hidden="true" />
              )}
              Confirm Booking
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
