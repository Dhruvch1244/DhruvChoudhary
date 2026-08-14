// Generates branded 1200x630 OG images for every route, using the same
// poster identity (Bebas Neue gradient headline, mono eyebrow) as the site
// itself. Runs against a static HTML template rendered with Playwright --
// no server, no React needed for this.
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'og');
const FONTS_DIR = path.join(__dirname, 'fonts');

const PAGES = [
  {
    slug: 'default',
    eyebrow: 'Software Engineer',
    title: 'DHRUV\nCHOUDHARY',
    tagline: 'Enterprise backend systems, real-time apps, and the occasional game people actually play.',
  },
  {
    slug: 'projects',
    eyebrow: '02 — Projects',
    title: "THINGS I'VE BUILT",
    tagline: 'Kaabo, Lyric Overlay, Investlytic, SPARK — real systems, not toy demos.',
  },
  {
    slug: 'experience',
    eyebrow: '03 — Experience',
    title: 'WHERE THE\nWORK HAPPENED',
    tagline: 'Fidelity Investments, Samsung R&D — enterprise backend, real-time systems.',
  },
  {
    slug: 'music',
    eyebrow: '04 — Music',
    title: 'WHAT I\'M\nLISTENING TO',
    tagline: 'Now playing, top artists, and playlists -- live from Spotify.',
  },
  {
    slug: 'guess',
    eyebrow: 'Just for fun',
    title: 'GUESS\nDHRUV',
    tagline: 'Ten quick questions -- how well do you actually know me?',
  },
  {
    slug: 'contact',
    eyebrow: '05 — Contact',
    title: "LET'S TALK",
    tagline: 'Backend systems, real-time apps, or anything that needs building properly.',
  },
  {
    slug: 'kaabo',
    eyebrow: 'Project',
    title: 'KAABO',
    tagline: 'A real-time multiplayer card game — Cabo/Kaboo, browser-based, no installs.',
  },
  {
    slug: 'lyric-viewer',
    eyebrow: 'Case Study',
    title: 'LYRIC OVERLAY',
    tagline: 'A fullscreen, beat-aware synced lyric overlay for Windows.',
  },
  {
    slug: 'investlytic',
    eyebrow: 'Case Study',
    title: 'INVESTLYTIC',
    tagline: 'A reinforcement-learning-driven stock trading platform.',
  },
  {
    slug: 'spark',
    eyebrow: 'Case Study',
    title: 'SPARK',
    tagline: 'A real-time smart parking reservation system.',
  },
];

function template({ eyebrow, title, tagline }) {
  const titleHtml = title
    .split('\n')
    .map((line) => `<div>${line}</div>`)
    .join('');
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: 'Bebas Neue';
    src: url('file://${FONTS_DIR}/BebasNeue.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Hanken Grotesk';
    font-weight: 800;
    src: url('file://${FONTS_DIR}/HankenGrotesk-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Space Mono';
    src: url('file://${FONTS_DIR}/SpaceMono.ttf') format('truetype');
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background:
      radial-gradient(circle at 12% 15%, rgba(255,46,126,0.16), transparent 45%),
      radial-gradient(circle at 88% 80%, rgba(40,224,236,0.14), transparent 45%),
      #07080c;
    font-family: 'Hanken Grotesk', -apple-system, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 90px;
    position: relative;
  }
  .dots { position: absolute; inset: 0; opacity: 0.5; }
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Space Mono', monospace;
    font-size: 22px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #8b8f9c;
    margin-bottom: 28px;
  }
  .eyebrow::before { content: '◆'; color: #ff2e7e; font-size: 16px; }
  .title {
    font-family: 'Bebas Neue', Impact, sans-serif;
    font-size: 118px;
    line-height: 0.94;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    background: linear-gradient(100deg, #ff2e7e 0%, #9a6bff 48%, #28e0ec 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 34px;
  }
  .tagline {
    font-size: 27px;
    color: #a8afc0;
    max-width: 880px;
    line-height: 1.4;
  }
  .brand {
    position: absolute;
    bottom: 56px;
    right: 90px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 800;
    font-size: 22px;
    color: #f2f4f8;
  }
</style>
</head>
<body>
  <svg class="dots" width="1200" height="630">
    <circle cx="1080" cy="90" r="3" fill="#ff2e7e" opacity="0.5" />
    <circle cx="1140" cy="180" r="2" fill="#28e0ec" opacity="0.6" />
    <circle cx="1000" cy="240" r="2.5" fill="#9a6bff" opacity="0.5" />
    <circle cx="70" cy="520" r="2.5" fill="#28e0ec" opacity="0.5" />
    <circle cx="140" cy="460" r="2" fill="#ff2e7e" opacity="0.4" />
    <line x1="1080" y1="90" x2="1140" y2="180" stroke="#28e0ec" stroke-width="1" opacity="0.25" />
    <line x1="1000" y1="240" x2="1140" y2="180" stroke="#9a6bff" stroke-width="1" opacity="0.25" />
    <line x1="70" y1="520" x2="140" y2="460" stroke="#ff2e7e" stroke-width="1" opacity="0.2" />
  </svg>
  <p class="eyebrow">${eyebrow}</p>
  <div class="title">${titleHtml}</div>
  <p class="tagline">${tagline}</p>
  <p class="brand">dhruvchoudhary.com</p>
</body>
</html>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

  for (const p of PAGES) {
    const html = template(p);
    const tmpPath = path.join(OUT_DIR, `_tmp-${p.slug}.html`);
    await writeFile(tmpPath, html);
    await page.goto(`file://${tmpPath}`);
    await page.waitForTimeout(80);
    await page.screenshot({ path: path.join(OUT_DIR, `${p.slug}.png`) });
    console.log(`generated og/${p.slug}.png`);
  }

  await browser.close();

  // clean up temp html files
  const { unlink } = await import('node:fs/promises');
  for (const p of PAGES) {
    await unlink(path.join(OUT_DIR, `_tmp-${p.slug}.html`)).catch(() => {});
  }
}

main();
