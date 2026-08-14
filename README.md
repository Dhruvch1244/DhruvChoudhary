# dhruvchoudhary.com

Personal portfolio — dark, techy, animated. A canvas constellation (drifting
nodes, thin connecting lines, a few faint math glyphs) sits behind every
page; content transitions in on scroll and between routes. React + Vite +
TypeScript + Framer Motion. Live at `dhruvchoudhary.com` on GitHub Pages.

## Pages

- **`/` Index** — parallax hero (fades/lifts on scroll), quick facts, three
  featured projects
- **`/projects`** — numbered index of every project, external links to
  source (Kaabo links to its own page instead)
- **`/experience`** — work history timeline, toolbox, Leadership &
  Community, published research
- **`/contact`** — email / GitHub / LinkedIn
- **`/kaabo`** — dedicated page for the card game: Play Now (live Render
  deployment), source, rules, how to host
- **`/music`** — what I'm listening to right now, top artists, playlists —
  live from Spotify

Every section reveals on scroll (`components/Reveal.tsx`, an
`IntersectionObserver`-backed `whileInView`); route changes cross-fade via
`AnimatePresence` in `App.tsx`. `MotionConfig reducedMotion="user"` makes all
of it stand down under the OS-level reduce-motion setting.

## Structure

```
src/
  components/
    Constellation.tsx  canvas node network -- drift, proximity links, cursor
                        joins the graph, occasional math-glyph nodes
    Nav.tsx             numbered sidebar nav (collapses to a top bar on mobile)
    PageHeader.tsx      eyebrow + display title + node-line underline, animates in
    Reveal.tsx          scroll-triggered fade/slide wrapper (Framer Motion)
    Marks.tsx           inline SVG accents: NodeLine, Arrow, PlusMark, OrbitRing
    Footer.tsx
  pages/                one component per route above
  data/content.ts       resume facts -- profile, experience, skills, projects,
                        leadership, publication, kaabo
server/                 standalone Express API for the Spotify widgets --
                        deployed separately (see below), not part of the
                        static site build
```

`src/App.css` is the whole layout/visual system; `src/index.css` is just the
reset plus palette/type tokens (`--void`, `--ink`, `--accent`,
`--font-display`/`--font-sans`/`--font-mono`).

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on
every push to `main` (or this branch). Already configured and live:

- Pages **Source: GitHub Actions**, custom domain `dhruvchoudhary.com` set in
  repo Settings → Pages, `CNAME` file in `public/` ships it with the build.
- DNS: `A` records on the apex → `185.199.108.153/109.153/110.153/111.153`,
  `CNAME` for `www` → `<username>.github.io`.
- `public/404.html` redirects a direct hit on any route (e.g. `/kaabo`) back
  through the app shell, since GitHub Pages has no server-side router.

## Spotify backend (`server/`)

GitHub Pages only serves static files, and Spotify's "now playing" / "top
artists" endpoints need a client secret + refresh token that can never sit
in frontend JS (anyone could view-source the site and steal them). So the
Spotify widgets (sidebar now-playing pill, `/music`, the playlist embed on
the Lyric Overlay case study) talk to a small standalone Express API in
`server/` instead — same code, deployed separately from the static site:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/dhruvch1244/dhruvchoudhary/tree/claude/dhruvchoudhary-portfolio-site-8i7wt1)

This repo's root `render.yaml` points Render at the `server/` folder. After
deploying, set these env vars in Render's dashboard (never in the repo, and
never pasted into a chat with anyone, including an AI assistant):

- `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` — from a
  [Spotify developer app](https://developer.spotify.com/dashboard).
- `SPOTIFY_USER_ID` — the id in your profile URL
  (`open.spotify.com/user/<this part>`); used for the public playlists list.
- `SPOTIFY_REFRESH_TOKEN` — a long-lived token that authorizes reading your
  currently-playing track and top artists. Mint it once, locally:
  1. In the Spotify app's dashboard settings, add redirect URI
     `http://127.0.0.1:8888/callback`.
  2. From `server/`: `export SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=...`
     then `node scripts/get-spotify-refresh-token.mjs`.
  3. Open the printed URL, approve, and the refresh token prints to your
     terminal — paste it into Render as `SPOTIFY_REFRESH_TOKEN`.

If the Render service's URL differs from `dhruvchoudhary-spotify.onrender.com`,
update the `API` constant in `src/lib/spotify.ts` to match. Until the env
vars are set, every widget just hides itself or falls back to a "follow me
on Spotify" link — nothing breaks.
