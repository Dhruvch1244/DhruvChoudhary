import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Arrow } from '../components/Marks';
import Reveal from '../components/Reveal';
import { getCaseStudy } from '../data/caseStudies';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  if (!study) return <Navigate to="/projects" replace />;

  return (
    <>
      <Link to="/projects" className="text-link back-link">
        ← Back to projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}>
        <p className="eyebrow">Case study</p>
        <h1 className="page-header__title gradient-text">{study.name}</h1>
        <p className="hero__tagline">{study.tagline}</p>

        <div className="case-study__meta">
          <span className="case-study__role">{study.role}</span>
          {(study.github || study.liveUrl || study.researchLink) && (
            <div className="case-study__links">
              {study.liveUrl && (
                <a href={study.liveUrl} target="_blank" rel="noreferrer" className="btn-outline">
                  Live <Arrow className="text-link__arrow" />
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

      <Reveal className="case-study__section">
        <h3 className="section-title">Summary</h3>
        <p>{study.summary}</p>
      </Reveal>

      <Reveal delay={0.05} className="case-study__section">
        <h3 className="section-title">The problem</h3>
        <p>{study.problem}</p>
      </Reveal>

      <Reveal delay={0.1} className="case-study__section">
        <h3 className="section-title">Approach</h3>
        <ul className="case-study__list">
          {study.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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

      {study.images && study.images.length > 0 && (
        <div className="case-study__gallery">
          {study.images.map((img, i) => (
            <Reveal key={img.src} delay={0.06 * i} className="case-study__figure">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <p className="case-study__caption">{img.caption}</p>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
