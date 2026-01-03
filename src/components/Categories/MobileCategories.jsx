import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Grid3X3, Layers, Circle, Sofa, Flower2, Lamp, Sparkles, Square } from 'lucide-react';
import { categories, getItemsByCategory } from '../../data/inventory';
import { ItemCard } from './ItemCard';

const iconMap = {
  Layers,
  Circle,
  Sofa,
  Flower2,
  Lamp,
  Sparkles,
  Square,
};

export function MobileCategories({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('backdrops');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-md bg-white z-50 lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 bg-neutral-dark text-white">
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-serif font-semibold">Browse Decor</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto border-b border-neutral-light scrollbar-hide">
              {categories.map((category) => {
                const Icon = iconMap[category.icon] || Square;
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3
                      transition-colors border-b-2
                      ${isActive 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-text-muted hover:text-neutral-dark'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs whitespace-nowrap">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                {getItemsByCategory(activeCategory).map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

