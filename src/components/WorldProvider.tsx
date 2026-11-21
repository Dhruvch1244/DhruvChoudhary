import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_WORLD, WORLDS, getWorld, type World, type WorldId } from '../data/worlds';
import { WorldContext } from '../lib/worldContext';

function readStored(): string | null {
  try {
    return localStorage.getItem('world');
  } catch {
    return null;
  }
}

/** `?world=arcade` in the URL wins (so a world can be shared as a link),
 * then whatever the visitor picked last time, then the default. index.html
 * runs the same lookup before first paint so there's no flash. */
function initialWorld(): WorldId {
  const fromUrl = new URLSearchParams(window.location.search).get('world');
  if (fromUrl && WORLDS.some((w) => w.id === fromUrl)) return fromUrl as WorldId;
  return getWorld(readStored() ?? DEFAULT_WORLD).id;
}

function loadFonts(world: World) {
  if (!world.fonts) return;
  const id = `world-fonts-${world.id}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${world.fonts}&display=swap`;
  document.head.appendChild(link);
}

function applyThemeColor(world: World) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  if (world.id === 'constellation') {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    meta.setAttribute('content', light ? '#f7f5f2' : '#07080c');
  } else {
    meta.setAttribute('content', world.themeColor);
  }
}

export default function WorldProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<WorldId>(initialWorld);
  const world = getWorld(id);

  useEffect(() => {
    loadFonts(world);
    document.documentElement.setAttribute('data-world', world.id);
    try {
      localStorage.setItem('world', world.id);
    } catch {
      /* private mode -- the world just won't persist */
    }
    applyThemeColor(world);
  }, [world]);

  const cycleWorld = useCallback((dir: 1 | -1 = 1) => {
    setId((cur) => {
      const i = WORLDS.findIndex((w) => w.id === cur);
      return WORLDS[(i + dir + WORLDS.length) % WORLDS.length].id;
    });
  }, []);

  return <WorldContext.Provider value={{ world, setWorld: setId, cycleWorld }}>{children}</WorldContext.Provider>;
}
