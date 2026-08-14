import { useEffect, useState } from 'react';
import { getNowPlaying, type NowPlaying } from '../lib/spotify';

const POLL_MS = 30_000;

export default function SpotifyNowPlaying({ large = false }: { large?: boolean }) {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await getNowPlaying();
        if (!cancelled) setData(result);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const sizeClass = large ? 'now-playing--large' : '';

  if (failed) {
    if (!large) return null;
    return <p className={`now-playing now-playing--idle ${sizeClass}`}>Live status isn't available right now.</p>;
  }

  if (!data) {
    if (!large) return null;
    return <p className={`now-playing now-playing--idle ${sizeClass}`}>Checking Spotify...</p>;
  }

  if (!data.isPlaying) {
    return (
      <p className={`now-playing now-playing--idle ${sizeClass}`}>
        <span className="now-playing__dot" /> Not listening to anything right now
      </p>
    );
  }

  return (
    <a href={data.url ?? undefined} target="_blank" rel="noreferrer" className={`now-playing ${sizeClass}`}>
      {data.albumArt && <img src={data.albumArt} alt="" className="now-playing__art" />}
      <span className="now-playing__text">
        <span className="now-playing__bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="now-playing__meta">
          <strong>{data.track}</strong> — {data.artist}
        </span>
      </span>
    </a>
  );
}
