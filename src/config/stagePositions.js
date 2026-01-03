// Stage Position Configuration
// All coordinates are percentages (0-100) relative to stage container
// Items are positioned from their CENTER point

// Z-index layers for proper stacking (lower = further back)
export const Z_LAYERS = {
  backdrop: 10,
  arch: 20,
  archFlorals: 25,
  platform: 5,
  carpet: 8,
  accentPanels: 15,
  lanterns: 22,
  sofaFlorals: 35,
  seating: 40,
  lighting: 45,
  stringLights: 50,
  aisle: 12,
  centerpieces: 42,
};

// Position definitions for each item type
// Format: { x, y, width, height } - all in percentages
// x,y = center point of item
export const ITEM_POSITIONS = {
  // ==========================================
  // BACKDROPS - Full width at the back
  // ==========================================
  'backdrop-white-draping': { 
    x: 50, y: 25, width: 92, height: 45,
    zIndex: Z_LAYERS.backdrop 
  },
  'backdrop-fairy-lights': { 
    x: 50, y: 25, width: 92, height: 45,
    zIndex: Z_LAYERS.backdrop 
  },
  'backdrop-sequin-gold': { 
    x: 50, y: 25, width: 92, height: 45,
    zIndex: Z_LAYERS.backdrop 
  },
  'backdrop-black-draping': { 
    x: 50, y: 25, width: 92, height: 45,
    zIndex: Z_LAYERS.backdrop 
  },

  // ==========================================
  // ARCHES - Centered, in front of backdrop
  // ==========================================
  'arch-circular-single': { 
    x: 50, y: 38, width: 28, height: 48,
    zIndex: Z_LAYERS.arch 
  },
  'arch-triple-set': { 
    x: 50, y: 36, width: 50, height: 52,
    zIndex: Z_LAYERS.arch 
  },
  'arch-hexagon': { 
    x: 50, y: 38, width: 26, height: 46,
    zIndex: Z_LAYERS.arch 
  },
  'arch-rectangle': { 
    x: 50, y: 38, width: 30, height: 48,
    zIndex: Z_LAYERS.arch 
  },

  // ==========================================
  // FLORALS ON ARCH
  // ==========================================
  'floral-arch-arrangement': { 
    x: 50, y: 20, width: 42, height: 22,
    zIndex: Z_LAYERS.archFlorals 
  },

  // ==========================================
  // SEATING - Center of stage
  // ==========================================
  'sofa-cream-tufted': { 
    x: 50, y: 68, width: 30, height: 14,
    zIndex: Z_LAYERS.seating 
  },
  'sofa-velvet-blush': { 
    x: 50, y: 68, width: 28, height: 13,
    zIndex: Z_LAYERS.seating 
  },
  'chairs-accent-pair': {
    isMultiple: true,
    positions: [
      { x: 35, y: 68, width: 10, height: 12, zIndex: Z_LAYERS.seating },
      { x: 65, y: 68, width: 10, height: 12, zIndex: Z_LAYERS.seating },
    ]
  },
  'cushions-floor-set': { 
    x: 50, y: 80, width: 40, height: 8,
    zIndex: Z_LAYERS.seating + 2 
  },

  // ==========================================
  // SOFA FLORALS - Flanking the sofa
  // ==========================================
  'floral-sofa-wrap': {
    isMultiple: true,
    positions: [
      { x: 32, y: 65, width: 14, height: 14, zIndex: Z_LAYERS.sofaFlorals },
      { x: 68, y: 65, width: 14, height: 14, zIndex: Z_LAYERS.sofaFlorals },
    ]
  },

  // ==========================================
  // LIGHTING - Symmetrical on sides
  // ==========================================
  'lighting-pillar-candles': {
    isMultiple: true,
    positions: [
      { x: 18, y: 62, width: 8, height: 18, zIndex: Z_LAYERS.lighting },
      { x: 82, y: 62, width: 8, height: 18, zIndex: Z_LAYERS.lighting },
    ]
  },
  'lighting-candle-cluster': {
    isMultiple: true,
    positions: [
      { x: 20, y: 72, width: 10, height: 12, zIndex: Z_LAYERS.lighting },
      { x: 80, y: 72, width: 10, height: 12, zIndex: Z_LAYERS.lighting },
    ]
  },
  'lighting-uplighting': {
    isMultiple: true,
    positions: [
      { x: 8, y: 50, width: 6, height: 40, zIndex: Z_LAYERS.lighting },
      { x: 92, y: 50, width: 6, height: 40, zIndex: Z_LAYERS.lighting },
    ]
  },
  'lighting-string-addition': { 
    x: 50, y: 8, width: 88, height: 10,
    zIndex: Z_LAYERS.stringLights 
  },

  // ==========================================
  // ACCENTS
  // ==========================================
  'accent-gold-panels': {
    isMultiple: true,
    positions: [
      { x: 10, y: 42, width: 7, height: 35, zIndex: Z_LAYERS.accentPanels },
      { x: 90, y: 42, width: 7, height: 35, zIndex: Z_LAYERS.accentPanels },
    ]
  },
  'accent-mirror-frame': { 
    x: 50, y: 35, width: 14, height: 22,
    zIndex: Z_LAYERS.accentPanels + 1 
  },
  'accent-lantern-set': {
    isMultiple: true,
    positions: [
      { x: 14, y: 50, width: 8, height: 16, zIndex: Z_LAYERS.lanterns },
      { x: 86, y: 50, width: 8, height: 16, zIndex: Z_LAYERS.lanterns },
    ]
  },
  'accent-aisle-runner': { 
    x: 50, y: 88, width: 18, height: 22,
    zIndex: Z_LAYERS.aisle 
  },

  // ==========================================
  // AISLE FLORALS
  // ==========================================
  'floral-aisle-boxes': {
    isMultiple: true,
    positions: [
      { x: 38, y: 82, width: 8, height: 10, zIndex: Z_LAYERS.aisle + 2 },
      { x: 62, y: 82, width: 8, height: 10, zIndex: Z_LAYERS.aisle + 2 },
      { x: 38, y: 92, width: 8, height: 10, zIndex: Z_LAYERS.aisle + 2 },
      { x: 62, y: 92, width: 8, height: 10, zIndex: Z_LAYERS.aisle + 2 },
    ]
  },

  // ==========================================
  // CENTERPIECES
  // ==========================================
  'floral-centerpieces': {
    isMultiple: true,
    positions: [
      { x: 22, y: 68, width: 10, height: 18, zIndex: Z_LAYERS.centerpieces },
      { x: 78, y: 68, width: 10, height: 18, zIndex: Z_LAYERS.centerpieces },
    ]
  },

  // ==========================================
  // STAGE BASE
  // ==========================================
  'stage-white-riser': { 
    x: 50, y: 78, width: 75, height: 18,
    zIndex: Z_LAYERS.platform 
  },
  'stage-carpet': { 
    x: 50, y: 72, width: 55, height: 22,
    zIndex: Z_LAYERS.carpet 
  },
  'stage-steps': { 
    x: 50, y: 92, width: 28, height: 12,
    zIndex: Z_LAYERS.platform + 1 
  },
};

// Get position for an item by ID
export const getItemPosition = (itemId) => {
  const position = ITEM_POSITIONS[itemId];
  
  if (!position) {
    // Default fallback position
    return { x: 50, y: 50, width: 20, height: 20, zIndex: 30 };
  }
  
  return position;
};

// Get z-index for proper layering
export const getZIndex = (itemId) => {
  const position = ITEM_POSITIONS[itemId];
  
  if (position?.isMultiple) {
    return position.positions[0]?.zIndex || 30;
  }
  
  return position?.zIndex || 30;
};
