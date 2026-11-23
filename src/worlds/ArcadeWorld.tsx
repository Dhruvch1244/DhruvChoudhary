import { profile, experience, education } from '../data/content';
import { projectCover } from '../data/projectMedia';
import ProjectImg from '../components/ProjectImg';
import Reveal from '../components/Reveal';
import { arcadeStage } from './copy';
import ProjLink from './ProjLink';
import { featuredProjects, projects, type Project } from './shared';

/** Stat bars derived from real data, not invented: stack size, recency, screens. */
function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  const filled = Math.max(1, Math.round((value / max) * 8));
  return (
    <div className="aw-bar">
      <span className="aw-bar__label">{label}</span>
      <span className="aw-bar__cells" aria-label={`${label} ${value} of ${max}`}>
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} className={i < filled ? 'on' : ''} />
        ))}
      </span>
    </div>
  );
}

function Cartridge({ p, level }: { p: Project; level: number }) {
  const cover = projectCover(p.slug);
  const s = arcadeStage[p.slug];
  const world = Math.floor(level / 4) + 1;
  const sub = (level % 4) + 1;
  return (
    <Reveal y={20} className="aw-cart">
      <ProjLink p={p} className="aw-cart__link">
        <div className="aw-cart__label">
          <span className="aw-cart__level">
            WORLD {world}-{sub}
          </span>
          <span className="aw-cart__kind">{p.kind.toUpperCase()}</span>
        </div>
        <div className="aw-cart__screen">
          {cover ? (
            <ProjectImg img={cover} sizes="(max-width: 860px) 100vw, 420px" />
          ) : (
            <div className="aw-cart__noscreen">
              <span>{s.stage}</span>
            </div>
          )}
        </div>
        <h3 className="aw-cart__name">{p.name}</h3>
        <p className="aw-cart__stage">STAGE: {s.stage}</p>
        <p className="aw-cart__boss">
          BOSS: <strong>{s.boss}</strong>
        </p>
        <div className="aw-cart__stats">
          <Bar label="TECH" value={p.stack.length} max={8} />
          <Bar label="NEW" value={p.year - 2022} max={4} />
        </div>
        <p className="aw-cart__win">★ {p.stat}</p>
        <span className="aw-cart__start">▶ START</span>
      </ProjLink>
    </Reveal>
  );
}

function LevelSelect({ list, title, featured }: { list: Project[]; title: string; featured?: boolean }) {
  return (
    <section className="aw-section">
      <h2 className="aw-h">{title}</h2>
      <div className={`aw-grid ${featured ? 'aw-grid--featured' : ''}`}>
        {list.map((p) => (
          <Cartridge key={p.slug} p={p} level={projects.indexOf(p)} />
        ))}
      </div>
    </section>
  );
}

export default function ArcadeWorld({ page }: { page: 'home' | 'projects' }) {
  if (page === 'projects') {
    return (
      <>
        <header className="aw-title aw-title--small">
          <p className="aw-blink">SELECT YOUR LEVEL</p>
          <h1 className="aw-logo">LEVEL SELECT</h1>
          <p className="aw-sub">
            {projects.length} STAGES UNLOCKED · {projects.filter((p) => projectCover(p.slug)).length} WITH SCREENS
          </p>
        </header>
        <LevelSelect list={projects} title="ALL STAGES" />
      </>
    );
  }

  return (
    <>
      <header className="aw-title">
        <p className="aw-coin">© 2026 DHRUV · 1 CREDIT</p>
        <h1 className="aw-logo">
          DHRUV
          <br />
          <span>CHOUDHARY</span>
        </h1>
        <a href="#aw-levels" className="aw-press">
          ▶ PRESS START
        </a>
      </header>

      <section className="aw-section aw-p1">
        <h2 className="aw-h">PLAYER 1</h2>
        <div className="aw-p1__card">
          <img src="/img/avatar.jpg" alt={profile.name} className="aw-p1__avatar" />
          <div>
            <p className="aw-p1__class">CLASS: {profile.role.toUpperCase()}</p>
            <p className="aw-p1__guild">GUILD: FIDELITY INVESTMENTS · {profile.location.toUpperCase()}</p>
            <p className="aw-p1__lore">{profile.summary}</p>
          </div>
        </div>
      </section>

      <div id="aw-levels">
        <LevelSelect list={featuredProjects()} title="FEATURED STAGES" featured />
      </div>

      <section className="aw-section">
        <h2 className="aw-h">HI-SCORES</h2>
        <ol className="aw-scores">
          {experience.map((e, i) => (
            <li key={e.role + e.period}>
              <span className="aw-scores__rank">{i + 1}.</span>
              <span className="aw-scores__name">{e.role.toUpperCase()}</span>
              <span className="aw-scores__org">{e.org.split(',')[0].toUpperCase()}</span>
              <span className="aw-scores__time">{e.period.toUpperCase()}</span>
            </li>
          ))}
          <li>
            <span className="aw-scores__rank">{experience.length + 1}.</span>
            <span className="aw-scores__name">B.TECH CSE · CGPA 9.38</span>
            <span className="aw-scores__org">{education.school.toUpperCase()}</span>
            <span className="aw-scores__time">{education.period.toUpperCase()}</span>
          </li>
        </ol>
      </section>

      <section className="aw-section aw-continue">
        <h2 className="aw-h">CONTINUE?</h2>
        <p className="aw-blink">9</p>
        <div className="aw-continue__btns">
          <a href={`mailto:${profile.email}`} className="aw-btn">
            ▶ YES · EMAIL
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="aw-btn aw-btn--alt">
            LINKEDIN
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="aw-btn aw-btn--alt">
            GITHUB
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="aw-btn aw-btn--alt">
            RÉSUMÉ
          </a>
        </div>
      </section>
    </>
  );
}
