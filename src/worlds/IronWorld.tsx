import { profile, experience, education } from '../data/content';
import { projectCover } from '../data/projectMedia';
import ProjectImg from '../components/ProjectImg';
import Reveal from '../components/Reveal';
import { ironLift, ironSplit } from './copy';
import ProjLink from './ProjLink';
import { featuredProjects, projects, type Project } from './shared';

/** One plate per technology on the bar -- the "weight" is the real stack. */
function Barbell({ p }: { p: Project }) {
  const plates = p.stack.slice(0, 6);
  return (
    <div className="iw-bar" aria-label={`${p.stack.length} technologies`}>
      <span className="iw-bar__rod" />
      <span className="iw-bar__side">
        {plates.map((t, i) => (
          <span key={t} className={`iw-plate iw-plate--${i % 3}`} title={t} />
        ))}
      </span>
      <span className="iw-bar__side iw-bar__side--r">
        {plates.map((t, i) => (
          <span key={t} className={`iw-plate iw-plate--${i % 3}`} title={t} />
        ))}
      </span>
    </div>
  );
}

function SessionCard({ p, day }: { p: Project; day: string }) {
  const cover = projectCover(p.slug);
  const l = ironLift[p.slug];
  return (
    <Reveal y={18} className="iw-session">
      <ProjLink p={p} className="iw-session__link">
        <div className="iw-session__head">
          <span className="iw-day">{day}</span>
          <span className="iw-split">{ironSplit[p.kind]}</span>
        </div>
        <h3 className="iw-session__lift">{l.lift}</h3>
        <p className="iw-session__name">{p.name}</p>
        {cover && (
          <div className="iw-session__photo">
            <ProjectImg img={cover} sizes="(max-width: 860px) 100vw, 420px" />
            <span className="iw-session__tag">form check</span>
          </div>
        )}
        <Barbell p={p} />
        <ol className="iw-sets">
          {p.stack.map((t, i) => (
            <li key={t}>
              <span className="iw-sets__n">set {i + 1}</span>
              <span>{t}</span>
              <span className="iw-check" aria-hidden="true">
                ✓
              </span>
            </li>
          ))}
        </ol>
        <p className="iw-pr">
          <span>PR</span> {p.stat}
        </p>
        <p className="iw-note">Coach: {l.note}</p>
      </ProjLink>
    </Reveal>
  );
}

const DAYS = ['MON', 'TUE', 'THU', 'FRI', 'SAT', 'SUN'];

export default function IronWorld({ page }: { page: 'home' | 'projects' }) {
  if (page === 'projects') {
    return (
      <>
        <header className="iw-header">
          <p className="iw-kicker">Program · {projects.length} lifts · progressive overload</p>
          <h1 className="iw-h1">The Program</h1>
          <p className="iw-lede">Every project as a lift: one set per technology on the bar, and the PR it set.</p>
        </header>
        <div className="iw-sheet" role="table" aria-label="Program sheet">
          <div className="iw-sheet__row iw-sheet__row--head" role="row">
            <span role="columnheader">#</span>
            <span role="columnheader">Lift</span>
            <span role="columnheader">Split</span>
            <span role="columnheader">Sets</span>
            <span role="columnheader">PR</span>
          </div>
          {projects.map((p, i) => (
            <ProjLink key={p.slug} p={p} className="iw-sheet__row">
              <span className="iw-sheet__n">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <strong>{p.name}</strong> <em>{ironLift[p.slug].lift}</em>
              </span>
              <span className="iw-split">{ironSplit[p.kind]}</span>
              <span>{p.stack.length} sets</span>
              <span className="iw-sheet__pr">{p.stat}</span>
            </ProjLink>
          ))}
        </div>
        <h2 className="iw-h2">Session cards</h2>
        <div className="iw-sessions">
          {projects.map((p, i) => (
            <SessionCard key={p.slug} p={p} day={DAYS[i % DAYS.length]} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <header className="iw-header iw-header--home">
        <p className="iw-kicker">Training log · week of shipping</p>
        <h1 className="iw-h1">
          Dhruv <span>Choudhary</span>
        </h1>
        <div className="iw-athlete">
          <img src="/img/avatar.jpg" alt={profile.name} />
          <dl>
            <div>
              <dt>Athlete</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt>Club</dt>
              <dd>Fidelity Investments</dd>
            </div>
            <div>
              <dt>Based</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Split</dt>
              <dd>Push (backend) · Pull (frontend) · Legs (infra)</dd>
            </div>
          </dl>
        </div>
        <p className="iw-lede">{profile.summary}</p>
      </header>

      <h2 className="iw-h2">This week's sessions</h2>
      <div className="iw-sessions">
        {featuredProjects().map((p, i) => (
          <SessionCard key={p.slug} p={p} day={DAYS[i]} />
        ))}
      </div>

      <h2 className="iw-h2">Training history</h2>
      <ol className="iw-history">
        {experience.map((e) => (
          <li key={e.role + e.period}>
            <span className="iw-history__when">{e.period}</span>
            <span className="iw-history__what">
              <strong>{e.role}</strong> · {e.org}
            </span>
            {e.bullets[0] && <span className="iw-history__pr">PR: {e.bullets[0]}</span>}
          </li>
        ))}
        <li>
          <span className="iw-history__when">{education.period}</span>
          <span className="iw-history__what">
            <strong>{education.degree}</strong> · {education.school}
          </span>
          <span className="iw-history__pr">{education.detail}</span>
        </li>
      </ol>

      <section className="iw-book">
        <h2 className="iw-h2">Book a session</h2>
        <div className="iw-book__btns">
          <a href={`mailto:${profile.email}`} className="iw-btn">
            Email me
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="iw-btn iw-btn--ghost">
            LinkedIn
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="iw-btn iw-btn--ghost">
            Résumé
          </a>
        </div>
      </section>
    </>
  );
}
