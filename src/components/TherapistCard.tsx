'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Globe, Video, MapPin } from 'lucide-react';
import type { Therapist } from '@/data/therapists';

/**
 * EFFECT-26 — Hover animations.
 * Hover (pointer: fine) reveals the therapist bio.
 * :focus-within shows the same reveal for keyboard users.
 * On touch devices the card is a tap toggle (state below).
 * 200–350ms, ease-in-out.
 */
export default function TherapistCard({ therapist }: { therapist: Therapist }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`nw-card nw-tcard${open ? ' is-open' : ''}`}
      onKeyDown={(e) => {
        // Tap toggle on touch / explicit toggle via keyboard
        if (e.key === 'Enter' && e.target === e.currentTarget) {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-label={`${therapist.name} — show more about this therapist`}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="nw-tcard__media">
        <Image
          src={therapist.image}
          alt={`${therapist.name}, ${therapist.role} at Naaman Wellness`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="nw-tcard__body">
        <div>
          <h3 className="nw-tcard__name">{therapist.name}</h3>
          <p className="nw-tcard__role">{therapist.role}</p>
        </div>

        <div className="nw-tags">
          {therapist.specialisations.map((s) => (
            <span key={s} className="nw-tag">
              {s}
            </span>
          ))}
        </div>

        <div className="nw-tags">
          {therapist.approaches.map((a) => (
            <span key={a} className="nw-tag nw-tag--ink">
              {a}
            </span>
          ))}
        </div>

        <div className="nw-tags" style={{ marginTop: '0.15rem' }}>
          <span className="nw-tag nw-tag--ink">
            <Globe size={11} aria-hidden="true" style={{ marginRight: 4 }} />
            {therapist.languages.join(', ')}
          </span>
          <span className="nw-tag nw-tag--ink">
            {therapist.formats.includes('online') && (
              <Video size={11} aria-hidden="true" style={{ marginRight: 4 }} />
            )}
            {therapist.formats.includes('in-person') && (
              <MapPin size={11} aria-hidden="true" style={{ marginRight: 4 }} />
            )}
            {therapist.formats
              .map((f) => (f === 'online' ? 'Online' : 'In-person'))
              .join(' & ')}
          </span>
        </div>

        {/* Revealed on hover / focus / tap */}
        <div className="nw-card__reveal">
          <div className="nw-card__reveal-inner">
            <p>{therapist.bio}</p>
          </div>
        </div>

        <Link
          href={`/therapists/${therapist.slug}`}
          className="nw-btn nw-btn--secondary nw-tcard__cta"
          onClick={(e) => e.stopPropagation()}
        >
          Book with This Therapist
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
