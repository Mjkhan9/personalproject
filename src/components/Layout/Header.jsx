import { motion } from 'framer-motion';
import { Sparkles, Phone, Instagram } from 'lucide-react';
import { useTotalItemCount } from '../../store/quoteStore';
import { Badge } from '../UI/Badge';

export function Header() {
  const totalItems = useTotalItemCount();

  return (
    <header className="bg-neutral-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar */}
        <div className="hidden sm:flex items-center justify-between py-2 text-sm border-b border-white/10">
          <div className="flex items-center gap-4">
            <a href="tel:+1234567890" className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>(123) 456-7890</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors">
              <Instagram className="w-3.5 h-3.5" />
              <span>@akenchantedevents</span>
            </a>
          </div>
          <span className="text-white/60">Serving NJ/NY Metro Area</span>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-neutral-dark" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold tracking-wide">
                AK <span className="text-primary">Enchanted</span> Events
              </h1>
              <p className="text-xs text-white/60 hidden sm:block">Luxury Wedding & Event Decor</p>
            </div>
          </motion.div>

          {/* Center tagline */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block text-center"
          >
            <h2 className="text-2xl font-serif text-primary-light">
              Build Your Dream Setup
            </h2>
            <p className="text-sm text-white/60">Design • Preview • Quote</p>
          </motion.div>

          {/* Right side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            {totalItems > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60 hidden sm:inline">Items:</span>
                <Badge variant="primary">{totalItems}</Badge>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
