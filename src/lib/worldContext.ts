import { createContext, useContext } from 'react';
import type { World, WorldId } from '../data/worlds';

export type WorldCtx = {
  world: World;
  setWorld: (id: WorldId) => void;
  cycleWorld: (dir?: 1 | -1) => void;
};

export const WorldContext = createContext<WorldCtx | null>(null);

export function useWorld(): WorldCtx {
  const ctx = useContext(WorldContext);
  if (!ctx) throw new Error('useWorld must be used inside <WorldProvider>');
  return ctx;
}
