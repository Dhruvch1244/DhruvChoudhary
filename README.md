# dhruvchoudhary.com

Personal portfolio — a real multi-page site, editorial in spirit: serif
headlines, warm paper background, a Swiss-grid layout, one restrained accent
color, and small hand-drawn accent marks (a squiggle underline, a sketch
arrow, an asterisk) instead of gradients, glassmorphism, or glow. React +
TypeScript + Vite, no UI framework. Live at `dhruvchoudhary.com` on GitHub
Pages.

## Pages

- **`/` Index** — intro, quick facts, three featured projects
- **`/projects`** — numbered index of every project, external links to
  source (Kaabo links to its own page instead)
- **`/experience`** — work history timeline, toolbox, published research
- **`/contact`** — email / GitHub / LinkedIn
- **`/kaabo`** — dedicated page for the card game: Play Now (live Render
  deployment), source, rules, how to host

## Structure

```
src/
  components/
    Nav.tsx          numbered sidebar nav (collapses to a top bar on mobile)
    PageHeader.tsx    eyebrow + serif title + optional squiggle underline
    Marks.tsx         hand-authored inline SVG accents: Squiggle, Arrow, Asterisk
    Footer.tsx
  pages/              one component per route above
  data/content.ts     resume facts -- profile, experience, skills, projects, kaabo
```

No design tokens borrowed from a component library -- `src/App.css` is the
whole layout/visual system, `src/index.css` just the reset + palette/type
tokens (`--paper`, `--ink`, `--accent`, `--font-serif`/`--font-sans`).

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
