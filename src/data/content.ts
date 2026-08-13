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
    role: 'Executive Graduate Trainee',
    period: 'Aug 2025 - Present',
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
};

export const projects: Project[] = [
  {
    slug: 'kaabo',
    name: 'Kaabo',
    tagline: 'real-time multiplayer card game (Cabo/Kaboo), 2-8 players, browser-based',
    description:
      'Socket.IO card game. One host runs the server, everyone else joins from a phone browser -- peeks, blind swaps, and slap-the-discard powers, all server-authoritative so no devtools peeking.',
    stack: ['Node.js', 'Express', 'Socket.IO'],
    github: 'https://github.com/Dhruvch1244/kaabo',
    liveUrl: 'https://kaabo-7izx.onrender.com/',
  },
  {
    slug: 'lyric-viewer',
    name: 'Lyric Player',
    tagline: 'fullscreen beat-aware lyric overlay for Windows',
    description:
      'Detects whatever is playing system-wide, shows synced word-level lyrics over nine generative visual presets -- liquid GPU fields, a spinning vinyl deck, a wormhole that anticipates the drop.',
    stack: ['Electron', 'Tauri', 'Canvas/WebGL', 'Windows SMTC'],
    github: 'https://github.com/Dhruvch1244/lyric-viewer',
  },
  {
    slug: 'batchpilot',
    name: 'BatchPilot',
    tagline: 'SSH environment manager, terminal, and file-transfer console',
    description:
      'Spring Boot + Angular console for batch ops across SSH environments -- full browser terminal (xterm.js), one-off command exec, SFTP file manager, live YARN app tracking. Packaged as one self-contained jar.',
    stack: ['Spring Boot', 'Angular', 'WebSocket', 'SSH/SFTP'],
    github: 'https://github.com/Dhruvch1244/BatchPilot',
  },
  {
    slug: 'review-grader',
    name: 'Review Grader',
    tagline: 'live scoring platform for a 144-person capstone program',
    description:
      'Scores teams/individuals across 4 review checkpoints for six classes running in parallel -- rubric-based scoring, auto-generated Q&A, offline-first sync, full analytics dashboard.',
    stack: ['Angular', 'Express', 'TypeScript', 'SQLite'],
    github: 'https://github.com/Dhruvch1244/review-grader',
  },
  {
    slug: 'file-viewer',
    name: 'Bloomberg File Viewer',
    tagline: 'native desktop viewer for 2GB+ Bloomberg DIF/GETDATA files',
    description:
      '.NET 8 / WPF app, stays responsive on multi-gigabyte files via virtualized scrolling, unmanaged row index, inline editing with full undo, Excel-style column filtering, multi-format export.',
    stack: ['.NET 8', 'WPF', 'C#'],
    github: 'https://github.com/Dhruvch1244/File-Viewer',
  },
  {
    slug: 'investlytic',
    name: 'Investlytic',
    tagline: 'RL-driven stock trading platform',
    description:
      'Next.js trading platform layering reinforcement-learning recommendations on live market data -- improved trading decision accuracy 50% in evaluation. Companion research published on SSRN.',
    stack: ['Next.js', 'Express', 'Python', 'Firebase'],
  },
  {
    slug: 'spark',
    name: 'SPARK',
    tagline: 'smart parking reservation system',
    description: 'Mobile app for reserving parking slots in real time, paired with an admin dashboard for live occupancy monitoring.',
    stack: ['React', 'Express', 'MongoDB Atlas'],
  },
];

export const publication = {
  title: 'Customized Investing in the Marketplace for Stocks using Deep Learning',
  venue: 'SSRN Research Publication, 2025',
  description:
    'First author -- led research, system design, and implementation, integrating LSTM, PPO, and financial market analytics into a unified investment recommendation platform.',
};
