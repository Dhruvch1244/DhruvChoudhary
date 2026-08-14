import { useEffect, useState } from 'react';

const CACHE_TTL = 1000 * 60 * 30; // 30 min

export function useSpotifyCache<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const cached = sessionStorage.getItem(key);
        if (cached) {
          const { data: cachedData, ts } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL) {
            if (!cancelled) setData(cachedData);
            return;
          }
        }

        const result = await fetcher();
        sessionStorage.setItem(key, JSON.stringify({ data: result, ts: Date.now() }));
        if (!cancelled) setData(result);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, failed };
}
