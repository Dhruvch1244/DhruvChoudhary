import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { profile, experience, skillGroups, education } from '../data/content';
import { WORLDS, type WorldId } from '../data/worlds';
import { projectCover } from '../data/projectMedia';
import ProjectImg from '../components/ProjectImg';
import { useWorld } from '../lib/worldContext';
import { commitLine } from './copy';
import ProjLink from './ProjLink';
import { featuredProjects, projectHref, projects, type Project } from './shared';

const USER = 'dhruv@portfolio';

function Prompt({ cmd, cwd = '~' }: { cmd: string; cwd?: string }) {
  return (
    <div className="tw-line">
      <span className="tw-user">{USER}</span>:<span className="tw-cwd">{cwd}</span>$ <span className="tw-cmd">{cmd}</span>
    </div>
  );
}

function Block({ cmd, cwd, children }: { cmd: string; cwd?: string; children: ReactNode }) {
  return (
    <section className="tw-block">
      <Prompt cmd={cmd} cwd={cwd} />
      <div className="tw-out">{children}</div>
    </section>
  );
}

function Ls({ list }: { list: Project[] }) {
  return (
    <div className="tw-ls" role="table" aria-label="Projects">
      {list.map((p) => (
        <div className="tw-ls__row" role="row" key={p.slug}>
          <span className="tw-dim" role="cell">
            drwxr-xr-x
          </span>
          <span className="tw-dim" role="cell">
            {p.year}
          </span>
          <span className="tw-kind" role="cell">
            {p.kind.padEnd(11, ' ')}
          </span>
          <span role="cell">
            <ProjLink p={p} className="tw-link">
              {p.slug}/
            </ProjLink>
          </span>
          <span className="tw-dim tw-ls__stat" role="cell">
            # {p.stat}
          </span>
        </div>
      ))}
    </div>
  );
}

const HELP = [
  ['help', 'this list'],
  ['ls', 'list projects'],
  ['open <project>', 'open a project, e.g. open selecta'],
  ['cd <page>', 'projects · experience · music · contact'],
  ['whoami', 'who is this'],
  ['resume', 'open the résumé'],
  ['world <name>', WORLDS.map((w) => w.id).join(' · ')],
  ['clear', 'clear the screen'],
];

/** A real prompt: a handful of commands that drive the actual site. */
function Shell() {
  const navigate = useNavigate();
  const { setWorld } = useWorld();
  const [lines, setLines] = useState<ReactNode[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lines.length) endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [lines]);

  function run(raw: string) {
    const input = raw.trim();
    const [cmd, ...args] = input.split(/\s+/);
    const arg = args.join(' ').toLowerCase();
    const echo = <Prompt key={`p${lines.length}`} cmd={input} />;
    let out: ReactNode = null;
    switch (cmd?.toLowerCase()) {
      case '':
        break;
      case 'help':
        out = (
          <div className="tw-help">
            {HELP.map(([c, d]) => (
              <div key={c}>
                <span className="tw-cmd">{c.padEnd(16, ' ')}</span>
                <span className="tw-dim">{d}</span>
              </div>
            ))}
          </div>
        );
        break;
      case 'ls':
        out = <Ls list={projects} />;
        break;
      case 'whoami':
        out = `${profile.name} -- ${profile.role}, ${profile.location}`;
        break;
      case 'open': {
        const p = projects.find((x) => x.slug === arg || x.name.toLowerCase() === arg);
        const href = p && projectHref(p);
        if (!p || !href) out = `open: ${arg || '?'}: no such project (try ls)`;
        else if (href.internal) {
          navigate(href.to);
          return;
        } else {
          window.open(href.to, '_blank', 'noreferrer');
          out = `opened ${href.to}`;
        }
        break;
      }
      case 'cd': {
        const pages: Record<string, string> = { projects: '/projects', experience: '/experience', music: '/music', contact: '/contact', '~': '/', '': '/' };
        if (arg in pages) {
          navigate(pages[arg]);
          return;
        }
        out = `cd: ${arg}: no such directory`;
        break;
      }
      case 'resume':
        window.open('/resume.pdf', '_blank', 'noreferrer');
        out = 'opened resume.pdf';
        break;
      case 'world': {
        const w = WORLDS.find((x) => x.id === arg || x.name.toLowerCase() === arg);
        if (w) {
          setWorld(w.id as WorldId);
          return;
        }
        out = `world: try one of ${WORLDS.map((x) => x.id).join(', ')}`;
        break;
      }
      case 'clear':
        setLines([]);
        return;
      case 'sudo':
        out = arg.includes('hire') ? `[sudo] permission granted. -> ${profile.email}` : 'nice try.';
        break;
      case 'exit':
        out = "there's no leaving. try: world constellation";
        break;
      default:
        out = `${cmd}: command not found (try help)`;
    }
    setLines((l) => [...l, echo, out !== null ? <div key={`o${l.length}`} className="tw-out">{out}</div> : null]);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      run(value);
      if (value.trim()) setHistory((h) => [value, ...h].slice(0, 30));
      setValue('');
      setHIdx(-1);
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      setHIdx(i);
      setValue(history[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : '');
    }
  }

  return (
    <section className="tw-block tw-shell" onClick={() => inputRef.current?.focus()}>
      {lines}
      <label className="tw-line tw-input-line">
        <span className="tw-user">{USER}</span>:<span className="tw-cwd">~</span>$&nbsp;
        <input
          ref={inputRef}
          className="tw-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Terminal command (type help)"
          placeholder="type help"
        />
      </label>
      <div ref={endRef} />
    </section>
  );
}

