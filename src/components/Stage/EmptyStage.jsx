import { motion } from 'framer-motion';
import { Sparkles, MousePointerClick } from 'lucide-react';

export function EmptyStage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Corner accents */}
        <svg className="absolute top-4 left-4 w-16 h-16 text-primary/20" viewBox="0 0 100 100">
          <path d="M0 50 L0 0 L50 0" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute top-4 right-4 w-16 h-16 text-primary/20" viewBox="0 0 100 100">
          <path d="M50 0 L100 0 L100 50" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute bottom-4 left-4 w-16 h-16 text-primary/20" viewBox="0 0 100 100">
          <path d="M0 50 L0 100 L50 100" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute bottom-4 right-4 w-16 h-16 text-primary/20" viewBox="0 0 100 100">
          <path d="M50 100 L100 100 L100 50" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>

        <h3 className="text-2xl font-serif font-semibold text-primary-light mb-3">
          Your Stage Awaits
        </h3>
        <p className="text-white/60 max-w-xs mx-auto mb-6 text-sm">
          Browse the categories on the left and click items to see them appear here in real-time
        </p>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center justify-center gap-2 text-primary/80"
        >
          <MousePointerClick className="w-5 h-5" />
          <span className="text-sm">Click items to add</span>
        </motion.div>
      </motion.div>

      {/* Stage outline hint */}
      <div className="absolute bottom-[15%] left-[15%] right-[15%] h-[40%] border-2 border-dashed border-primary/20 rounded-lg" />
    </motion.div>
  );
}

