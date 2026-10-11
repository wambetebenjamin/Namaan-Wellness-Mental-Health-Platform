import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ShieldCheck, Users, CalendarRange, BarChart3 } from 'lucide-react';
import CorporateForm from '@/components/CorporateForm';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { site } from '@/data/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Corporate Wellness Programmes',
  description:
    'Employee mental health programmes for Kenyan organisations. Confidential therapy, burnout recovery workshops and manager support. Starter, Growth and Enterprise tiers.',
  openGraph: {
    title: 'For Corporates | Naaman Wellness',
    description:
      'Structured employee mental health programmes, delivered by our clinical team in Nairobi and online.',
  },
};

const TIERS = [
  {
    name: 'Starter',
    volume: '10 sessions',
    featured: false,
    body: 'For small teams beginning to take wellbeing seriously.',
    includes: [
      '10 confidential therapy sessions',
      'Valid for 6 months',
      'Any therapist, matched to need',
      'Online or in person',
      'Quarterly utilisation summary',
    ],
  },
  {
    name: 'Growth',
    volume: '30 sessions',
    featured: true,
    body: 'Our most chosen tier — enough capacity for a team to genuinely use it.',
    includes: [
      '30 confidential therapy sessions',
      'Valid for 12 months',
      'Two burnout recovery workshops',
      'Named account therapist',
      'Manager briefing session',
      'Quarterly utilisation summary',
      'Priority booking within 5 working days',
    ],
  },
  {
    name: 'Enterprise',
    volume: 'Unlimited',
    featured: false,
    body: 'For larger organisations with teams across Kenya and beyond.',
    includes: [
      'Unlimited confidential sessions',
      'Quarterly programme review',
      'Full workshop programme',
      'Two named account therapists',
      'Manager and HR advisory',
      'Crisis response pathway',
      'Bespoke reporting',
    ],
  },
];

const INCLUDED = [
  {
    icon: Users,
    title: 'Confidential 1:1 sessions',
    body: 'Employees book directly with us. Sessions take place outside work hours or during them, in person or online.',
  },
  {
    icon: CalendarRange,
    title: 'Structured team workshops',
    body: 'Ninety-minute sessions on burnout, stress, grief at work and psychological safety, facilitated by a clinician.',
  },
  {
    icon: ShieldCheck,
    title: 'Confidentiality guaranteed',
    body: 'We never tell an employer who attended or what was discussed. Utilisation reporting is aggregate only.',
  },
  {
    icon: BarChart3,
    title: 'Honest reporting',
    body: 'Quarterly figures on uptake and themes, always aggregated and never attributable to an individual.',
  },
];

export default function CorporatePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Corporate Wellness Programme',
    description:
      'Employee mental health programmes for Kenyan organisations, including confidential therapy, workshops and manager support.',
    provider: { '@id': `${site.url}/#organisation` },
    areaServed: { '@type': 'Country', name: 'Kenya' },
    url: `${site.url}/corporate`,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />

      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>For Corporates</span>
          </nav>
          <h1>Invest in your team&apos;s wellbeing</h1>
          <p className="nw-lead">
            Structured employee mental health programmes, delivered by our clinical team
            and shaped around how your organisation actually works.
          </p>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 1rem + 4vw, 4rem)',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <p className="nw-eyebrow">The programme</p>
            <h2 style={{ fontSize: 'var(--nw-fs-h2)' }}>
              What a wellness programme actually looks like
            </h2>
            <p style={{ color: 'var(--nw-text-soft)' }}>
              Most employee wellbeing initiatives fail quietly, because people do not use
              them. Usually that is because nobody believes they are genuinely
              confidential.
            </p>
            <p style={{ color: 'var(--nw-text-soft)' }}>
              We build ours around that problem. Employees book directly with us, sessions
              happen outside your systems, and the only thing your organisation ever
              receives is an aggregate number. That is the entire design principle, and it
              is why uptake tends to be considerably higher than the sector average.
            </p>
            <div className="nw-notice">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>
                Confidentiality for every employee is guaranteed. We never share who
                attended, or anything discussed, with an employer — including HR.
              </span>
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
              alt="A workplace wellbeing session with East African professionals in Nairobi"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section
        className="nw-section"
        style={{ background: 'var(--nw-sage-50)' }}
        aria-labelledby="nw-included"
      >
        <div className="nw-shell">
          <div className="nw-section-head nw-section-head--center">
            <p className="nw-eyebrow">What is included</p>
            <h2 id="nw-included">Every programme covers these four things</h2>
          </div>

          <div className="nw-sgrid">
            {INCLUDED.map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <div className="nw-step" style={{ height: '100%' }}>
                  <span className="nw-step__icon">
                    <item.icon size={24} aria-hidden="true" />
                  </span>
                  <h3 style={{ fontSize: 'var(--nw-fs-h4)' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)' }}>
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 package tiers */}
      <section className="nw-section nw-shell" aria-labelledby="nw-tiers">
        <div className="nw-section-head nw-section-head--center">
          <p className="nw-eyebrow">Packages</p>
          <h2 id="nw-tiers">Three ways to begin</h2>
          <p className="nw-lead" style={{ textAlign: 'center' }}>
            There is no minimum commitment beyond the tier you choose, and everything can
            be adjusted as you learn what your team actually uses.
          </p>
        </div>

        <div className="nw-tiers">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`nw-tier${tier.featured ? ' nw-tier--featured' : ''}`}
            >
              <div>
                <p className="nw-tier__volume">{tier.volume}</p>
                <h3 className="nw-tier__name">{tier.name}</h3>
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)' }}>
                {tier.body}
              </p>
              <ul className="nw-tier__list">
                {tier.includes.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#enquire"
                className={`nw-btn ${tier.featured ? 'nw-btn--primary' : 'nw-btn--ghost'}`}
                style={{ marginTop: '0.5rem' }}
              >
                Enquire about {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry form */}
      <section
        id="enquire"
        className="nw-section nw-shell"
        aria-labelledby="nw-corp-enquiry"
      >
        <div className="nw-section-head">
          <p className="nw-eyebrow">Get in touch</p>
          <h2 id="nw-corp-enquiry" style={{ fontSize: 'var(--nw-fs-h2)' }}>
            Tell us about your team
          </h2>
          <p className="nw-lead">
            Send us a few details and we will arrange a short, no-obligation conversation
            about what your organisation needs.
          </p>
        </div>

        <div style={{ maxWidth: 760 }}>
          <CorporateForm />
        </div>
      </section>
    </>
  );
}
