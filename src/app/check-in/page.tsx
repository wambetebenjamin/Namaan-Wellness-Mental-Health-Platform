import type { Metadata } from 'next';
import Link from 'next/link';
import { Info } from 'lucide-react';
import CheckInTool from '@/components/CheckInTool';

export const metadata: Metadata = {
  title: 'Mental Wellness Check-In',
  description:
    'A gentle, private self-check-in. Eight questions about sleep, mood, stress and connection. Nothing is stored and no score is shown.',
  openGraph: {
    title: 'Mental Wellness Check-In | Naaman Wellness',
    description:
      'Eight gentle questions. Client-side only — nothing is stored, and no clinical score is shown.',
  },
};

export default function CheckInPage() {
  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Check-In</span>
          </nav>
          <h1>Mental wellness check-in</h1>
          <p className="nw-lead">
            A quiet moment to notice how things have actually been. Eight questions, about
            two minutes, and nothing is stored anywhere.
          </p>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <CheckInTool />

        <div style={{ maxWidth: '68ch', margin: '3rem auto 0' }} className="nw-prose">
          <h2>Why we built this</h2>
          <p>
            A lot of people spend months wondering whether what they are experiencing is
            &ldquo;bad enough&rdquo; to justify speaking to someone. Almost always, it is —
            and the wondering itself is usually a sign that something deserves attention.
          </p>
          <p>
            This check-in is not a test you pass or fail. There is no score at the end and
            no diagnosis. It is simply a set of questions that a therapist might ask in a
            first session, so that you can hear your own answers before anyone else does.
          </p>

          <h2>What we deliberately do not do</h2>
          <ul>
            <li>We do not save your answers — the whole thing runs in your browser.</li>
            <li>We do not show you a numerical score to interpret.</li>
            <li>We do not send your answers to a server, or email them to anyone.</li>
            <li>
              We do not use this as a diagnostic tool. It is a reflection aid, nothing more.
            </li>
          </ul>

          <div className="nw-notice" style={{ marginTop: '1.5rem' }}>
            <Info size={16} aria-hidden="true" />
            <span>
              This is not a clinical assessment. If you are in crisis, please call
              Befrienders Kenya on 0800 723 253 — free, 24 hours. That is always the
              fastest route to the right support.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/book" className="nw-btn nw-btn--primary">
              Book a Session
            </Link>
            <Link href="/therapists" className="nw-btn nw-btn--ghost">
              Browse our therapists
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
