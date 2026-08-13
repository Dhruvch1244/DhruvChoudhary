import { useEffect, useRef } from 'react';

const GLYPHS = ['∑', 'π', '∞', '√', '∂', '∇', 'θ', '×', '≈', 'Σ'];

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  glyph: string | null;
  size: number;
};

// cyan -> violet -> magenta, the same journey as .gradient-text
const HUE_STOPS: [number, number, number][] = [
  [94, 200, 242],
  [167, 139, 250],
  [255, 110, 199],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hueAt(t: number): [number, number, number] {
  const clamped = Math.min(1, Math.max(0, t));
  const scaled = clamped * (HUE_STOPS.length - 1);
  const i = Math.min(HUE_STOPS.length - 2, Math.floor(scaled));
  const local = scaled - i;
  const a = HUE_STOPS[i];
  const b = HUE_STOPS[i + 1];
  return [lerp(a[0], b[0], local), lerp(a[1], b[1], local), lerp(a[2], b[2], local)];
}

/**
 * Fixed full-viewport canvas backdrop: a drifting network of nodes, connected
 * by thin lines when close together, a few carrying faint math glyphs instead
 * of a plain dot. The cursor joins the graph -- nearby nodes link to it.
 * Scrolling feeds it energy: fresh motion brightens the links and glyphs and
 * shifts their color along the same cyan -> violet -> magenta gradient used
 * for headline text, so the backdrop reads as tied to the page, not decor
 * sitting on top of it.
 */
export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    const LINK_DIST = 150;
    const MOUSE_LINK_DIST = 200;

    let energy = 0;
    let lastScrollY = window.scrollY;
    let scrollProgress = 0;

    function updateScrollProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? window.scrollY / max : 0;
    }
    function onScroll() {
      const y = window.scrollY;
      const delta = Math.abs(y - lastScrollY);
      lastScrollY = y;
      energy = Math.min(1, energy + delta * 0.008);
      updateScrollProgress();
    }
    updateScrollProgress();
    window.addEventListener('scroll', onScroll, { passive: true });

    function makeNodes() {
      const area = width * height;
      const count = Math.min(110, Math.max(36, Math.round(area / 16000)));
      nodes = Array.from({ length: count }, () => {
        const isGlyph = Math.random() < 0.1;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          glyph: isGlyph ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
          size: isGlyph ? 13 + Math.random() * 6 : 1.4 + Math.random() * 1.4,
        };
      });
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      makeNodes();
    }
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: -9999, y: -9999, active: false };
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function onMouseLeave() {
      mouse.active = false;
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const [r, g, b] = hueAt(scrollProgress);
      const linkBoost = 1 + energy * 1.6;
      const nodeBoost = 1 + energy * 0.9;

      // links between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b2 = nodes[j];
          const dx = a.x - b2.x;
          const dy = a.y - b2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = Math.min(0.4, 0.16 * (1 - dist / LINK_DIST) * linkBoost);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b2.x, b2.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_LINK_DIST) {
            ctx.strokeStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 15)}, ${0.35 * (1 - dist / MOUSE_LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        if (n.glyph) {
          ctx.font = `${n.size}px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(${Math.min(255, r + 55)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)}, ${Math.min(0.75, 0.4 * nodeBoost)})`;
          ctx.fillText(n.glyph, n.x, n.y);
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size * nodeBoost, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(0.9, 0.55 * nodeBoost)})`;
          ctx.fill();
        }
      }

      if (mouse.active) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.08)`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      energy *= 0.94;
      draw();
    }

    if (prefersReducedMotion) {
      draw();
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('scroll', onScroll);
      };
    }

    let raf: number;
    function loop() {
      step();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />;
}
