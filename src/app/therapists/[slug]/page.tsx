import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Globe, MapPin, Video, Award } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { getTherapist, therapists } from '@/data/therapists';
import { site } from '@/data/site';

/** Therapist profiles are ISR, revalidating hourly. */
export const revalidate = 3600;

export function generateStaticParams() {
  return therapists.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const therapist = getTherapist(slug);
  if (!therapist) return { title: 'Therapist not found' };

  return {
    title: `${therapist.name} — ${therapist.role}`,
    description: `${therapist.name} is a ${therapist.role} at Naaman Wellness in Nairobi, working with ${therapist.specialisations.join(', ').toLowerCase()}. ${therapist.bio}`,
    openGraph: {
      title: `${therapist.name} | Naaman Wellness`,
      description: therapist.bio,
      images: [{ url: therapist.image, width: 800, height: 1000, alt: therapist.name }],
    },
  };
}

export default async function TherapistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const therapist = getTherapist(slug);
  if (!therapist) notFound();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/therapists/${therapist.slug}#person`,
    name: therapist.name,
    jobTitle: therapist.role,
    description: therapist.fullBio,
    image: `${site.url}${therapist.image}`,
    url: `${site.url}/therapists/${therapist.slug}`,
    worksFor: { '@id': `${site.url}/#organisation` },
    knowsLanguage: therapist.languages,
    knowsAbout: [...therapist.specialisations, ...therapist.approaches],
    alumniOf: therapist.credentials[0] ?? undefined,
  };

  return (
    <>
      <JsonLd data={personSchema} />

      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/therapists">Our Therapists</Link>
            <span aria-hidden="true">/</span>
            <span>{therapist.name}</span>
          </nav>
          <h1>{therapist.name}</h1>
          <p className="nw-lead">{therapist.role}</p>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <div className="nw-tdetail">
          <div className="nw-tdetail__media">
            <Image
              src={therapist.image}
              alt={`${therapist.name}, ${therapist.role} at Naaman Wellness`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 380px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="nw-tdetail__body">
            <div>
              <h2 style={{ fontSize: 'var(--nw-fs-h3)', marginBottom: '0.75rem' }}>
                About {therapist.name.split(' ')[0]}
              </h2>
              <div className="nw-prose">
                <p>{therapist.fullBio}</p>
              </div>
            </div>

            <div className="nw-deflist">
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Specialisms</span>
                <span className="nw-deflist__val">
                  {therapist.specialisations.join(', ')}
                </span>
              </div>
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Approach</span>
                <span className="nw-deflist__val">{therapist.approaches.join(', ')}</span>
              </div>
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Languages</span>
                <span className="nw-deflist__val">
                  <Globe
                    size={13}
                    aria-hidden="true"
                    style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: 5 }}
                  />
                  {therapist.languages.join(', ')}
                </span>
              </div>
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Formats</span>
                <span className="nw-deflist__val">
                  {therapist.formats.includes('in-person') && (
                    <>
                      <MapPin
                        size={13}
                        aria-hidden="true"
                        style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: 5 }}
                      />
                      In person, Kilimani
                    </>
                  )}
                  {therapist.formats.length === 2 ? ' · ' : ''}
                  {therapist.formats.includes('online') && (
                    <>
                      <Video
                        size={13}
                        aria-hidden="true"
                        style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: 5 }}
                      />
                      Online
                    </>
                  )}
                </span>
              </div>
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Session types</span>
                <span className="nw-deflist__val">
                  {therapist.sessionTypes
                    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(', ')}
                </span>
              </div>
              <div className="nw-deflist__row">
                <span className="nw-deflist__key">Experience</span>
                <span className="nw-deflist__val">{therapist.experience}</span>
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: 'var(--nw-fs-h4)',
                  marginBottom: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Award size={18} aria-hidden="true" style={{ color: 'var(--nw-sage-600)' }} />
                Credentials
              </h3>
              <ul style={{ display: 'grid', gap: '0.5rem' }}>
                {therapist.credentials.map((c) => (
                  <li
                    key={c}
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.65,
                      color: 'var(--nw-text-soft)',
                      paddingLeft: '1.25rem',
                      position: 'relative',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.55em',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--nw-sage-300)',
                      }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}
            >
              <Link
                href={`/book?therapist=${therapist.slug}`}
                className="nw-btn nw-btn--primary"
              >
                Book with {therapist.name.split(' ')[0]}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/therapists" className="nw-btn nw-btn--ghost">
                See all therapists
              </Link>
            </div>

            <div className="nw-notice">
              <MapPin size={16} aria-hidden="true" />
              <span>
                Availability is shown during booking. If {therapist.name.split(' ')[0]} does
                not have a time that suits you, choose &ldquo;no preference&rdquo; and we
                will offer you the nearest suitable alternative.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
