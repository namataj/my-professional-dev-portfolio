import { motion, useReducedMotion } from 'motion/react';

// A short cross-fade between pages. Disabled for people who prefer reduced motion.
export default function PageTransition({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
