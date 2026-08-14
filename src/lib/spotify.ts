// Update this if the deployed Render service ends up at a different URL
// than the default assigned to the "dhruvchoudhary-spotify" service name.
const API = 'https://dhruvchoudhary-spotify.onrender.com/api/spotify';

export type NowPlaying =
  | { isPlaying: false }
  | {
      isPlaying: true;
      track: string;
      artist: string;
      album: string;
      albumArt: string | null;
      url: string | null;
      progressMs: number;
      durationMs: number;
    };

export type Artist = { name: string; url: string | null; image: string | null; genres: string[] };

export type Playlist = {
  name: string;
  description: string;
  url: string | null;
  image: string | null;
  trackCount: number;
};

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API}/${path}`, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error('bad response');
  return res.json();
}

export function getNowPlaying() {
  return getJson<NowPlaying>('now-playing');
}

export function getTopArtists() {
  return getJson<Artist[]>('top-artists');
}

export function getPlaylists() {
  return getJson<Playlist[]>('playlists');
}
