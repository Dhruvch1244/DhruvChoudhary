import { useRef, useState } from 'react';
import { profile, experience } from '../data/content';
import { projectCover } from '../data/projectMedia';
import ProjectImg from '../components/ProjectImg';
import { teamRadio, tyre } from './copy';
import ProjLink from './ProjLink';
import { projects, type Project } from './shared';

/** Car numbers: stable per project (its position on the grid at launch). */
const carNo = (p: Project) => String(projects.indexOf(p) * 7 + 4).padStart(2, '0');

function Tyre({ p }: { p: Project }) {
  const t = tyre[p.kind];
  return (
    <span className={`pw-tyre pw-tyre--${t.code}`} title={`${t.name} compound (${p.kind})`}>
      {t.code}
    </span>
  );
}

function Tower({ list, active, onPick }: { list: Project[]; active?: string; onPick?: (slug: string) => void }) {
  return (
    <ol className="pw-tower" aria-label="Timing tower">
      <li className="pw-tower__head">
        <span>POS</span>
        <span>NO</span>
        <span>DRIVER</span>
        <span>TYRE</span>
        <span className="pw-tower__gap">GAP</span>
      </li>
      {list.map((p, i) => {
        const row = (
          <>
            <span className="pw-pos">{i + 1}</span>
            <span className="pw-no">{carNo(p)}</span>
            <span className="pw-name">{p.name.toUpperCase()}</span>
            <Tyre p={p} />
            <span className="pw-tower__gap">{i === 0 ? 'LEADER' : `+${(i * 0.137 + 0.042).toFixed(3)}`}</span>
          </>
        );
        return (
          <li key={p.slug} className={active === p.slug ? 'is-active' : ''}>
            {onPick ? (
              <button type="button" className="pw-tower__row" onClick={() => onPick(p.slug)} aria-pressed={active === p.slug}>
                {row}
              </button>
            ) : (
              <ProjLink p={p} className="pw-tower__row">
                {row}
              </ProjLink>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Onboard({ p }: { p: Project }) {
  const cover = projectCover(p.slug);
  return (
    <section className="pw-onboard" aria-live="polite">
      <div className="pw-onboard__cam">
        {cover ? (
          <ProjectImg key={p.slug} img={cover} sizes="(max-width: 860px) 100vw, 720px" />
        ) : (
          <div className="pw-onboard__nocam">NO ONBOARD FEED · {p.kind.toUpperCase()}</div>
        )}
        <span className="pw-onboard__live">● ONBOARD · CAR {carNo(p)}</span>
      </div>
      <div className="pw-onboard__info">
        <h2 className="pw-onboard__name">{p.name}</h2>
        <p className="pw-radio">
          <span>TEAM RADIO</span>“{teamRadio[p.slug]}”
        </p>
        <p className="pw-onboard__desc">{p.description}</p>
        <p className="pw-setup">
          <span>SETUP</span> {p.stack.join(' · ')}
        </p>
        <p className="pw-setup">
          <span>FASTEST LAP</span> {p.stat} · {p.year}
        </p>
        <ProjLink p={p} className="pw-btn">
          Go onboard →
        </ProjLink>
      </div>
    </section>
  );
}

export default function PitlaneWorld({ page }: { page: 'home' | 'projects' }) {
  const [active, setActive] = useState(projects[0].slug);
  const onboardRef = useRef<HTMLDivElement>(null);
  // On phones the onboard sits below the tower, so bring it into view.
  const pick = (slug: string) => {
    setActive(slug);
    if (window.matchMedia('(max-width: 860px)').matches) {
      requestAnimationFrame(() => onboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };
  const current = projects.find((p) => p.slug === active) ?? projects[0];

  if (page === 'projects') {
    return (
      <>
        <header className="pw-header">
          <p className="pw-kicker">Race classification · {projects.length} cars · pick one for the onboard</p>
          <h1 className="pw-h1">
            Classification<span>.</span>
          </h1>
        </header>
        <div className="pw-race">
          <Tower list={projects} active={active} onPick={pick} />
          <div ref={onboardRef}>
            <Onboard p={current} />
          </div>
        </div>
      </>
    );
  }

  const latest = projects.slice(0, 5);
  return (
    <>
      <header className="pw-header pw-header--home">
        <div className="pw-driver">
          <span className="pw-driver__no">09</span>
          <div>
            <p className="pw-kicker">Driver · {profile.location}</p>
            <h1 className="pw-h1">
              Dhruv <span>Choudhary</span>
            </h1>
            <p className="pw-team">Team: Fidelity Investments · {profile.role}</p>
          </div>
        </div>
        <p className="pw-lede">{profile.summary}</p>
      </header>

      <div className="pw-race">
        <Tower list={projects} />
        <section className="pw-control">
          <h2 className="pw-h2">Race control</h2>
          <ul className="pw-messages">
            {latest.map((p, i) => (
              <li key={p.slug}>
                <span className="pw-messages__lap">LAP {42 - i * 3}</span>
                <ProjLink p={p} className="pw-messages__msg">
                  CAR {carNo(p)} ({p.name.toUpperCase()}): {p.stat.toUpperCase()}
                </ProjLink>
              </li>
            ))}
          </ul>
          <h2 className="pw-h2">Team radio</h2>
          {latest.slice(0, 3).map((p) => (
            <p key={p.slug} className="pw-radio">
              <span>{p.name.toUpperCase()}</span>“{teamRadio[p.slug]}”
            </p>
          ))}
        </section>
      </div>

      <section>
        <h2 className="pw-h2">Career</h2>
        <ol className="pw-career">
          {experience.map((e) => (
            <li key={e.role + e.period}>
              <span className="pw-career__season">{e.period}</span>
              <span className="pw-career__team">{e.org.split(',')[0]}</span>
              <span className="pw-career__seat">{e.role}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="pw-box">
        <h2 className="pw-h2">Box, box</h2>
        <div className="pw-box__btns">
          <a href={`mailto:${profile.email}`} className="pw-btn">
            Radio me (email)
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="pw-btn pw-btn--ghost">
            LinkedIn
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="pw-btn pw-btn--ghost">
            Résumé
          </a>
        </div>
      </section>
    </>
  );
}
