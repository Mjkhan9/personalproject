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
        {/* Subtle corner accents */}
        <svg className="absolute top-8 left-8 w-12 h-12 text-primary/10" viewBox="0 0 100 100">
          <path d="M0 50 L0 0 L50 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <svg className="absolute top-8 right-8 w-12 h-12 text-primary/10" viewBox="0 0 100 100">
          <path d="M50 0 L100 0 L100 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <svg className="absolute bottom-8 left-8 w-12 h-12 text-primary/10" viewBox="0 0 100 100">
          <path d="M0 50 L0 100 L50 100" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <svg className="absolute bottom-8 right-8 w-12 h-12 text-primary/10" viewBox="0 0 100 100">
          <path d="M50 100 L100 100 L100 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.08, 1],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center"
        >
          <Sparkles className="w-12 h-12 text-primary" />
        </motion.div>

        <h3 className="text-3xl font-serif font-semibold text-primary mb-4">
          Your Stage Awaits
        </h3>
        <p className="text-white/50 max-w-sm mx-auto mb-8 text-base leading-relaxed">
          Browse decor items and click to see them appear here in real-time. Build your dream wedding setup.
        </p>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center gap-2 text-primary/70"
        >
          <MousePointerClick className="w-5 h-5" />
          <span className="text-sm font-medium">Click items to add</span>
        </motion.div>
      </motion.div>

      {/* Subtle stage outline hint */}
      <div className="absolute bottom-[18%] left-[10%] right-[10%] h-[35%] border border-dashed border-primary/15 rounded-lg" />
    </motion.div>
  );
}
