// Stage Position Slots Configuration
// Coordinates are percentages (0-100) relative to stage container
// x, y represent center point of the item

export const STAGE_POSITIONS = {
  // LAYER 1: BACKDROPS - Always full width at back
  backdrop: {
    default: { x: 50, y: 22, width: 96, height: 42 },
  },

  // LAYER 2: ARCHES/FRAMES - Centered, in front of backdrop
  arch: {
    'arch-circular-single': { x: 50, y: 32, width: 42, height: 52 },
    'arch-triple-set': { x: 50, y: 30, width: 72, height: 55 },
    'arch-hexagon': { x: 50, y: 32, width: 38, height: 48 },
    'arch-rectangle': { x: 50, y: 30, width: 48, height: 52 },
    default: { x: 50, y: 32, width: 42, height: 50 },
  },

  // LAYER 3: ARCH FLORALS - Attached to arch area
  archFlorals: {
    'floral-arch-arrangement': { x: 50, y: 18, width: 52, height: 28 },
    default: { x: 50, y: 18, width: 50, height: 25 },
  },

  // LAYER 4: PLATFORM/STAGE BASE
  platform: {
    'stage-white-riser': { x: 50, y: 78, width: 80, height: 22 },
    'stage-steps': { x: 50, y: 92, width: 35, height: 12 },
    default: { x: 50, y: 78, width: 75, height: 20 },
  },

  // LAYER 5: CARPET/RUG - On the platform
  carpet: {
    'stage-carpet': { x: 50, y: 72, width: 58, height: 28 },
    default: { x: 50, y: 72, width: 55, height: 25 },
  },

  // LAYER 6: MAIN SEATING - Center of stage
  seating: {
    'sofa-cream-tufted': { x: 50, y: 62, width: 34, height: 18 },
    'sofa-velvet-blush': { x: 50, y: 62, width: 30, height: 16 },
    'chairs-accent-pair': {
      isMultiple: true,
      positions: [
        { x: 24, y: 62, width: 14, height: 16 },
        { x: 76, y: 62, width: 14, height: 16 },
      ],
    },
    'cushions-floor-set': { x: 50, y: 74, width: 42, height: 10 },
    default: { x: 50, y: 62, width: 32, height: 18 },
  },

  // LAYER 7: SOFA/SIDE FLORALS
  sofaFlorals: {
    'floral-sofa-wrap': {
      isMultiple: true,
      positions: [
        { x: 30, y: 56, width: 14, height: 12 },
        { x: 70, y: 56, width: 14, height: 12 },
      ],
    },
    default: { x: 50, y: 56, width: 40, height: 12 },
  },

  // LAYER 8: CANDLES & LIGHTING
  lighting: {
    'lighting-pillar-candles': {
      isMultiple: true,
      positions: [
        { x: 16, y: 58, width: 10, height: 22 },
        { x: 84, y: 58, width: 10, height: 22 },
      ],
    },
    'lighting-candle-cluster': {
      isMultiple: true,
      positions: [
        { x: 18, y: 68, width: 12, height: 16 },
        { x: 82, y: 68, width: 12, height: 16 },
      ],
    },
    'lighting-uplighting': {
      isMultiple: true,
      positions: [
        { x: 8, y: 50, width: 8, height: 45 },
        { x: 92, y: 50, width: 8, height: 45 },
      ],
    },
    'lighting-string-addition': { x: 50, y: 8, width: 88, height: 14 },
    default: { x: 50, y: 65, width: 10, height: 15 },
  },

  // LAYER 9: LANTERNS
  lanterns: {
    'accent-lantern-set': {
      isMultiple: true,
      positions: [
        { x: 12, y: 45, width: 10, height: 18 },
        { x: 88, y: 45, width: 10, height: 18 },
      ],
    },
    default: { x: 15, y: 50, width: 10, height: 18 },
  },

  // LAYER 10: ACCENT PANELS
  accents: {
    'accent-gold-panels': {
      isMultiple: true,
      positions: [
        { x: 6, y: 38, width: 10, height: 38 },
        { x: 94, y: 38, width: 10, height: 38 },
      ],
    },
    'accent-mirror-frame': { x: 50, y: 28, width: 16, height: 22 },
    default: { x: 50, y: 40, width: 15, height: 25 },
  },

  // LAYER 11: AISLE ELEMENTS
  aisle: {
    'accent-aisle-runner': { x: 50, y: 88, width: 22, height: 24 },
    'floral-aisle-boxes': {
      isMultiple: true,
      positions: [
        { x: 32, y: 85, width: 10, height: 10 },
        { x: 68, y: 85, width: 10, height: 10 },
        { x: 32, y: 95, width: 10, height: 10 },
        { x: 68, y: 95, width: 10, height: 10 },
      ],
    },
    default: { x: 50, y: 88, width: 20, height: 20 },
  },

  // LAYER 12: CENTERPIECES
  centerpieces: {
    'floral-centerpieces': {
      isMultiple: true,
      positions: [
        { x: 22, y: 68, width: 12, height: 18 },
        { x: 78, y: 68, width: 12, height: 18 },
      ],
    },
    default: { x: 50, y: 68, width: 12, height: 18 },
  },
};

