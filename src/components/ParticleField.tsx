import { useEffect, useRef } from 'react';
import { useReducedMotionPreference } from '../hooks/useReducedMotion';

interface ParticleFieldProps {
  active: boolean;
  tone: string;
  burstSeed: number;
  glow: string;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  ttl: number;
  alpha: number;
};

function makeParticle(width: number, height: number, burst = false): Particle {
  const x = burst ? width * 0.5 + (Math.random() - 0.5) * 32 : Math.random() * width;
  const y = burst ? height * 0.52 + (Math.random() - 0.5) * 32 : Math.random() * height;
  const speed = burst ? 0.8 + Math.random() * 2.8 : 0.12 + Math.random() * 0.72;

  return {
    x,
    y,
    vx: (Math.random() - 0.5) * speed,
    vy: (burst ? -1 : -0.35) * (0.25 + Math.random() * speed),
    size: burst ? 1 + Math.random() * 4 : 0.8 + Math.random() * 2.2,
    life: 0,
    ttl: burst ? 140 + Math.random() * 90 : 280 + Math.random() * 220,
    alpha: burst ? 0.7 : 0.38
  };
}

const toneColor: Record<string, string> = {
  hero: 'rgba(100, 170, 255, 1)',
  awakening: 'rgba(96, 219, 255, 1)',
  pressure: 'rgba(140, 198, 255, 1)',
  burst: 'rgba(255, 255, 255, 1)',
  vortex: 'rgba(90, 185, 255, 1)',
  mountain: 'rgba(226, 242, 255, 1)',
  pour: 'rgba(143, 243, 255, 1)',
  refresh: 'rgba(235, 248, 255, 1)',
  final: 'rgba(255, 255, 255, 1)'
};

export function ParticleField({ active, tone, burstSeed, glow }: ParticleFieldProps) {
  const reducedMotion = useReducedMotionPreference();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef(burstSeed);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: Particle[] = [];

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const density = reducedMotion ? 10 : tone === 'burst' ? 44 : 24;
      particles = Array.from({ length: density }, () => makeParticle(width, height));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const animate = () => {
      context.clearRect(0, 0, width, height);
      const color = toneColor[tone] ?? toneColor.hero;

      if (burstRef.current !== burstSeed) {
        burstRef.current = burstSeed;
        const burstCount = reducedMotion ? 10 : 42;
        for (let index = 0; index < burstCount; index += 1) {
          particles.push(makeParticle(width, height, true));
        }
      }

      particles = particles.filter((particle) => particle.life < particle.ttl);

      particles.forEach((particle) => {
        particle.x += particle.vx * (active ? 1.2 : 0.7);
        particle.y += particle.vy * (active ? 1.08 : 0.84);
        particle.life += 1;

        const lifeRatio = 1 - particle.life / particle.ttl;
        const alpha = particle.alpha * lifeRatio;

        context.beginPath();
        context.fillStyle = color.replace('1)', `${Math.max(0, alpha).toFixed(3)})`);
        context.shadowColor = glow;
        context.shadowBlur = particle.size * 10;
        context.arc(particle.x, particle.y, particle.size * (0.9 + lifeRatio * 0.6), 0, Math.PI * 2);
        context.fill();
      });

      raf = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [active, burstSeed, glow, reducedMotion, tone]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-85 mix-blend-screen" aria-hidden="true" />;
}