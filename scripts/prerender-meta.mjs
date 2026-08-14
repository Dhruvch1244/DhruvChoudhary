// Vite builds a single dist/index.html for this SPA, so every route shares
// the same <title>/OG tags -- fine for browsing, but a crawler hitting
// /projects/lyric-viewer directly only ever sees the homepage's card. This
// clones dist/index.html into a real index.html at each route's own path
// (dist/projects/lyric-viewer/index.html etc.) with that page's own tags
// swapped in, then GitHub Pages serves the right one to whatever fetches
// that exact URL first -- crawler or browser, both boot the same app.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');
const SITE = 'https://dhruvchoudhary.com';

const ROUTES = [
  {
    path: '/',
    title: 'Dhruv Choudhary — Software Engineer',
    description: 'Dhruv Choudhary — Software Engineer building enterprise backend systems, real-time apps, and ML-driven platforms.',
    og: 'default',
  },
  {
    path: '/projects',
    title: 'Projects — Dhruv Choudhary',
    description: "Things I've built: Kaabo, Lyric Overlay, Investlytic, SPARK, and more.",
    og: 'projects',
  },
  {
    path: '/experience',
    title: 'Experience — Dhruv Choudhary',
    description: 'Where the work happened: Fidelity Investments, Samsung R&D.',
    og: 'experience',
  },
  {
    path: '/contact',
    title: 'Contact — Dhruv Choudhary',
    description: "Let's talk — backend systems, real-time apps, or anything that needs building properly.",
    og: 'contact',
  },
  {
    path: '/kaabo',
    title: 'Kaabo — Dhruv Choudhary',
    description: 'A real-time multiplayer card game — Cabo/Kaboo, browser-based, no installs.',
    og: 'kaabo',
  },
  {
    path: '/projects/lyric-viewer',
    title: 'Lyric Overlay — Case Study',
    description: 'A fullscreen, beat-aware synced lyric overlay for Windows.',
    og: 'lyric-viewer',
  },
  {
    path: '/projects/investlytic',
    title: 'Investlytic — Case Study',
    description: 'A reinforcement-learning-driven stock trading platform.',
    og: 'investlytic',
  },
  {
    path: '/projects/spark',
    title: 'SPARK — Case Study',
    description: 'A real-time smart parking reservation system.',
    og: 'spark',
  },
];

function injectMeta(html, route) {
  const ogImage = `${SITE}/og/${route.og}.png`;
  // Trailing slash: that's the exact path a static file server resolves to
  // this route's own index.html (dist/<path>/index.html) rather than falling
  // through to the SPA's root shell, so it's the one worth sharing.
  const url = route.path === '/' ? SITE : `${SITE}${route.path}/`;

  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  out = out.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`);
  out = out.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`);
  out = out.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${route.description}" />`);

  const extraTags = [
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:url" content="${url}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${route.title}" />`,
    `<meta name="twitter:description" content="${route.description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ].join('\n    ');

  out = out.replace('<meta property="og:type" content="website" />', `<meta property="og:type" content="website" />\n    ${extraTags}`);
  return out;
}

async function main() {
  const rootHtml = await readFile(path.join(DIST, 'index.html'), 'utf-8');

  for (const route of ROUTES) {
    const html = injectMeta(rootHtml, route);
    if (route.path === '/') {
      await writeFile(path.join(DIST, 'index.html'), html);
      console.log('updated dist/index.html');
      continue;
    }
    const dir = path.join(DIST, route.path.replace(/^\//, ''));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html);
    console.log(`generated dist${route.path}/index.html`);
  }
}

main();
