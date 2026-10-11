import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';
import { AlertCircle, ShieldCheck } from 'lucide-react';

/** Booking is SSR so availability is always live. */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Book a Session',
  description:
    'Book a confidential therapy session at Naaman Wellness — in person in Kilimani, Nairobi, or online anywhere in Kenya.',
  openGraph: {
    title: 'Book a Session | Naaman Wellness',
    description:
      'Choose a therapist, a format and a time. Sessions in English or Kiswahili.',
  },
  robots: { index: true, follow: true },
};

export default function BookPage() {
  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <h1>Book a session</h1>
          <p className="nw-lead">
            Five short steps. You can stop at any point — nothing is sent until you confirm
            on the last step.
          </p>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <div className="nw-notice" style={{ flex: '1 1 320px' }}>
            <ShieldCheck size={16} aria-hidden="true" />
            <span>
              Everything you enter is confidential and handled under the Kenya Data
              Protection Act 2019. The note field is genuinely optional.
            </span>
          </div>
          <div className="nw-notice" style={{ flex: '1 1 320px' }}>
            <AlertCircle size={16} aria-hidden="true" />
            <span>
              We are not a crisis service. In an emergency, please call Befrienders Kenya
              on 0800 723 253 — free, 24 hours.
            </span>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="nw-panel" aria-busy="true">
              <div className="nw-skeleton" style={{ height: 28, width: '40%' }} />
              <div className="nw-skeleton" style={{ height: 62 }} />
              <div className="nw-skeleton" style={{ height: 62 }} />
              <div className="nw-skeleton" style={{ height: 62 }} />
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </section>
    </>
  );
}
