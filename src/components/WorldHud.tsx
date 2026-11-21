import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { WorldId } from '../data/worlds';
import { useWorld } from '../lib/worldContext';

/** The thing that rides the scroll-progress bar, one per world. */
function Runner({ id }: { id: WorldId }) {
  switch (id) {
    case 'terminal':
      return <span className="world-progress__cursor" />;
    case 'arcade':
      return (
        <svg viewBox="0 0 8 7" className="world-progress__svg" aria-hidden="true">
          <path d="M2 0h2v1h1V0h2v1h1v3H7v1H6v1H5v1H3V6H2V5H1V4H0V1h2z" fill="#ff4f6d" />
        </svg>
      );
    case 'iron':
      return (
        <svg viewBox="0 0 40 16" className="world-progress__svg world-progress__svg--wide" aria-hidden="true">
          <rect x="0" y="7" width="40" height="2" rx="1" fill="#4f5d75" />
          <rect x="4" y="1" width="5" height="14" rx="1.5" fill="#2d3142" />
          <rect x="31" y="1" width="5" height="14" rx="1.5" fill="#2d3142" />
          <rect x="10" y="3.5" width="3.5" height="9" rx="1" fill="#ef8354" />
          <rect x="26.5" y="3.5" width="3.5" height="9" rx="1" fill="#ef8354" />
        </svg>
      );
    case 'pitlane':
      return (
        <svg viewBox="0 0 40 16" className="world-progress__svg world-progress__svg--wide" aria-hidden="true">
          <path d="M2 10 L8 6 H22 L30 9 H38 V12 H2 Z" fill="#ff2a3c" />
          <rect x="30" y="4" width="8" height="2" fill="#ffd60a" />
          <circle cx="10" cy="12.5" r="3" fill="#111" stroke="#fff" strokeWidth="1" />
          <circle cx="30" cy="12.5" r="3" fill="#111" stroke="#fff" strokeWidth="1" />
        </svg>
      );
    case 'nightshift':
      return (
        <svg viewBox="0 0 30 16" className="world-progress__svg world-progress__svg--wide" aria-hidden="true">
          <g fill="#f29e4c">
            <ellipse cx="13" cy="10" rx="9" ry="4.5" />
            <circle cx="23" cy="7" r="4" />
            <path d="M20.5 4 L21.5 0.5 L23.5 3.5 Z M24 3.5 L26 0.5 L26.6 4.5 Z" />
            <path d="M4 10 C 0 10 0 5 3 6" stroke="#f29e4c" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="7" y="12" width="2" height="4" rx="1" />
            <rect x="17" y="12" width="2" height="4" rx="1" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}

function ScrollProgress({ id }: { id: WorldId }) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const left = useTransform(smooth, (v) => `${v * 100}%`);
  return (
    <div className="world-progress" aria-hidden="true">
      <motion.div className="world-progress__fill" style={{ scaleX: smooth }} />
      <motion.div className="world-progress__runner" style={{ left }}>
        <Runner id={id} />
      </motion.div>
    </div>
  );
}

/** Night Shift's black cat peeking up from the bottom edge. Its pupils follow
 * the cursor, and it blinks now and then. Click it for a meow. */
function PeekingCat() {
  const ref = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [meow, setMeow] = useState(false);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.4);
      const d = Math.max(1, Math.hypot(dx, dy));
      setLook({ x: (dx / d) * 3.2, y: (dy / d) * 3.2 });
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    if (!meow) return;
    const id = setTimeout(() => setMeow(false), 1400);
    return () => clearTimeout(id);
  }, [meow]);

  return (
    <button type="button" className="peeking-cat" onClick={() => setMeow(true)} aria-label="Pet the cat">
      <AnimatePresence>
        {meow && (
          <motion.span
            className="peeking-cat__bubble"
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
          >
            meow — LGTM
          </motion.span>
        )}
      </AnimatePresence>
      <svg ref={ref} viewBox="0 -26 180 122" aria-hidden="true">
        <g fill="#141127">
          <path d="M0 96 C 0 20 40 0 90 0 C 140 0 180 20 180 96 Z" />
          <path d="M30 22 L40 -24 L72 6 Z M150 22 L140 -24 L108 6 Z" />
        </g>
        <g className="peeking-cat__eyes">
          <ellipse cx="62" cy="40" rx="11" ry="13" fill="#ffd84f" />
          <ellipse cx="118" cy="40" rx="11" ry="13" fill="#ffd84f" />
          <rect x={59.5 + look.x} y={30 + look.y} width="5" height="20" rx="2.5" fill="#141127" />
          <rect x={115.5 + look.x} y={30 + look.y} width="5" height="20" rx="2.5" fill="#141127" />
        </g>
      </svg>
    </button>
  );
}

/** World-level chrome layered over the page: the themed scroll bar, the
 * "entered world" toast, and per-world characters. */
export default function WorldHud() {
  const { world } = useWorld();
  const [toast, setToast] = useState<string | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setToast(world.id);
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [world.id]);

  return (
    <>
      {world.id !== 'constellation' && <ScrollProgress id={world.id} />}
      {world.id === 'nightshift' && <PeekingCat />}
      <AnimatePresence>
        {toast === world.id && (
          <motion.div
            key={world.id}
            className="world-toast"
            role="status"
            initial={{ opacity: 0, y: 24, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 24, x: '-50%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="world-toast__label">Entered</span> {world.name}
            <span className="world-toast__motto">{world.motto}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
