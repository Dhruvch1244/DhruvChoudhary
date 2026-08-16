// Parses GitHub's public (undocumented but widely relied-upon) contribution
// calendar fragment -- there's no official REST endpoint for this data
// without GraphQL + a token. github.com/users/{username}/contributions
// returns an HTML fragment with one <td data-date="..." data-level="0-4">
// per day; we just need date + relative level for the heatmap, not exact
// counts, so a light regex extraction is enough (no HTML parser dependency).

const USERNAME = 'Dhruvch1244';

function cached(ttlMs) {
  let value = null;
  let expiresAt = 0;
  return {
    get: () => (Date.now() < expiresAt ? value : null),
    set: (v) => {
      value = v;
      expiresAt = Date.now() + ttlMs;
    },
  };
}

const contributionsCache = cached(60 * 60_000); // 1 hour

async function getContributions() {
  const cachedValue = contributionsCache.get();
  if (cachedValue) return cachedValue;

  const res = await fetch(`https://github.com/users/${encodeURIComponent(USERNAME)}/contributions`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; dhruvchoudhary.com heatmap)' },
  });
  if (!res.ok) return null;
  const html = await res.text();

  const days = [];
  const cellRe = /<td\b([^>]*)>/g;
  let match;
  while ((match = cellRe.exec(html))) {
    const attrs = match[1];
    const dateMatch = attrs.match(/data-date="([^"]+)"/);
    const levelMatch = attrs.match(/data-level="(\d+)"/);
    if (dateMatch && levelMatch) {
      days.push({ date: dateMatch[1], level: Number(levelMatch[1]) });
    }
  }

  if (days.length === 0) return null;

  contributionsCache.set(days);
  return days;
}

module.exports = { getContributions };
