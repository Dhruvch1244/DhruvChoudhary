import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Arrow } from '../components/Marks';
import Reveal from '../components/Reveal';
import { projects } from '../data/content';
import { caseStudies } from '../data/caseStudies';

const CASE_STUDY_SLUGS = new Set(caseStudies.map((c) => c.slug));

export default function Projects() {
  return (
    <>
      <PageHeader
        eyebrow="02 — Projects"
        title={
          <>
            Things I've <span className="gradient-text">built</span>
          </>
        }
        underline
      />

      <ol className="index-list">
        {projects.map((p, i) => {
          const isKaabo = p.slug === 'kaabo';
          const isCaseStudy = CASE_STUDY_SLUGS.has(p.slug);
          const internalHref = isKaabo ? '/kaabo' : isCaseStudy ? `/projects/${p.slug}` : null;
          const href = internalHref ?? p.github;
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
              <Reveal delay={Math.min(i * 0.06, 0.3)} y={20}>
                {internalHref ? (
                  <Link to={internalHref} className="index-list__link">
                    {inner}
                  </Link>
                ) : href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="index-list__link">
                    {inner}
                  </a>
                ) : (
                  <div className="index-list__link index-list__link--static">{inner}</div>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </>
  );
}
