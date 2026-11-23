import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Arrow } from '../components/Marks';
import Reveal from '../components/Reveal';
import ProjectImg from '../components/ProjectImg';
import { projects } from '../data/content';
import { caseStudies } from '../data/caseStudies';
import { projectCover, projectImages } from '../data/projectMedia';
import WorldPage from '../worlds/WorldPage';
import { hasWorldPage } from '../worlds/shared';
import { useWorld } from '../lib/worldContext';

const CASE_STUDY_SLUGS = new Set(caseStudies.map((c) => c.slug));

function ConstellationProjects() {
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

      <div className="project-grid">
        {projects.map((p, i) => {
          const isKaabo = p.slug === 'kaabo';
          const isCaseStudy = CASE_STUDY_SLUGS.has(p.slug);
          const internalHref = isKaabo ? '/kaabo' : isCaseStudy ? `/projects/${p.slug}` : null;
          const href = internalHref ?? p.github;
          const cover = projectCover(p.slug);
          const shots = projectImages(p.slug).length;
          const featured = i === 0;
          const inner = (
            <>
              {cover && (
                <div className="project-card__media">
                  <ProjectImg
                    img={cover}
                    eager={i < 2}
                    sizes={featured ? '(max-width: 860px) 100vw, 960px' : '(max-width: 860px) 100vw, 480px'}
                  />
                  {shots > 1 && <span className="project-card__shots">{shots} screens</span>}
                </div>
              )}
              {!cover && (
                <div className="project-card__media project-card__poster" aria-hidden="true">
                  <span className="project-card__poster-kind">{p.kind}</span>
                  <span className="project-card__poster-stat">{p.stat}</span>
                  <span className="project-card__poster-stack">{p.stack.slice(0, 4).join('  /  ')}</span>
                </div>
              )}
              <div className="project-card__body">
                <div className="project-card__head">
                  <span className="project-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="project-card__name">{p.name}</h3>
                  <Arrow className="project-card__arrow" />
                </div>
                <p className="project-card__tagline">{p.tagline}</p>
                <ul className="project-card__stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </>
          );
          return (
            <Reveal
              key={p.slug}
              delay={Math.min(i * 0.06, 0.3)}
              y={24}
              className={`project-card ${featured ? 'project-card--featured' : ''}`}
            >
              {internalHref ? (
                <Link to={internalHref} className="project-card__link">
                  {inner}
                </Link>
              ) : href ? (
                <a href={href} target="_blank" rel="noreferrer" className="project-card__link">
                  {inner}
                </a>
              ) : (
                <div className="project-card__link">{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </>
  );
}

/** Each world presents this page its own way; Constellation keeps the original. */
export default function Projects() {
  const { world } = useWorld();
  return hasWorldPage(world.id) ? <WorldPage world={world.id} page="projects" /> : <ConstellationProjects />;
}
