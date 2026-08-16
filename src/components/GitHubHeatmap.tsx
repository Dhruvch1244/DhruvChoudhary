import type { CSSProperties } from 'react';
import { useCachedFetch } from '../lib/useCachedFetch';

type Day = { date: string; level: number };

const API = 'https://dhruvchoudhary-spotify.onrender.com/api/github/contributions';

async function getContributions(): Promise<Day[]> {
  const res = await fetch(API);
  if (!res.ok) throw new Error('bad response');
  return res.json();
}

function groupIntoWeeks(days: Day[]): Day[][] {
  if (days.length === 0) return [];
  const weeks: Day[][] = [];
  let current: Day[] = [];

  // Pad the first week so columns line up on real weekdays (Sun-Sat).
  const firstDow = new Date(days[0].date + 'T00:00:00Z').getUTCDay();
  for (let i = 0; i < firstDow; i++) current.push({ date: `pad-${i}`, level: -1 });

  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) weeks.push(current);
  return weeks;
}

export default function GitHubHeatmap() {
  const { data: days, failed } = useCachedFetch<Day[]>('gh-heatmap-cache-v1', getContributions);

  if (failed || (days && days.length === 0)) return null;
  if (!days) return null;

  const weeks = groupIntoWeeks(days);

  return (
    <div className="gh-heatmap" aria-hidden="true">
      {weeks.map((week, wi) => (
        <div className="gh-heatmap__col" key={wi}>
          {week.map((day, di) => (
            <span
              key={day.date + di}
              className={`gh-heatmap__cell ${day.level >= 3 ? 'gh-heatmap__cell--hot' : ''}`}
              style={day.level >= 0 ? ({ '--level': day.level } as CSSProperties) : { visibility: 'hidden' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
