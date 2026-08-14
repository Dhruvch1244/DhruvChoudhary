import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile, education, projects, skillGroups } from '../data/content';
import { NodeLine, Arrow } from '../components/Marks';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import GitHubStats from '../components/GitHubStats';

const FEATURED = ['kaabo', 'lyric-viewer', 'batchpilot'];
const TICKER = skillGroups.flatMap((g) => g.items).filter((_, i) => i % 2 === 0).slice(0, 10);

export default function Home() {
  const featured = FEATURED.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <>
      <motion.section className="hero" ref={heroRef} style={{ y: heroY, opacity: heroOpacity }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {profile.role} — Fidelity Investments
        </motion.p>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="stroke-text">Hi, I'm</span> <span className="hero__name gradient-text">Dhruv</span>
          <NodeLine className="hero__squiggle" />
        </motion.h1>
        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {profile.tagline}
        </motion.p>
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-outline">
            Résumé <Arrow className="text-link__arrow" />
          </a>
          <Link to="/contact" className="text-link hero__contact-link">
            Get in touch
          </Link>
        </motion.div>
      </motion.section>

      <Marquee items={TICKER} />

      <Reveal className="about">
        <div className="about__header">
          <img src="/img/avatar.jpg" alt="Dhruv Choudhary" className="about__photo" />
          <p className="about__text">{profile.summary}</p>
        </div>

        <dl className="facts">
          <div className="facts__item">
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div className="facts__item">
            <dt>Currently</dt>
            <dd>Executive Graduate Trainee</dd>
          </div>
          <div className="facts__item">
            <dt>Education</dt>
            <dd>
              {education.school}
              <br />
              <span className="facts__sub">{education.period}</span>
            </dd>
          </div>
        </dl>

        <GitHubStats />
      </Reveal>

      <section className="selected-work">
        <Reveal>
          <h2 className="section-title">Selected work</h2>
        </Reveal>
        <div className="work-list">
          {featured.map((p, i) => {
            const to = p.slug === 'kaabo' ? '/kaabo' : p.github ?? '/projects';
            const external = p.slug !== 'kaabo';
            const content = (
              <>
                <span className="work-list__num">0{i + 1}</span>
                <span className="work-list__name">{p.name}</span>
                <span className="work-list__tagline">{p.tagline}</span>
                <Arrow className="work-list__arrow" />
              </>
            );
            return (
              <Reveal key={p.slug} delay={i * 0.08} y={20} className="work-list__row">
                {external ? (
                  <a href={to} target="_blank" rel="noreferrer" className="work-list__link">
                    {content}
                  </a>
                ) : (
                  <Link to={to} className="work-list__link">
                    {content}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <Link to="/projects" className="text-link">
            View all projects <Arrow className="text-link__arrow" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
