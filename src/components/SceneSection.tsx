import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene } from '../data/scenes';
import { RevealText } from './RevealText';
import { Atmosphere } from './Atmosphere';
import { ParticleField } from './ParticleField';

gsap.registerPlugin(ScrollTrigger);

interface SceneSectionProps {
  scene: Scene;
  index: number;
  active: boolean;
  reducedMotion: boolean;
  shouldLoadVideo: boolean;
  onEnter: (scene: Scene, index: number) => void;
}

export function SceneSection({ scene, index, active, reducedMotion, shouldLoadVideo, onEnter }: SceneSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSource, setVideoSource] = useState<string | null>(shouldLoadVideo ? scene.source : null);
  const [burstSeed, setBurstSeed] = useState(0);

  useEffect(() => {
    if (shouldLoadVideo && !videoSource) {
      setVideoSource(scene.source);
    }
  }, [scene.source, shouldLoadVideo, videoSource]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (active) {
      video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [active, videoSource]);

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: reducedMotion ? '+=100%' : '+=180%',
          scrub: reducedMotion ? 0.45 : 1.05,
          pin: true,
          anticipatePin: 1,
          onEnter: () => {
            onEnter(scene, index);
            if (scene.audioCue === 'burst') {
              setBurstSeed((value) => value + 1);
            }
          },
          onEnterBack: () => {
            onEnter(scene, index);
          }
        }
      });

      timeline
        .fromTo(
          stageRef.current,
          { scale: 1.14, filter: 'blur(16px) brightness(0.58)' },
          { scale: 1, filter: 'blur(0px) brightness(1)', ease: 'none' },
          0
        )
        .fromTo(
          contentRef.current,
          { y: 88, opacity: 0, filter: 'blur(18px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', ease: 'power4.out' },
          0.12
        )
        .fromTo(
          '.scene-frame',
          { opacity: 0.65 },
          { opacity: 1, ease: 'none' },
          0
        );

      if (scene.audioCue === 'burst') {
        timeline
          .to(flashRef.current, { opacity: 0.95, duration: 0.06, ease: 'power2.out' }, 0.42)
          .to(flashRef.current, { opacity: 0.08, duration: 0.12, ease: 'power2.out' }, 0.48)
          .to(flashRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0.6);
      }

      if (scene.id === 'final' && !reducedMotion) {
        timeline.to(stageRef.current, { rotateY: 6, rotateX: -3, transformOrigin: 'center center', ease: 'none' }, 0.6);
      }
    }, sectionRef);

    return () => context.revert();
  }, [index, onEnter, reducedMotion, scene]);

  return (
    <section id={scene.id} ref={sectionRef} className="relative min-h-[220svh] bg-[#020409]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="scene-frame absolute inset-0">
          <div className="absolute inset-0 bg-[#020409]" />
          <div ref={stageRef} className="absolute inset-0 will-change-transform">
            {videoSource ? (
              <video
                ref={videoRef}
                src={videoSource}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover opacity-82"
                style={{ objectPosition: scene.objectPosition }}
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(65,122,255,0.16),transparent_35%),linear-gradient(180deg,#04070d,#020409)]" />
            )}
            <div className={`absolute inset-0 bg-gradient-to-r ${scene.accent} opacity-70 mix-blend-screen`} />
            <Atmosphere tone={scene.tone} active={active} />
            <ParticleField active={active} tone={scene.tone} burstSeed={burstSeed} glow={scene.glow} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_18%,rgba(0,0,0,0.18)_50%,rgba(0,0,0,0.74)_100%)]" />
          </div>
          <div ref={flashRef} className="pointer-events-none absolute inset-0 bg-white opacity-0 mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.28)_38%,rgba(0,0,0,0.82)_100%)]" />
        </div>

        <div className="relative z-10 flex h-full items-end px-5 pb-8 sm:px-10 sm:pb-12 lg:px-16 lg:pb-14">
          <div ref={contentRef} className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.62rem] uppercase tracking-[0.45em] text-white/70 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-thunder-300 shadow-[0_0_16px_rgba(118,192,255,0.8)]" />
              {scene.eyebrow}
            </div>

            <RevealText
              text={scene.title}
              active={active}
              as="h1"
              className="headline-display max-w-5xl text-[clamp(3.7rem,11vw,8.8rem)] leading-[0.86] text-white text-glow sm:text-[clamp(4.3rem,10vw,9rem)]"
            />

            <RevealText
              text={scene.subtitle}
              active={active}
              as="p"
              mode="words"
              delay={0.28}
              className="mt-6 max-w-2xl text-[clamp(0.96rem,2vw,1.32rem)] leading-8 text-white/78 sm:leading-9"
            />

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/56 sm:text-[0.98rem] sm:leading-8">{scene.body}</p>

            <div className="mt-8 flex flex-wrap gap-3 text-[0.64rem] uppercase tracking-[0.34em] text-white/62">
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-md">{String(index + 1).padStart(2, '0')} / 09</span>
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-md">Scroll Driven</span>
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-md">Cinematic Motion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}