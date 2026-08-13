import { profile, experience, education, skillGroups, projects, publication } from '../data/content';
import { boxLines, table } from './textUtils';

export type Line = {
  text: string;
  variant?: 'dim' | 'accent' | 'error' | 'success' | 'header' | 'link';
  href?: string;
};

const t = (text: string, variant?: Line['variant'], href?: string): Line => ({ text, variant, href });

export type CommandContext = {
  history: string[];
  navigate: (path: string) => void;
};

export type CommandOutcome = { lines: Line[]; clear?: boolean };

function triggerDownload(path: string, filename: string) {
  const a = document.createElement('a');
  a.href = path;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function boostMatrix() {
  window.dispatchEvent(new CustomEvent('matrix-boost'));
}

// ---------- file contents ----------

function aboutText(): Line[] {
  return [
    t(
      `Software Engineer building enterprise Java backend services, scalable file`,
    ),
    t(`processing systems, and financial data applications at Fidelity Investments.`),
    t(`Comfortable across Spring Boot, REST APIs, AWS, Oracle, and Angular -- resilient`),
    t(`backend workflows, large-scale data pipelines, production-ready software.`),
    t(''),
    t(`Also ships side projects for fun: a real-time card game, a beat-synced lyric`),
    t(`overlay with a full generative visual engine, and a couple of internal tools`),
    t(`used by actual teams.`),
    t(''),
    ...table([
      ['role', profile.role + ' @ Fidelity Investments'],
      ['location', profile.location],
      ['education', `${education.degree}, ${education.school}`],
      ['', education.detail],
    ]).map((l) => t(l, 'dim')),
  ];
}

function resumeText(): Line[] {
  return [
    ...aboutText(),
    t(''),
    t(`Run 'resume --download' to save the full PDF resume.`, 'accent'),
  ];
}

function experienceText(): Line[] {
  const lines: Line[] = [];
  experience.forEach((job, i) => {
    lines.push(t(`[${job.period}] ${job.org}`, 'header'));
    lines.push(t(`  ${job.role}`, 'accent'));
    job.bullets.forEach((b) => lines.push(t(`  > ${b}`)));
    lines.push(t(`  stack: ${job.stack.join(', ')}`, 'dim'));
    if (i < experience.length - 1) lines.push(t(''));
  });
  return lines;
}

function skillsText(): Line[] {
  const lines: Line[] = [];
  skillGroups.forEach((group) => {
    lines.push(t(`${group.label}:`, 'header'));
    lines.push(t(`  ${group.items.join(', ')}`));
    lines.push(t(''));
  });
  lines.pop();
  return lines;
}

function contactText(): Line[] {
  const hrefs = [`mailto:${profile.email}`, profile.github, profile.linkedin];
  return [
    ...table([
      ['email', profile.email],
      ['github', profile.githubHandle],
      ['linkedin', profile.linkedinHandle],
    ]).map((l, i) => t(l, 'link', hrefs[i])),
    t(''),
    t(`click a line above, or type: contact --email`, 'dim'),
  ];
}

function projectsListText(): Line[] {
  const lines: Line[] = [t('projects/', 'header')];
  projects.forEach((p) => {
    lines.push(t(`  ${p.slug.padEnd(16)} ${p.tagline}`));
  });
  lines.push(t(''));
  lines.push(t(`run: open <project>   e.g. open kaabo`, 'dim'));
  return lines;
}

function projectDetailText(slug: string): Line[] | null {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  const lines: Line[] = [
    t(p.name, 'header'),
    t(p.tagline, 'accent'),
    t(''),
    t(p.description),
    t(''),
    t(`stack: ${p.stack.join(', ')}`, 'dim'),
  ];
  if (p.github) lines.push(t(`source: ${p.github}`, 'link', p.github));
  if (p.liveUrl) lines.push(t(`live:   ${p.liveUrl}`, 'link', p.liveUrl));
  return lines;
}

// ---------- command handlers ----------

type Handler = (args: string[], ctx: CommandContext) => CommandOutcome;

const FILES: Record<string, () => Line[]> = {
  'about.txt': aboutText,
  'resume.txt': resumeText,
  'experience.log': experienceText,
  'skills.txt': skillsText,
  'contact.txt': contactText,
};

const handlers: Record<string, Handler> = {
  help: () => ({
    lines: [
      t('AVAILABLE COMMANDS', 'header'),
      ...table([
        ['whoami', 'who is running this thing'],
        ['about', 'summary'],
        ['ls [dir]', 'list files / projects'],
        ['cat <file>', 'read a file (about.txt, resume.txt, experience.log, skills.txt, contact.txt)'],
        ['experience', 'work history'],
        ['skills', 'toolbox'],
        ['projects', 'list projects'],
        ['open <project>', 'open a project (source + live link if it has one)'],
        ['contact', 'ways to reach me'],
        ['resume --download', 'save the PDF resume'],
        ['publication', 'published research'],
        ['history', 'command history'],
        ['clear', 'clear the screen'],
      ]).map((l) => t(l)),
      t(''),
      t(`tip: click any [command] chip below the prompt instead of typing.`, 'dim'),
    ],
  }),

  whoami: () => ({
    lines: [
      t(`${profile.handle}`, 'accent'),
      t(`uid=1000(${profile.handle}) gid=1000(engineers) groups=1000(engineers),27(backend),42(ml)`, 'dim'),
      t(''),
      t(`${profile.name} -- ${profile.role} @ Fidelity Investments`),
      t(`${profile.location}`),
    ],
  }),

  about: () => ({ lines: aboutText() }),

  ls: (args) => {
    const target = (args[0] ?? '').replace(/\/$/, '');
    if (target === 'projects') return { lines: projectsListText() };
    if (target && target.length > 0) {
      return { lines: [t(`ls: cannot access '${args[0]}': No such file or directory`, 'error')] };
    }
    return {
      lines: [
        t('about.txt      contact.txt    experience.log'),
        t('projects/      resume.txt     skills.txt'),
      ],
    };
  },

  cat: (args) => {
    const file = args[0];
    if (!file) return { lines: [t('usage: cat <file>', 'error')] };
    if (file.startsWith('projects/')) {
      const detail = projectDetailText(file.replace('projects/', ''));
      if (detail) return { lines: detail };
      return { lines: [t(`cat: ${file}: No such file or directory`, 'error')] };
    }
    const fn = FILES[file];
    if (!fn) return { lines: [t(`cat: ${file}: No such file or directory`, 'error')] };
    return { lines: fn() };
  },

  experience: () => ({ lines: experienceText() }),
  skills: () => ({ lines: skillsText() }),
  contact: (args) => {
    if (args[0] === '--email') {
      window.location.href = `mailto:${profile.email}`;
      return { lines: [t(`opening mail client -> ${profile.email}`, 'success')] };
    }
    return { lines: contactText() };
  },

  projects: () => ({ lines: projectsListText() }),

  open: (args, ctx) => {
    const slug = args[0];
    if (!slug) return { lines: [t('usage: open <project>', 'error')] };
    const detail = projectDetailText(slug);
    if (!detail) {
      return { lines: [t(`open: '${slug}' not found. Run 'projects' to list them.`, 'error')] };
    }
    const project = projects.find((p) => p.slug === slug)!;
    const lines = [...detail];
    if (project.liveUrl) {
      lines.push(t(''));
      lines.push(t(`connecting to ${new URL(project.liveUrl).host} ...`, 'dim'));
      lines.push(t(`connected. opening in a new tab.`, 'success'));
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
    if (slug === 'kaabo') ctx.navigate('/kaabo');
    return { lines };
  },

  resume: (args) => {
    if (args[0] === '--download' || args[0] === 'download') {
      triggerDownload('/resume.pdf', 'Dhruv_Choudhary_Resume.pdf');
      return { lines: [t('downloading Dhruv_Choudhary_Resume.pdf ...', 'success')] };
    }
    return { lines: resumeText() };
  },

  download: (args) => {
    if (args[0] === 'resume') {
      triggerDownload('/resume.pdf', 'Dhruv_Choudhary_Resume.pdf');
      return { lines: [t('downloading Dhruv_Choudhary_Resume.pdf ...', 'success')] };
    }
    return { lines: [t(`download: '${args[0] ?? ''}' not found`, 'error')] };
  },

  publication: () => ({
    lines: [
      t(publication.title, 'header'),
      t(publication.venue, 'accent'),
      t(''),
      t(publication.description),
    ],
  }),

  history: (_args, ctx) => ({
    lines: ctx.history.length
      ? ctx.history.map((c, i) => t(`  ${i + 1}  ${c}`))
      : [t('(empty)', 'dim')],
  }),

  date: () => ({ lines: [t(new Date().toString())] }),

  echo: (args) => ({ lines: [t(args.join(' '))] }),

  clear: () => ({ lines: [], clear: true }),
  cls: () => ({ lines: [], clear: true }),

  cd: () => ({
    lines: [t(`cd is decorative here -- try 'ls projects/' or 'open <project>'`, 'dim')],
  }),

  sudo: (args) => {
    if (args.join(' ') === 'hire-me') {
      return {
        lines: [
          t('[sudo] password for guest: ********', 'dim'),
          t('Access granted.', 'success'),
          t('Initiating hiring sequence...'),
          t('[####################] 100%', 'accent'),
          t(`Recruiter.exe notified. Reach out any time -- ${profile.email}`, 'success'),
        ],
      };
    }
    return {
      lines: [
        t('usage: sudo <command>', 'dim'),
        t(`${profile.handle} is not in the sudoers file. This incident will not be reported. Probably.`, 'error'),
      ],
    };
  },

  rm: (args) => {
    if (args.includes('resume') || args.includes('resume.txt') || args.includes('-rf')) {
      return {
        lines: [
          t(`rm: cannot remove '${args[args.length - 1]}': Permission denied`, 'error'),
          t('(nice try though)', 'dim'),
        ],
      };
    }
    return { lines: [t(`rm: '${args.join(' ')}': No such file or directory`, 'error')] };
  },

  matrix: () => {
    boostMatrix();
    return { lines: [t('Wake up...', 'accent'), t('Follow the white rabbit.', 'dim')] };
  },

  coffee: () => ({
    lines: [
      t('      ( ('),
      t('       ) )'),
      t('    ........'),
      t("    |      |]"),
      t('    \\      /'),
      t("     `----'"),
      t('Coffee acquired. Productivity +15%.', 'success'),
    ],
  }),

  exit: () => ({
    lines: [t('There is no escape. (This is a portfolio, not an SSH session -- just close the tab.)', 'dim')],
  }),
  logout: () => handlers.exit([], { history: [], navigate: () => {} }),
  quit: () => handlers.exit([], { history: [], navigate: () => {} }),

  neofetch: () => ({
    lines: boxLines([`${profile.handle}@${profile.host}`, '', `OS: DHRUVOS v2.5.1026`, `Role: ${profile.role}`, `Uptime: since 2021`]).map(
      (l) => t(l, 'accent'),
    ),
  }),
};

export const KNOWN_COMMANDS = Object.keys(handlers).sort();
export const FILE_NAMES = Object.keys(FILES);
export const PROJECT_SLUGS = projects.map((p) => p.slug);

export function runCommand(raw: string, ctx: CommandContext): CommandOutcome {
  const trimmed = raw.trim();
  if (!trimmed) return { lines: [] };
  const [cmd, ...args] = trimmed.split(/\s+/);
  const key = cmd.toLowerCase();
  const handler = handlers[key];
  if (!handler) {
    return {
      lines: [t(`command not found: ${cmd}`, 'error'), t(`type 'help' to see available commands`, 'dim')],
    };
  }
  return handler(args, ctx);
}
