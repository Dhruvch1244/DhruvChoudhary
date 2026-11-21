/**
 * "Worlds" -- whole-site skins, each one a different side of the same person.
 * A world swaps the palette + type tokens (see worlds.css), the animated
 * backdrop (WorldScene.tsx) and a couple of lines of hero copy. Content,
 * layout and routes never change, so every world is the same portfolio
 * seen through a different lens.
 */
export type WorldId = 'constellation' | 'terminal' | 'arcade' | 'iron' | 'pitlane' | 'nightshift';

export type World = {
  id: WorldId;
  name: string;
  /** one-line philosophy, shown in the switcher and under the hero */
  motto: string;
  /** replaces the hero eyebrow */
  eyebrow: string;
  /** small status line in the hero, styled per world */
  status: string;
  /** swatch colours for the switcher card: background, ink, accent, accent 2 */
  swatch: [string, string, string, string];
  /** browser chrome colour */
  themeColor: string;
  /** Google Fonts `family=` query for this world's type, loaded on demand
   * (index.html keeps a copy of this map for the pre-paint load) */
  fonts?: string;
};

export const WORLDS: World[] = [
  {
    id: 'constellation',
    name: 'Constellation',
    motto: 'Everything is a graph. Find the edges.',
    eyebrow: 'Software Engineer — Fidelity Investments',
    status: 'nodes drifting · links forming',
    swatch: ['#07080c', '#f2f4f8', '#28e0ec', '#ff2e7e'],
    themeColor: '#07080c',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    motto: 'while (alive) { eat(); code(); lift(); repeat(); }',
    eyebrow: '~/dhruv — zsh — 80×24',
    status: 'git commit -m "ship it, fix it, ship it again"',
    swatch: ['#070b09', '#c9f5d9', '#3ddc84', '#e0b341'],
    themeColor: '#070b09',
    fonts: 'family=JetBrains+Mono:wght@400;500;700;800',
  },
  {
    id: 'arcade',
    name: 'Arcade',
    motto: 'Level 404 → 200 OK. One boss fight at a time.',
    eyebrow: '1UP · DSA SEASON · HI-SCORE 001337',
    status: '▶ PRESS START TO CONNECT',
    swatch: ['#170a35', '#ffffff', '#ffe14f', '#ff4fd8'],
    themeColor: '#170a35',
    fonts: 'family=Press+Start+2P&family=VT323',
  },
  {
    id: 'iron',
    name: 'Iron',
    motto: 'Deadlifts & data structures. Progressive overload for both.',
    eyebrow: 'Rep · Refactor · Repeat',
    status: 'sets 4/5 · bugs 0 (today)',
    swatch: ['#f6efe3', '#2d3142', '#ef8354', '#ffd166'],
    themeColor: '#f6efe3',
    fonts: 'family=Archivo+Black&family=Archivo:wght@400;500;600;700',
  },
  {
    id: 'pitlane',
    name: 'Pit Lane',
    motto: 'Box, box — shipping to prod.',
    eyebrow: 'Lap 42/∞ · Fastest sector: deploy',
    status: 'P1 · +0.042 · PUSH',
    swatch: ['#0f1012', '#ffffff', '#ffd60a', '#ff2a3c'],
    themeColor: '#0f1012',
    fonts: 'family=Barlow+Condensed:ital,wght@0,600;1,700;1,800&family=Barlow:wght@400;500;600',
  },
  {
    id: 'nightshift',
    name: 'Night Shift',
    motto: 'Powered by coffee, cats & clean code.',
    eyebrow: 'Status: cat on keyboard',
    status: 'any typos were reviewed by a cat',
    swatch: ['#2b2350', '#ffffff', '#a8f0d1', '#ffd84f'],
    themeColor: '#2b2350',
    fonts: 'family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700',
  },
];

export const DEFAULT_WORLD: WorldId = 'constellation';

export function getWorld(id: string | null | undefined): World {
  return WORLDS.find((w) => w.id === id) ?? WORLDS[0];
}
