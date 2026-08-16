import { useEffect, useState } from 'react';
import { getNowPlaying, type NowPlaying } from '../lib/spotify';

const POLL_MS = 30_000;

export default function VinylDemo() {
  const [data, setData] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await getNowPlaying();
        if (!cancelled) setData(result);
      } catch {
        // ignore -- falls back to the static demo state below
      }
    }

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const now = data?.isPlaying ? data : null;

  return (
    <div className="vinyl-demo">
      <div className={`vinyl-demo__deck ${now ? 'vinyl-demo__deck--spinning' : ''}`}>
        <div className="vinyl-demo__record">
          {now?.albumArt ? (
            <img src={now.albumArt} alt="" className="vinyl-demo__label" />
          ) : (
            <div className="vinyl-demo__label vinyl-demo__label--placeholder" />
          )}
          <span className="vinyl-demo__hole" />
        </div>
        <span className="vinyl-demo__tonearm" />
      </div>
      <p className="vinyl-demo__caption">
        {now ? (
          <>
            Spinning live: <strong>{now.track}</strong> — {now.artist}
          </>
        ) : (
          "Not wired to real audio in a browser -- but this is the Vinyl preset: cover art on a deck, turning one revolution every four beats once tempo locks, in the real app."
        )}
      </p>
    </div>
  );
}
