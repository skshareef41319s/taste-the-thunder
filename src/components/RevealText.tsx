import { motion } from 'framer-motion';
import type { ElementType } from 'react';

interface RevealTextProps {
  text: string;
  active: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  mode?: 'chars' | 'words';
  delay?: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(14px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)'
  }
};

function splitText(text: string, mode: 'chars' | 'words'): string[] {
  if (mode === 'words') {
    return text.split(/(\s+)/);
  }

  return Array.from(text);
}

export function RevealText({ text, active, className, as = 'h2', mode = 'chars', delay = 0 }: RevealTextProps) {
  const Wrapper: ElementType = as;
  const pieces = splitText(text, mode);

  return (
    <Wrapper className={className}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        transition={{ delay }}
      >
        {pieces.map((piece, index) => {
          if (mode === 'words' && piece.trim().length === 0) {
            return <span key={`${piece}-${index}`}>{piece}</span>;
          }

          return (
            <motion.span
              key={`${piece}-${index}`}
              variants={itemVariants}
              transition={{ duration: 0.72, ease: [0.2, 1, 0.22, 1] }}
              className={mode === 'chars' ? 'inline-block will-change-transform' : 'inline-block mr-[0.22em] will-change-transform'}
            >
              {piece}
            </motion.span>
          );
        })}
      </motion.span>
    </Wrapper>
  );
}

export type { RevealTextProps };