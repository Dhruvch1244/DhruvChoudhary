import { useEffect, useRef } from 'react';
import type { WorldId } from '../data/worlds';

/**
 * Animated full-viewport backdrop for every world except Constellation (which
 * keeps its own component). Each scene is a tiny init/draw pair sharing the
 * same inputs as the constellation: time, the cursor, how far down the page
 * you are, and "energy" from how fast you're scrolling -- so every world
 * reacts to the visitor instead of just looping.
 */

type Input = {
  w: number;
  h: number;
  t: number; // seconds
  energy: number; // 0..1, decays; bumps on scroll
  progress: number; // 0..1 page scroll
  mx: number;
  my: number;
  mouse: boolean;
};

type Scene = {
  init(w: number, h: number): void;
  draw(ctx: CanvasRenderingContext2D, i: Input): void;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/* ---------- Terminal: slow phosphor rain of code glyphs ---------- */
function terminalScene(): Scene {
  const CHARS = '01{}[]()<>=;:+-*/&|!?#$%λ→ƒ'.split('');
  const SIZE = 16;
  let cols: { y: number; speed: number; len: number }[] = [];
  return {
    init(w) {
      const n = Math.ceil(w / (SIZE * 1.6));
      cols = Array.from({ length: n }, () => ({ y: rand(-800, 0), speed: rand(18, 46), len: Math.floor(rand(6, 18)) }));
    },
    draw(ctx, i) {
      ctx.clearRect(0, 0, i.w, i.h);
      ctx.font = `${SIZE - 2}px "JetBrains Mono", monospace`;
      const dt = 1 / 60;
      cols.forEach((c, k) => {
        c.y += c.speed * dt * (1 + i.energy * 6);
        if (c.y - c.len * SIZE > i.h) {
          c.y = rand(-400, 0);
          c.speed = rand(18, 46);
        }
        const x = k * SIZE * 1.6;
        for (let j = 0; j < c.len; j++) {
          const y = c.y - j * SIZE;
          if (y < -SIZE || y > i.h + SIZE) continue;
          // characters flicker on a coarse clock so the column "computes"
          const ch = CHARS[(k * 7 + j * 13 + Math.floor(i.t * 3 + k)) % CHARS.length];
          const head = j === 0;
          const near = i.mouse && Math.abs(x - i.mx) < 90 && Math.abs(y - i.my) < 90;
          const a = head ? 0.55 : 0.16 * (1 - j / c.len);
          ctx.fillStyle = head || near ? `rgba(190, 255, 215, ${near ? 0.7 : a})` : `rgba(61, 220, 132, ${a})`;
          ctx.fillText(ch, x, y);
        }
      });
    },
  };
}

/* ---------- Arcade: pixel starfield + synth sun + rolling grid floor ---------- */
function arcadeScene(): Scene {
  let stars: { x: number; y: number; s: number; tw: number; c: string }[] = [];
  return {
    init(w, h) {
      stars = Array.from({ length: Math.round((w * h) / 9000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.62,
        s: Math.random() < 0.15 ? 4 : 2,
        tw: Math.random() * Math.PI * 2,
        c: Math.random() < 0.25 ? '122, 247, 255' : Math.random() < 0.1 ? '255, 225, 79' : '255, 255, 255',
      }));
    },
    draw(ctx, i) {
      const { w, h, t } = i;
      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.72;
      const par = i.progress * 40;

      for (const s of stars) {
        const a = 0.35 + 0.45 * Math.sin(t * 2 + s.tw);
        ctx.fillStyle = `rgba(${s.c}, ${a})`;
        ctx.fillRect(Math.round(s.x), Math.round(s.y - par * (s.s / 2)), s.s, s.s);
      }

      // striped synth sun sinking into the horizon
      // sun sits off to the right, low, so it never sits behind the hero copy
      const cx = w < 700 ? w * 0.92 : w * 0.86;
      const r = Math.min(w, h) * (w < 700 ? 0.16 : 0.17);
      const sunY = horizon - r * 0.35;
      const g = ctx.createLinearGradient(0, sunY - r, 0, sunY + r);
      g.addColorStop(0, 'rgba(255, 225, 79, 0.42)');
      g.addColorStop(1, 'rgba(255, 79, 216, 0.32)');
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, horizon);
      ctx.clip();
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, sunY, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'destination-out';
      for (let k = 0; k < 6; k++) {
        const yy = sunY + r * 0.1 + k * r * 0.16;
        ctx.fillRect(cx - r, yy, r * 2, 3 + k * 1.6);
      }
      ctx.restore();

      // floor
      const floor = ctx.createLinearGradient(0, horizon, 0, h);
      floor.addColorStop(0, 'rgba(255, 79, 216, 0.16)');
      floor.addColorStop(1, 'rgba(255, 79, 216, 0.02)');
      ctx.fillStyle = floor;
      ctx.fillRect(0, horizon, w, h - horizon);
      ctx.strokeStyle = 'rgba(255, 79, 216, 0.3)';
      ctx.lineWidth = 1.5;
      const speed = 0.35 + i.energy * 2.2;
      const off = (t * speed) % 1;
      for (let k = 0; k < 14; k++) {
        const z = (k + off) / 14;
        const y = horizon + (h - horizon) * z * z;
        ctx.globalAlpha = Math.min(1, z * 1.6);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      const vx = w / 2 + (i.mouse ? (i.mx - w / 2) * 0.08 : 0);
      for (let k = -20; k <= 20; k++) {
        ctx.beginPath();
        ctx.moveTo(vx + k * 26, horizon);
        ctx.lineTo(vx + k * w * 0.16, h);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(122, 247, 255, 0.7)';
      ctx.fillRect(0, horizon - 1, w, 2);
    },
  };
}

/* ---------- Iron: graph paper + slowly spinning weight plates ---------- */
function ironScene(): Scene {
  const LABELS = ['O(1)', 'O(n)', 'O(log n)', 'O(n²)', '20 kg', '10 kg', 'PR'];
  let plates: { x: number; y: number; r: number; rot: number; vr: number; vy: number; label: string; hot: boolean }[] = [];
  return {
    init(w, h) {
      const n = Math.max(4, Math.round(w / 230));
      const scale = Math.min(1, Math.max(0.55, w / 1200));
      plates = Array.from({ length: n }, (_, k) => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(34, 82) * scale,
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.25, 0.25),
        vy: rand(-8, -3),
        label: LABELS[k % LABELS.length],
        hot: Math.random() < 0.35,
      }));
    },
    draw(ctx, i) {
      const { w, h } = i;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(45, 49, 66, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
        ctx.stroke();
      }
      const dt = 1 / 60;
      for (const p of plates) {
        // scrolling = "lifting": plates rise and spin up with effort
        p.y += p.vy * dt * (1 + i.energy * 10);
        p.rot += p.vr * dt * (1 + i.energy * 8);
        if (p.y < -p.r * 1.5) {
          p.y = h + p.r * 1.5;
          p.x = rand(0, w);
        }
        const base = p.hot ? '239, 131, 84' : '45, 49, 66';
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(${base}, 0.08)`;
        ctx.strokeStyle = `rgba(${base}, 0.2)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 0.72, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#f6efe3';
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 0.14, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = `rgba(${base}, 0.35)`;
        ctx.font = `700 ${Math.round(p.r * 0.22)}px "Archivo", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(p.label, 0, -p.r * 0.38);
        ctx.restore();
      }
    },
  };
}

/* ---------- Pit Lane: speed streaks that rush when you scroll ---------- */
function pitlaneScene(): Scene {
  let streaks: { x: number; y: number; len: number; v: number; c: string; wdt: number }[] = [];
  const COLORS = ['255, 42, 60', '255, 214, 10', '255, 255, 255'];
  return {
    init(w, h) {
      streaks = Array.from({ length: Math.round(h / 14) }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        len: rand(60, 260),
        v: rand(120, 420),
        c: COLORS[Math.random() < 0.55 ? 2 : Math.random() < 0.5 ? 0 : 1],
        wdt: Math.random() < 0.2 ? 3 : 1.5,
      }));
    },
    draw(ctx, i) {
      const { w, h } = i;
      ctx.clearRect(0, 0, w, h);
      const boost = 1 + i.energy * 7;
      const dt = 1 / 60;
      for (const s of streaks) {
        s.x -= s.v * dt * boost;
        if (s.x + s.len * boost < 0) {
          s.x = w + rand(0, 200);
          s.y = rand(0, h);
        }
        const len = s.len * (0.6 + boost * 0.4);
        const g = ctx.createLinearGradient(s.x, 0, s.x + len, 0);
        const a = s.c === '255, 255, 255' ? 0.12 : 0.32;
        g.addColorStop(0, `rgba(${s.c}, ${Math.min(0.8, a * boost)})`);
        g.addColorStop(1, `rgba(${s.c}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(s.x, s.y, len, s.wdt);
      }
    },
  };
}

