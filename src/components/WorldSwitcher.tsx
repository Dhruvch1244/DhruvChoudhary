import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { WORLDS, type World } from '../data/worlds';
import { useWorld } from '../lib/worldContext';

/** Mini banner preview of a world: its background, a headline bar in its ink,
 * and its two accents -- so the card reads as the world before you pick it. */
function Swatch({ w }: { w: World }) {
  const [bg, ink, a1, a2] = w.swatch;
  return (
    <svg viewBox="0 0 160 60" preserveAspectRatio="xMidYMid slice" className="world-card__swatch" aria-hidden="true">
      <rect width="160" height="60" rx="6" fill={bg} />
      <rect x="12" y="14" width="70" height="9" rx="2" fill={ink} />
      <rect x="12" y="28" width="46" height="9" rx="2" fill={a1} />
      <rect x="12" y="44" width="30" height="4" rx="2" fill={ink} opacity=".45" />
      <circle cx="132" cy="30" r="14" fill={a2} />
      <circle cx="132" cy="30" r="7" fill={bg} />
    </svg>
  );
}

export default function WorldSwitcher() {
  const { world, setWorld, cycleWorld } = useWorld();
  const [open, setOpen] = useState(false);

  // Shift+W hops to the next world from anywhere (ignored while typing).
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        cycleWorld(1);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-world-switcher', onOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-world-switcher', onOpen);
    };
  }, [cycleWorld]);

  // Lock page scroll behind the open sheet (matters most on phones).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // The dialog is portalled to <body>: the toggle lives inside the nav, and
  // the nav's backdrop-filter makes it the containing block for fixed
  // descendants in Safari -- which trapped the "fullscreen" dialog inside the
  // mobile top bar (cut off, untappable).
  const dialog = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="world-switcher__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="world-switcher"
            role="dialog"
            aria-modal="true"
            aria-label="Choose a world"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="world-switcher__head">
              <div>
                <p className="world-switcher__title">Pick a world</p>
                <p className="world-switcher__sub">Same person, different lens. Shift+W hops between them.</p>
              </div>
              <button type="button" className="world-switcher__close" onClick={() => setOpen(false)} aria-label="Close">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="world-switcher__grid">
              {WORLDS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className={`world-card ${w.id === world.id ? 'world-card--active' : ''}`}
                  onClick={() => {
                    setWorld(w.id);
                    setOpen(false);
                  }}
                  aria-pressed={w.id === world.id}
                >
                  <Swatch w={w} />
                  <span className="world-card__name">{w.name}</span>
                  <span className="world-card__motto">{w.motto}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        className="world-toggle"
        onClick={() => setOpen(true)}
        aria-label={`Change world (current: ${world.name})`}
        title={`World: ${world.name} — Shift+W to hop`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="10.5" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-22 12 12)" />
        </svg>
        <span className="world-toggle__label">
          <strong>{world.name}</strong>
        </span>
        <span className="world-toggle__key" aria-hidden="true">
          ⇧W
        </span>
      </button>
      {createPortal(dialog, document.body)}
    </>
  );
}
