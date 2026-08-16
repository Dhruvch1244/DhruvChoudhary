import { useMemo, useState } from 'react';
import { profile } from '../data/content';
import { getPlaylists, type Playlist } from '../lib/spotify';
import { useCachedFetch } from '../lib/useCachedFetch';

function playlistId(url: string | null) {
  if (!url) return null;
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

export default function SpotifyPlaylistWidget() {
  const { data: playlists, failed } = useCachedFetch<Playlist[]>('spotify-playlist-widget-v1', getPlaylists);
  const [pick, setPick] = useState(0);

  const usable = useMemo(() => (playlists ?? []).filter((p) => playlistId(p.url)), [playlists]);

  if (failed || (playlists && usable.length === 0)) {
    return (
      <div className="playlist-widget playlist-widget--fallback">
        <p>
          Can't load a live playlist right now —{' '}
          <a href={profile.spotify} target="_blank" rel="noreferrer" className="text-link">
            hear what I actually listen to on Spotify
          </a>
          .
        </p>
      </div>
    );
  }

  if (!usable.length) return null;

  const playlist = usable[pick % usable.length];
  const id = playlistId(playlist.url);

  return (
    <div className="playlist-widget">
      <div className="playlist-widget__header">
        <span className="playlist-widget__bars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="playlist-widget__name">{playlist.name}</span>
        {usable.length > 1 && (
          <button
            type="button"
            className="playlist-widget__shuffle"
            onClick={() => setPick((p) => (p + 1 + Math.floor(Math.random() * (usable.length - 1))) % usable.length)}
          >
            Shuffle
          </button>
        )}
      </div>
      <div className="playlist-widget__frame">
        <iframe
          key={id}
          src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          style={{ border: 0 }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`Spotify playlist: ${playlist.name}`}
        />
      </div>
    </div>
  );
}
