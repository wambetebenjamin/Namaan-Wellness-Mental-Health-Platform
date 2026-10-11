/**
 * EFFECT-24 — Skeleton screens.
 * Every skeleton reserves the exact dimensions of the content it replaces
 * (matching aspect ratios, paddings and line heights) so layout shift is zero.
 * Containers carry aria-busy="true" while loading.
 * Shimmer is removed under prefers-reduced-motion (see effects.css).
 */

export function TherapistCardSkeleton() {
  return (
    <div className="nw-skel-therapist">
      <div className="nw-skeleton nw-skel-therapist__media" />
      <div className="nw-skel-therapist__body">
        <div className="nw-skeleton nw-skel-line nw-skel-line--title" />
        <div className="nw-skeleton nw-skel-line nw-skel-line--short" />
        <div className="nw-skeleton nw-skel-line nw-skel-line--sub" />
        <div className="nw-skeleton nw-skel-line nw-skel-line--sub" style={{ width: '58%' }} />
        <div className="nw-skeleton nw-skel-line nw-skel-line--btn" />
      </div>
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="nw-skel-article">
      <div className="nw-skeleton nw-skel-article__media" />
      <div className="nw-skel-article__body">
        <div className="nw-skeleton nw-skel-line nw-skel-line--short" />
        <div className="nw-skeleton nw-skel-line nw-skel-line--title" />
        <div className="nw-skeleton nw-skel-line nw-skel-line--sub" />
        <div className="nw-skeleton nw-skel-line nw-skel-line--sub" style={{ width: '44%' }} />
      </div>
    </div>
  );
}

export function TherapistGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TherapistCardSkeleton key={i} />
      ))}
    </>
  );
}

export function ArticleGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </>
  );
}
