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
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-primary-dark flex-shrink-0">
        <div>
          <h2 className="text-base font-serif font-semibold text-neutral-dark">Stage Preview</h2>
          <p className="text-xs text-neutral-dark/70">
            {hasItems ? `${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} selected` : 'Add items to visualize'}
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
      <div className="flex-1 bg-gradient-to-b from-stone-200 via-stone-100 to-stone-200 p-4 flex items-center justify-center overflow-hidden">
        {/* Stage container - maintains 16:9 aspect ratio */}
        <div 
          className="relative w-full rounded-xl overflow-hidden shadow-2xl"
          style={{
            aspectRatio: '16 / 9',
            maxHeight: '100%',
            background: 'linear-gradient(180deg, #1a1a1a 0%, #252525 20%, #1f1f1f 80%, #151515 100%)',
          }}
        >
          {/* Ambient lighting effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
              }}
            />
            {/* Floor reflection */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1/4"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.03) 100%)',
              }}
            />
          </div>

          {/* Floor line */}
          <div 
            className="absolute left-[8%] right-[8%] bottom-[18%] h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.25), transparent)',
            }}
          />

          {/* Stage items */}
          <AnimatePresence mode="popLayout">
            {renderStageItems()}
          </AnimatePresence>

          {/* Empty state */}
          {!hasItems && <EmptyStage />}
        </div>
      </div>
    </div>
  );
}

// Positioned stage item wrapper
function StageItemWrapper({ item, position, instanceIndex = 0, totalInstances = 1 }) {
  const removeItem = useQuoteStore((state) => state.removeItem);

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
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
      scale: 0.85,
      transition: { duration: 0.12 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.12 }
    }
  };

  // Calculate position - items positioned by their TOP-LEFT corner
  // x and y are center points, so we offset by half width/height
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
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
          {item.name}
          <span className="text-primary ml-1">×</span>
        </div>
      </div>
    </motion.div>
  );
}