// Z-index layers for proper stacking order
export const Z_LAYERS = {
  floor: 5,
  platform: 8,
  carpet: 10,
  backdrop: 12,
  accentPanels: 15,
  arch: 20,
  archFlorals: 25,
  lanterns: 28,
  sofaFlorals: 32,
  seating: 35,
  cushions: 38,
  lighting: 42,
  centerpieces: 45,
  aisleFlorals: 48,
  stringLights: 50,
};

// Map item IDs to their position category
export const getPositionCategory = (itemId) => {
  // Backdrops
  if (itemId.startsWith('backdrop-')) return 'backdrop';
  
  // Arches
  if (itemId.startsWith('arch-')) return 'arch';
  
  // Stage/Platform
  if (itemId === 'stage-white-riser') return 'platform';
  if (itemId === 'stage-steps') return 'platform';
  if (itemId === 'stage-carpet') return 'carpet';
  
  // Seating
  if (itemId.startsWith('sofa-') || itemId.startsWith('chairs-') || itemId.startsWith('cushions-')) return 'seating';
  
  // Florals
  if (itemId === 'floral-arch-arrangement') return 'archFlorals';
  if (itemId === 'floral-sofa-wrap') return 'sofaFlorals';
  if (itemId === 'floral-aisle-boxes') return 'aisle';
  if (itemId === 'floral-centerpieces') return 'centerpieces';
  
  // Lighting
  if (itemId.startsWith('lighting-')) return 'lighting';
  
  // Accents
  if (itemId === 'accent-lantern-set') return 'lanterns';
  if (itemId === 'accent-gold-panels' || itemId === 'accent-mirror-frame') return 'accents';
  if (itemId === 'accent-aisle-runner') return 'aisle';
  
  return 'default';
};

// Get z-index for an item
export const getZIndex = (itemId) => {
  const category = getPositionCategory(itemId);
  
  const zMap = {
    backdrop: Z_LAYERS.backdrop,
    arch: Z_LAYERS.arch,
    platform: Z_LAYERS.platform,
    carpet: Z_LAYERS.carpet,
    seating: itemId.includes('cushions') ? Z_LAYERS.cushions : Z_LAYERS.seating,
    archFlorals: Z_LAYERS.archFlorals,
    sofaFlorals: Z_LAYERS.sofaFlorals,
    lighting: itemId === 'lighting-string-addition' ? Z_LAYERS.stringLights : Z_LAYERS.lighting,
    lanterns: Z_LAYERS.lanterns,
    accents: Z_LAYERS.accentPanels,
    aisle: itemId.includes('floral') ? Z_LAYERS.aisleFlorals : Z_LAYERS.floor,
    centerpieces: Z_LAYERS.centerpieces,
  };
  
  return zMap[category] || 30;
};

// Get position for an item
export const getItemPosition = (itemId) => {
  const category = getPositionCategory(itemId);
  const categoryPositions = STAGE_POSITIONS[category];
  
  if (!categoryPositions) {
    return { x: 50, y: 50, width: 20, height: 20 };
  }
  
  // Try to find specific position for this item ID
  if (categoryPositions[itemId]) {
    return categoryPositions[itemId];
  }
  
  // Fall back to default for this category
  return categoryPositions.default || { x: 50, y: 50, width: 20, height: 20 };
};

