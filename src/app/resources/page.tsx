import type { Metadata } from 'next';
import Link from 'next/link';
import ResourceGrid from '@/components/ResourceGrid';
import { getAllResources } from '@/lib/resources';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Self-Care Resources',
  description:
    'Free, gentle guides on anxiety, stress, grief, relationships, parenting, work, sleep and self-compassion — written by the Naaman Wellness therapists in Nairobi.',
  openGraph: {
    title: 'Self-Care Resources | Naaman Wellness',
    description:
      'Free guides on anxiety, stress, grief, sleep and self-compassion, written by therapists in Nairobi.',
  },
};

export default function ResourcesPage() {
  const resources = getAllResources();
  const meta = resources.map(({ content: _c, ...m }) => m);

  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Resources</span>
          </nav>
          <h1>Self-care resources</h1>
          <p className="nw-lead">
            Everything here is free and open to anyone — you do not need to be a client.
            Written by our therapists, in plain language, without clinical jargon.
          </p>
        </div>
      </section>

      <section className="nw-section nw-shell" aria-label="All resources">
        <ResourceGrid items={meta} />

        <div className="nw-notice" style={{ marginTop: '2.5rem' }}>
          <span aria-hidden="true">•</span>
          <span>
            These articles are general information, not personal medical advice, and
            reading them is not the same as seeing a therapist. If something here brings up
            difficult feelings, please consider{' '}
            <Link href="/book" style={{ textDecoration: 'underline' }}>
              booking a session
            </Link>{' '}
            or calling Befrienders Kenya on 0800 723 253.
          </span>
        </div>
      </section>
    </>
  );
}
