import { useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function FlipCard({
  front,
  back,
  flipLabel = 'What I actually did',
}: {
  front: ReactNode;
  back: ReactNode;
  flipLabel?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-card">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={flipped ? 'back' : 'front'}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flip-card__face"
        >
          {flipped ? back : front}
        </motion.div>
      </AnimatePresence>
      <button type="button" className="flip-card__toggle" onClick={() => setFlipped((f) => !f)}>
        {flipped ? '← Back' : `${flipLabel} →`}
      </button>
    </div>
  );
}
