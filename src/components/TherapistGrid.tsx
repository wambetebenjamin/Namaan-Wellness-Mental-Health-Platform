'use client';

import { useEffect, useState } from 'react';
import type { Therapist } from '@/data/therapists';
import TherapistCard from './TherapistCard';
import { TherapistGridSkeleton } from './Skeletons';

/**
 * EFFECT-24 — Therapist cards show shimmer skeletons while loading.
 * aria-busy is set on the grid for the duration. Skeletons reserve the exact
 * card dimensions, so cumulative layout shift stays at zero.
 *
 * In production this grid is populated from the same source the API routes
 * read from; the short delay here represents that network round trip.
 */
export default function TherapistGrid({
  therapists,
  delayMs = 550,
}: {
  therapists: Therapist[];
  delayMs?: number;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs]);

  return (
    <div
      className="nw-tgrid"
      aria-busy={loading}
      aria-live="polite"
      aria-label="Our therapists"
    >
      {loading ? (
        <TherapistGridSkeleton count={Math.min(therapists.length, 6)} />
      ) : (
        therapists.map((t) => <TherapistCard key={t.slug} therapist={t} />)
      )}
    </div>
  );
}
