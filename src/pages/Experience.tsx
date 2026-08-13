import PageHeader from '../components/PageHeader';
import { experience, education, publication, skillGroups } from '../data/content';

export default function Experience() {
  return (
    <>
      <PageHeader eyebrow="03 — Experience" title="Where the work happened" underline />

      <ol className="timeline">
        {experience.map((job) => (
          <li key={`${job.org}-${job.role}`} className="timeline__row">
            <div className="timeline__period">{job.period}</div>
            <div className="timeline__main">
              <h3 className="timeline__role">{job.role}</h3>
              <p className="timeline__org">{job.org}</p>
              <ul className="timeline__bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="timeline__stack">{job.stack.join(' · ')}</p>
            </div>
          </li>
        ))}

        <li className="timeline__row">
          <div className="timeline__period">{education.period}</div>
          <div className="timeline__main">
            <h3 className="timeline__role">{education.degree}</h3>
            <p className="timeline__org">{education.school}</p>
            <p className="timeline__stack">{education.detail}</p>
          </div>
        </li>
      </ol>

      <section className="skills">
        <h2 className="section-title">Toolbox</h2>
        <div className="skills__grid">
          {skillGroups.map((group) => (
            <div key={group.label} className="skills__group">
              <h4>{group.label.replace('_', ' ')}</h4>
              <p>{group.items.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="publication">
        <p className="eyebrow">Research</p>
        <h3 className="publication__title">{publication.title}</h3>
        <p className="publication__venue">{publication.venue}</p>
        <p className="publication__desc">{publication.description}</p>
      </section>
    </>
  );
}
