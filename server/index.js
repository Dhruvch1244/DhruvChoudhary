const express = require('express');
const spotify = require('./spotify');
const github = require('./github');

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'dhruvchoudhary-spotify' });
});

// Public, cross-origin, read-only proxies for dhruvchoudhary.com's Spotify
// widgets. Real credentials (client id/secret, refresh token) live only in
// Render env vars -- see README for setup.
app.get('/api/spotify/now-playing', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await spotify.getNowPlaying();
    if (!data) return res.status(503).json({ error: 'spotify unavailable' });
    res.json(data);
  } catch {
    res.status(503).json({ error: 'spotify unavailable' });
  }
});

app.get('/api/spotify/top-artists', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await spotify.getTopArtists();
    if (!data) return res.status(503).json({ error: 'spotify unavailable' });
    res.json(data);
  } catch {
    res.status(503).json({ error: 'spotify unavailable' });
  }
});

app.get('/api/spotify/playlists', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await spotify.getPlaylists();
    res.json(data);
  } catch (err) {
    res.status(503).json({ error: 'spotify unavailable', detail: err.message });
  }
});

// Public, cross-origin: GitHub contribution calendar for the Home page
// heatmap. See github.js for why this needs a server-side proxy.
app.get('/api/github/contributions', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await github.getContributions();
    if (!data) return res.status(503).json({ error: 'github unavailable' });
    res.json(data);
  } catch {
    res.status(503).json({ error: 'github unavailable' });
  }
});

app.listen(PORT, () => {
  console.log(`Spotify API server listening on port ${PORT}`);
});
