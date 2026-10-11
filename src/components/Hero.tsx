import Image from 'next/image';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import AmbientBackground from './AmbientBackground';

const HEADLINE = 'You Do Not Have to Figure This Out Alone.';
const WORDS = HEADLINE.split(' ');

/**
 * EFFECT-23 — Hero entrance.
 * Eyebrow fades in softly, headline words appear one by one, sub-copy follows,
 * CTA last. Under 2 seconds total. The CTA is focusable and clickable from the
 * very first frame — it is never disabled while animating.
 * EFFECT-18 — slow gradient on the surface.
 * EFFECT-06 — ambient drifting shapes behind.
 */
export default function Hero() {
  return (
    <section className="nw-hero nw-gradient-surface" aria-labelledby="nw-hero-title">
      <AmbientBackground />

      <div className="nw-hero__grid">
        <div className="nw-hero__copy">
          <p className="nw-eyebrow nw-hero-reveal nw-hero-eyebrow">
            Therapy &amp; Counselling · Nairobi &amp; Online
          </p>

          <h1 id="nw-hero-title" className="nw-hero__title">
            {WORDS.map((word, i) => (
              <span key={`${word}-${i}`}>
                <span
                  className="nw-hero-word"
                  style={{ '--nw-word-i': i } as React.CSSProperties}
                >
                  {word}
                </span>
                {i < WORDS.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>

          <p className="nw-lead nw-hero-reveal nw-hero-sub">
            Compassionate, confidential therapy in Nairobi and online. Book your first
            session today.
          </p>

          <div className="nw-hero__actions nw-hero-reveal nw-hero-cta">
            <Link href="/book" className="nw-btn nw-btn--primary">
              Book a Session
            </Link>
            <Link href="/therapists" className="nw-btn nw-btn--ghost">
              Browse Our Therapists
            </Link>
          </div>

          <p className="nw-hero__reassure nw-hero-reveal nw-hero-reassure">
            <Lock size={13} aria-hidden="true" />
            All sessions are fully confidential.
          </p>
        </div>

        <div className="nw-hero__media nw-hero-reveal" style={{ animationDelay: '520ms' }}>
          <Image
            src="/images/hero.jpg"
            alt="An East African woman resting quietly in a peaceful Nairobi garden"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
