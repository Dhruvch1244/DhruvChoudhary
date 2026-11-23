// Generated from the screenshots in public/projects/<slug>/ (each image ships
// at 800w and 1600w as WebP). w/h are the 1600w intrinsic size, used to
// reserve layout space so nothing jumps while images load.
export type ProjectImage = { slug: string; name: string; alt: string; caption: string; w: number; h: number };

const raw: Record<string, Omit<ProjectImage, 'slug'>[]> = {
  selecta: [
    {
      name: 'cover',
      alt: 'Selecta mid-transition in a planned DnB set',
      caption: 'Mid-set: a planned "crazy DnB" set, deck A handing over to deck B with the bar lines aligned.',
      w: 1480,
      h: 920,
    },
    {
      name: 'fx-live',
      alt: 'Selecta FX director and live FX pad',
      caption: 'The FX director at work -- a roll building into the drop, with the live FX pad below.',
      w: 1480,
      h: 920,
    },
    {
      name: 'studio-dark',
      alt: 'Selecta studio, dark theme',
      caption: 'The "Studio" voice from dsgn: two decks, mixer, browser. Deck B synced to A.',
      w: 1480,
      h: 920,
    },
    {
      name: 'studio-light',
      alt: 'Selecta studio, light theme',
      caption: 'Same studio in the light theme -- one token swap, nothing else.',
      w: 1480,
      h: 920,
    },
  ],
  'file-viewer': [
    {
      name: 'cover',
      alt: 'Bloomberg File Viewer welcome screen',
      caption: 'Native WPF app for Bloomberg DIF files up to 2 GB -- open, filter, edit, export.',
      w: 1280,
      h: 720,
    },
  ],
  forkfast: [
    {
      name: 'cover',
      alt: 'ForkFast menu with a deliberate 401 incident and the review desk',
      caption: 'An incident live: the menu API call goes out without its token. The review desk sits on the right.',
      w: 1440,
      h: 900,
    },
    {
      name: 'desk',
      alt: 'ForkFast sign-in with the reviewer desk',
      caption: 'The reviewer desk: pick a candidate, a ticket and a 3-minute time box.',
      w: 1440,
      h: 900,
    },
  ],
  'review-grader': [
    {
      name: 'cover',
      alt: 'Review Grader rubric scoring screen',
      caption: 'Scoring a team against the R1 rubric -- Build and Security criteria, 1 to 5.',
      w: 1440,
      h: 900,
    },
    {
      name: 'questions',
      alt: 'Review Grader question bank',
      caption: 'The question bank: reviewer guidance and several phrasings per criterion.',
      w: 1440,
      h: 900,
    },
  ],
  dsgn: [
    {
      name: 'cover',
      alt: 'dsgn docs site home page',
      caption: 'design.dhruvchoudhary.com -- the philosophy site, which doubles as the live registry.',
      w: 1440,
      h: 900,
    },
    {
      name: 'components',
      alt: 'dsgn component registry',
      caption: 'The registry: 56 components you copy into your own tree with one command.',
      w: 1440,
      h: 900,
    },
    {
      name: 'analytics',
      alt: 'Analytics dashboard built with dsgn',
      caption: 'A full analytics dashboard scaffolded from one prompt, using the published npm package.',
      w: 1440,
      h: 900,
    },
    {
      name: 'console',
      alt: 'Dark developer console built with dsgn',
      caption: 'Same registry, different voice: a dark edge-network console.',
      w: 1440,
      h: 900,
    },
    {
      name: 'skill',
      alt: 'dsgn Claude Code skill page',
      caption: 'The Claude Code Agent Skill -- install it and Claude builds UI with the registry directly.',
      w: 1440,
      h: 900,
    },
  ],
  kaabo: [
    {
      name: 'cover',
      alt: 'Kaabo game table mid-turn',
      caption: 'Mid-turn: you drew the 9 of hearts -- swap it into your row or discard it.',
      w: 1440,
      h: 900,
    },
    {
      name: 'landing',
      alt: 'Kaabo landing screen',
      caption: 'Host a game or join one -- no installs, just a browser.',
      w: 1440,
      h: 900,
    },
    {
      name: 'peek-phone',
      alt: 'Kaabo memorize-your-cards screen on a phone',
      caption: 'Round start on a phone: your bottom two cards, shown once.',
      w: 1179,
      h: 1980,
    },
    {
      name: 'table-phone',
      alt: 'Kaabo table on a phone',
      caption: "The table from a phone, waiting on Dhruv's turn.",
      w: 1179,
      h: 1980,
    },
  ],
  'lyric-viewer': [
    {
      name: 'cover',
      alt: 'Lyric Overlay liquid preset',
      caption: 'Liquid -- word-synced lyrics over a live GPU field, the artists dancing along as pixel sprites.',
      w: 1424,
      h: 745,
    },
    {
      name: 'stage',
      alt: 'Stage preset',
      caption: 'Stage -- the artist dancers as the subject: a lit floor, spotlights that punch on the kick.',
      w: 1424,
      h: 745,
    },
    {
      name: 'vinyl',
      alt: 'Vinyl preset',
      caption: 'Vinyl -- cover art as a record on a deck, turning one revolution every four beats once tempo locks.',
      w: 1424,
      h: 745,
    },
    {
      name: 'wormhole',
      alt: 'Wormhole preset',
      caption:
        'Wormhole -- a tunnel that constricts and winds up in the seconds before a drop it already knows is coming.',
      w: 1424,
      h: 745,
    },
    {
      name: 'heatmap',
      alt: 'Heatmap preset',
      caption: "Heatmap -- the song's shape learned by listening once, remembered on every replay.",
      w: 1424,
      h: 745,
    },
    {
      name: 'ghost',
      alt: 'Ghost preset',
      caption:
        'Ghost -- lyrics and the cloud, nothing else: ~95% less CPU, for reading the words or running over a game.',
      w: 1424,
      h: 745,
    },
    {
      name: 'library',
      alt: 'Lyric Overlay library view',
      caption: 'The library -- every song it has seen: lyrics cached, beat map learned, energy arc learned.',
      w: 1424,
      h: 745,
    },
  ],
  investlytic: [
    {
      name: 'cover',
      alt: 'Investlytic historic stock data chart',
      caption: "Historic data -- a ticker's price history, charted from Yahoo Finance.",
      w: 1600,
      h: 795,
    },
    {
      name: 'forecast',
      alt: 'Investlytic forecast chart',
      caption: 'Forecast -- the LSTM model projecting a ticker forward.',
      w: 1600,
      h: 796,
    },
    {
      name: 'recommendations',
      alt: 'Investlytic day-by-day recommendations',
      caption: "Recommendations -- the PPO agent's day-by-day buy / sell / hold plan.",
      w: 1600,
      h: 784,
    },
    {
      name: 'portfolio',
      alt: 'Investlytic portfolio table',
      caption: 'Portfolio -- holdings with live prices and total value.',
      w: 1600,
      h: 786,
    },
    {
      name: 'signin',
      alt: 'Investlytic sign-in screen',
      caption: 'Sign-in, backed by Firebase auth.',
      w: 1600,
      h: 795,
    },
  ],
  spark: [
    {
      name: 'cover',
      alt: 'Parking lot CCTV frame with slots marked free or occupied',
      caption:
        "The occupancy detector on sample CCTV footage: green slots read as free, red as taken (it isn't perfect -- a few parked cars read as free).",
      w: 1152,
      h: 648,
    },
    {
      name: 'footage',
      alt: 'Raw parking lot CCTV frame',
      caption: 'The raw camera feed the detector reads from.',
      w: 1152,
      h: 648,
    },
  ],
};

/** All images for a project; the first one is its cover. */
export function projectImages(slug: string): ProjectImage[] {
  return (raw[slug] ?? []).map((img) => ({ slug, ...img }));
}

export function projectCover(slug: string): ProjectImage | undefined {
  return projectImages(slug)[0];
}

export function imageSrc(img: ProjectImage, width: 800 | 1600 = 1600) {
  return `/projects/${img.slug}/${img.name}-${width}.webp`;
}

export function imageSrcSet(img: ProjectImage) {
  return `${imageSrc(img, 800)} 800w, ${imageSrc(img, 1600)} 1600w`;
}

export function isPortrait(img: ProjectImage) {
  return img.h > img.w;
}
