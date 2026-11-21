import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Arrow } from '../components/Marks';
import Reveal from '../components/Reveal';
import SpotifyPlaylistWidget from '../components/SpotifyPlaylistWidget';
import VinylDemo from '../components/VinylDemo';
import Gallery from '../components/Gallery';
import ProjectImg from '../components/ProjectImg';
import { projectImages } from '../data/projectMedia';
import { caseStudies, getCaseStudy } from '../data/caseStudies';

function readingTime(study: NonNullable<ReturnType<typeof getCaseStudy>>) {
  const words = [study.summary, study.problem, ...study.approach, ...study.outcomes, study.research?.note ?? '']
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;
  const [allSteps, setAllSteps] = useState(false);

  if (!study) return <Navigate to="/projects" replace />;

  const [cover, ...shots] = projectImages(study.slug);
  const STEPS = 3;
  const steps = allSteps ? study.approach : study.approach.slice(0, STEPS);

  const related = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <>
      <Link to="/projects" className="text-link back-link">
        ← Back to projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}>
        <p className="eyebrow">Case study · {readingTime(study)} min read</p>
        <h1 className="page-header__title gradient-text">{study.name}</h1>
        <p className="hero__tagline">{study.tagline}</p>

        <div className="case-study__meta">
          <span className="case-study__role">{study.role}</span>
          {(study.github || study.liveUrl || study.demoUrl || study.researchLink) && (
            <div className="case-study__links">
              {study.liveUrl && (
                <a href={study.liveUrl} target="_blank" rel="noreferrer" className="btn-outline">
                  Try it <Arrow className="text-link__arrow" />
                </a>
              )}
              {study.demoUrl && (
                <a href={study.demoUrl} target="_blank" rel="noreferrer" className="text-link">
                  Live demo in your browser
                </a>
              )}
              {study.github && (
                <a href={study.github} target="_blank" rel="noreferrer" className="text-link">
                  Source on GitHub
                </a>
              )}
              {study.researchLink && (
                <a href={study.researchLink} target="_blank" rel="noreferrer" className="text-link">
                  Read the research (SSRN)
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {cover && (
        <motion.figure
          className="case-study__cover"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectImg img={cover} eager sizes="(max-width: 860px) 100vw, 960px" />
          <figcaption className="gallery__caption">{cover.caption}</figcaption>
        </motion.figure>
      )}

      {study.vinylDemo && (
        <Reveal className="case-study__section">
          <p className="eyebrow">One preset, live</p>
          <VinylDemo />
        </Reveal>
      )}

      <Reveal className="case-study__section">
        <h3 className="section-title">Summary</h3>
        <p>{study.summary}</p>
      </Reveal>

      {shots.length > 0 && (
        <section className="case-study__section case-study__screens">
          <Reveal>
            <h3 className="section-title">Screens</h3>
          </Reveal>
          <Gallery images={shots} />
        </section>
      )}

      <Reveal delay={0.05} className="case-study__section">
        <h3 className="section-title">The problem</h3>
        <p>{study.problem}</p>
      </Reveal>

      <Reveal delay={0.1} className="case-study__section">
        <h3 className="section-title">Approach</h3>
        <ul className="case-study__list">
          {steps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {study.approach.length > STEPS && (
          <button type="button" className="text-link case-study__more" onClick={() => setAllSteps((v) => !v)} aria-expanded={allSteps}>
            {allSteps ? 'Show less' : `Show all ${study.approach.length} steps`}
          </button>
        )}
      </Reveal>

      <Reveal delay={0.15} className="case-study__section">
        <h3 className="section-title">Outcomes</h3>
        <ul className="case-study__list">
          {study.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>

      {study.research && (
        <Reveal delay={0.18} className="case-study__research">
          <p className="eyebrow">Research</p>
          <h3 className="publication__title">{study.research.title}</h3>
          <p className="publication__venue">{study.research.venue}</p>
          <p className="publication__desc">{study.research.note}</p>
          {study.research.href && (
            <a href={study.research.href} target="_blank" rel="noreferrer" className="text-link">
              Read the paper on SSRN
            </a>
          )}
        </Reveal>
      )}

      <Reveal delay={0.2}>
        <p className="index-list__stack case-study__stack">{study.stack.join(' · ')}</p>
      </Reveal>

      {study.spotifyPlaylist && (
        <Reveal delay={0.22} className="case-study__playlist">
          <p className="eyebrow">Listen while you look</p>
          <SpotifyPlaylistWidget />
        </Reveal>
      )}


      {related.length > 0 && (
        <Reveal className="case-study__related">
          <p className="eyebrow">Also see</p>
          <div className="case-study__related-grid">
            {related.map((r) => (
              <Link key={r.slug} to={`/projects/${r.slug}`} className="case-study__related-card">
                <span className="case-study__related-name">{r.name}</span>
                <span className="case-study__related-tagline">{r.tagline}</span>
                <Arrow className="text-link__arrow" />
              </Link>
            ))}
          </div>
        </Reveal>
      )}
    </>
  );
}
