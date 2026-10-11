import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, Users, Clock } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { site } from '@/data/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Naaman Wellness is a therapy and counselling practice in Kilimani, Nairobi. Quiet, confidential, and unhurried — in person or online anywhere in Kenya.',
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Confidentiality first',
    body: 'What you say in a session stays in the room. We keep the minimum record necessary, and it is held under the Kenya Data Protection Act 2019.',
  },
  {
    icon: Users,
    title: 'No hierarchy of suffering',
    body: 'There is no threshold you have to cross before your difficulty counts. People come to us with grief, with mild anxiety, and sometimes with nothing they can name yet.',
  },
  {
    icon: Clock,
    title: 'Unhurried',
    body: 'Our sessions are fifty minutes, and we do not book back to back. Nobody is watching the clock and nobody is being rushed toward an ending.',
  },
  {
    icon: Leaf,
    title: 'Culturally grounded',
    body: 'We work in English and Kiswahili, and our therapists understand the particular shape of family, work and faith life in Kenya.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>About</span>
          </nav>
          <h1>About Naaman Wellness</h1>
          <p className="nw-lead">
            We are a small therapy practice in Kilimani, Nairobi. We started because too
            many people were managing things alone that were never meant to be managed
            alone.
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
              alt="A therapist and client in conversation in a warm Nairobi counselling room"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="nw-prose">
            <h2 style={{ marginTop: 0 }}>Why we do this</h2>
            <p>
              For a long time in Kenya, seeking therapy carried a weight that had nothing
              to do with the therapy itself — a sense that needing help meant something
              had gone badly wrong with you. That idea keeps people away from support
              until things are severe.
            </p>
            <p>
              Naaman Wellness exists to quietly contradict it. You can come because you
              are grieving, because your sleep has gone, because your marriage is
              strained, because work has emptied you, or because you simply want an hour
              that belongs to you. None of those need to be emergencies.
            </p>
            <p>
              We keep the practice deliberately small. That means we cannot always see you
              this week — but it also means that when you arrive, your therapist has
              properly read your notes and is not recovering from the previous session.
            </p>
          </div>
        </div>
      </section>

      <section
        className="nw-section"
        style={{ background: 'var(--nw-sage-50)' }}
        aria-labelledby="nw-values"
      >
        <div className="nw-shell">
          <div className="nw-section-head nw-section-head--center">
            <p className="nw-eyebrow">How we work</p>
            <h2 id="nw-values">What you can expect from us</h2>
          </div>

          <div className="nw-sgrid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 110}>
                <div className="nw-step" style={{ height: '100%' }}>
                  <span className="nw-step__icon">
                    <v.icon size={24} aria-hidden="true" />
                  </span>
                  <h3 style={{ fontSize: 'var(--nw-fs-h4)' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)' }}>
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <div className="nw-prose" style={{ maxWidth: '68ch' }}>
          <h2>Our practice</h2>
          <p>
            We are at {site.address.street}, {site.address.area} — a quiet building set
            back from Ngong Road, with parking on site. The room is warm and ordinary on
            purpose: two comfortable chairs, plants, and nothing that looks like a
            hospital.
          </p>
          <p>
            Online sessions are available anywhere in Kenya. All you need is a private
            space and a decent connection; we will send you a link before your session.
          </p>

          <h2>A note on what we are not</h2>
          <p>
            Naaman Wellness is not a crisis service and we do not provide emergency
            psychiatric care. If you need help right now, please call Befrienders Kenya on{' '}
            {site.crisis.number} — it is free and open 24 hours. We will always say this
            plainly, because it matters that you get to the right place quickly.
          </p>
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/therapists" className="nw-btn nw-btn--primary">
            Meet our therapists
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link href="/book" className="nw-btn nw-btn--ghost">
            Book a Session
          </Link>
        </div>
      </section>
    </>
  );
}
