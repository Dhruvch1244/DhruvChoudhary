import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Arrow } from '../components/Marks';
import { projects } from '../data/content';

export default function Projects() {
  return (
    <>
      <PageHeader eyebrow="02 — Projects" title="Things I've built" underline />

      <ol className="index-list">
        {projects.map((p, i) => {
          const isKaabo = p.slug === 'kaabo';
          const href = isKaabo ? '/kaabo' : p.github;
          const inner = (
            <>
              <span className="index-list__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="index-list__main">
                <h3 className="index-list__name">{p.name}</h3>
                <p className="index-list__tagline">{p.tagline}</p>
                <p className="index-list__desc">{p.description}</p>
                <p className="index-list__stack">{p.stack.join(' · ')}</p>
              </div>
              <Arrow className="index-list__arrow" />
            </>
          );
          return (
            <li key={p.slug} className="index-list__row">
              {isKaabo ? (
                <Link to={href!} className="index-list__link">
                  {inner}
                </Link>
              ) : href ? (
                <a href={href} target="_blank" rel="noreferrer" className="index-list__link">
                  {inner}
                </a>
              ) : (
                <div className="index-list__link index-list__link--static">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
