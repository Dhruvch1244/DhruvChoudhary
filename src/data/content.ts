export const profile = {
  name: 'Dhruv Choudhary',
  role: 'Software Engineer',
  tagline:
    'I build resilient backend systems, real-time applications, and ML-driven platforms — from enterprise financial pipelines at Fidelity to games people play over a hotspot.',
  location: 'Bangalore, India',
  email: 'dhruvchoudhary306@gmail.com',
  github: 'https://github.com/Dhruvch1244',
  linkedin: 'https://www.linkedin.com/in/dhruvchoudhary1',
  resumeSummary:
    'Software Engineer with experience building enterprise Java backend services, scalable file processing systems, and financial data applications at Fidelity Investments. Skilled in Spring Boot, REST APIs, AWS, Oracle, and Angular, with hands-on experience developing resilient backend workflows, optimizing large-scale data pipelines, and delivering production-ready enterprise software.',
};

export type ExperienceEntry = {
  org: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
  stack: string[];
};

export const experience: ExperienceEntry[] = [
  {
    org: 'Fidelity Investments',
    location: 'Bangalore, India',
    role: 'Executive Graduate Trainee',
    period: 'Aug 2025 — Present',
    bullets: [
      'Developed and enhanced 10+ Java Spring Boot backend services supporting enterprise financial applications, enabling reliable processing of high-volume fixed-income data across multiple business workflows.',
      'Designed and maintained file processing pipelines for structured financial datasets — validation, parsing, orchestration, and downstream integration — supporting 200K+ records per file while ensuring data integrity.',
      'Migrated and modernized 20+ REST APIs within the FFIO platform with retry mechanisms, centralized exception handling, and structured logging, improving reliability and simplifying production troubleshooting.',
      "Leveraged Spring Boot, Docker, Kubernetes, AWS, and Angular to build scalable backend solutions deployed within Fidelity's enterprise ecosystem.",
    ],
    stack: ['Java', 'Spring Boot', 'MyBatis', 'Oracle', 'REST APIs', 'Angular', 'Docker', 'Kubernetes', 'AWS'],
  },
  {
    org: 'Fidelity Investments',
    location: 'Bangalore, India',
    role: 'Software Engineering Intern',
    period: 'Jan 2025 — Jun 2025',
    bullets: [
      'Automated data workflows by engineering a scalable file-orchestration pipeline on AWS S3 and EC2, eliminating manual handling for files with 200K+ records and accelerating downstream data availability.',
      'Built a dynamic Ag-Grid dashboard to query and filter 1M+ records in real time, giving business users immediate access to critical data for faster analysis and decisions.',
    ],
    stack: ['Spring Boot', 'Angular', 'AWS S3', 'EC2', 'Bash', 'Oracle', 'PL/SQL'],
  },
  {
    org: 'Fidelity Investments',
    location: 'Bangalore, India',
    role: 'Summer Intern',
    period: 'Jun 2024 — Aug 2024',
    bullets: [
      'Engineered 8+ reusable Angular components, boosting frontend scalability and cutting UI development time by 25%.',
      'Optimized backend queries by 30% through scalable data models and system architecture enhancements.',
    ],
    stack: ['Angular', 'Spring Boot', 'Figma', 'Oracle'],
  },
  {
    org: 'Samsung R&D Institute',
    location: 'Chennai, India',
    role: 'R&D Intern',
    period: 'Oct 2023 — Feb 2024',
    bullets: [
      'Developed an Android app and REST APIs in Java for a Camera Control Remote App, integrating WebRTC to cut streaming latency by 56% to 22ms, enabling 30fps real-time video.',
    ],
    stack: ['Java', 'Android', 'WebRTC', 'MySQL'],
  },
];

export const education = {
  school: 'SRM Institute of Technology',
  degree: 'B.Tech, Computer Science and Engineering',
  period: 'Sept 2021 — Jul 2025',
  detail: 'CGPA 9.38/10 · Algorithms, Data Structures, Machine Learning, Cloud Computing',
};

