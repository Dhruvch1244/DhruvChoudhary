import { useState } from 'react';

const USERNAME = 'Dhruvch1244';
const CACHE_KEY = 'gh-roast-cache-v1';
const CACHE_TTL = 1000 * 60 * 30; // 30 min

type RoastData = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  sinceYear: number;
  lastCommitMessage: string | null;
  lastRepo: string | null;
};

type PushCommit = { message: string };
type GhEvent = { type: string; repo: { name: string }; payload: { commits?: PushCommit[] } };

async function fetchRoastData(): Promise<RoastData> {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, ts } = JSON.parse(cached);
    if (Date.now() - ts < CACHE_TTL) return data;
  }

  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`),
    fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=10`),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error('bad response');

  const user = await userRes.json();
  const repos: { stargazers_count: number }[] = await reposRes.json();
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

  let lastCommitMessage: string | null = null;
  let lastRepo: string | null = null;
  if (eventsRes.ok) {
    const events: GhEvent[] = await eventsRes.json();
    const pushEvent = events.find((e) => e.type === 'PushEvent' && e.payload.commits && e.payload.commits.length > 0);
    if (pushEvent?.payload.commits) {
      lastCommitMessage = pushEvent.payload.commits[pushEvent.payload.commits.length - 1].message;
      lastRepo = pushEvent.repo.name.split('/')[1] ?? null;
    }
  }

  const data: RoastData = {
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    sinceYear: new Date(user.created_at).getFullYear(),
    lastCommitMessage,
    lastRepo,
  };
  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  return data;
}

function buildRoasts(data: RoastData): string[] {
  const roasts = [
    `${data.publicRepos} public repos, ${data.followers} followers. The ratio isn't great, but neither was your last merge conflict.`,
    `${data.totalStars} stars total across everything. Kaabo's live-player badge has hit that on a good night.`,
    `Building since ${data.sinceYear}. Still writes "resilient backend systems" like it's a personality trait.`,
    'Dream stack is Rust. Ships Java at Fidelity for a living. Contains multitudes.',
    'Codes to Drum and Bass. Explains the commit velocity and the 2am pushes.',
    'Executive Graduate Trainee to Software Engineer in exactly one year. Very fast, very corporate.',
    "Built a card game, a lyric overlay, and a quiz about himself. Somebody's confident.",
    'Favorite food is Pav Bhaji, favorite stack is enterprise Java. Comfort food, comfort code.',
    'Dream destination is Switzerland. Hasn\'t been. Still put it on the internet like it\'s a plan.',
  ];
  if (data.lastCommitMessage) {
    roasts.push(`Last real commit message: "${data.lastCommitMessage}". Poetry, truly.`);
  }
  if (data.lastRepo) {
    roasts.push(`Most recently pushed to ${data.lastRepo}. Riveting stuff, I'm sure.`);
  }
  return roasts;
}

export default function RoastMe() {
  const [roast, setRoast] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const data = await fetchRoastData();
      const roasts = buildRoasts(data);
      const options = roasts.filter((r) => r !== roast);
      setRoast(options[Math.floor(Math.random() * options.length)]);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  if (failed) return null;

  return (
    <div className="roast-me">
      <button type="button" className="btn-outline" onClick={handleClick} disabled={loading}>
        {loading ? 'Pulling receipts...' : roast ? 'Roast me again' : 'Roast me'}
      </button>
      {roast && <p className="roast-me__line">{roast}</p>}
    </div>
  );
}
