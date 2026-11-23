export const profile = {
  name: 'Dhruv Choudhary',
  handle: 'dhruv',
  host: 'dhruvchoudhary.com',
  role: 'Software Engineer',
  location: 'Bangalore, India',
  email: 'dhruvchoudhary306@gmail.com',
  github: 'https://github.com/Dhruvch1244',
  githubHandle: 'github.com/Dhruvch1244',
  linkedin: 'https://www.linkedin.com/in/dhruvchoudhary1',
  linkedinHandle: 'linkedin.com/in/dhruvchoudhary1',
  twitter: 'https://x.com/cdrv546068',
  twitterHandle: '@cdrv546068',
  instagram: 'https://www.instagram.com/dhruv_ch_1',
  instagramHandle: '@dhruv_ch_1',
  spotify: 'https://open.spotify.com/user/nqx5gu3lxttda59rke7he07nw',
  spotifyHandle: 'Spotify profile',
  tagline: 'I build resilient backend systems, real-time apps, and the occasional game people actually play.',
  summary:
    'Software Engineer at Fidelity Investments, working on enterprise Java backend services, large-scale file processing pipelines, and financial data applications. Comfortable across Spring Boot, REST APIs, AWS, Oracle, and Angular -- most at home turning a messy operational problem into a resilient, production-ready system. Outside of work: a real-time card game people actually play over a hotspot, and a lyric overlay with more visual engineering in it than the day job strictly requires.',
};

export type ExperienceEntry = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  stack: string[];
};

export const experience: ExperienceEntry[] = [
  {
    org: 'Fidelity Investments, Bangalore',
    role: 'Software Engineer',
    period: 'Aug 2026 - Present',
    bullets: [],
    stack: ['Java', 'Spring Boot', 'MyBatis', 'Oracle', 'Angular', 'Docker', 'Kubernetes', 'AWS'],
  },
  {
    org: 'Fidelity Investments, Bangalore',
    role: 'Executive Graduate Trainee',
    period: 'Aug 2025 - Jul 2026',
    bullets: [
      'Built/enhanced 10+ Java Spring Boot services for enterprise financial apps, processing high-volume fixed-income data.',
      'Designed file pipelines (validation, parsing, orchestration) supporting 200K+ records/file.',
      'Modernized 20+ REST APIs on the FFIO platform: retries, centralized exception handling, structured logging.',
      'Shipped on Spring Boot, Docker, Kubernetes, AWS, and Angular inside Fidelity\'s enterprise ecosystem.',
    ],
    stack: ['Java', 'Spring Boot', 'MyBatis', 'Oracle', 'Angular', 'Docker', 'Kubernetes', 'AWS'],
  },
  {
    org: 'Fidelity Investments, Bangalore',
    role: 'Software Engineering Intern',
    period: 'Jan 2025 - Jun 2025',
    bullets: [
      'Built a file-orchestration pipeline on AWS S3/EC2 for 200K+ record files, killing a manual process.',
      'Shipped an Ag-Grid dashboard for real-time queries across 1M+ records.',
    ],
    stack: ['Spring Boot', 'Angular', 'AWS S3', 'EC2', 'Bash', 'Oracle', 'PL/SQL'],
  },
  {
    org: 'Fidelity Investments, Bangalore',
    role: 'Summer Intern',
    period: 'Jun 2024 - Aug 2024',
    bullets: [
      'Built 8+ reusable Angular components; cut UI dev time 25%.',
      'Optimized backend queries 30% via better data models.',
    ],
    stack: ['Angular', 'Spring Boot', 'Figma', 'Oracle'],
  },
  {
    org: 'Samsung R&D Institute, Chennai',
    role: 'R&D Intern',
    period: 'Oct 2023 - Feb 2024',
    bullets: [
      'Built an Android app + Java REST APIs for a Camera Control Remote App.',
      'Cut WebRTC streaming latency 56% to 22ms, enabling real 30fps video.',
    ],
    stack: ['Java', 'Android', 'WebRTC', 'MySQL'],
  },
];

export const education = {
  school: 'SRM Institute of Technology',
  degree: 'B.Tech, Computer Science and Engineering',
  period: 'Sept 2021 - Jul 2025',
  detail: 'CGPA 9.38/10 -- Algorithms, Data Structures, Machine Learning, Cloud Computing',
};

export const skillGroups: { label: string; items: string[] }[] = [
  { label: 'languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
  { label: 'backend', items: ['Spring Boot', 'REST APIs', 'MyBatis', 'Apache Spark', 'Hive', 'Kafka', 'JMS Queue'] },
  { label: 'frontend', items: ['Angular', 'React', 'Next.js', 'Flutter', 'React Native'] },
  { label: 'cloud_devops', items: ['AWS (S3, EC2, IAM)', 'Docker', 'Kubernetes', 'Jenkins'] },
  { label: 'databases', items: ['Oracle', 'PostgreSQL', 'MongoDB', 'PL/SQL'] },
  { label: 'machine_learning', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'RAG', 'Stable-Baselines3'] },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  github?: string;
  liveUrl?: string;
  /** year it was last actively built */
  year: number;
  kind: 'desktop app' | 'web app' | 'platform' | 'game' | 'dev tool' | 'research';
  /** the one number or fact that sells it -- worlds reuse this in their own voice */
  stat: string;
};

