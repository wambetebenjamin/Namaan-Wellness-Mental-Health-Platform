import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services, type Service } from '@/data/services';
import Reveal from './Reveal';

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <article className="nw-card nw-scard">
      <div className="nw-scard__media">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          /* Calm gradient + icon placeholder until the commissioned
             photograph is added. Same dimensions, so no layout shift. */
          <div className="nw-scard__fallback" aria-hidden="true">
            <Icon size={44} strokeWidth={1.6} />
          </div>
        )}
      </div>

      <div className="nw-scard__body">
        <h3 className="nw-scard__title">
          <Link href={`/services/${service.slug}`}>{service.name}</Link>
        </h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)' }}>
          {service.short}
        </p>
        <p className="nw-scard__for">
          <strong style={{ fontWeight: 600, color: 'var(--nw-text)' }}>
            Who this is for:{' '}
          </strong>
          {service.forWho}
        </p>
        <Link
          href={`/services/${service.slug}`}
          className="nw-btn nw-btn--ghost nw-scard__cta"
        >
          Book This Service
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function ServicesGrid({
  items = services,
  heading = 'Our services',
  lead = 'Whatever you are carrying, there is a way of working that suits it. Every service is available in person in Kilimani or online anywhere in Kenya.',
}: {
  items?: Service[];
  heading?: string;
  lead?: string;
}) {
  return (
    <section className="nw-section nw-shell" aria-labelledby="nw-services-title">
      <div className="nw-section-head nw-section-head--center">
        <p className="nw-eyebrow">Services</p>
        <h2 id="nw-services-title">{heading}</h2>
        <p className="nw-lead" style={{ textAlign: 'center' }}>
          {lead}
        </p>
      </div>

      <div className="nw-sgrid">
        {items.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 120}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
