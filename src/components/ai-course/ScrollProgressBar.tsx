'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-right pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #c9a84c, #e8d48b)',
        boxShadow: '0 0 10px rgba(201, 168, 76, 0.5)',
      }}
    />
  );
}
