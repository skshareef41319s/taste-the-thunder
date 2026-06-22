import { motion } from 'framer-motion';

interface AtmosphereProps {
  tone: string;
  active: boolean;
}

const toneLayers: Record<string, string> = {
  hero: 'from-thunder-500/25 via-blue-400/10 to-transparent',
  awakening: 'from-cyan-400/20 via-blue-400/10 to-transparent',
  pressure: 'from-blue-500/18 via-white/8 to-transparent',
  burst: 'from-white/28 via-blue-300/12 to-transparent',
  vortex: 'from-blue-500/22 via-cyan-300/10 to-transparent',
  mountain: 'from-white/18 via-sky-300/8 to-transparent',
  pour: 'from-cyan-300/18 via-sky-200/10 to-transparent',
  refresh: 'from-white/14 via-blue-200/8 to-transparent',
  final: 'from-white/28 via-thunder-300/12 to-transparent'
};

export function Atmosphere({ tone, active }: AtmosphereProps) {
  const overlay = toneLayers[tone] ?? toneLayers.hero;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-28 top-1/4 h-[24rem] w-[24rem] rounded-full bg-thunder-400/15 blur-3xl"
        animate={{ x: [0, 22, -10, 0], y: [0, -22, 8, 0], opacity: active ? 0.56 : 0.24 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-8rem] top-1/5 h-[18rem] w-[18rem] rounded-full bg-sky-300/12 blur-3xl"
        animate={{ x: [0, -14, 12, 0], y: [0, 16, -8, 0], opacity: active ? 0.46 : 0.18 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]"
        animate={{ scale: active ? [1, 1.08, 1] : 1, opacity: active ? 0.45 : 0.16 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.09),transparent_38%),radial-gradient(circle_at_50%_75%,rgba(20,65,155,0.22),transparent_28%)]" />
      <motion.div
        className="absolute inset-0 bg-white mix-blend-screen"
        animate={{ opacity: active ? [0, 0.12, 0] : 0 }}
        transition={{ duration: 7.5, repeat: Infinity, repeatDelay: 5.5, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.72))]" />
    </div>
  );
}