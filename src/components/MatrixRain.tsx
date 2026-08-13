import { useEffect, useRef } from 'react';

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.ceil(canvas.width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -100);
    }
    resize();
    window.addEventListener('resize', resize);

    let boostUntil = 0;
    function onBoost() {
      boostUntil = Date.now() + 4000;
    }
    window.addEventListener('matrix-boost', onBoost);

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('matrix-boost', onBoost);
      };
    }

    let raf: number;
    let lastStep = 0;

    function step(now: number) {
      raf = requestAnimationFrame(step);
      const boosted = Date.now() < boostUntil;
      const interval = boosted ? 28 : 55;
      if (now - lastStep < interval) return;
      lastStep = now;
      if (!ctx || !canvas) return;

      ctx.fillStyle = boosted ? 'rgba(3, 8, 4, 0.12)' : 'rgba(3, 8, 4, 0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = boosted ? '#b6ffce' : '#39ff6a';
        ctx.globalAlpha = boosted ? 0.9 : 0.55;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;

        if (y > canvas.height && Math.random() > (boosted ? 0.93 : 0.975)) {
          drops[i] = 0;
        } else {
          drops[i] += boosted ? 1.4 : 1;
        }
      }
    }
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('matrix-boost', onBoost);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
