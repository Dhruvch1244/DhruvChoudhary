# dhruvchoudhary.com

Personal portfolio — React + TypeScript + Vite, with a Three.js starfield/nebula
backdrop and scroll-reveal animations via Framer Motion. Deployed to GitHub
Pages behind the `dhruvchoudhary.com` custom domain.

## Sections

- **Hero** — name, role, links
- **About** — summary + quick facts
- **Experience** — Fidelity Investments (3 roles) + Samsung R&D, as a timeline
- **Skills** — grouped tag pills
- **Projects** — Kaabo, Lyric Player, BatchPilot, Review Grader, Bloomberg File
  Viewer, Investlytic, SPARK — each linking out to its GitHub repo
- **Publication** — SSRN research paper
- **Contact** — email / GitHub / LinkedIn

`/kaabo` is a dedicated route showcasing the Kaabo card game, with a **Play
Now** button pointing at its live Render deployment (`src/data/content.ts` →
`kaabo.liveUrl`) and the rules pulled from its own README.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks + production build to dist/
npm run preview  # serve the production build locally
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on
every push to `main`. One-time setup, done from the GitHub UI (not something
a workflow can do on its own):

1. **Settings → Pages → Source: GitHub Actions** on this repo.
2. **Settings → Pages → Custom domain: `dhruvchoudhary.com`** (the `CNAME`
   file in `public/` already ships the domain to the built site; GitHub Pages
   also wants it set here so it provisions the certificate).
3. At your domain registrar, point DNS at GitHub Pages:
   - `A` records for the apex (`dhruvchoudhary.com`) → `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `<your-github-username>.github.io`
   - DNS propagation can take up to 24h; GitHub Pages auto-provisions HTTPS
     once it verifies the domain.

Until the custom domain is verified, the site is already live at the default
`https://<username>.github.io/<repo>/` GitHub Pages URL once step 1 above is
done and a build completes.
