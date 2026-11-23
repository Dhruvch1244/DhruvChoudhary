import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { projectHref, type Project } from './shared';

/** Link to a project wherever it lives (case study, Kaabo page, or repo). */
export default function ProjLink({ p, className, children }: { p: Project; className?: string; children: ReactNode }) {
  const href = projectHref(p);
  if (!href) return <span className={className}>{children}</span>;
  return href.internal ? (
    <Link to={href.to} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href.to} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}
