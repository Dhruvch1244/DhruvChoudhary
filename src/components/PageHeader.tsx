import type { ReactNode } from 'react';
import { Squiggle } from './Marks';

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
    <div className="page-header">
      {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">
        {title}
        {underline && <Squiggle className="page-header__squiggle" />}
      </h1>
      {children && <div className="page-header__body">{children}</div>}
    </div>
  );
}
