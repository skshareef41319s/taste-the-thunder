import { motion } from 'framer-motion';
import type { Scene } from '../data/scenes';

interface FloatingNavProps {
  hidden: boolean;
  activeId: string;
  scenes: Scene[];
}

export function FloatingNav({ hidden, activeId, scenes }: FloatingNavProps) {
  return (
    <motion.nav
      className="fixed left-1/2 top-5 z-[60] w-[min(92vw,980px)] -translate-x-1/2"
      initial={false}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="glass-panel flex items-center justify-between gap-3 rounded-full px-3 py-3 sm:px-4">
        <a href="#home" className="flex items-center gap-2 rounded-full px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-white/80 transition hover:text-white">
          <span className="inline-block h-2 w-2 rounded-full bg-thunder-300 shadow-[0_0_18px_rgba(133,199,255,0.8)]" />
          Thums Up
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {scenes.map((scene) => {
            const isActive = scene.id === activeId;

            return (
              <a
                key={scene.id}
                href={`#${scene.id}`}
                className={`rounded-full px-4 py-2 text-[0.68rem] uppercase tracking-[0.32em] transition ${
                  isActive ? 'bg-white/12 text-white shadow-electric' : 'text-white/60 hover:bg-white/6 hover:text-white'
                }`}
              >
                {scene.navLabel}
              </a>
            );
          })}
        </div>

        <a
          href="#final"
          className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[0.64rem] uppercase tracking-[0.38em] text-white/75 transition hover:bg-white/12 hover:text-white"
        >
          Watch Story
        </a>
      </div>
    </motion.nav>
  );
}