export const projects: Project[] = [
  {
    slug: 'selecta',
    name: 'Selecta',
    tagline: 'a local AI DJ -- describe the set, it builds and performs it from your own library',
    description:
      'Type "crazy DnB" or "friends are coming, Bollywood" and Selecta picks, orders and performs a set from your own music: beatmatched, phrase-aware transitions, an FX director that builds into drops, stems, keylock, and optional AI curation through the Claude CLI. Tauri 2 shell, Rust analysis core, React UI on dsgn.',
    stack: ['Rust', 'Tauri 2', 'React', 'Web Audio', 'TypeScript', 'Claude CLI'],
    github: 'https://github.com/Dhruvch1244/Selecta',
    year: 2026,
    kind: 'desktop app',
    stat: 'prompt -> full beatmatched set',
  },
  {
    slug: 'dsgn',
    name: 'dsgn',
    tagline: 'cross-AI design philosophy + component registry + CLI, published on npm',
    description:
      'A portable design philosophy any AI coding tool can read, backed by a real Radix/Tailwind/CVA component registry. `npx @dhruvchoudhary/dsgn add button` copies component source straight into your project -- no runtime dependency, same instinct as shadcn/ui -- and `dsgn skill` installs the philosophy natively for Claude Code, Cursor, Windsurf, Copilot, or Gemini.',
    stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Radix UI', 'Node.js CLI'],
    github: 'https://github.com/dhruvch1244/design',
    liveUrl: 'https://design.dhruvchoudhary.com',
    year: 2026,
    kind: 'dev tool',
    stat: '56 components, 6 AI tools',
  },
  {
    slug: 'lyric-viewer',
    name: 'Lyric Overlay',
    tagline: 'fullscreen beat-aware lyric overlay for Windows',
    description:
      'Detects whatever is playing system-wide, shows synced word-level lyrics over nine generative visual presets -- liquid GPU fields, a spinning vinyl deck, a wormhole that anticipates the drop.',
    stack: ['Rust', 'Tauri v2', 'Canvas/WebGL', 'Windows SMTC'],
    github: 'https://github.com/Dhruvch1244/lyric-viewer',
    liveUrl: 'https://lyricoverlay.dhruvchoudhary.com/',
    year: 2026,
    kind: 'desktop app',
    stat: 'installer 116MB -> 30MB',
  },
  {
    slug: 'kaabo',
    name: 'Kaabo',
    tagline: 'real-time multiplayer card game (Cabo/Kaboo), 2-8 players, browser-based',
    description:
      'Socket.IO card game. One host runs the server, everyone else joins from a phone browser -- peeks, blind swaps, and slap-the-discard powers, all server-authoritative so no devtools peeking.',
    stack: ['Node.js', 'Express', 'Socket.IO'],
    github: 'https://github.com/Dhruvch1244/kaabo',
    liveUrl: 'https://kaabo.dhruvchoudhary.com/',
    year: 2026,
    kind: 'game',
    stat: '2-8 players, zero installs',
  },
  {
    slug: 'file-viewer',
    name: 'File Viewer',
    tagline: 'native Windows viewer/editor for Bloomberg DIF files up to 2 GB',
    description:
      'A .NET 8 / WPF desktop app that opens multi-gigabyte Bloomberg DIF/GETDATA files instantly: background indexing, a virtualized grid that only decodes on-screen rows, one-pass parallel search and filtering that rejects rows on raw bytes before decoding, inline editing with full undo, and DIF/CSV/TSV/JSON export.',
    stack: ['C#', '.NET 8', 'WPF', 'xUnit', 'BenchmarkDotNet'],
    github: 'https://github.com/Dhruvch1244/File-Viewer',
    year: 2026,
    kind: 'desktop app',
    stat: 'search 2M rows: 1827ms -> 79ms',
  },
  {
    slug: 'fauxnance',
    name: 'Fauxnance',
    tagline: 'event-driven trading platform -- Kafka, microservices, an analytics side-car',
    description:
      'Angular frontend, NestJS auth issuing JWTs, a Spring Boot/MyBatis trade API that publishes orders to Kafka, a trade executor that settles order + cash + position in one JDBC transaction against Postgres, and a DuckDB/Streamlit analytics side-car fed by a read-only ETL. Everything in Docker; Kafka on its own stack to simulate a separate host.',
    stack: ['Spring Boot', 'Kafka', 'NestJS', 'Angular', 'Postgres', 'DuckDB', 'Docker'],
    github: 'https://github.com/Dhruvch1244/trading-system',
    year: 2026,
    kind: 'platform',
    stat: '7 services, 1 transaction per trade',
  },
  {
    slug: 'investlytic',
    name: 'Investlytic',
    tagline: 'RL-driven stock trading platform',
    description:
      'Next.js trading platform layering reinforcement-learning recommendations on live market data -- improved trading decision accuracy 50% in evaluation. Companion research published on SSRN.',
    stack: ['Next.js', 'Express', 'Python', 'Firebase'],
    year: 2025,
    kind: 'research',
    stat: '+50% decision accuracy',
  },
  {
    slug: 'batchpilot',
    name: 'BatchPilot',
    tagline: 'SSH environment manager, browser terminal and file-transfer console for batch ops',
    description:
      'Named environments (DEV, UAT, custom) reached over SSH with PuTTY .ppk keys: a full xterm.js terminal bridged to a PTY over WebSocket, one-off Quick Execute, an SFTP file manager, a YARN applications view, a pipeline stage tracker and an S3 explorer -- Spring Boot backend, Angular 17 signals frontend, shipped as one zip.',
    stack: ['Spring Boot', 'Angular 17', 'xterm.js', 'SSH/SFTP', 'WebSocket'],
    github: 'https://github.com/Dhruvch1244/BatchPilot',
    year: 2026,
    kind: 'dev tool',
    stat: 'terminal + SFTP + YARN in one tab',
  },
  {
    slug: 'review-grader',
    name: 'Review Grader',
    tagline: 'offline-first scoring for 144 people across 4 capstone reviews',
    description:
      'Runs as one instance on a host laptop; reviewers join over WiFi. Rubric baselines per team, per-student Q&A deltas and a grace mark, all on SQLite -- with an IndexedDB write queue so scoring keeps working when the WiFi drops mid-review and syncs when it comes back.',
    stack: ['Angular 17', 'Express', 'TypeScript', 'SQLite', 'IndexedDB'],
    github: 'https://github.com/Dhruvch1244/Review-Grader',
    year: 2026,
    kind: 'web app',
    stat: '144 people, works offline',
  },
  {
    slug: 'forkfast',
    name: 'ForkFast',
    tagline: 'an incident-review game: a food-delivery app shipped with 15 bugs to fix in order',
    description:
      'Angular 21 (zoneless, signals) food-delivery app where each fix unlocks the next screen, plus a reviewer desk that resets the code per candidate, archives their diff, times a 3-minute box and briefs the reviewer with the questions to ask.',
    stack: ['Angular 21', 'Signals', 'Vitest', 'TypeScript'],
    github: 'https://github.com/Dhruvch1244/Test-Game',
    year: 2026,
    kind: 'game',
    stat: '15 incidents, 3 minutes each',
  },
  {
    slug: 'spark',
    name: 'SPARK',
    tagline: 'smart parking reservation system',
    description: 'Mobile app for reserving parking slots in real time, paired with an admin dashboard for live occupancy monitoring.',
    stack: ['React', 'Express', 'MongoDB Atlas'],
    github: 'https://github.com/Dhruvch1244/Smart-parking-system',
    year: 2024,
    kind: 'web app',
    stat: '156 slots read from CCTV',
  },
];

