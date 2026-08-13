type MarkProps = { className?: string };

/** Wavy underline accent, sits under a headline word/phrase via negative margin-top in CSS. */
export function Squiggle({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 200 14" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M2 8.5 C 20 2, 34 13, 52 7 S 84 1, 100 8 S 132 14, 150 6 S 182 1, 198 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small curved "look here" arrow, currentColor so it can sit inline with accent-colored text. */
export function Arrow({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 34" className={className} aria-hidden="true">
      <path
        d="M3 5 C 16 3, 30 9, 25 22 C 23 27, 18 29, 14 27"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M9 22 C 11 25, 13 27, 14 27 C 14 24, 15 21, 17 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Sketchy asterisk mark, three uneven crossing strokes rather than a geometric star. */
export function Asterisk({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2.5 L11.5 21.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M3.5 7.5 L20 16.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20.5 8 L3.8 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