/* ---------- Night Shift: twinkling sky, a moon, the odd shooting star ---------- */
function nightshiftScene(): Scene {
  let stars: { x: number; y: number; r: number; tw: number; sp: number }[] = [];
  let shooter: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
  let nextShot = 3;
  return {
    init(w, h) {
      stars = Array.from({ length: Math.round((w * h) / 7000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.4, 1.8),
        tw: rand(0, Math.PI * 2),
        sp: rand(0.6, 2.2),
      }));
    },
    draw(ctx, i) {
      const { w, h, t } = i;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = 0.25 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.sp + s.tw));
        ctx.fillStyle = `rgba(255, 250, 235, ${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y - i.progress * 30 * s.r, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // crescent moon (bite taken out with destination-out)
      const mx = w - 120;
      const my = 110 - i.progress * 40;
      const glow = ctx.createRadialGradient(mx, my, 10, mx, my, 120);
      glow.addColorStop(0, 'rgba(255, 244, 214, 0.18)');
      glow.addColorStop(1, 'rgba(255, 244, 214, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(mx - 120, my - 120, 240, 240);
      ctx.save();
      ctx.fillStyle = '#fff4d6';
      ctx.beginPath();
      ctx.arc(mx, my, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(mx + 17, my - 10, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (!shooter && t > nextShot) {
        shooter = { x: rand(w * 0.2, w), y: rand(0, h * 0.4), vx: -rand(9, 14), vy: rand(3, 5), life: 1 };
        nextShot = t + rand(4, 9);
      }
      if (shooter) {
        const s = shooter;
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 10, s.y - s.vy * 10);
        g.addColorStop(0, `rgba(255, 255, 255, ${0.9 * s.life})`);
        g.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 10, s.y - s.vy * 10);
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;
        if (s.life <= 0 || s.x < -100) shooter = null;
      }
    },
  };
}

const SCENES: Partial<Record<WorldId, () => Scene>> = {
  terminal: terminalScene,
  arcade: arcadeScene,
  iron: ironScene,
  pitlane: pitlaneScene,
  nightshift: nightshiftScene,
};

export default function WorldScene({ world }: { world: WorldId }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const make = SCENES[world];
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!make || !canvas || !ctx) return;
    const scene = make();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const input: Input = { w: 0, h: 0, t: 0, energy: 0, progress: 0, mx: -9999, my: -9999, mouse: false };
    let lastY = window.scrollY;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    function resize() {
      if (!canvas || !ctx) return;
      input.w = window.innerWidth;
      input.h = window.innerHeight;
      canvas.width = input.w * dpr;
      canvas.height = input.h * dpr;
      canvas.style.width = `${input.w}px`;
      canvas.style.height = `${input.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene.init(input.w, input.h);
      if (reduced) scene.draw(ctx, input);
    }
    function onScroll() {
      const y = window.scrollY;
      input.energy = Math.min(1, input.energy + Math.abs(y - lastY) * 0.006);
      lastY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      input.progress = max > 0 ? y / max : 0;
    }
    function onMove(e: MouseEvent) {
      input.mx = e.clientX;
      input.my = e.clientY;
      input.mouse = true;
    }
    function onLeave() {
      input.mouse = false;
    }

    resize();
    onScroll();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const start = performance.now();
    function loop(now: number) {
      input.t = (now - start) / 1000;
      input.energy *= 0.94;
      scene.draw(ctx!, input);
      raf = requestAnimationFrame(loop);
    }
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [world]);

  return <canvas ref={canvasRef} key={world} className="constellation world-scene" aria-hidden="true" />;
}
