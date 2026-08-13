import Reveal from './Reveal';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <section className="section section--alt" id="experience">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Experience</span>
          <h2 className="section__title">Where the work happened</h2>
        </Reveal>

        <ol className="timeline">
          {experience.map((job, i) => (
            <Reveal key={`${job.org}-${job.role}`} delay={i * 0.08} className="timeline__item">
              <div className="timeline__marker" />
              <div className="timeline__content glass-card">
                <div className="timeline__head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="timeline__org">
                      {job.org} · {job.location}
                    </p>
                  </div>
                  <span className="timeline__period">{job.period}</span>
                </div>
                <ul className="timeline__bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="pill-row">
                  {job.stack.map((s) => (
                    <span key={s} className="pill">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
