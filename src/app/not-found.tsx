import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { navLinks } from '@/data/site';

/** 404 page. Calm, no urgency, no blame. */
export default function NotFound() {
  return (
    <div className="nw-errorpage">
      <div className="nw-errorpage__inner">
        <Leaf size={44} aria-hidden="true" style={{ color: 'var(--nw-sage-500)' }} />
        <p className="nw-errorpage__code">404</p>
        <h1 style={{ fontSize: 'var(--nw-fs-h2)' }}>This page could not be found.</h1>
        <p className="nw-lead" style={{ textAlign: 'center' }}>
          Take a breath. You can find what you need below.
        </p>

        <div className="nw-errorpage__actions">
          <Link href="/" className="nw-btn nw-btn--primary">
            Return to Homepage
          </Link>
          <Link href="/book" className="nw-btn nw-btn--ghost">
            Book a Session
          </Link>
        </div>

        <nav aria-label="Popular pages" style={{ marginTop: '1.5rem' }}>
          <p className="nw-meta" style={{ marginBottom: '0.75rem' }}>
            Or try one of these
          </p>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {navLinks
              .filter((l) => l.href !== '/')
              .map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nw-tag nw-tag--ink"
                  style={{ minHeight: 44 }}
                >
                  {l.label}
                </Link>
              ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
