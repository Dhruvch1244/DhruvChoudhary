const API = 'https://kaabo.dhruvchoudhary.com/api/spotify';

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
  const res = await fetch(`${API}/${path}`);
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