export const skillGroups: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
  { label: 'Backend', items: ['Spring Boot', 'REST APIs', 'MyBatis', 'Apache Spark', 'Hive', 'Kafka', 'JMS Queue'] },
  { label: 'Frontend', items: ['Angular', 'React', 'Next.js', 'Flutter', 'React Native'] },
  { label: 'Cloud & DevOps', items: ['AWS (S3, EC2, IAM)', 'Docker', 'Kubernetes', 'Jenkins'] },
  { label: 'Databases', items: ['Oracle', 'PostgreSQL', 'MongoDB', 'PL/SQL'] },
  { label: 'Machine Learning', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'RAG', 'Stable-Baselines3'] },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  internalRoute?: string;
  accent: 'magenta' | 'purple' | 'cyan' | 'gold';
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'kaabo',
    name: 'Kaabo',
    tagline: 'Real-time multiplayer card game — memory, nerve, and a little luck',
    description:
      'A Cabo/Kaboo-inspired card game for 2–8 players, live over Socket.IO. One host runs the server, everyone else joins from a phone browser — peeks, blind swaps, and slap-the-discard powers, all server-authoritative so no one can peek at devtools.',
    stack: ['Node.js', 'Express', 'Socket.IO'],
    github: 'https://github.com/Dhruvch1244/kaabo',
    internalRoute: '/kaabo',
    accent: 'magenta',
    featured: true,
  },
  {
    slug: 'lyric-viewer',
    name: 'Lyric Player',
    tagline: 'A fullscreen, beat-aware lyric overlay for Windows',
    description:
      'Detects whatever is playing system-wide and shows synced, word-level lyrics over nine generative visual presets — liquid GPU fields, a spinning vinyl deck, a wormhole that winds up before a drop it already knows is coming, and pixel-art dancers that jump on the beat.',
    stack: ['Electron', 'Tauri', 'Canvas/WebGL', 'Windows SMTC'],
    github: 'https://github.com/Dhruvch1244/lyric-viewer',
    accent: 'purple',
    featured: true,
  },
  {
    slug: 'batchpilot',
    name: 'BatchPilot',
    tagline: 'SSH environment manager, terminal, and file-transfer console',
    description:
      'A Spring Boot + Angular console for batch operations across named SSH environments — a full browser-based terminal (xterm.js), one-off command execution, an SFTP file manager, and live YARN application tracking, packaged as a single self-contained jar.',
    stack: ['Spring Boot', 'Angular', 'WebSocket', 'SSH/SFTP'],
    github: 'https://github.com/Dhruvch1244/BatchPilot',
    accent: 'cyan',
    featured: true,
  },
  {
    slug: 'review-grader',
    name: 'Review Grader',
    tagline: 'Live scoring platform for a 144-person capstone program',
    description:
      'Scores teams and individuals across 4 review checkpoints for six classes running in parallel — rubric-based team scoring, auto-generated per-student Q&A, offline-first sync over WiFi, and a full analytics dashboard.',
    stack: ['Angular', 'Express', 'TypeScript', 'SQLite'],
    github: 'https://github.com/Dhruvch1244/review-grader',
    accent: 'gold',
  },
  {
    slug: 'file-viewer',
    name: 'Bloomberg File Viewer',
    tagline: 'Native desktop viewer for 2GB+ Bloomberg DIF/GETDATA files',
    description:
      'A .NET 8 / WPF app that stays responsive on multi-gigabyte files with virtualized scrolling, an unmanaged row index, inline editing with full undo, Excel-style column filtering, and multi-format export.',
    stack: ['.NET 8', 'WPF', 'C#'],
    github: 'https://github.com/Dhruvch1244/File-Viewer',
    accent: 'purple',
  },
  {
    slug: 'investlytic',
    name: 'Investlytic',
    tagline: 'RL-driven stock trading platform',
    description:
      'A Next.js trading platform layering reinforcement-learning-driven recommendations on live market data, improving trading decision accuracy by 50% in evaluation. Companion research published on SSRN.',
    stack: ['Next.js', 'Express', 'Python', 'Firebase'],
    accent: 'cyan',
  },
  {
    slug: 'spark',
    name: 'SPARK',
    tagline: 'Smart parking reservation system',
    description:
      'A mobile app for reserving parking slots in real time, paired with an admin dashboard for live monitoring and occupancy tracking.',
    stack: ['React', 'Express', 'MongoDB Atlas'],
    accent: 'gold',
  },
];

export const publication = {
  title: 'Customized Investing in the Marketplace for Stocks using Deep Learning',
  venue: 'SSRN Research Publication, 2025',
  description:
    'First author — led the research, system design, and implementation, integrating LSTM, PPO, and financial market analytics into a unified investment recommendation platform. Implemented ML workflows for price prediction, portfolio optimization, and personalized recommendations, evaluated against historical market data.',
};

export const kaabo = {
  name: 'Kaabo',
  tagline: 'Local-network (or internet) multiplayer card game — Cabo/Kaboo, browser-based, no installs.',
  github: 'https://github.com/Dhruvch1244/kaabo',
  liveUrl: 'https://kaabo-7izx.onrender.com/',
  rules: [
    'Everyone starts with 4 face-down cards. Lowest total wins. Ace = 1, number cards = face value, J = 11, Q = 12, black King = 13, red King = −1.',
    'Look at your own bottom two cards once, at the start of a round.',
    'On your turn: draw from the draw pile or discard pile, then swap it into your row or discard it.',
    'A card discarded straight from a draw-pile draw can trigger its power: 7/8 peek your own card, 9/10 peek an opponent’s, J blind-swaps any two cards, Q/King look at two cards then choose whether to swap.',
    'Anyone can slap a matching rank onto the discard pile out of turn — right guess drops a card, wrong guess adds a penalty.',
    'Call "Kaabo" instead of drawing to end the round. If your total isn’t strictly the lowest after the reveal, take a +10 penalty.',
  ],
  players: '2–8 players',
  howToHost:
    'One device runs the Node.js server (the host) — a laptop or an Android phone via Termux. Everyone else just opens a browser on the same network, or over the internet once deployed.',
};
