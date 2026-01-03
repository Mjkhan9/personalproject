import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteStore, useSelectedItemsArray } from '../../store/quoteStore';
import { StageItem } from './StageItem';
import { EmptyStage } from './EmptyStage';
import { Trash2 } from 'lucide-react';

export function StagePreview() {
  const selectedItems = useSelectedItemsArray();
  const clearItems = useQuoteStore((state) => state.clearItems);
  const hasItems = selectedItems.length > 0;

  // Sort items by layer for proper z-index rendering
  const sortedItems = [...selectedItems].sort((a, b) => a.layer - b.layer);

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary to-primary-dark">
        <div>
          <h2 className="text-lg font-serif font-semibold text-neutral-dark">Stage Preview</h2>
          <p className="text-xs text-neutral-dark/70 mt-0.5">
            {hasItems ? `${selectedItems.length} items selected` : 'Add items to visualize your setup'}
          </p>
        </div>
        {hasItems && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearItems}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-dark/10 hover:bg-neutral-dark/20 rounded-lg text-neutral-dark text-sm transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        )}
      </div>

      {/* Stage Canvas */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-neutral-light via-white to-accent/10 p-4">
        {/* Stage frame container */}
        <div 
          className="relative w-full h-full stage-glow rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
          }}
        >
          {/* Stage background elements */}
          <div className="absolute inset-0">
            {/* Ambient lighting effect */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.3) 0%, transparent 60%)',
              }}
            />
            
            {/* Floor reflection */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1/3"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.05) 100%)',
              }}
            />
          </div>

          {/* Stage items */}
          <div className="relative w-full h-full">
            <AnimatePresence mode="popLayout">
              {sortedItems.map((item) => (
                <StageItem key={item.id} item={item} />
              ))}
            </AnimatePresence>

            {/* Empty state */}
            {!hasItems && <EmptyStage />}
          </div>

          {/* Stage floor line */}
          <div className="absolute bottom-[8%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
