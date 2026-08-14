import { useEffect, useState } from 'react';

type Status = { activeRooms: number; activePlayers: number };

export default function KaaboLiveBadge() {
  const [status, setStatus] = useState<Status | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('https://kaabo.dhruvchoudhary.com/api/status')
      .then((r) => {
        if (!r.ok) throw new Error('bad response');
        return r.json();
      })
      .then((data: Status) => {
        if (!cancelled) setStatus(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) return null;

  let label = 'Checking who is playing...';
  if (status) {
    label =
      status.activePlayers > 0
        ? `${status.activePlayers} playing right now across ${status.activeRooms} ${status.activeRooms === 1 ? 'room' : 'rooms'}`
        : 'No games running right now -- be the first';
  }

  return (
    <p className="kaabo__live">
      <span className="kaabo__live-dot" /> {label}
    </p>
  );
}
