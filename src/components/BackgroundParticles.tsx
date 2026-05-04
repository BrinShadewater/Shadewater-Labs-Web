import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
}

const PARTICLE_COUNT = 88;
const SPEED_MULTIPLIER = 1.18;
const MOUSE_REPEL_DISTANCE = 140;
const MOUSE_REPEL_STRENGTH = 0.12;

export default function BackgroundParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    if (!desktopQuery.matches) return;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const baseVx = (Math.random() - 0.5) * 0.18 * SPEED_MULTIPLIER;
      const baseVy = ((Math.random() - 0.5) * 0.18 - 0.24) * SPEED_MULTIPLIER;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        radius: Math.random() * 2.2 + 1.1,
        alpha: Math.random() * 0.5 + 0.28,
      };
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = Math.max(window.innerHeight, Math.ceil(container.getBoundingClientRect().height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initializeParticles = () => {
      particles.length = 0;
      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        particles.push(createParticle());
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY + window.scrollY;
      mouse.active = true;
    };

    const clearPointer = () => {
      mouse.active = false;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.vx += (particle.baseVx - particle.vx) * 0.04;
        particle.vy += (particle.baseVy - particle.vy) * 0.04;

        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < MOUSE_REPEL_DISTANCE) {
            const force = (1 - distance / MOUSE_REPEL_DISTANCE) * MOUSE_REPEL_STRENGTH;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        context.shadowColor = 'rgba(255, 255, 255, 0.35)';
        context.shadowBlur = 8;
        context.fill();
      }

      context.shadowBlur = 0;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      resizeCanvas();
      initializeParticles();

      if (mediaQuery.matches) {
        draw();
        window.cancelAnimationFrame(animationFrame);
        return;
      }

      draw();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    start();
    resizeObserver.observe(container);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', clearPointer);
    window.addEventListener('pointerout', clearPointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', clearPointer);
      window.removeEventListener('pointerout', clearPointer);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute left-0 top-0 w-full opacity-95" />
    </div>
  );
}