export const leadership = {
  role: 'Leap Alumni Contributor',
  org: 'Fidelity Investments',
  items: [
    'Delivered technical knowledge-sharing sessions on GitHub Copilot, demonstrating AI-assisted development workflows and productivity practices.',
    'Ran Level Up mentoring sessions for incoming interns -- enterprise engineering practices, collaboration workflows, modern tooling.',
    'Organized three internal engagement events, coordinating planning, communication, and cross-functional participation.',
  ],
};

export const publication = {
  title: 'Customized Investing in the Marketplace for Stocks using Deep Learning',
  venue: 'SSRN Research Publication, 2025',
  description:
    'First author -- led research, system design, and implementation, integrating LSTM, PPO, and financial market analytics into a unified investment recommendation platform.',
};

export const kaabo = {
  name: 'Kaabo',
  tagline: 'A real-time multiplayer card game -- Cabo/Kaboo, browser-based, no installs.',
  github: 'https://github.com/Dhruvch1244/kaabo',
  liveUrl: 'https://kaabo.dhruvchoudhary.com/',
  players: '2-8 players',
  howToHost:
    'One device runs the Node.js server -- a laptop, or an Android phone via Termux. Everyone else just opens a browser, on the same network or over the internet once deployed.',
  rules: [
    'Everyone starts with 4 face-down cards. Lowest total wins. Ace = 1, number cards = face value, J = 11, Q = 12, black King = 13, red King = -1.',
    'Look at your own bottom two cards once, at the start of a round.',
    'On your turn: draw from the draw pile or discard pile, then swap it into your row or discard it.',
    'A card discarded straight from a draw-pile draw can trigger its power: 7/8 peek your own card, 9/10 peek an opponent\'s, J blind-swaps any two cards, Q/King look at two cards then choose whether to swap.',
    'Anyone can slap a matching rank onto the discard pile out of turn -- right guess drops a card, wrong guess adds a penalty.',
    'Call "Kaabo" instead of drawing to end the round. If your total isn\'t strictly the lowest after the reveal, take a +10 penalty.',
  ],
};
