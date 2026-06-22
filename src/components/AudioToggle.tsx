import { motion } from 'framer-motion';
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';

interface AudioToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function AudioToggle({ enabled, onToggle }: AudioToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(6,10,18,0.72)] px-4 py-3 text-xs uppercase tracking-[0.36em] text-white/80 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {enabled ? <FaVolumeHigh className="text-thunder-300" /> : <FaVolumeXmark className="text-white/60" />}
      {enabled ? 'Audio On' : 'Audio Off'}
    </motion.button>
  );
}