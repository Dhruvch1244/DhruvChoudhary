import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { experience, education, publication, skillGroups, leadership } from '../data/content';

export default function Experience() {
  return (
    <>
      <PageHeader
        eyebrow="03 — Experience"
        title={
          <>
            Where the work <span className="gradient-text">happened</span>
          </>
        }
        underline
      />

      <ol className="timeline">
        {experience.map((job, i) => (
          <li key={`${job.org}-${job.role}`} className="timeline__row">
            <Reveal delay={Math.min(i * 0.06, 0.24)} y={20} className="timeline__reveal">
              <div className="timeline__period">{job.period}</div>
              <div className="timeline__main">
                <h3 className="timeline__role">{job.role}</h3>
                <p className="timeline__org">{job.org}</p>
                {job.bullets.length > 0 && (
                  <ul className="timeline__bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                <p className="timeline__stack">{job.stack.join(' · ')}</p>
              </div>
            </Reveal>
          </li>
        ))}

        <li className="timeline__row">
          <Reveal y={20} className="timeline__reveal">
            <div className="timeline__period">{education.period}</div>
            <div className="timeline__main">
              <h3 className="timeline__role">{education.degree}</h3>
              <p className="timeline__org">{education.school}</p>
              <p className="timeline__stack">{education.detail}</p>
            </div>
          </Reveal>
        </li>
      </ol>

      <section className="skills">
        <Reveal>
          <h2 className="section-title">Toolbox</h2>
        </Reveal>
        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={Math.min(i * 0.05, 0.25)} y={16} className="skills__group">
              <h4>{group.label.replace('_', ' ')}</h4>
              <p>{group.items.join(', ')}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="leadership">
        <p className="eyebrow">Leadership &amp; Community</p>
        <h3 className="publication__title">
          {leadership.role} <span className="leadership__org">— {leadership.org}</span>
        </h3>
        <ul className="leadership__list">
          {leadership.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="publication">
        <p className="eyebrow">Research</p>
        <h3 className="publication__title">{publication.title}</h3>
        <p className="publication__venue">{publication.venue}</p>
        <p className="publication__desc">{publication.description}</p>
      </Reveal>
    </>
  );
}
