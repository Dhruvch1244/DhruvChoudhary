export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  summary: string;
  problem: string;
  approach: string[];
  stack: string[];
  outcomes: string[];
  github?: string;
  liveUrl?: string;
  demoUrl?: string;
  researchLink?: string;
  research?: {
    title: string;
    venue: string;
    note: string;
    href?: string;
  };
  images?: { src: string; alt: string; caption: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'lyric-viewer',
    name: 'Lyric Overlay',
    tagline: 'A fullscreen, beat-aware synced lyric overlay for Windows.',
    role: 'Solo developer -- design, audio-reactive engine, and native rewrite',
    summary:
      'Detects whatever is already playing on a Windows machine and shows synced, word-level lyrics fullscreen over one of nine generative visual presets, all reacting to the actual audio in real time.',
    problem:
      "Lyric apps either need the source track uploaded to a service, or they show lyrics as a flat scrolling list disconnected from the music. Neither gets you something you'd actually want on a second monitor or a stream -- the words don't move like the song does, and you have to tell the app what's playing instead of it just knowing.",
    approach: [
      'System-wide "now playing" detection via the Windows System Media Transport Controls (SMTC) API -- no manual track entry, works with Spotify, YouTube Music, or anything else that registers with Windows.',
      'Nine generative visual presets (liquid GPU fields, a spinning vinyl deck with a creeping tonearm, a wormhole that constricts before a drop it already anticipates, dancing sprite artists, a near-zero-cost "ghost" mode for overlaying on games) driven by a measured tempo, kick/drop detector, and a learned per-song energy map -- so a replay shows the drop on screen while the build-up is still playing.',
      'On-device Whisper transcription compiled to WebAssembly for tracks with no synced lyrics available, so timing generation never leaves the machine.',
      "Rewrote the entire app from Electron to Tauri v2 partway through -- the installer dropped from ~116MB to ~30MB by using Windows' built-in WebView2 instead of bundling Chromium, and the backend (SMTC detection, three lyric-source integrations, translation/transliteration, wallpaper mode, global hotkeys, the updater) was reimplemented natively in Rust.",
      'Cross-platform release pipeline building signed installers for Windows, macOS, and Linux from one CI workflow, with Authenticode signing via SignPath so the Windows installer carries a real publisher identity instead of triggering a bare SmartScreen block.',
    ],
    stack: ['Rust', 'Tauri v2', 'WebGL/Canvas', 'WebAssembly (Whisper)', 'Windows SMTC', 'GitHub Actions'],
    outcomes: [
      '~74% smaller installer after the Tauri rewrite (116MB -> 30MB), with an unchanged visual layer -- same renderer, different host.',
      'Full spine shipped: detection -> lyric lookup -> synced fullscreen playback, plus a Latin/Devanagari script toggle and English translation for Hindi tracks.',
      'Packaged for the Microsoft Store (MSIX) in addition to a direct signed installer.',
    ],
    github: 'https://github.com/Dhruvch1244/lyric-viewer',
    liveUrl: 'https://lyricoverlay.dhruvchoudhary.com/',
    demoUrl: 'https://lyricoverlay.dhruvchoudhary.com/demo.html',
    images: [
      { src: '/case-studies/lyric-viewer/vinyl.jpg', alt: 'Vinyl preset', caption: 'Vinyl -- cover art as a record on a deck, turning one revolution every four beats once tempo locks.' },
      { src: '/case-studies/lyric-viewer/wormhole.jpg', alt: 'Wormhole preset', caption: 'Wormhole -- a tunnel that constricts and winds up in the seconds before a drop it already knows is coming.' },
      { src: '/case-studies/lyric-viewer/heatmap.jpg', alt: 'Heatmap preset', caption: "Heatmap -- the song's shape learned by listening once, remembered on every replay." },
    ],
  },
  {
    slug: 'investlytic',
    name: 'Investlytic',
    tagline: 'A reinforcement-learning-driven stock trading platform.',
    role: 'First author -- research, system design, and implementation',
    summary:
      'A Next.js trading platform that layers reinforcement-learning recommendations on top of live market data, built alongside a companion research paper published on SSRN.',
    problem:
      'Most retail-facing "smart investing" tools are either a thin wrapper around static rules, or a research notebook that never becomes something you can actually use against live data. The gap was building both halves properly: a model worth publishing, and a platform that serves its output in real time.',
    approach: [
      'Combined LSTM sequence models with a PPO (Proximal Policy Optimization) reinforcement-learning agent to generate trading recommendations, rather than relying on either time-series forecasting or RL alone.',
      'Built the serving platform in Next.js with an Express API layer, pulling live market data and surfacing recommendations through a real dashboard instead of a static report.',
      'Firebase for auth and persistence, keeping the platform itself lightweight while the modeling stayed the deep part of the stack.',
      'Evaluated the recommendation pipeline against baseline strategies to quantify the actual lift from the RL layer, not just report that it "worked."',
    ],
    stack: ['Next.js', 'Express', 'Python', 'PyTorch', 'Firebase'],
    outcomes: [
      'Improved trading decision accuracy by 50% in evaluation against baseline strategies.',
      'Research published: "Customized Investing in the Marketplace for Stocks using Deep Learning" -- SSRN, 2025.',
    ],
    research: {
      title: 'Customized Investing in the Marketplace for Stocks using Deep Learning',
      venue: 'SSRN Research Publication, 2025',
      note: 'First author -- led research, system design, and implementation, integrating LSTM, PPO, and financial market analytics into a unified investment recommendation platform.',
      href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5846062',
    },
  },
  {
    slug: 'spark',
    name: 'SPARK',
    tagline: 'A real-time smart parking reservation system.',
    role: 'Contributor -- mobile app and admin dashboard',
    summary:
      'A mobile app for reserving parking slots in real time, paired with an admin dashboard for live occupancy monitoring -- built and researched with a collaborator.',
    problem:
      'Parking availability is normally invisible until you\'re already circling the lot. Reserving a slot ahead of time needs live occupancy data flowing both ways: drivers need to see and hold a spot, and the lot operator needs a real-time view of what\'s actually filled.',
    approach: [
      'React-based mobile app for finding and reserving a slot in real time.',
      'Express + MongoDB Atlas backend keeping reservation state and occupancy in sync across every connected client.',
      'A companion admin dashboard for live occupancy monitoring, separate from the driver-facing reservation flow.',
      "Contributed alongside a collaborator whose research on the system's underlying approach was published on SSRN.",
    ],
    stack: ['React', 'Express', 'MongoDB Atlas'],
    outcomes: [
      'Shipped both the reservation app and the operator-facing occupancy dashboard as one connected system.',
    ],
    github: 'https://github.com/Dhruvch1244/Smart-parking-system',
    researchLink: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5852982',
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
