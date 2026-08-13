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
