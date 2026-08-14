import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const COLORS = ['#ff2e7e', '#9a6bff', '#28e0ec'];

type Piece = { id: number; left: number; color: string; duration: number; delay: number; rotate: number };

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    let buffer: string[] = [];
    function onKeyDown(e: KeyboardEvent) {
      buffer = [...buffer, e.key].slice(-KONAMI.length);
      if (buffer.length === KONAMI.length && buffer.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        buffer = [];
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setPieces(
          reduced
            ? []
            : Array.from({ length: 42 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                color: COLORS[i % COLORS.length],
                duration: 2.2 + Math.random() * 1.4,
                delay: Math.random() * 0.4,
                rotate: Math.random() * 360,
              }))
        );
        setActive(true);
        setTimeout(() => setActive(false), 3200);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <div className="easter-egg" aria-hidden="true">
          {pieces.map((p) => (
            <span
              key={p.id}
              className="easter-egg__piece"
              style={{
                left: `${p.left}%`,
                background: p.color,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                transform: `rotate(${p.rotate}deg)`,
              }}
            />
          ))}
          <motion.div
            className="easter-egg__toast"
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            You found it. Kaabo says hi. 🎴
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
