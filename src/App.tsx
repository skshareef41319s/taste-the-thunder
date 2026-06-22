import { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scenes } from './data/scenes';
import { useLenisScroll } from './hooks/useLenisScroll';
import { useReducedMotionPreference } from './hooks/useReducedMotion';
import { useScrollDirection } from './hooks/useScrollDirection';
import { useVideoPreload } from './hooks/useVideoPreload';
import { createAudioEngine } from './lib/audio';
import { LoaderScreen } from './components/LoaderScreen';
import { FloatingNav } from './components/FloatingNav';
import { AudioToggle } from './components/AudioToggle';
import { ScrollProgress } from './components/ScrollProgress';
import { SceneSection } from './components/SceneSection';

gsap.registerPlugin(ScrollTrigger);

const heroSource = scenes[0].source;

export default function App() {
  useLenisScroll();
  const reducedMotion = useReducedMotionPreference();
  const scrollDirection = useScrollDirection();
  const { progress, ready } = useVideoPreload(heroSource);
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSceneId, setActiveSceneId] = useState(scenes[0].id);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioEngine = useMemo(() => createAudioEngine(), []);
  const activeIndex = Math.max(0, scenes.findIndex((scene) => scene.id === activeSceneId));
  const allAssetsReady = ready && introComplete;

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroComplete(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (allAssetsReady) {
      ScrollTrigger.refresh(true);
    }
  }, [allAssetsReady]);

  useEffect(() => {
    return () => {
      audioEngine.disable();
    };
  }, [audioEngine]);

  const handleToggleAudio = async () => {
    if (audioEnabled) {
      audioEngine.disable();
      setAudioEnabled(false);
      return;
    }

    await audioEngine.enable();
    setAudioEnabled(true);
    audioEngine.playCue('thunder');
  };

  const handleSceneEnter = (sceneId: string, cue: string) => {
    setActiveSceneId(sceneId);

    if (audioEnabled) {
      audioEngine.playCue(cue as Parameters<typeof audioEngine.playCue>[0]);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020409] text-white">
      <LoaderScreen visible={!allAssetsReady} progress={progress} />
      <FloatingNav hidden={scrollDirection === 'down'} activeId={activeSceneId} scenes={scenes} />
      <AudioToggle enabled={audioEnabled} onToggle={handleToggleAudio} />
      <ScrollProgress activeIndex={activeIndex} total={scenes.length} />

      <main className="relative">
        {scenes.map((scene, index) => (
          <SceneSection
            key={scene.id}
            scene={scene}
            index={index}
            active={activeIndex === index}
            reducedMotion={reducedMotion}
            shouldLoadVideo={Math.abs(activeIndex - index) <= 1}
            onEnter={(enteredScene) => handleSceneEnter(enteredScene.id, enteredScene.audioCue)}
          />
        ))}
      </main>
    </div>
  );
}