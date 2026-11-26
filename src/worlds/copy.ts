/**
 * Per-world copy. Facts stay the same in every world (they come from
 * data/content.ts); what changes is how each world *says* them. Every
 * project gets a line in every world's voice.
 */

/** Terminal: each project as the commit that defines it. */
export const commitLine: Record<string, string> = {
  selecta: 'feat(planner): prompt -> beatmatched set, phrase-aligned',
  dsgn: "feat(cli): dsgn add button -- copy, don't depend",
  'lyric-viewer': 'perf: electron -> tauri, installer 116MB -> 30MB',
  kaabo: 'feat(net): server-authoritative, no devtools peeking',
  investlytic: 'research: lstm + ppo, +50% decision accuracy',
  batchpilot: 'feat(term): xterm.js <-> pty over websocket',
  spark: 'feat(cv): laplacian slot detection on cctv',
};

/** Arcade: each project is a stage with a boss to beat. */
export const arcadeStage: Record<string, { stage: string; boss: string }> = {
  selecta: { stage: 'THE DROP', boss: 'an empty dancefloor' },
  dsgn: { stage: 'THE REGISTRY', boss: 'generic AI-made UI' },
  'lyric-viewer': { stage: 'THE WORMHOLE', boss: 'a 116MB installer' },
  kaabo: { stage: 'THE TABLE', boss: 'the devtools peeker' },
  investlytic: { stage: 'THE MARKET', boss: 'the random walk' },
  batchpilot: { stage: 'SERVER ROOM', boss: '12 open PuTTY windows' },
  spark: { stage: 'THE LOT', boss: 'circling for a spot' },
};

/** Iron: each project is a lift, with a coach's note. */
export const ironLift: Record<string, { lift: string; note: string }> = {
  selecta: { lift: 'Deadlift', note: 'Heaviest lift on the program: a Rust core and a live audio engine.' },
  dsgn: { lift: 'Overhead press', note: "Lifting everyone else's UI, not just mine." },
  'lyric-viewer': { lift: 'Cut phase', note: 'Dropped 74% of the installer weight, kept every bit of strength.' },
  kaabo: { lift: 'Conditioning', note: '2-8 players, real time, no rest between sets.' },
  investlytic: { lift: 'Periodized block', note: 'Trained on market data. +50% on the test.' },
  batchpilot: { lift: 'Grip work', note: 'One hand on every server at once.' },
  spark: { lift: 'Warm-up set', note: 'First full-stack lift. Form still counts.' },
};

/** Iron: the training split a project's kind belongs to. */
export const ironSplit: Record<string, string> = {
  'desktop app': 'Legs · heavy',
  'web app': 'Push',
  platform: 'Full body',
  game: 'Conditioning',
  'dev tool': 'Pull',
  research: 'Mobility',
};

/** Pit Lane: team radio. */
export const teamRadio: Record<string, string> = {
  selecta: 'Copy, building the set now. Drop in 32 bars.',
  dsgn: "Same setup for every car. Copy the parts, don't rent them.",
  'lyric-viewer': "We've lost 86 megs. Car feels much lighter.",
  kaabo: "Race control confirms: no peeking at other cars' cards.",
  investlytic: 'Strategy model says box now. Plus fifty on the undercut.',
  batchpilot: 'Telemetry from every environment, one screen.',
  spark: 'Pit lane full? Check the board. 75 of 156 free.',
};

/** Pit Lane: tyre compound by kind of project. */
export const tyre: Record<string, { code: string; name: string }> = {
  'desktop app': { code: 'S', name: 'soft' },
  'web app': { code: 'M', name: 'medium' },
  platform: { code: 'H', name: 'hard' },
  game: { code: 'I', name: 'intermediate' },
  'dev tool': { code: 'M', name: 'medium' },
  research: { code: 'W', name: 'wet' },
};

/** Night Shift: a journal entry and the cat's verdict. */
export const journal: Record<string, { time: string; entry: string; cat: string }> = {
  selecta: {
    time: '02:47',
    entry: 'taught it to wait for the phrase before it mixes. it waited. the drop landed on the one.',
    cat: 'allowed on the decks',
  },
  dsgn: {
    time: '01:12',
    entry: "wrote down every design decision I'd actually shipped. turns out that's a philosophy.",
    cat: 'sat on the components page. approved.',
  },
  'lyric-viewer': {
    time: '03:30',
    entry: 'the wormhole knows the drop is coming before I do now.',
    cat: 'chased the vinyl tonearm for an hour',
  },
  kaabo: {
    time: '00:40',
    entry: 'game night over one hotspot. the server holds the cards, so nobody can peek. someone tried.',
    cat: 'slapped the discard pile. wrong rank. penalty.',
  },
  investlytic: {
    time: '02:20',
    entry: 'taught an agent to hold instead of panic. wrote a paper about it.',
    cat: 'holds. never sells. strong paws.',
  },
  batchpilot: {
    time: '00:15',
    entry: 'closed twelve PuTTY windows, forever.',
    cat: 'prefers one window. to sit in.',
  },
  spark: {
    time: '23:10',
    entry: 'counting parking slots from cctv, one laplacian at a time.',
    cat: 'only cares about the warm spot',
  },
};
