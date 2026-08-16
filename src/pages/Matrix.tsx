import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CHARS = 'アイウエオカキクケコサシスセソタチツテト0123456789';

export default function Matrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = Array.from({ length: columns }, () => Math.random() * -50);

    function onResize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    }
    window.addEventListener('resize', onResize);

    function draw() {
      ctx!.fillStyle = 'rgba(5, 6, 10, 0.08)';
      ctx!.fillRect(0, 0, width, height);
      ctx!.fillStyle = '#3ecf8e';
      ctx!.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx!.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      });
    }

    if (reduced) {
      ctx.fillStyle = '#05060a';
      ctx.fillRect(0, 0, width, height);
      return () => window.removeEventListener('resize', onResize);
    }

    const id = setInterval(draw, 40);
    return () => {
      clearInterval(id);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="matrix-page">
      <canvas ref={canvasRef} className="matrix-page__canvas" />
      <div className="matrix-page__content">
        <p>WAKE UP, DHRUV...</p>
        <p>THE SITE HAD A TERMINAL PHASE ONCE. YOU'RE LOOKING AT ITS GHOST.</p>
        <Link to="/" className="matrix-page__link">
          [ back to reality ]
        </Link>
      </div>
    </div>
  );
}
