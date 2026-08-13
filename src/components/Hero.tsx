import { motion } from 'framer-motion';
import { profile } from '../data/content';
import { ArrowUpRightIcon, ChevronDownIcon, GitHubIcon, LinkedInIcon } from './Icons';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Software Engineer · Fidelity Investments
        </motion.p>

        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="gradient-text">DHRUV</span>
          <br />
          CHOUDHARY
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
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <a href="#projects" className="btn btn-primary">
            View Projects <ArrowUpRightIcon />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <GitHubIcon /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <LinkedInIcon /> LinkedIn
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="hero__scroll-cue"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { delay: 1.2, duration: 1.8, repeat: Infinity } }}
      >
        <ChevronDownIcon />
      </motion.a>
    </section>
  );
}
