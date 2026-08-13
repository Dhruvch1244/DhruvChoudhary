import { Link } from 'react-router-dom';
import { profile, education, projects } from '../data/content';
import { Squiggle, Arrow } from '../components/Marks';

const FEATURED = ['kaabo', 'lyric-viewer', 'batchpilot'];

export default function Home() {
  const featured = FEATURED.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">{profile.role} — Fidelity Investments</p>
        <h1 className="hero__title">
          Hi, I'm <span className="hero__name">Dhruv</span>
          <Squiggle className="hero__squiggle" />
        </h1>
        <p className="hero__tagline">{profile.tagline}</p>
      </section>

      <section className="about">
        <p className="about__text">{profile.summary}</p>

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
      </section>

      <section className="selected-work">
        <h2 className="section-title">Selected work</h2>
        <ol className="work-list">
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
              <li key={p.slug} className="work-list__row">
                {external ? (
                  <a href={to} target="_blank" rel="noreferrer" className="work-list__link">
                    {content}
                  </a>
                ) : (
                  <Link to={to} className="work-list__link">
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
        <Link to="/projects" className="text-link">
          View all projects <Arrow className="text-link__arrow" />
        </Link>
      </section>
    </>
  );
}
