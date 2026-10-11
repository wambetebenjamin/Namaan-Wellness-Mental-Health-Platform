import type { Metadata } from 'next';
import Link from 'next/link';
import ServicesGrid from '@/components/ServicesGrid';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Individual therapy, couples therapy, family counselling, group therapy, grief support, burnout recovery and youth therapy in Nairobi and online.',
  openGraph: {
    title: 'Our Services | Naaman Wellness',
    description:
      'Seven ways of working, in person in Kilimani or online anywhere in Kenya.',
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Services</span>
          </nav>
          <h1>Our services</h1>
          <p className="nw-lead">
            Whatever you are carrying, there is a way of working that suits it. Every
            service is available in person at our Kilimani practice, or online anywhere in
            Kenya.
          </p>
        </div>
      </section>

      <ServicesGrid
        heading="Ways we can work together"
        lead="Each service below can be booked directly, or you can talk it through with us first."
      />

      <section className="nw-section nw-shell" aria-labelledby="nw-services-cta">
        <div className="nw-news" style={{ textAlign: 'center' }}>
          <h2 id="nw-services-cta" style={{ fontSize: 'var(--nw-fs-h3)' }}>
            Not sure which one?
          </h2>
          <p className="nw-lead" style={{ textAlign: 'center' }}>
            You do not have to arrive knowing. Book an individual session and your
            therapist will help you work out what would be most useful — or send us a
            message and we will point you in the right direction.
          </p>
          <div
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link href="/book" className="nw-btn nw-btn--primary">
              Book a Session
            </Link>
            <Link href="/contact" className="nw-btn nw-btn--ghost">
              Ask us a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
