import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteStore, useSelectedItemsArray } from '../../store/quoteStore';
import { StageItem } from './StageItem';
import { EmptyStage } from './EmptyStage';
import { Trash2 } from 'lucide-react';
import { getItemPosition, getZIndex } from '../../config/stagePositions';

export function StagePreview() {
  const selectedItems = useSelectedItemsArray();
  const clearItems = useQuoteStore((state) => state.clearItems);
  const hasItems = selectedItems.length > 0;

  // Sort items by z-index for proper layering
  const sortedItems = [...selectedItems].sort((a, b) => getZIndex(a.id) - getZIndex(b.id));

  // Render items with proper positioning
  const renderStageItems = () => {
    const elements = [];

    sortedItems.forEach((item) => {
      const position = getItemPosition(item.id);

      if (position.isMultiple && position.positions) {
        // Render multiple instances (symmetrical items)
        position.positions.forEach((pos, idx) => {
          elements.push(
            <StageItemWrapper
              key={`${item.id}-${idx}`}
              item={item}
              position={pos}
              instanceIndex={idx}
              totalInstances={position.positions.length}
            />
          );
        });
      } else {
        // Single instance
        elements.push(
          <StageItemWrapper
            key={item.id}
            item={item}
            position={position}
          />
        );
      }
    });

    return elements;
  };

  return (
    <div className="h-full relative bg-gradient-to-b from-neutral-dark via-[#0f0f0f] to-neutral-dark overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow from center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          }}
        />
        {/* Subtle vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
          }}
        />
      </div>

      {/* Stage Canvas */}
      <div className="h-full flex items-center justify-center p-6 lg:p-12">
        {/* Stage container - maintains 16:9 aspect ratio */}
        <div 
          className="relative w-full rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.2)] border border-primary/20"
          style={{
            aspectRatio: '16 / 9',
            maxHeight: '100%',
            background: 'linear-gradient(180deg, #0a0a0a 0%, #151515 25%, #1a1a1a 75%, #0f0f0f 100%)',
          }}
        >
          {/* Stage floor texture */}
          <div className="absolute inset-0 opacity-30">
            <div 
              className="absolute bottom-0 left-0 right-0 h-[30%]"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212, 175, 55, 0.02) 2px, rgba(212, 175, 55, 0.02) 4px)',
              }}
            />
          </div>

          {/* Ambient lighting effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top spotlight */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
              }}
            />
            {/* Side ambient glow */}
            <div 
              className="absolute left-0 top-1/3 w-1/4 h-1/3"
              style={{
                background: 'radial-gradient(ellipse at 0% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
              }}
            />
            <div 
              className="absolute right-0 top-1/3 w-1/4 h-1/3"
              style={{
                background: 'radial-gradient(ellipse at 100% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
              }}
            />
            {/* Floor reflection */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1/4"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.05) 100%)',
              }}
            />
          </div>

          {/* Floor line */}
          <div 
            className="absolute left-[8%] right-[8%] bottom-[18%] h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
            }}
          />

          {/* Stage items */}
          <div className="absolute inset-0">
            <AnimatePresence mode="popLayout">
              {renderStageItems()}
            </AnimatePresence>

            {/* Empty state */}
            {!hasItems && <EmptyStage />}
          </div>
        </div>
      </div>

      {/* Floating Clear Button - Top Right */}
      {hasItems && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearItems}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white border border-primary/30 rounded-full text-sm font-medium hover:bg-white/20 transition-colors z-50"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </motion.button>
      )}

      {/* Item Count Badge - Top Left */}
      {hasItems && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 lg:top-6 lg:left-6 px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-sm z-50"
        >
          <span className="text-primary font-medium">{selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected</span>
        </motion.div>
      )}
    </div>
  );
}

// Positioned stage item wrapper
function StageItemWrapper({ item, position, instanceIndex = 0, totalInstances = 1 }) {
  const removeItem = useQuoteStore((state) => state.removeItem);

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.85,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: instanceIndex * 0.05,
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.15 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.12 }
    }
  };

  // Calculate position - items positioned by their center point
  const left = position.x - position.width / 2;
  const top = position.y - position.height / 2;

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        width: `${position.width}%`,
        height: `${position.height}%`,
        zIndex: position.zIndex || 30,
      }}
      className="cursor-pointer group"
      onClick={() => removeItem(item.id)}
    >
      <StageItem 
        item={item} 
        instanceIndex={instanceIndex}
        totalInstances={totalInstances}
      />
      
      {/* Hover tooltip */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="bg-black/90 backdrop-blur-sm text-white text-[10px] px-3 py-1.5 rounded-lg border border-primary/30 whitespace-nowrap shadow-lg">
          {item.name}
          <span className="text-primary ml-1.5 font-bold">×</span>
        </div>
      </div>
    </motion.div>
  );
}
