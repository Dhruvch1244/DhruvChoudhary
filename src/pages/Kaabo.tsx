import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Arrow } from '../components/Marks';
import Reveal from '../components/Reveal';
import KaaboLiveBadge from '../components/KaaboLiveBadge';
import { kaabo } from '../data/content';
import Gallery from '../components/Gallery';
import ProjectImg from '../components/ProjectImg';
import { projectImages } from '../data/projectMedia';

const [cover, ...shots] = projectImages('kaabo');

export default function Kaabo() {
  return (
    <>
      <Link to="/projects" className="text-link back-link">
        ← Back to projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}>
        <p className="eyebrow">Project</p>
        <h1 className="page-header__title gradient-text">{kaabo.name}</h1>
        <p className="hero__tagline">{kaabo.tagline}</p>

        <div className="kaabo__actions">
          <a href={kaabo.liveUrl} target="_blank" rel="noreferrer" className="btn-outline">
            Play now <Arrow className="text-link__arrow" />
          </a>
          <a href={kaabo.github} target="_blank" rel="noreferrer" className="text-link">
            Source on GitHub
          </a>
          <span className="kaabo__players">{kaabo.players}</span>
        </div>

        <KaaboLiveBadge />
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

      {shots.length > 0 && (
        <section className="case-study__section case-study__screens">
          <Reveal>
            <h3 className="section-title">Screens</h3>
          </Reveal>
          <Gallery images={shots} lead={false} />
        </section>
      )}

      <div className="kaabo__grid">
        <Reveal>
          <h3 className="section-title">How it works</h3>
          <p>{kaabo.howToHost}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="section-title">Rules</h3>
          <ol className="kaabo__rules">
            {kaabo.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <p className="kaabo__note">
          Free-tier hosting spins down when idle -- first load can take up to 30s to wake the server.
        </p>
      </Reveal>
    </>
  );
}
