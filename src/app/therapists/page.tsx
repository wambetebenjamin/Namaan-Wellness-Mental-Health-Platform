import type { Metadata } from 'next';
import Link from 'next/link';
import TherapistGridClient from '@/components/TherapistGrid';
import { therapists } from '@/data/therapists';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Our Therapists',
  description:
    'Meet the registered therapists at Naaman Wellness in Nairobi. Specialising in anxiety, grief, trauma, relationships, burnout and youth mental health. Sessions in English and Kiswahili.',
  openGraph: {
    title: 'Our Therapists | Naaman Wellness',
    description:
      'Meet the registered therapists at Naaman Wellness in Nairobi — in person or online.',
  },
};

export default function TherapistsPage() {
  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Our Therapists</span>
          </nav>
          <h1>Our therapists</h1>
          <p className="nw-lead">
            Six registered therapists, each with their own way of working. Read through and
            see who feels like the right fit — or choose &ldquo;no preference&rdquo; when
            you book and we will match you.
          </p>
        </div>
      </section>

      <section className="nw-section nw-shell" aria-label="All therapists">
        <TherapistGridClient therapists={therapists} />
      </section>

      <section className="nw-section nw-shell" aria-labelledby="nw-not-sure">
        <div className="nw-news" style={{ textAlign: 'center' }}>
          <h2 id="nw-not-sure" style={{ fontSize: 'var(--nw-fs-h3)' }}>
            Not sure who to see?
          </h2>
          <p className="nw-lead" style={{ textAlign: 'center' }}>
            That is genuinely fine, and it is the most common question we get. Tell us a
            little about what you are looking for and we will suggest someone — or you can
            book with no preference and we will place you with the first suitable
            therapist.
          </p>
          <div
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link href="/book" className="nw-btn nw-btn--primary">
              Book a Session
            </Link>
            <Link href="/check-in" className="nw-btn nw-btn--ghost">
              Take the check-in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
