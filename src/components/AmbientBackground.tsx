'use client';

import { useEffect, useState } from 'react';

/**
 * EFFECT-06 — Ambient background.
 * Slow drifting soft shapes at 0.1 opacity maximum.
 * aria-hidden throughout. Paused when the tab is hidden.
 * Completely frozen under prefers-reduced-motion (see effects.css).
 */
export default function AmbientBackground({ shapes = 3 }: { shapes?: number }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div
      className={`nw-ambient${paused ? ' nw-ambient--paused' : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: shapes }).map((_, i) => (
        <span key={i} className={`nw-ambient__shape nw-ambient__shape--${i + 1}`} />
      ))}
    </div>
  );
}
