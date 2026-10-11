'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Resource, ResourceMeta } from '@/lib/resources';
import { ArticleGridSkeleton } from './Skeletons';

/**
 * EFFECT-24 — Article cards show shimmer skeletons while loading, with exact
 * reserved dimensions (zero CLS) and aria-busy on the container.
 * Category filtering runs entirely on the client.
 */
export default function ResourceGrid({ items }: { items: ResourceMeta[] }) {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('All');

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 480);
    return () => window.clearTimeout(t);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ['All', ...Array.from(set)];
  }, [items]);

  const visible = useMemo(
    () => (category === 'All' ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  return (
    <>
      <div className="nw-filters" role="group" aria-label="Filter resources by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="nw-filter"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="nw-rgrid" aria-busy={loading} aria-live="polite">
        {loading ? (
          <ArticleGridSkeleton count={4} />
        ) : visible.length ? (
          visible.map((r) => (
            <article key={r.slug} className="nw-card nw-rcard">
              <div className="nw-rcard__media">
                {r.image ? (
                  <Image
                    src={r.image}
                    alt=""
                    width={400}
                    height={250}
                    sizes="(max-width: 560px) 100vw, 200px"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : (
                  <div className="nw-scard__fallback" aria-hidden="true" />
                )}
              </div>
              <div className="nw-rcard__body">
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <span className="nw-tag">{r.category}</span>
                  <span className="nw-meta">{r.readTime}</span>
                </div>
                <h2 className="nw-rcard__title">
                  <Link href={`/resources/${r.slug}`}>{r.title}</Link>
                </h2>
                <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)' }}>
                  {r.excerpt}
                </p>
                <p className="nw-meta">
                  By{' '}
                  {r.authorSlug ? (
                    <Link
                      href={`/therapists/${r.authorSlug}`}
                      style={{ textDecoration: 'underline' }}
                    >
                      {r.author}
                    </Link>
                  ) : (
                    r.author
                  )}
                </p>
              </div>
            </article>
          ))
        ) : (
          <p className="nw-lead">No resources in this category yet.</p>
        )}
      </div>
    </>
  );
}
