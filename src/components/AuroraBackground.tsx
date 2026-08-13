import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Fixed full-viewport WebGL backdrop: a slow-drifting starfield plus a handful
 * of soft glow orbs, in the spirit of the "Starfield" / "Liquid" presets from
 * the lyric player — mouse parallax, gentle autonomous drift, and a scroll-driven
 * "energy" pulse standing in for a beat drop since there's no audio here.
 */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    // --- Starfield ---
    const STAR_COUNT = 1400;
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const palette = [
      new THREE.Color('#ff2ec4'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#f5f3ff'),
    ];
    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    function makeGlowTexture() {
      const size = 128;
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const ctx = c.getContext('2d')!;
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.6)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    }
    const glowTex = makeGlowTexture();

    const starMaterial = new THREE.PointsMaterial({
      size: 0.09,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // --- Glow orbs (soft nebula blobs) ---
    const orbColors = ['#ff2ec4', '#7c3aed', '#22d3ee'];
    const orbs = orbColors.map((hex, i) => {
      const mat = new THREE.SpriteMaterial({
        map: glowTex,
        color: new THREE.Color(hex),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      const scale = 9 + i * 2.5;
      sprite.scale.set(scale, scale, 1);
      sprite.position.set((i - 1) * 4.5, Math.sin(i) * 2, -6 - i * 2);
      scene.add(sprite);
      return sprite;
    });

    let mouseX = 0;
    let mouseY = 0;
    function onMouseMove(e: MouseEvent) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener('mousemove', onMouseMove);

    let scrollEnergy = 0;
    let lastScrollY = window.scrollY;
    function onScroll() {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollEnergy = Math.min(scrollEnergy + delta * 0.002, 1.5);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    let rafId: number;
    const clock = new THREE.Clock();

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        stars.rotation.y = t * 0.012;
        stars.rotation.x = t * 0.005;

        scrollEnergy *= 0.94;
        const pulse = 1 + scrollEnergy * 0.15;

        orbs.forEach((orb, i) => {
          orb.position.x = (i - 1) * 4.5 + Math.sin(t * 0.15 + i) * 1.2;
          orb.position.y = Math.sin(t * 0.2 + i * 2) * 1.5;
          const baseOpacity = 0.28 + i * 0.03;
          (orb.material as THREE.SpriteMaterial).opacity = baseOpacity * pulse;
        });

        camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, -5);
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      starGeometry.dispose();
      starMaterial.dispose();
      glowTex.dispose();
      orbs.forEach((orb) => (orb.material as THREE.SpriteMaterial).dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="aurora-background" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="aurora-vignette" />
      <div className="aurora-grain" />
    </div>
  );
}
