import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Layers, Circle, Sofa, Flower2, Lamp, Sparkles, Square } from 'lucide-react';
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

export function CategorySidebar() {
  const [openCategory, setOpenCategory] = useState('backdrops');

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-neutral-dark to-neutral-dark/90 text-white">
        <h2 className="text-lg font-serif font-semibold">Browse Decor</h2>
        <p className="text-xs text-white/60 mt-1">Select items to build your setup</p>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Square;
          const items = getItemsByCategory(category.id);
          const isOpen = openCategory === category.id;

          return (
            <div key={category.id} className="rounded-xl overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 
                  transition-all duration-300
                  ${isOpen 
                    ? 'bg-primary text-neutral-dark' 
                    : 'bg-neutral-light hover:bg-accent/30 text-neutral-dark'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{category.name}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              {/* Category Items */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 bg-neutral-light/50 grid grid-cols-2 gap-3">
                      {items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

