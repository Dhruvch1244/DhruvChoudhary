import { useEffect, useState } from 'react';

const USERNAME = 'Dhruvch1244';
const CACHE_KEY = 'gh-activity-cache-v1';
const CACHE_TTL = 1000 * 60 * 30; // 30 min

type GhEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, any>;
};

type Item = { id: string; label: string; repo: string; date: string };

function relativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function shortRepo(fullName: string) {
  return fullName.split('/')[1] ?? fullName;
}

function describe(event: GhEvent): Item | null {
  const repo = shortRepo(event.repo.name);
  if (event.type === 'PushEvent') {
    const count = event.payload.commits?.length ?? event.payload.size ?? 1;
    return { id: event.id, repo, date: event.created_at, label: `Pushed ${count} commit${count === 1 ? '' : 's'} to` };
  }
  if (event.type === 'CreateEvent' && event.payload.ref_type === 'repository') {
    return { id: event.id, repo, date: event.created_at, label: 'Created' };
  }
  if (event.type === 'PullRequestEvent') {
    const action = event.payload.action;
    const merged = event.payload.pull_request?.merged;
    const verb = action === 'opened' ? 'Opened a pull request in' : merged ? 'Merged a pull request in' : `${action[0].toUpperCase()}${action.slice(1)} a pull request in`;
    return { id: event.id, repo, date: event.created_at, label: verb };
  }
  return null;
}

export default function GitHubActivity() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, ts } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL) {
            if (!cancelled) setItems(data);
            return;
          }
        }

        const res = await fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=30`);
        if (!res.ok) throw new Error('bad response');
        const events: GhEvent[] = await res.json();
        const described = events.map(describe).filter((i): i is Item => i !== null).slice(0, 5);

        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: described, ts: Date.now() }));
        if (!cancelled) setItems(described);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed || (items && items.length === 0)) return null;

  return (
    <div className="gh-activity">
      <p className="gh-stats__label">
        <span className="gh-stats__dot" /> Recently on GitHub
      </p>
      <ul className="gh-activity__list">
        {(items ?? Array.from({ length: 3 })).map((item, i) =>
          item ? (
            <li key={item.id}>
              <span>
                {item.label} <strong>{item.repo}</strong>
              </span>
              <span className="gh-activity__time">{relativeTime(item.date)}</span>
            </li>
          ) : (
            <li key={i} className="gh-activity__placeholder">
              <span>—</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
