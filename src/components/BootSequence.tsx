import { useEffect, useState } from 'react';
import { profile } from '../data/content';

const BOOT_LINES = [
  `DHRUVOS v2.5.1026 -- booting`,
  `[  OK  ] Initializing kernel modules`,
  `[  OK  ] Mounting /home/${profile.handle}`,
  `[  OK  ] Starting network services`,
  `[  OK  ] Loading experience.log`,
  `[  OK  ] Loading skills.dll`,
  `[  OK  ] Establishing secure connection to ${profile.host}`,
  `Connected.`,
  ``,
  `Welcome to DHRUVOS.`,
  `Type 'help' to see available commands, or click a chip below the prompt.`,
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<string[]>([]);
  const [glitching, setGlitching] = useState(false);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduceMotion) {
      onDone();
      return;
    }

    let cancelled = false;
    async function run() {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (cancelled) return;
        setVisible((prev) => [...prev, BOOT_LINES[i]]);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 70 + Math.random() * 130));
      }
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 500));
      if (cancelled) return;
      setGlitching(true);
      await new Promise((r) => setTimeout(r, 260));
      if (!cancelled) onDone();
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`boot-sequence ${glitching ? 'glitch' : ''}`}>
      {visible.map((line, i) => (
        <div key={i} className={`boot-line ${line.startsWith('[  OK  ]') ? 'boot-line--ok' : ''}`}>
          {line || ' '}
        </div>
      ))}
    </div>
  );
}
