import { motion } from 'framer-motion';

export function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-primary text-neutral-dark',
    secondary: 'bg-neutral-dark text-white',
    accent: 'bg-accent text-neutral-dark',
    success: 'bg-green-500 text-white',
  };

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
}

