import { Link } from 'react-router-dom';
import { Arrow } from '../components/Marks';
import { kaabo } from '../data/content';

export default function Kaabo() {
  return (
    <>
      <Link to="/projects" className="text-link back-link">
        ← Back to projects
      </Link>

      <p className="eyebrow">Project</p>
      <h1 className="page-header__title">{kaabo.name}</h1>
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

      <div className="kaabo__grid">
        <section>
          <h3 className="section-title">How it works</h3>
          <p>{kaabo.howToHost}</p>
        </section>

        <section>
          <h3 className="section-title">Rules</h3>
          <ol className="kaabo__rules">
            {kaabo.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </section>
      </div>

      <p className="kaabo__note">
        Free-tier hosting spins down when idle -- first load can take up to 30s to wake the server.
      </p>
    </>
  );
}
