import type { ComponentType } from 'react';
import type { WorldId } from '../data/worlds';
import TerminalWorld from './TerminalWorld';
import ArcadeWorld from './ArcadeWorld';
import IronWorld from './IronWorld';
import PitlaneWorld from './PitlaneWorld';
import NightshiftWorld from './NightshiftWorld';
import './worlds-layouts.css';

const PAGES: Partial<Record<WorldId, ComponentType<{ page: 'home' | 'projects' }>>> = {
  terminal: TerminalWorld,
  arcade: ArcadeWorld,
  iron: IronWorld,
  pitlane: PitlaneWorld,
  nightshift: NightshiftWorld,
};

/** Home / Projects in a world's own structure. Null for Constellation, which
 * keeps the original pages. Keyed by world so state resets on a switch. */
export default function WorldPage({ world, page }: { world: WorldId; page: 'home' | 'projects' }) {
  const Page = PAGES[world];
  if (!Page) return null;
  return (
    <div className={`world-page world-page--${world}`} key={world}>
      <Page page={page} />
    </div>
  );
}

