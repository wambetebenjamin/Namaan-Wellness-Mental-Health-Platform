import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Clock, Users } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { ServiceCard } from '@/components/ServicesGrid';
import { getService, services } from '@/data/services';
import { getTherapist } from '@/data/therapists';
import { site } from '@/data/site';

/** Service pages are ISR, revalidating hourly. */
export const revalidate = 3600;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Service not found' };

  return {
    title: service.name,
    description: service.short,
    openGraph: {
      title: `${service.name} | Naaman Wellness`,
      description: service.short,
      images: service.image
        ? [{ url: service.image, width: 1200, height: 750, alt: service.name }]
        : [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: site.name }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const team = service.therapistSlugs
    .map((s) => getTherapist(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.short,
    serviceType: service.name,
    provider: { '@id': `${site.url}/#organisation` },
    areaServed: { '@type': 'Country', name: 'Kenya' },
    url: `${site.url}/services/${service.slug}`,
    termsOfService: `${site.url}/legal/terms`,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />

      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>{service.name}</span>
          </nav>
          <h1>{service.name}</h1>
          <p className="nw-lead">{service.short}</p>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <div className="nw-tdetail">
          <div>
            {service.image ? (
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 3',
                  borderRadius: 'var(--nw-radius-lg)',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                }}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 400px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div
                className="nw-scard__fallback"
                style={{
                  aspectRatio: '4 / 3',
                  borderRadius: 'var(--nw-radius-lg)',
                  marginBottom: '1.5rem',
                }}
                aria-hidden="true"
              >
                <Icon size={56} strokeWidth={1.5} />
              </div>
            )}

            <div className="nw-deflist">
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Session length</span>
                <span className="nw-deflist__val">
                  <Clock
                    size={13}
                    aria-hidden="true"
                    style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: 5 }}
                  />
                  {service.duration}
                </span>
              </div>
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Who it is for</span>
                <span className="nw-deflist__val">{service.forWho}</span>
              </div>
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Format</span>
                <span className="nw-deflist__val">In person, Kilimani · Online in Kenya</span>
              </div>
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Languages</span>
                <span className="nw-deflist__val">English · Kiswahili</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Link
                href={`/book?service=${service.slug}`}
                className="nw-btn nw-btn--primary"
                style={{ width: '100%' }}
              >
                Book This Service
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="nw-prose">
            {service.detail.map((para) => (
              <p key={para.slice(0, 30)}>{para}</p>
            ))}

            <h2>What to expect</h2>
            <ul>
              {service.whatToExpect.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '20px 1fr',
                    gap: '0.65rem',
                    alignItems: 'start',
                  }}
                >
                  <Check
                    size={17}
                    aria-hidden="true"
                    style={{ color: 'var(--nw-sage-600)', marginTop: 4 }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2>Who offers this</h2>
            <p>
              {service.name} is offered by{' '}
              {team.map((t, i) => (
                <span key={t.slug}>
                  {i > 0 && i === team.length - 1 ? ' and ' : i > 0 ? ', ' : ''}
                  <Link href={`/therapists/${t.slug}`} style={{ textDecoration: 'underline' }}>
                    {t.name}
                  </Link>
                </span>
              ))}
              . You are welcome to ask for a specific therapist when you book.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginTop: '1.5rem',
              }}
            >
              <Users size={18} aria-hidden="true" style={{ color: 'var(--nw-sage-600)' }} />
              <span style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)' }}>
                {team.length} {team.length === 1 ? 'therapist' : 'therapists'} offer this
                service
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="nw-section"
        style={{ background: 'var(--nw-sage-50)' }}
        aria-labelledby="nw-other-services"
      >
        <div className="nw-shell">
          <div className="nw-section-head">
            <p className="nw-eyebrow">Also available</p>
            <h2 id="nw-other-services">Other services</h2>
          </div>
          <div className="nw-sgrid">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
