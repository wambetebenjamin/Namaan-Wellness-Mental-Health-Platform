import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, HeartHandshake, ShieldCheck } from 'lucide-react';

import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import TherapistGridClient from '@/components/TherapistGrid';
import ServicesGrid from '@/components/ServicesGrid';
import Testimonials from '@/components/Testimonials';
import NewsletterSection from '@/components/NewsletterSection';
import Reveal from '@/components/Reveal';
import { therapists } from '@/data/therapists';
import { site } from '@/data/site';

export default function HomePage() {
  return (
    <>
      {/* 3. Hero — EFFECT-06 / 18 / 23 */}
      <Hero />

      {/* 4. How it works */}
      <HowItWorks />

      {/* 5. Our therapists — EFFECT-24 / 26 */}
      <section
        className="nw-section nw-shell"
        aria-labelledby="nw-therapists-title"
        style={{ background: 'var(--nw-sage-50)' }}
      >
        <div className="nw-section-head nw-section-head--center">
          <p className="nw-eyebrow">Our therapists</p>
          <h2 id="nw-therapists-title">Meet the people you would be talking to</h2>
          <p className="nw-lead" style={{ textAlign: 'center' }}>
            Every therapist here is registered, supervised and experienced. Have a read
            and see who feels like the right fit — or let us match you.
          </p>
        </div>

        <TherapistGridClient therapists={therapists} />

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/therapists" className="nw-btn nw-btn--ghost">
            See all therapists
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 7. Services */}
      <ServicesGrid />

      {/* About strip */}
      <section className="nw-section nw-shell" aria-labelledby="nw-about-strip">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 1rem + 4vw, 4rem)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              aspectRatio: '4 / 3',
              borderRadius: 'var(--nw-radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--nw-shadow)',
            }}
          >
            <Image
              src="/images/about.jpg"
              alt="A therapy session taking place in a warm, softly lit room in Nairobi"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <p className="nw-eyebrow">About Naaman Wellness</p>
            <h2 id="nw-about-strip" style={{ fontSize: 'var(--nw-fs-h2)' }}>
              A quiet place to set things down
            </h2>
            <p style={{ color: 'var(--nw-text-soft)' }}>
              We started Naaman Wellness because too many people in Nairobi were managing
              things alone that were never meant to be managed alone. There is no waiting
              room full of people here, no clipboard, and no sense that you are being
              assessed.
            </p>
            <p style={{ color: 'var(--nw-text-soft)' }}>
              You can come once, or for a long while. You can talk about one specific
              thing, or about nothing in particular. Whatever brings you, you will be met
              with patience rather than urgency.
            </p>

            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <HeartHandshake
                  size={20}
                  aria-hidden="true"
                  style={{ color: 'var(--nw-sage-600)', marginTop: 3, flexShrink: 0 }}
                />
                <span style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}>
                  Sessions in English or Kiswahili, in person or online
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <ShieldCheck
                  size={20}
                  aria-hidden="true"
                  style={{ color: 'var(--nw-sage-600)', marginTop: 3, flexShrink: 0 }}
                />
                <span style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}>
                  Fully confidential, and handled under the Kenya Data Protection Act 2019
                </span>
              </div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <Link href="/about" className="nw-btn nw-btn--ghost">
                More about us
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <Testimonials />

      {/* 10. Check-in promotion */}
      <section className="nw-section nw-shell" aria-labelledby="nw-checkin-promo">
        <Reveal>
          <div className="nw-ctaband nw-gradient-surface--cta">
            <p className="nw-eyebrow" style={{ color: '#cfe0cf' }}>
              Wellness check-in
            </p>
            <h2 id="nw-checkin-promo" style={{ fontSize: 'var(--nw-fs-h2)' }}>
              Not sure where to start?
            </h2>
            <p>
              Our gentle check-in takes about two minutes. Eight questions about sleep,
              mood, stress and connection — nothing is stored, and there is no score to
              worry about. It simply helps you notice how things have been.
            </p>
            <div className="nw-ctaband__actions">
              <Link href="/check-in" className="nw-btn nw-btn--onDark">
                Take the check-in
              </Link>
              <Link href="/book" className="nw-btn nw-btn--outlineLight">
                Book a Session
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 8. Corporate teaser */}
      <section className="nw-section nw-shell" aria-labelledby="nw-corp-promo">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 1rem + 4vw, 4rem)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <p className="nw-eyebrow">For corporates</p>
            <h2 id="nw-corp-promo" style={{ fontSize: 'var(--nw-fs-h2)' }}>
              Invest in your team&apos;s wellbeing
            </h2>
            <p style={{ color: 'var(--nw-text-soft)' }}>
              Structured employee mental health programmes, delivered by our clinical team
              and tailored to how your organisation actually works. Confidentiality for
              every employee is guaranteed — we never tell an employer who attended.
            </p>
            <div>
              <Link href="/corporate" className="nw-btn nw-btn--secondary">
                Explore the programme
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              aspectRatio: '4 / 3',
              borderRadius: 'var(--nw-radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--nw-shadow)',
            }}
          >
            <Image
              src="/images/corporate.jpg"
              alt="A workplace wellbeing session with a team of East African professionals in Nairobi"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 12. Newsletter */}
      <NewsletterSection />

      {/* Booking CTA band — EFFECT-18 */}
      <section className="nw-section nw-shell" aria-labelledby="nw-final-cta">
        <Reveal>
          <div className="nw-ctaband nw-gradient-surface--cta">
            <h2 id="nw-final-cta" style={{ fontSize: 'var(--nw-fs-h2)' }}>
              Whenever you are ready
            </h2>
            <p>
              There is no pressure and no right time. Book when it feels right for you —
              we will be here.
            </p>
            <div className="nw-ctaband__actions">
              <Link href="/book" className="nw-btn nw-btn--onDark">
                Book a Session
              </Link>
              <a
                href={site.whatsappHref}
                className="nw-btn nw-btn--outlineLight"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask a question first
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
