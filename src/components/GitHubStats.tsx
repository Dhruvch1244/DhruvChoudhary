import { useEffect, useState } from 'react';

type Stats = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  sinceYear: number;
};

const USERNAME = 'Dhruvch1244';
const CACHE_KEY = 'gh-stats-cache-v1';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export default function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, ts } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL) {
            if (!cancelled) setStats(data);
            return;
          }
        }

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');

        const user = await userRes.json();
        const repos: { stargazers_count: number }[] = await reposRes.json();
        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

        const data: Stats = {
          publicRepos: user.public_repos,
          followers: user.followers,
          totalStars,
          sinceYear: new Date(user.created_at).getFullYear(),
        };

        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) return null;

  const rows: { label: string; value: string }[] = stats
    ? [
        { label: 'Public repos', value: String(stats.publicRepos) },
        { label: 'Followers', value: String(stats.followers) },
        { label: 'Stars earned', value: String(stats.totalStars) },
        { label: 'Building since', value: String(stats.sinceYear) },
      ]
    : [
        { label: 'Public repos', value: '—' },
        { label: 'Followers', value: '—' },
        { label: 'Stars earned', value: '—' },
        { label: 'Building since', value: '—' },
      ];

  return (
    <div className="gh-stats">
      <p className="gh-stats__label">
        <span className="gh-stats__dot" /> Live from GitHub
      </p>
      <div className="gh-stats__grid">
        {rows.map((row) => (
          <div className="gh-stats__cell" key={row.label}>
            <span className="gh-stats__value">{row.value}</span>
            <span className="gh-stats__key">{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