function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="tw-window">
      <div className="tw-bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <div className="tw-body">{children}</div>
    </div>
  );
}

function Readme({ p }: { p: Project }) {
  const cover = projectCover(p.slug);
  return (
    <Block cmd={`cat ${p.slug}/README.md`} cwd="~/projects">
      <article className="tw-readme">
        <h2 className="tw-h"># {p.name}</h2>
        <p className="tw-dim">&gt; {p.tagline}</p>
        {cover && (
          <ProjLink p={p} className="tw-imgcat">
            <ProjectImg img={cover} sizes="(max-width: 860px) 100vw, 640px" />
          </ProjLink>
        )}
        <p>{p.description}</p>
        <p>
          <span className="tw-kind">stack:</span> {p.stack.join(', ')}
        </p>
        <p>
          <span className="tw-kind">HEAD:</span> <span className="tw-commit">{commitLine[p.slug]}</span>
        </p>
        <ProjLink p={p} className="tw-link">
          -&gt; open {p.slug}
        </ProjLink>
      </article>
    </Block>
  );
}

export default function TerminalWorld({ page }: { page: 'home' | 'projects' }) {
  if (page === 'projects') {
    return (
      <Window title="~/projects — zsh">
        <Block cmd="ls -la ~/projects --sort=time" cwd="~/projects">
          <p className="tw-dim">total {projects.length}</p>
          <Ls list={projects} />
        </Block>
        {projects.map((p) => (
          <Readme key={p.slug} p={p} />
        ))}
        <Shell />
      </Window>
    );
  }

  const featured = featuredProjects();
  return (
    <Window title={`${USER} — zsh — 120×40`}>
      <Block cmd="whoami">
        <h1 className="tw-title">
          {profile.name}
          <span className="tw-cursor" aria-hidden="true" />
        </h1>
        <p>
          {profile.role} @ Fidelity Investments · {profile.location}
        </p>
      </Block>
      <Block cmd="cat about.txt">
        <p className="tw-para">{profile.summary}</p>
      </Block>
      <Block cmd="git log --oneline --all -4">
        {featured.map((p, i) => (
          <div className="tw-log" key={p.slug}>
            <span className="tw-hash">{(0xa1f3c9 + i * 0x2f1b7).toString(16).slice(0, 7)}</span>{' '}
            <ProjLink p={p} className="tw-link">
              ({p.slug})
            </ProjLink>{' '}
            {commitLine[p.slug]}
          </div>
        ))}
      </Block>
      <Block cmd="ls ~/projects --sort=time">
        <Ls list={projects} />
      </Block>
      <Block cmd="cat experience.log">
        {experience.map((e) => (
          <div className="tw-log" key={e.role + e.period}>
            <span className="tw-hash">[{e.period}]</span> {e.role} <span className="tw-dim">@ {e.org}</span>
          </div>
        ))}
        <div className="tw-log">
          <span className="tw-hash">[{education.period}]</span> {education.degree}{' '}
          <span className="tw-dim">@ {education.school}</span>
        </div>
      </Block>
      <Block cmd="cat stack.json">
        <pre className="tw-pre">
          {'{\n' +
            skillGroups.map((g) => `  "${g.label}": [${g.items.map((i) => `"${i}"`).join(', ')}]`).join(',\n') +
            '\n}'}
        </pre>
      </Block>
      <Block cmd="contact --list">
        <div className="tw-help">
          <div>
            <span className="tw-kind">email   </span>
            <a className="tw-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <div>
            <span className="tw-kind">github  </span>
            <a className="tw-link" href={profile.github} target="_blank" rel="noreferrer">
              {profile.githubHandle}
            </a>
          </div>
          <div>
            <span className="tw-kind">linkedin</span>{' '}
            <a className="tw-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              {profile.linkedinHandle}
            </a>
          </div>
          <div>
            <span className="tw-kind">resume  </span>
            <a className="tw-link" href="/resume.pdf" target="_blank" rel="noreferrer">
              resume.pdf
            </a>
          </div>
        </div>
      </Block>
      <Shell />
    </Window>
  );
}
