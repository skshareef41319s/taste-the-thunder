import { motion } from 'framer-motion';
import { FaBolt } from 'react-icons/fa6';

interface LoaderScreenProps {
  visible: boolean;
  progress: number;
}

export function LoaderScreen({ visible, progress }: LoaderScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden bg-[#020409]"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-hidden={!visible}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(71,135,255,0.28),transparent_45%),linear-gradient(180deg,#03050a,#010204)]" />
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3.8, ease: 'easeInOut' }}
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.45em] text-white/70 backdrop-blur-md"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaBolt className="text-thunder-300" />
          Thums Up
        </motion.div>

        <motion.h1
          className="headline-display text-[clamp(3.4rem,10vw,8rem)] leading-none text-white text-glow"
          animate={{ letterSpacing: ['0.14em', '0.2em', '0.14em'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Taste The Thunder
        </motion.h1>

        <div className="mt-8 w-full max-w-xl">
          <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/55">
            <span>Loading assets</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-white via-thunder-300 to-blue-400 shadow-electric"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.max(6, Math.round(progress * 100))}%` }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}