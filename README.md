# dhruvchoudhary.com

Personal portfolio — a real terminal, not a scrolling page. React + TypeScript
+ Vite, no UI framework. Live at `dhruvchoudhary.com` on GitHub Pages.

## What it is

A boot sequence (fake BIOS/POST → SSH handoff) drops you into an interactive
shell over a canvas Matrix-rain backdrop, CRT scanlines/flicker/vignette, and
chromatic aberration on the text. Everything is either typed as a real command
or clicked as a chip under the prompt — both paths work, nobody's stuck
without knowing terminal syntax.

```
help                  list commands
whoami / about        who this is
ls [projects]         list files / projects
cat <file>            about.txt, resume.txt, experience.log, skills.txt, contact.txt
experience / skills   same content, direct commands
projects              list projects
open <project>        project detail; opens source + live link (new tab)
contact [--email]     ways to reach me
resume [--download]   read it, or save the real PDF
publication           SSRN paper
history / clear       what you'd expect
```

Plus a few that aren't in `help`: `sudo hire-me`, `sudo`, `rm -rf resume`,
`coffee`, `matrix` (dispatches a `matrix-boost` window event `MatrixRain.tsx`
listens for), `neofetch`.

Tab-completes commands and, contextually, `cat`/`open`/`ls` arguments.
Up/down arrow recalls command history.

## Deep links

`/kaabo`, `/projects`, `/about`, `/experience`, `/skills`, `/contact`,
`/resume` each auto-run the matching command right after boot (see
`DEEP_LINKS` in `src/App.tsx`), so a direct link still lands somewhere
specific instead of just the boot screen.

## Structure

```
src/
  commands/registry.ts   command implementations + the parser/dispatcher
  commands/textUtils.ts  box-drawing / table formatting helpers
  components/
    MatrixRain.tsx        canvas rain backdrop, listens for 'matrix-boost'
    BootSequence.tsx       POST-style boot log
    Terminal.tsx            input handling, history, tab-complete, chips
    TerminalOutput.tsx      per-block typewriter reveal
  hooks/useTypewriter.ts  character-by-character reveal, skips under
                          prefers-reduced-motion
  data/content.ts         resume facts (experience, skills, projects)
```

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
