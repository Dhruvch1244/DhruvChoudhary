type MarkProps = { className?: string };

/** Underline accent: a thin line with small connected nodes, echoing the constellation motif. */
export function NodeLine({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 200 14" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M2 7 H198" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <circle cx="2" cy="7" r="3" fill="currentColor" />
      <circle cx="76" cy="7" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="150" cy="7" r="2.4" fill="currentColor" opacity="0.85" />
      <circle cx="198" cy="7" r="3" fill="currentColor" />
    </svg>
  );
}

/** Small directional arrow used on links/hovers. */
export function Arrow({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Coordinate/plus mark -- a small "+" like a graph axis origin, used as a footer/detail accent. */
export function PlusMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Orbit ring -- a dashed ellipse with a node on it, used as a small decorative accent. */
export function OrbitRing({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <ellipse cx="20" cy="20" rx="18" ry="9" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" fill="none" opacity="0.6" />
      <circle cx="38" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}
