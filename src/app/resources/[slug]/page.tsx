import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { AlertCircle } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { getAllSlugs, getRelated, getResource } from '@/lib/resources';
import { site } from '@/data/site';

/** Resource articles are ISR, revalidating hourly. */
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getResource(slug);
  if (!article) return { title: 'Article not found' };

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      type: 'article',
      title: `${article.title} | Naaman Wellness`,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [article.author],
      images: article.image
        ? [{ url: article.image, width: 1200, height: 750, alt: article.title }]
        : [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : ['/images/og-default.jpg'],
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getResource(slug);
  if (!article) notFound();

  const related = getRelated(slug, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image ? `${site.url}${article.image}` : `${site.url}/images/og-default.jpg`,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@id': `${site.url}/#organisation` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/resources/${slug}` },
    inLanguage: 'en-KE',
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/resources">Resources</Link>
            <span aria-hidden="true">/</span>
            <span>{article.category}</span>
          </nav>
          <h1 style={{ maxWidth: '28ch' }}>{article.title}</h1>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <span className="nw-tag">{article.category}</span>
            <span className="nw-meta">
              By{' '}
              {article.authorSlug ? (
                <Link
                  href={`/therapists/${article.authorSlug}`}
                  style={{ textDecoration: 'underline' }}
                >
                  {article.author}
                </Link>
              ) : (
                article.author
              )}
            </span>
            <span className="nw-meta">{article.readTime}</span>
            {article.date && (
              <time className="nw-meta" dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-KE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            )}
          </div>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <div style={{ maxWidth: '70ch', marginInline: 'auto' }}>
          {article.image && (
            <div
              style={{
                position: 'relative',
                aspectRatio: '3 / 2',
                borderRadius: 'var(--nw-radius-lg)',
                overflow: 'hidden',
                marginBottom: '2.5rem',
              }}
            >
              <Image
                src={article.image}
                alt=""
                fill
                priority
                sizes="(max-width: 800px) 100vw, 700px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div className="nw-article">
            <MDXRemote source={article.content} />
          </div>

          <div className="nw-notice" style={{ marginTop: '2.5rem' }}>
            <AlertCircle size={16} aria-hidden="true" />
            <span>
              This article is general information and not personal medical advice. Reading
              it is not the same as seeing a therapist. In crisis, call Befrienders Kenya
              on 0800 723 253 — free, 24 hours.
            </span>
          </div>

          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/book" className="nw-btn nw-btn--primary">
              Book a Session
            </Link>
            <Link href="/resources" className="nw-btn nw-btn--ghost">
              All resources
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section
          className="nw-section"
          style={{ background: 'var(--nw-sage-50)' }}
          aria-labelledby="nw-related"
        >
          <div className="nw-shell">
            <div className="nw-section-head">
              <p className="nw-eyebrow">Keep reading</p>
              <h2 id="nw-related">Related resources</h2>
            </div>
            <div className="nw-sgrid">
              {related.map((r) => (
                <article key={r.slug} className="nw-card nw-scard">
                  <div className="nw-scard__media">
                    {r.image ? (
                      <Image
                        src={r.image}
                        alt=""
                        width={400}
                        height={250}
                        sizes="(max-width: 640px) 100vw, 33vw"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    ) : (
                      <div className="nw-scard__fallback" aria-hidden="true" />
                    )}
                  </div>
                  <div className="nw-scard__body">
                    <span className="nw-tag" style={{ justifySelf: 'start' }}>
                      {r.category}
                    </span>
                    <h3 className="nw-scard__title">
                      <Link href={`/resources/${r.slug}`}>{r.title}</Link>
                    </h3>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)' }}>
                      {r.excerpt}
                    </p>
                    <p className="nw-meta">{r.readTime}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
