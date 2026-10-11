'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * EFFECT-25 — Branded preloader
 *   - A leaf / flowing-water SVG draws itself in.
 *   - EFFECT-08 — the wordmark self-draws below it (stroke-dashoffset).
 *   - Total duration under 2 seconds.
 *   - Skip control appears at 3 seconds (defensive: only reachable if the
 *     main sequence is delayed by a slow asset).
 *   - role="status" announces completion politely.
 *   - Under prefers-reduced-motion the artwork is shown fully drawn and the
 *     progress indicator is plain percentage text (no bar animation).
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);
  const [pct, setPct] = useState(0);
  const [reduced, setReduced] = useState(false);

  const leafRef = useRef<SVGPathElement | null>(null);
  const waterRef = useRef<SVGPathElement | null>(null);
  const wordRefs = useRef<(SVGTextElement | null)[]>([]);

  // Measure path lengths at runtime (EFFECT-08 requirement).
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    // EFFECT-25: the leaf and water lines are SVG geometry, so their exact
    // path length is measured at runtime with getTotalLength().
    const measurePath = (el: SVGPathElement | null) => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.setProperty('--nw-dash', String(Math.ceil(len)));
    };
    measurePath(leafRef.current);
    measurePath(waterRef.current);

    // EFFECT-08: SVGTextElement has no getTotalLength(), so the wordmark's
    // advance width is measured with getComputedTextLength() and scaled to an
    // upper bound of the glyph outline perimeter. Animating the dash offset
    // from that value to zero draws every glyph and finishes fully drawn.
    wordRefs.current.forEach((el) => {
      if (!el) return;
      const advance = el.getComputedTextLength();
      const estimate = Math.ceil(advance * 4);
      el.style.setProperty('--nw-dash', String(estimate));
    });
  }, []);

  // Draws once per browser session, then persists.
  useEffect(() => {
    let shown = false;
    try {
      shown = window.sessionStorage.getItem('nw:intro') === 'done';
    } catch {
      /* sessionStorage unavailable — show the loader */
    }
    if (shown) {
      setDone(true);
      return;
    }

    const start = performance.now();
    const DURATION = 1900; // under 2 seconds

    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / DURATION);
      setPct(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };
    raf = requestAnimationFrame(tick);

    const skipTimer = window.setTimeout(() => setSkipVisible(true), 3000);

    function finish() {
      try {
        window.sessionStorage.setItem('nw:intro', 'done');
      } catch {
        /* ignore */
      }
      setLeaving(true);
      window.setTimeout(() => setDone(true), 560);
    }

    (window as unknown as { __nwFinishIntro?: () => void }).__nwFinishIntro = finish;

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(skipTimer);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`nw-preloader${leaving ? ' nw-preloader--out' : ''}`}
      aria-label="Naaman Wellness"
    >
      <div className="nw-preloader__inner">
        {/* Leaf + flowing water — EFFECT-25 */}
        <svg
          className="nw-preloader__mark"
          viewBox="0 0 200 120"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          {/* Flowing water line */}
          <path
            ref={waterRef}
            className="nw-draw nw-draw--delayed"
            d="M12 96 C 44 76, 62 108, 92 88 S 146 62, 188 82"
            stroke="#a8c4a6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Leaf outline */}
          <path
            ref={leafRef}
            className="nw-draw"
            d="M100 96 C 100 60, 74 30, 40 22 C 40 66, 64 96, 100 96 Z"
            stroke="#658a65"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leaf vein */}
          <path
            className="nw-draw nw-draw--delayed"
            d="M100 96 C 84 78, 66 54, 40 22"
            stroke="#658a65"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Self-drawing wordmark — EFFECT-08 */}
        <svg
          viewBox="0 0 340 40"
          className="nw-preloader__wordmark"
          role="img"
          aria-label="Naaman Wellness"
          style={{ width: 'min(320px, 78vw)', height: 'auto' }}
        >
          <text
            ref={(el) => {
              wordRefs.current[0] = el;
            }}
            className="nw-preloader__word"
            x="170"
            y="30"
            textAnchor="middle"
            fontFamily="'Exo', 'Montserrat', sans-serif"
            fontSize="26"
            fontWeight="600"
            stroke="#223a66"
            strokeWidth="0.8"
          >
            Naaman Wellness
          </text>
        </svg>

        {/* Progress — plain percentage text under reduced motion */}
        <p className="nw-preloader__progress" role="status" aria-live="polite">
          {reduced ? `${pct}%` : pct >= 100 ? 'Ready' : 'Loading'}
        </p>

        <button
          type="button"
          className={`nw-preloader__skip${skipVisible ? ' is-visible' : ''}`}
          onClick={() =>
            (window as unknown as { __nwFinishIntro?: () => void }).__nwFinishIntro?.()
          }
          tabIndex={skipVisible ? 0 : -1}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
