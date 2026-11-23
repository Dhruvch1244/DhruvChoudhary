import { profile, experience } from '../data/content';
import { projectCover } from '../data/projectMedia';
import ProjectImg from '../components/ProjectImg';
import Reveal from '../components/Reveal';
import { journal } from './copy';
import ProjLink from './ProjLink';
import { featuredProjects, projects, type Project } from './shared';

function Paws({ n }: { n: number }) {
  return (
    <span className="nw-paws" aria-label={`${n} of 5 paws`}>
      {'🐾'.repeat(n)}
    </span>
  );
}

/** Paws scale with how much is on the bench: stack size, clamped 3-5. */
const pawsFor = (p: Project) => Math.min(5, Math.max(3, p.stack.length - 1));

function Entry({ p }: { p: Project }) {
  const j = journal[p.slug];
  return (
    <Reveal y={16} className="nw-entry">
      <time className="nw-entry__time">{j.time}</time>
      <div className="nw-entry__body">
        <ProjLink p={p} className="nw-entry__title">
          {p.name}
        </ProjLink>
        <p className="nw-entry__text">{j.entry}</p>
        <p className="nw-entry__cat">
          cat's verdict: {j.cat} <Paws n={pawsFor(p)} />
        </p>
      </div>
    </Reveal>
  );
}

function Polaroid({ p, i }: { p: Project; i: number }) {
  const cover = projectCover(p.slug);
  const j = journal[p.slug];
  const tilt = ((i * 37) % 7) - 3;
  return (
    <Reveal y={20} className="nw-polaroid-wrap">
      <ProjLink p={p} className="nw-polaroid">
        <span className="nw-tape" aria-hidden="true" />
        <div className="nw-polaroid__photo" style={{ rotate: `${tilt}deg` }}>
          {cover ? (
            <ProjectImg img={cover} sizes="(max-width: 860px) 100vw, 360px" />
          ) : (
            <div className="nw-polaroid__blank">
              <span>{p.stat}</span>
            </div>
          )}
          <p className="nw-polaroid__caption">{p.name}</p>
        </div>
        <p className="nw-polaroid__note">
          <time>{j.time}</time> {j.entry}
        </p>
        <p className="nw-entry__cat">
          {j.cat} <Paws n={pawsFor(p)} />
        </p>
      </ProjLink>
    </Reveal>
  );
}

export default function NightshiftWorld({ page }: { page: 'home' | 'projects' }) {
  if (page === 'projects') {
    return (
      <>
        <header className="nw-header">
          <p className="nw-kicker">the wall above the desk</p>
          <h1 className="nw-h1">Everything I made after dark</h1>
          <p className="nw-lede">Polaroids, a note on the back of each, and the cat's honest review.</p>
        </header>
        <div className="nw-wall">
          {projects.map((p, i) => (
            <Polaroid key={p.slug} p={p} i={i} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <header className="nw-header nw-header--home">
        <p className="nw-kicker">night journal · {profile.location.toLowerCase()}</p>
        <h1 className="nw-h1">
          hi, I'm Dhruv <span aria-hidden="true">☾</span>
        </h1>
        <div className="nw-about">
          <img src="/img/avatar.jpg" alt={profile.name} />
          <p>
            By day I'm a {profile.role.toLowerCase()} at Fidelity Investments. By night I build the things below, usually with a
            cat on the keyboard. {profile.tagline}
          </p>
        </div>
      </header>

      <section>
        <h2 className="nw-h2">recent entries</h2>
        <div className="nw-journal">
          {featuredProjects().map((p) => (
            <Entry key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="nw-h2">where I am by day</h2>
        <ul className="nw-day">
          {experience.map((e) => (
            <li key={e.role + e.period}>
              <strong>{e.role}</strong> at {e.org} <span>{e.period}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="nw-note">
        <h2 className="nw-h2">leave a note</h2>
        <p>I read everything, usually at an unreasonable hour.</p>
        <div className="nw-note__btns">
          <a href={`mailto:${profile.email}`} className="nw-btn">
            write to me
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="nw-btn nw-btn--ghost">
            linkedin
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="nw-btn nw-btn--ghost">
            résumé
          </a>
        </div>
      </section>
    </>
  );
}
