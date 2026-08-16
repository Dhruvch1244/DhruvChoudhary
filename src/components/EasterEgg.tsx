import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const COLORS = ['#ff2e7e', '#9a6bff', '#28e0ec'];
const CARD_SUITS = ['♠', '♥', '♦', '♣'];

type EggType = 'konami' | 'rust' | 'kaabo';

const TOASTS: Record<EggType, string> = {
  konami: 'You found it. Kaabo says hi. 🎴',
  rust: 'Written in Rust btw. 🦀',
  kaabo: "That's my game -- go play it: dhruvchoudhary.com/kaabo",
};

type Piece = { id: number; left: number; duration: number; delay: number; rotate: number; content: string; color?: string };

function makePieces(type: EggType): Piece[] {
  const count = type === 'rust' ? 24 : type === 'kaabo' ? 16 : 42;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 2.2 + Math.random() * 1.4,
    delay: Math.random() * 0.4,
    rotate: Math.random() * 360,
    content: type === 'rust' ? '🦀' : type === 'kaabo' ? CARD_SUITS[i % CARD_SUITS.length] : '',
    color: type === 'konami' ? COLORS[i % COLORS.length] : undefined,
  }));
}

export default function EasterEgg() {
  const [eggType, setEggType] = useState<EggType | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    let konamiBuffer: string[] = [];
    let textBuffer = '';

    function trigger(type: EggType) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setPieces(reduced ? [] : makePieces(type));
      setEggType(type);
      setTimeout(() => setEggType(null), 3200);
    }

    function onKeyDown(e: KeyboardEvent) {
      konamiBuffer = [...konamiBuffer, e.key].slice(-KONAMI.length);
      if (konamiBuffer.length === KONAMI.length && konamiBuffer.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        konamiBuffer = [];
        trigger('konami');
        return;
      }

      if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        textBuffer = (textBuffer + e.key.toLowerCase()).slice(-6);
        if (textBuffer.endsWith('rust')) {
          textBuffer = '';
          trigger('rust');
        } else if (textBuffer.endsWith('kaabo')) {
          textBuffer = '';
          trigger('kaabo');
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {eggType && (
        <div className="easter-egg" aria-hidden="true">
          {pieces.map((p) => (
            <span
              key={p.id}
              className={`easter-egg__piece ${eggType !== 'konami' ? 'easter-egg__piece--glyph' : ''}`}
              style={{
                left: `${p.left}%`,
                background: p.color,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                transform: `rotate(${p.rotate}deg)`,
              }}
            >
              {p.content}
            </span>
          ))}
          <motion.div
            className="easter-egg__toast"
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {TOASTS[eggType]}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
