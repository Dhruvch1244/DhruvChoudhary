// "Song of the visit" -- a dynamic OG image for the homepage that bakes in
// whatever's actually playing on Spotify at share-time, rendered with
// resvg (SVG -> PNG, no headless browser needed) using the same visual
// identity as the static build-time OG images (scripts/generate-og-images.mjs).
const path = require('node:path');
const { Resvg } = require('@resvg/resvg-js');
const spotify = require('./spotify');

const FONTS_DIR = path.join(__dirname, 'fonts');
const WIDTH = 1200;
const HEIGHT = 630;

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
}

function truncate(s, max) {
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}

function buildSvg({ eyebrow, title, subtitle }) {
  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g1" cx="12%" cy="15%" r="45%">
        <stop offset="0%" stop-color="#ff2e7e" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#ff2e7e" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="g2" cx="88%" cy="80%" r="45%">
        <stop offset="0%" stop-color="#28e0ec" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#28e0ec" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ff2e7e"/>
        <stop offset="48%" stop-color="#9a6bff"/>
        <stop offset="100%" stop-color="#28e0ec"/>
      </linearGradient>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#07080c"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g1)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g2)"/>
    <circle cx="1080" cy="90" r="3" fill="#ff2e7e" opacity="0.5"/>
    <circle cx="1140" cy="180" r="2" fill="#28e0ec" opacity="0.6"/>
    <circle cx="1000" cy="240" r="2.5" fill="#9a6bff" opacity="0.5"/>
    <circle cx="70" cy="520" r="2.5" fill="#28e0ec" opacity="0.5"/>
    <line x1="1080" y1="90" x2="1140" y2="180" stroke="#28e0ec" stroke-width="1" opacity="0.25"/>
    <line x1="1000" y1="240" x2="1140" y2="180" stroke="#9a6bff" stroke-width="1" opacity="0.25"/>
    <rect x="87" y="187" width="14" height="14" fill="#ff2e7e" transform="rotate(45 94 194)"/>
    <text x="118" y="204" font-family="Space Mono" font-size="22" letter-spacing="5" fill="#8b8f9c">${esc(eyebrow.toUpperCase())}</text>
    <text x="90" y="330" font-family="Bebas Neue" font-size="112" letter-spacing="1" fill="url(#titleGrad)">${esc(title)}</text>
    <text x="90" y="378" font-family="Hanken Grotesk" font-weight="800" font-size="27" fill="#a8afc0">${esc(subtitle)}</text>
    <text x="1110" y="574" text-anchor="end" font-family="Hanken Grotesk" font-weight="800" font-size="22" fill="#f2f4f8">dhruvchoudhary.com</text>
  </svg>`;
}

function render(svg) {
  const resvg = new Resvg(svg, {
    font: {
      fontFiles: [path.join(FONTS_DIR, 'BebasNeue.ttf'), path.join(FONTS_DIR, 'HankenGrotesk-Bold.ttf'), path.join(FONTS_DIR, 'SpaceMono.ttf')],
      loadSystemFonts: false,
      defaultFontFamily: 'Hanken Grotesk',
    },
    background: 'rgba(0,0,0,0)',
  });
  return resvg.render().asPng();
}

let cache = null;
let cacheExpiresAt = 0;
const CACHE_TTL = 30_000;

async function getLiveOgImage() {
  if (cache && Date.now() < cacheExpiresAt) return cache;

  const nowPlaying = await spotify.getNowPlaying().catch(() => null);

  if (!nowPlaying?.isPlaying) return null; // caller falls back to the static default image

  const svg = buildSvg({
    eyebrow: 'Now playing',
    title: truncate(nowPlaying.track, 22).toUpperCase(),
    subtitle: `— ${truncate(nowPlaying.artist, 46)}`,
  });
  const png = render(svg);
  cache = png;
  cacheExpiresAt = Date.now() + CACHE_TTL;
  return png;
}

module.exports = { getLiveOgImage };
