import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteStore, useSelectedItemsArray } from '../../store/quoteStore';
import { StageItem } from './StageItem';
import { EmptyStage } from './EmptyStage';
import { Trash2 } from 'lucide-react';
import { getItemPosition, getZIndex, getPositionCategory } from '../../config/stagePositions';

export function StagePreview() {
  const selectedItems = useSelectedItemsArray();
  const clearItems = useQuoteStore((state) => state.clearItems);
  const hasItems = selectedItems.length > 0;

  // Sort items by z-index for proper layering
  const sortedItems = [...selectedItems].sort((a, b) => getZIndex(a.id) - getZIndex(b.id));

  // Render a single item or multiple instances
  const renderStageItem = (item) => {
    const position = getItemPosition(item.id);
    const zIndex = getZIndex(item.id);

    // Handle items that render multiple instances (like chair pairs, candles on both sides)
    if (position.isMultiple && position.positions) {
      return position.positions.map((pos, idx) => (
        <StageItemWrapper
          key={`${item.id}-${idx}`}
          item={item}
          position={pos}
          zIndex={zIndex}
          instanceIndex={idx}
          totalInstances={position.positions.length}
        />
      ));
    }

    // Single instance items
    return (
      <StageItemWrapper
        key={item.id}
        item={item}
        position={position}
        zIndex={zIndex}
      />
    );
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary to-primary-dark">
        <div>
          <h2 className="text-lg font-serif font-semibold text-neutral-dark">Stage Preview</h2>
          <p className="text-xs text-neutral-dark/70 mt-0.5">
            {hasItems ? `${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} selected` : 'Add items to visualize your setup'}
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
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-stone-200 via-stone-100 to-stone-200 p-4">
        {/* Stage container with aspect ratio */}
        <div className="relative w-full h-full max-w-4xl mx-auto">
          {/* Stage frame */}
          <div 
            className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(180deg, #1f1f1f 0%, #2a2a2a 30%, #1a1a1a 100%)',
            }}
          >
            {/* Ambient lighting effects */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top spotlight */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%]"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                }}
              />
              {/* Side ambient lights */}
              <div 
                className="absolute left-0 top-1/4 w-1/4 h-1/2"
                style={{
                  background: 'radial-gradient(ellipse at 0% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                }}
              />
              <div 
                className="absolute right-0 top-1/4 w-1/4 h-1/2"
                style={{
                  background: 'radial-gradient(ellipse at 100% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                }}
              />
              {/* Floor reflection */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[30%]"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.03) 100%)',
                }}
              />
            </div>

            {/* Stage floor indication */}
            <div className="absolute bottom-[12%] left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {/* Stage items container */}
            <div className="absolute inset-0">
              <AnimatePresence mode="popLayout">
                {sortedItems.map(renderStageItem)}
              </AnimatePresence>

              {/* Empty state */}
              {!hasItems && <EmptyStage />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper component for positioned stage items
function StageItemWrapper({ item, position, zIndex, instanceIndex = 0, totalInstances = 1 }) {
  const removeItem = useQuoteStore((state) => state.removeItem);

  // Animation variants
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.6,
      y: 30,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: instanceIndex * 0.1,
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -20,
      transition: { duration: 0.2 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const positionStyle = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    width: `${position.width}%`,
    height: `${position.height}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: zIndex,
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      style={positionStyle}
      className="cursor-pointer group"
      onClick={() => removeItem(item.id)}
    >
      <StageItem 
        item={item} 
        instanceIndex={instanceIndex}
        totalInstances={totalInstances}
      />
      
      {/* Hover tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute left-1/2 -translate-x-1/2 -top-8 bg-neutral-dark/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]"
      >
        {item.name}
        <span className="text-primary ml-1">× click to remove</span>
      </motion.div>
    </motion.div>
  );
}
