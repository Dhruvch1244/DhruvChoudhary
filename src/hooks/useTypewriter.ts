import { useEffect, useRef, useState } from 'react';

/**
 * Reveals a list of lines progressively -- character by character within a
 * line, with a short pause between lines -- so terminal output reads as
 * "typed" rather than appearing instantly. Skips straight to the full
 * content when the user has prefers-reduced-motion set.
 */
export function useTypewriter(lines: string[], opts?: { charDelay?: number; lineDelay?: number; skip?: boolean }) {
  const charDelay = opts?.charDelay ?? 6;
  const lineDelay = opts?.lineDelay ?? 55;
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skip = opts?.skip || reduceMotion;

  const [visibleLines, setVisibleLines] = useState<string[]>(skip ? lines : []);
  const [done, setDone] = useState(skip);
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    if (skip) {
      setVisibleLines(linesRef.current);
      setDone(true);
      return;
    }

    let cancelled = false;
    setVisibleLines([]);
    setDone(false);

    async function run() {
      const out: string[] = [];
      for (const line of linesRef.current) {
        if (cancelled) return;
        out.push('');
        for (let i = 0; i < line.length; i++) {
          if (cancelled) return;
          out[out.length - 1] = line.slice(0, i + 1);
          setVisibleLines([...out]);
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, charDelay));
        }
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, lineDelay));
      }
      if (!cancelled) setDone(true);
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, skip]);

  return { visibleLines, done };
}
