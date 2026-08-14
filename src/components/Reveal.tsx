import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function Reveal({
  children,
  delay = 0,
  y = 32,
  zoom = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  zoom?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: zoom ? 0.94 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
