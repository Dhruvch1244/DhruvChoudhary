import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { NodeLine } from './Marks';

export default function PageHeader({
  eyebrow,
  title,
  underline,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  underline?: boolean;
  children?: ReactNode;
}) {
  return (
    <motion.div
      className="page-header"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">
        {title}
        {underline && <NodeLine className="page-header__squiggle" />}
      </h1>
      {children && <div className="page-header__body">{children}</div>}
    </motion.div>
  );
}
