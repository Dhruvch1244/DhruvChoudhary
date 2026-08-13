import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { kaabo } from '../data/content';
import { ArrowLeftIcon, ArrowUpRightIcon, GitHubIcon, UsersIcon } from '../components/Icons';

export default function KaaboPage() {
  return (
    <section className="section kaabo-page">
      <div className="container">
        <Link to="/" className="kaabo-page__back">
          <ArrowLeftIcon /> Back to portfolio
        </Link>

        <Reveal>
          <span className="eyebrow">Project</span>
          <h1 className="kaabo-page__title gradient-text">{kaabo.name}</h1>
          <p className="kaabo-page__tagline">{kaabo.tagline}</p>

          <div className="hero__actions">
            {kaabo.liveUrl ? (
              <a href={kaabo.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                Play Now <ArrowUpRightIcon />
              </a>
            ) : (
              <a href={kaabo.github} target="_blank" rel="noreferrer" className="btn btn-primary">
                Get the code <ArrowUpRightIcon />
              </a>
            )}
            <a href={kaabo.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <GitHubIcon /> Source
            </a>
            <span className="pill kaabo-page__players">
              <UsersIcon /> {kaabo.players}
            </span>
          </div>
        </Reveal>

        <div className="kaabo-page__grid">
          <Reveal delay={0.1} className="glass-card kaabo-page__card">
            <h3>How it works</h3>
            <p>{kaabo.howToHost}</p>
          </Reveal>

          <Reveal delay={0.18} className="glass-card kaabo-page__card">
            <h3>Rules</h3>
            <ul className="kaabo-page__rules">
              {kaabo.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        {kaabo.liveUrl && (
          <Reveal delay={0.24} className="kaabo-page__note">
            <p>
              Live instance may take up to 30s to wake up on first load (free-tier hosting spins down
              when idle) — worth a moment if the lobby doesn't appear instantly.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
