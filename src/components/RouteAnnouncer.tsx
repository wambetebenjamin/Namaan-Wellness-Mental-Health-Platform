'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * EFFECT-22 — Page transitions.
 * The crossfade itself is handled by the View Transitions API with a CSS
 * fallback (see effects.css). This component supplies the two accessibility
 * halves: a polite live-region announcement of the new route, and moving
 * keyboard focus to the new page heading.
 */
export default function RouteAnnouncer() {
  const pathname = usePathname();
  const [message, setMessage] = useState('');
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    // Announce the route change once the new document has settled.
    const id = window.setTimeout(() => {
      const heading =
        document.querySelector<HTMLElement>('main h1') ??
        document.querySelector<HTMLElement>('h1');
      const docTitle = document.title.replace(/\s*\|\s*Naaman Wellness\s*$/, '');
      setMessage(`${docTitle} — page loaded`);

      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        heading.addEventListener(
          'blur',
          () => heading.removeAttribute('tabindex'),
          { once: true }
        );
      }
    }, 120);

    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <p className="nw-visually-hidden" role="status" aria-live="polite" aria-atomic="true">
      {message}
    </p>
  );
}
