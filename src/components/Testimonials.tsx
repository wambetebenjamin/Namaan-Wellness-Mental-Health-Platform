'use client';

import { useState } from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

/**
 * Soft crossfade carousel. No auto-rotate — the user reads at their own pace.
 * First name and service only; no photographs, for client privacy.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  return (
    <section
      className="nw-section nw-shell"
      aria-labelledby="nw-testimonials-title"
      aria-roledescription="carousel"
    >
      <div className="nw-section-head nw-section-head--center">
        <p className="nw-eyebrow">In their words</p>
        <h2 id="nw-testimonials-title">What people say</h2>
        <p className="nw-lead" style={{ textAlign: 'center' }}>
          Shared with permission. First names only, and no photographs — the privacy of
          the people who come to us comes first.
        </p>
      </div>

      <div className="nw-quotes">
        <Quote
          size={34}
          aria-hidden="true"
          style={{ color: 'var(--nw-sage-300)', margin: '0 auto 0.5rem' }}
        />

        <div className="nw-quotes__viewport" aria-live="polite">
          {testimonials.map((t, i) => (
            <figure
              key={t.id}
              className={`nw-quote${i === index ? ' is-active' : ''}`}
              aria-hidden={i !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
            >
              <blockquote className="nw-quote__text">“{t.quote}”</blockquote>
              <figcaption>
                <p className="nw-quote__name">{t.firstName}</p>
                <p className="nw-quote__service">{t.service}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="nw-quotes__dots">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className="nw-dot"
              aria-current={i === index}
              aria-label={`Show reflection ${i + 1} of ${testimonials.length}`}
              onClick={() => setIndex(i)}
            >
              <span className="nw-dot__pip" />
            </button>
          ))}
        </div>
      </div>

      <p className="nw-visually-hidden" aria-live="polite">
        {`Reflection ${index + 1} of ${testimonials.length}: ${active.firstName}, ${active.service}.`}
      </p>
    </section>
  );
}
