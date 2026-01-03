import { memo } from 'react';

// Memoized StageItem for performance
export const StageItem = memo(function StageItem({ item, instanceIndex = 0, totalInstances = 1 }) {
  const { id } = item;
  
  return (
    <div className="w-full h-full">
      <StageSVG 
        itemId={id} 
        instanceIndex={instanceIndex}
        totalInstances={totalInstances}
      />
    </div>
  );
});

// ============================================
// REUSABLE FLOWER & LEAF SHAPES
// Based on the provided reference images
// ============================================

// Simple 5-petal flower shape
function Flower({ x, y, size = 1, color = '#FFFFFF' }) {
  const s = size;
  return (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      {/* 5 petals arranged in a circle */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={i}
          cx={0}
          cy={-2.5}
          rx={1.8}
          ry={3}
          fill={color}
          transform={`rotate(${angle})`}
          opacity="0.9"
        />
      ))}
      {/* Center */}
      <circle cx="0" cy="0" r="1.5" fill="#F4E4BA" />
    </g>
  );
}

// Rose shape - layered petals
function Rose({ x, y, size = 1, color = '#FFFFFF' }) {
  const s = size;
  return (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      {/* Outer petals */}
      <path d="M0,-4 Q3,-3 4,0 Q3,3 0,4 Q-3,3 -4,0 Q-3,-3 0,-4" fill={color} opacity="0.85" />
      {/* Middle layer */}
      <path d="M0,-2.5 Q2,-2 2.5,0 Q2,2 0,2.5 Q-2,2 -2.5,0 Q-2,-2 0,-2.5" fill={color} opacity="0.95" />
      {/* Inner swirl */}
      <circle cx="0" cy="0" r="1.2" fill={color} />
      <path d="M-0.5,-0.8 Q0.5,-0.5 0.5,0.5" stroke="#E8E0D5" strokeWidth="0.4" fill="none" />
    </g>
  );
}

// Leaf shape
function Leaf({ x, y, angle = 0, size = 1, color = '#5B7F5B' }) {
  const s = size;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle}) scale(${s})`}>
      <path 
        d="M0,0 Q2,-4 0,-8 Q-2,-4 0,0" 
        fill={color}
        opacity="0.8"
      />
      {/* Vein */}
      <path d="M0,-1 L0,-7" stroke="#4A6A4A" strokeWidth="0.3" opacity="0.5" />
    </g>
  );
}

// Greenery cluster
function GreeneryCluster({ x, y, size = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${size})`}>
      <Leaf x={0} y={0} angle={-30} size={0.8} />
      <Leaf x={2} y={1} angle={15} size={0.7} />
      <Leaf x={-2} y={1} angle={-15} size={0.7} />
      <Leaf x={1} y={-1} angle={40} size={0.6} />
      <Leaf x={-1} y={-1} angle={-40} size={0.6} />
    </g>
  );
}

// ============================================
// MAIN ROUTER
// ============================================

function StageSVG({ itemId, instanceIndex }) {
  // BACKDROPS
  if (itemId === 'backdrop-white-draping') return <DrapingBackdrop color="white" />;
  if (itemId === 'backdrop-fairy-lights') return <FairyLightBackdrop />;
  if (itemId === 'backdrop-sequin-gold') return <DrapingBackdrop color="gold" />;
  if (itemId === 'backdrop-black-draping') return <DrapingBackdrop color="dark" />;
  
  // ARCHES - With floral coverage like the reference images
  if (itemId === 'arch-circular-single') return <FloralCircularArch />;
  if (itemId === 'arch-triple-set') return <FloralTripleArch />;
  if (itemId === 'arch-hexagon') return <FloralHexagonArch />;
  if (itemId === 'arch-rectangle') return <FloralRectangleArch />;
  
  // SEATING
  if (itemId === 'sofa-cream-tufted') return <TuftedSofa />;
  if (itemId === 'sofa-velvet-blush') return <TuftedSofa color="blush" />;
  if (itemId === 'chairs-accent-pair') return <AccentChair side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'seating-floor-cushions') return <FloorCushions />;
  
  // FLORALS - Actual floral arrangements
  if (itemId === 'floral-arch-arrangement') return <FloralGarland />;
  if (itemId === 'floral-sofa-wrap') return <SofaFloralWrap side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'floral-aisle-boxes') return <AisleFloralBox index={instanceIndex} />;
  if (itemId === 'floral-centerpieces') return <TallCenterpiece side={instanceIndex === 0 ? 'left' : 'right'} />;
  
  // LIGHTING
  if (itemId === 'lighting-pillar-candles') return <PillarCandles side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-candle-cluster') return <CandleCluster side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-uplighting') return <Uplighting side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-string-lights') return <StringLights />;
  
  // ACCENTS - Gold panels like in image 1
  if (itemId === 'accent-gold-panels') return <DecorativeGoldPanel side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'accent-mirror-frame') return <MirrorFrame />;
  if (itemId === 'accent-lantern-set') return <MoroccanLantern side={instanceIndex === 0 ? 'left' : 'right'} />;
  
  // FLOOR
  if (itemId === 'floor-aisle-runner') return <AisleRunner />;
  if (itemId === 'floor-stage-riser') return <StageRiser />;
  if (itemId === 'floor-carpet') return <StageCarpet />;
  if (itemId === 'floor-steps') return <StageSteps />;
  
  return <DefaultItem />;
}

// ============================================
// BACKDROPS - Like images 1, 2, 5
// ============================================

function DrapingBackdrop({ color = 'white' }) {
  const colors = {
    white: { main: '#F8F6F3', accent: '#EBE8E3', highlight: '#FFFFFF', fold: 'rgba(0,0,0,0.04)' },
    gold: { main: '#D4AF37', accent: '#B8962E', highlight: '#F4E4BA', fold: 'rgba(0,0,0,0.1)' },
    dark: { main: '#1A1A1A', accent: '#0F0F0F', highlight: '#2A2A2A', fold: 'rgba(255,255,255,0.03)' }
  };
  const c = colors[color] || colors.white;
  
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`drape-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.highlight} />
          <stop offset="30%" stopColor={c.main} />
          <stop offset="100%" stopColor={c.accent} />
        </linearGradient>
      </defs>
      
      {/* Base */}
      <rect x="0" y="0" width="200" height="100" fill={`url(#drape-${color})`} />
      
      {/* Gathered swag at top */}
      <path d="M0 0 Q30 8, 60 5 Q100 10, 140 5 Q170 8, 200 0 L200 12 Q150 18, 100 14 Q50 18, 0 12 Z" fill={c.highlight} opacity="0.6" />
      
      {/* Vertical pleats */}
      {[15, 35, 55, 75, 95, 115, 135, 155, 175, 195].map((x, i) => (
        <path 
          key={i}
          d={`M${x} 10 Q${x + 2} 50, ${x} 100`}
          stroke={c.fold}
          strokeWidth="8"
          fill="none"
        />
      ))}
    </svg>
  );
}

function FairyLightBackdrop() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <radialGradient id="warmGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF8E8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Dark backdrop */}
      <rect x="0" y="0" width="200" height="100" fill="#0a0a0a" />
      <rect x="0" y="0" width="200" height="100" fill="url(#warmGlow)" />
      
      {/* Vertical strings */}
      {Array.from({ length: 18 }).map((_, i) => (
        <line 
          key={i}
          x1={10 + i * 11} y1="0" x2={10 + i * 11} y2="100"
          stroke="#222"
          strokeWidth="0.5"
        />
      ))}
      
      {/* Lights */}
      {Array.from({ length: 18 }).map((_, col) =>
        Array.from({ length: 10 }).map((_, row) => {
          const x = 10 + col * 11;
          const y = 8 + row * 10;
          const glow = 0.5 + Math.sin(col + row) * 0.3;
          return (
            <g key={`${col}-${row}`}>
              <circle cx={x} cy={y} r="3" fill="#FFF8E0" opacity={glow * 0.3} />
              <circle cx={x} cy={y} r="1.2" fill="#FFFEF5" opacity={0.9} />
            </g>
          );
        })
      )}
    </svg>
  );
}

// ============================================
// ARCHES - With florals like the reference images
// ============================================

// Circular arch with cascading florals - like image 1 & 4
function FloralCircularArch() {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      <defs>
        <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      {/* Gold arch frame */}
      <path 
        d="M12 118 L12 48 Q12 8, 50 8 Q88 8, 88 48 L88 118" 
        stroke="url(#archGold)" 
        strokeWidth="4" 
        fill="none"
      />
      
      {/* Florals cascading down the arch - like in reference images */}
      {/* Top center cluster */}
      <Rose x={50} y={12} size={1.8} color="#FFFFFF" />
      <Rose x={45} y={14} size={1.5} color="#F8F0F0" />
      <Rose x={55} y={14} size={1.5} color="#FFFFFF" />
      <Flower x={42} y={10} size={1} color="#F5E6E6" />
      <Flower x={58} y={10} size={1} color="#F5E6E6" />
      <GreeneryCluster x={50} y={18} size={0.8} />
      <GreeneryCluster x={40} y={15} size={0.6} />
      <GreeneryCluster x={60} y={15} size={0.6} />
      
      {/* Left side cascade */}
      {[25, 40, 55, 70, 85, 100].map((y, i) => (
        <g key={`left-${i}`}>
          <Rose x={14 + i * 0.5} y={y} size={1.3 - i * 0.1} color="#FFFFFF" />
          <Flower x={18 + i * 0.3} y={y - 3} size={0.9 - i * 0.05} color="#F8F0F0" />
          <GreeneryCluster x={12} y={y + 4} size={0.5} />
        </g>
      ))}
      
      {/* Right side cascade */}
      {[25, 40, 55, 70, 85, 100].map((y, i) => (
        <g key={`right-${i}`}>
          <Rose x={86 - i * 0.5} y={y} size={1.3 - i * 0.1} color="#FFFFFF" />
          <Flower x={82 - i * 0.3} y={y - 3} size={0.9 - i * 0.05} color="#F8F0F0" />
          <GreeneryCluster x={88} y={y + 4} size={0.5} />
        </g>
      ))}
    </svg>
  );
}

// Triple arch with florals - like image 3
function FloralTripleArch() {
  return (
    <svg viewBox="0 0 160 110" className="w-full h-full">
      <defs>
        <linearGradient id="tripleGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      {/* Three arch frames */}
      <path d="M5 108 L5 42 Q5 5, 80 5 Q155 5, 155 42 L155 108" stroke="url(#tripleGold)" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M22 108 L22 45 Q22 12, 80 12 Q138 12, 138 45 L138 108" stroke="url(#tripleGold)" strokeWidth="3.5" fill="none" opacity="0.8" />
      <path d="M40 108 L40 48 Q40 18, 80 18 Q120 18, 120 48 L120 108" stroke="url(#tripleGold)" strokeWidth="4" fill="none" />
      
      {/* Dense florals at top - like image 3 */}
      {[65, 75, 85, 95].map((x, i) => (
        <g key={`top-${i}`}>
          <Rose x={x} y={8 + (i % 2) * 3} size={1.6} color="#FFFFFF" />
          <Flower x={x - 4} y={12} size={0.9} color="#F5E8E8" />
        </g>
      ))}
      <GreeneryCluster x={80} y={18} size={1} />
      
      {/* Outer arch florals */}
      {[20, 35, 50, 65, 80, 95].map((y, i) => (
        <g key={`outer-${i}`}>
          <Rose x={8} y={y} size={1.2} color="#FFFFFF" />
          <Rose x={152} y={y} size={1.2} color="#FFFFFF" />
          <Leaf x={5} y={y + 5} angle={-20} size={0.6} />
          <Leaf x={155} y={y + 5} angle={20} size={0.6} />
        </g>
      ))}
      
      {/* Middle arch florals */}
      {[30, 50, 70, 90].map((y, i) => (
        <g key={`mid-${i}`}>
          <Flower x={25} y={y} size={1} color="#FFF" />
          <Flower x={135} y={y} size={1} color="#FFF" />
        </g>
      ))}
      
      {/* Inner arch florals */}
      {[35, 55, 75, 95].map((y, i) => (
        <g key={`inner-${i}`}>
          <Rose x={42} y={y} size={1} color="#F8F0F0" />
          <Rose x={118} y={y} size={1} color="#F8F0F0" />
        </g>
      ))}
    </svg>
  );
}

// Hexagon arch with florals
function FloralHexagonArch() {
  return (
    <svg viewBox="0 0 100 115" className="w-full h-full">
      <defs>
        <linearGradient id="hexGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      {/* Hexagon frame */}
      <polygon 
        points="50,5 92,25 92,80 50,100 8,80 8,25" 
        stroke="url(#hexGold)" 
        strokeWidth="4" 
        fill="none"
        strokeLinejoin="round"
      />
      
      {/* Florals at each corner */}
      {/* Top */}
      <Rose x={50} y={8} size={1.5} color="#FFFFFF" />
      <Flower x={45} y={6} size={0.9} color="#F8F0F0" />
      <Flower x={55} y={6} size={0.9} color="#F8F0F0" />
      <GreeneryCluster x={50} y={12} size={0.6} />
      
      {/* Upper corners */}
      <Rose x={12} y={28} size={1.2} color="#FFFFFF" />
      <Rose x={88} y={28} size={1.2} color="#FFFFFF" />
      <GreeneryCluster x={10} y={32} size={0.5} />
      <GreeneryCluster x={90} y={32} size={0.5} />
      
      {/* Middle */}
      <Flower x={10} y={52} size={1} color="#FFF" />
      <Flower x={90} y={52} size={1} color="#FFF" />
      
      {/* Lower corners */}
      <Rose x={12} y={78} size={1.2} color="#FFFFFF" />
      <Rose x={88} y={78} size={1.2} color="#FFFFFF" />
      
      {/* Bottom */}
      <Rose x={50} y={98} size={1.3} color="#FFFFFF" />
      <Flower x={45} y={100} size={0.8} color="#F8F0F0" />
      <Flower x={55} y={100} size={0.8} color="#F8F0F0" />
    </svg>
  );
}

// Rectangle arch with florals
function FloralRectangleArch() {
  return (
    <svg viewBox="0 0 100 115" className="w-full h-full">
      <defs>
        <linearGradient id="rectGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      {/* Rectangle frame */}
      <rect x="10" y="5" width="80" height="105" stroke="url(#rectGold)" strokeWidth="4" fill="none" rx="2" />
      
      {/* Top florals */}
      <Rose x={30} y={8} size={1.4} color="#FFFFFF" />
      <Rose x={50} y={6} size={1.6} color="#FFFFFF" />
      <Rose x={70} y={8} size={1.4} color="#FFFFFF" />
      <Flower x={40} y={10} size={0.9} color="#F8F0F0" />
      <Flower x={60} y={10} size={0.9} color="#F8F0F0" />
      <GreeneryCluster x={50} y={14} size={0.7} />
      
      {/* Side florals */}
      {[25, 45, 65, 85].map((y, i) => (
        <g key={`side-${i}`}>
          <Rose x={12} y={y} size={1.1} color="#FFFFFF" />
          <Rose x={88} y={y} size={1.1} color="#FFFFFF" />
          <Leaf x={10} y={y + 6} angle={-15} size={0.5} />
          <Leaf x={90} y={y + 6} angle={15} size={0.5} />
        </g>
      ))}
    </svg>
  );
}

// ============================================
// SEATING - Tufted sofas like in all images
// ============================================

function TuftedSofa({ color = 'cream' }) {
  const isBlush = color === 'blush';
  const fill = isBlush ? '#F0E0E0' : '#FAF8F5';
  const mid = isBlush ? '#E8D5D5' : '#F0EDE8';
  const shadow = isBlush ? '#D8C5C5' : '#E5E2DD';
  
  return (
    <svg viewBox="0 0 140 55" className="w-full h-full">
      <defs>
        <linearGradient id={`sofaGrad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={fill} />
          <stop offset="60%" stopColor={mid} />
          <stop offset="100%" stopColor={shadow} />
        </linearGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="70" cy="53" rx="62" ry="4" fill="rgba(0,0,0,0.12)" />
      
      {/* Back - tall tufted */}
      <rect x="8" y="3" width="124" height="30" rx="5" fill={`url(#sofaGrad-${color})`} />
      
      {/* Tufting pattern - diamond style */}
      {[28, 48, 68, 88, 108].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="6" x2={x} y2="30" stroke={shadow} strokeWidth="0.8" />
          <circle cx={x} cy={11} r="1.5" fill={shadow} opacity="0.5" />
          <circle cx={x} cy={20} r="1.5" fill={shadow} opacity="0.5" />
        </g>
      ))}
      
      {/* Seat cushion */}
      <rect x="6" y="30" width="128" height="16" rx="3" fill={mid} />
      <line x1="46" y1="33" x2="46" y2="44" stroke={shadow} strokeWidth="0.5" />
      <line x1="70" y1="33" x2="70" y2="44" stroke={shadow} strokeWidth="0.5" />
      <line x1="94" y1="33" x2="94" y2="44" stroke={shadow} strokeWidth="0.5" />
      
      {/* Arms - rolled style */}
      <ellipse cx="8" cy="28" rx="8" ry="18" fill={fill} />
      <ellipse cx="132" cy="28" rx="8" ry="18" fill={fill} />
      
      {/* Gold legs */}
      <rect x="20" y="46" width="5" height="7" rx="1" fill="#D4AF37" />
      <rect x="115" y="46" width="5" height="7" rx="1" fill="#D4AF37" />
      <rect x="55" y="46" width="4" height="6" rx="1" fill="#C9A430" />
      <rect x="81" y="46" width="4" height="6" rx="1" fill="#C9A430" />
    </svg>
  );
}

function AccentChair({ side }) {
  const flip = side === 'right';
  
  return (
    <svg viewBox="0 0 55 60" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs>
        <linearGradient id="chairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF8F5" />
          <stop offset="100%" stopColor="#E8E5E0" />
        </linearGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="27" cy="57" rx="22" ry="3" fill="rgba(0,0,0,0.1)" />
      
      {/* Back - curved */}
      <path d="M6 8 Q6 2, 27 2 Q48 2, 48 8 L48 32 Q48 36, 44 36 L10 36 Q6 36, 6 32 Z" fill="url(#chairGrad)" />
      
      {/* Tufting */}
      <circle cx="20" cy="15" r="1.5" fill="#E0DDD8" opacity="0.6" />
      <circle cx="34" cy="15" r="1.5" fill="#E0DDD8" opacity="0.6" />
      <circle cx="27" cy="22" r="1.5" fill="#E0DDD8" opacity="0.6" />
      
      {/* Seat */}
      <ellipse cx="27" cy="42" rx="22" ry="9" fill="#F5F2EF" />
      
      {/* Arm */}
      <path d="M2 12 Q0 12, 0 18 L0 42 Q0 46, 5 46 L8 46 L8 12 Z" fill="#FAF8F5" />
      
      {/* Gold legs */}
      <rect x="12" y="51" width="4" height="6" rx="1" fill="#D4AF37" />
      <rect x="38" y="51" width="4" height="6" rx="1" fill="#D4AF37" />
    </svg>
  );
}

function FloorCushions() {
  return (
    <svg viewBox="0 0 120 28" className="w-full h-full">
      {[
        { x: 8, y: 8, w: 24, h: 16, color: '#FAF8F5', r: 3 },
        { x: 36, y: 6, w: 22, h: 18, color: '#F0E0E0', r: -2 },
        { x: 62, y: 9, w: 26, h: 15, color: '#FAF8F5', r: 2 },
        { x: 92, y: 7, w: 22, h: 17, color: '#F0E0E0', r: -1 },
      ].map((c, i) => (
        <g key={i} transform={`rotate(${c.r}, ${c.x + c.w/2}, ${c.y + c.h/2})`}>
          <ellipse cx={c.x + c.w/2} cy={c.y + c.h} rx={c.w/2 + 1} ry={2} fill="rgba(0,0,0,0.06)" />
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={6} fill={c.color} />
          {/* Tuft detail */}
          <circle cx={c.x + c.w/2} cy={c.y + c.h/2} r="2" fill="rgba(0,0,0,0.05)" />
        </g>
      ))}
    </svg>
  );
}

// ============================================
// FLORALS - Arrangements like reference images
// ============================================

function FloralGarland() {
  return (
    <svg viewBox="0 0 160 60" className="w-full h-full">
      {/* Dense floral arrangement - like top of arch in images */}
      {/* Center cluster */}
      <Rose x={80} y={25} size={2} color="#FFFFFF" />
      <Rose x={72} y={28} size={1.7} color="#FFF" />
      <Rose x={88} y={28} size={1.7} color="#FFF" />
      <Rose x={80} y={35} size={1.5} color="#F8F0F0" />
      <Flower x={75} y={22} size={1.2} color="#F5E8E8" />
      <Flower x={85} y={22} size={1.2} color="#F5E8E8" />
      
      {/* Left side */}
      <Rose x={55} y={30} size={1.6} color="#FFFFFF" />
      <Rose x={40} y={35} size={1.4} color="#FFF" />
      <Rose x={25} y={38} size={1.2} color="#FFF" />
      <Flower x={48} y={26} size={1} color="#F8F0F0" />
      <Flower x={32} y={32} size={0.9} color="#F8F0F0" />
      
      {/* Right side */}
      <Rose x={105} y={30} size={1.6} color="#FFFFFF" />
      <Rose x={120} y={35} size={1.4} color="#FFF" />
      <Rose x={135} y={38} size={1.2} color="#FFF" />
      <Flower x={112} y={26} size={1} color="#F8F0F0" />
      <Flower x={128} y={32} size={0.9} color="#F8F0F0" />
      
      {/* Greenery throughout */}
      <GreeneryCluster x={80} y={40} size={1.2} />
      <GreeneryCluster x={60} y={42} size={1} />
      <GreeneryCluster x={100} y={42} size={1} />
      <GreeneryCluster x={35} y={45} size={0.8} />
      <GreeneryCluster x={125} y={45} size={0.8} />
      
      {/* Trailing greenery */}
      <Leaf x={20} y={45} angle={-30} size={0.8} />
      <Leaf x={140} y={45} angle={30} size={0.8} />
      <Leaf x={15} y={50} angle={-45} size={0.7} />
      <Leaf x={145} y={50} angle={45} size={0.7} />
    </svg>
  );
}

function SofaFloralWrap({ side }) {
  const flip = side === 'right';
  
  return (
    <svg viewBox="0 0 55 55" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      {/* Floral arrangement wrapping sofa side - like image 4 */}
      <Rose x={28} y={20} size={1.8} color="#FFFFFF" />
      <Rose x={22} y={28} size={1.5} color="#FFF" />
      <Rose x={35} y={26} size={1.4} color="#FFF" />
      <Rose x={28} y={35} size={1.3} color="#F8F0F0" />
      <Flower x={18} y={22} size={1} color="#F5E8E8" />
      <Flower x={38} y={18} size={1} color="#F5E8E8" />
      <Flower x={24} y={42} size={0.9} color="#F8F0F0" />
      
      {/* Greenery */}
      <GreeneryCluster x={28} y={45} size={1} />
      <GreeneryCluster x={15} y={35} size={0.8} />
      <GreeneryCluster x={42} y={32} size={0.8} />
      
      {/* Trailing leaves */}
      <Leaf x={12} y={40} angle={-40} size={0.7} />
      <Leaf x={45} y={38} angle={50} size={0.7} />
      <Leaf x={20} y={48} angle={-20} size={0.6} />
    </svg>
  );
}

function AisleFloralBox({ index }) {
  return (
    <svg viewBox="0 0 40 45" className="w-full h-full">
      {/* Clear acrylic box base */}
      <rect x="5" y="25" width="30" height="18" fill="rgba(255,255,255,0.1)" stroke="#D4AF37" strokeWidth="0.5" />
      
      {/* Florals overflowing */}
      <Rose x={20} y={15} size={1.6} color="#FFFFFF" />
      <Rose x={12} y={20} size={1.3} color="#FFF" />
      <Rose x={28} y={18} size={1.3} color="#FFF" />
      <Flower x={16} y={12} size={0.9} color="#F8F0F0" />
      <Flower x={25} y={10} size={0.9} color="#F8F0F0" />
      
      {/* Greenery */}
      <GreeneryCluster x={20} y={24} size={0.7} />
      <Leaf x={8} y={22} angle={-30} size={0.5} />
      <Leaf x={32} y={20} angle={30} size={0.5} />
    </svg>
  );
}

function TallCenterpiece({ side }) {
  return (
    <svg viewBox="0 0 50 80" className="w-full h-full">
      {/* Tall gold vase */}
      <path d="M20 78 L18 50 Q16 42, 25 40 Q34 42, 32 50 L30 78 Z" fill="#D4AF37" />
      <ellipse cx="25" cy="40" rx="9" ry="4" fill="#B8962E" />
      <ellipse cx="25" cy="78" rx="6" ry="2" fill="#9A7B25" />
      
      {/* Abundant florals on top */}
      <Rose x={25} y={18} size={1.8} color="#FFFFFF" />
      <Rose x={18} y={22} size={1.5} color="#FFF" />
      <Rose x={32} y={20} size={1.5} color="#FFF" />
      <Rose x={14} y={28} size={1.2} color="#F8F0F0" />
      <Rose x={36} y={26} size={1.2} color="#F8F0F0" />
      <Flower x={25} y={28} size={1} color="#F5E8E8" />
      <Flower x={20} y={14} size={0.9} color="#F8F0F0" />
      <Flower x={30} y={14} size={0.9} color="#F8F0F0" />
      
      {/* Cascading greenery */}
      <GreeneryCluster x={25} y={32} size={0.9} />
      <GreeneryCluster x={12} y={35} size={0.7} />
      <GreeneryCluster x={38} y={33} size={0.7} />
      <Leaf x={8} y={38} angle={-50} size={0.8} />
      <Leaf x={42} y={36} angle={50} size={0.8} />
      <Leaf x={10} y={45} angle={-60} size={0.6} />
      <Leaf x={40} y={43} angle={60} size={0.6} />
    </svg>
  );
}

// ============================================
// LIGHTING - Candles like reference images
// ============================================

function PillarCandles({ side }) {
  return (
    <svg viewBox="0 0 50 55" className="w-full h-full">
      <defs>
        <linearGradient id="candleWhite" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F0F0" />
        </linearGradient>
        <radialGradient id="flameGrad" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#FFFEF0" />
          <stop offset="40%" stopColor="#FFE4A0" />
          <stop offset="100%" stopColor="#FF9500" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Three pillar candles - different heights */}
      {[
        { x: 8, h: 28, w: 8 },
        { x: 20, h: 35, w: 10 },
        { x: 34, h: 22, w: 8 },
      ].map((c, i) => (
        <g key={i}>
          {/* Candle body */}
          <rect x={c.x} y={53 - c.h} width={c.w} height={c.h} fill="url(#candleWhite)" rx="1" />
          {/* Top rim */}
          <ellipse cx={c.x + c.w/2} cy={53 - c.h} rx={c.w/2} ry="1.5" fill="#F8F8F8" />
          {/* Flame */}
          <ellipse cx={c.x + c.w/2} cy={53 - c.h - 6} rx="3" ry="6" fill="url(#flameGrad)" />
          {/* Glow */}
          <ellipse cx={c.x + c.w/2} cy={53 - c.h - 4} rx="8" ry="10" fill="#FFF8E0" opacity="0.15" />
        </g>
      ))}
    </svg>
  );
}

function CandleCluster({ side }) {
  return (
    <svg viewBox="0 0 65 50" className="w-full h-full">
      <defs>
        <radialGradient id="clusterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8E0" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFF8E0" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Ambient glow */}
      <ellipse cx="32" cy="30" rx="30" ry="20" fill="url(#clusterGlow)" />
      
      {/* Multiple votives */}
      {[
        { x: 8, h: 12 },
        { x: 18, h: 15 },
        { x: 28, h: 10 },
        { x: 38, h: 14 },
        { x: 48, h: 11 },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={48 - c.h} width="8" height={c.h} fill="#FFFEF8" rx="1" />
          <ellipse cx={c.x + 4} cy={48 - c.h - 3} rx="2.5" ry="4" fill="#FFE8A0" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

function Uplighting({ side }) {
  const hue = side === 'left' ? '#D4AF37' : '#E8C5D0';
  
  return (
    <svg viewBox="0 0 30 85" className="w-full h-full">
      <defs>
        <linearGradient id={`upBeam-${side}`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor={hue} stopOpacity="0.7" />
          <stop offset="40%" stopColor={hue} stopOpacity="0.25" />
          <stop offset="100%" stopColor={hue} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Light beam */}
      <path d="M3 82 L15 0 L27 82 Z" fill={`url(#upBeam-${side})`} />
      
      {/* Fixture */}
      <rect x="8" y="78" width="14" height="6" fill="#333" rx="2" />
      <rect x="10" y="76" width="10" height="3" fill="#444" rx="1" />
    </svg>
  );
}

function StringLights() {
  return (
    <svg viewBox="0 0 200 35" className="w-full h-full">
      {/* Draped string */}
      <path 
        d="M0 8 Q50 20, 100 10 Q150 20, 200 8" 
        stroke="#444" 
        strokeWidth="1" 
        fill="none" 
      />
      
      {/* Bulbs along string */}
      {Array.from({ length: 22 }).map((_, i) => {
        const t = i / 21;
        const x = t * 200;
        const y = 8 + Math.sin(t * Math.PI * 2) * 6 + 4;
        return (
          <g key={i}>
            {/* Glow */}
            <circle cx={x} cy={y} r="5" fill="#FFF8E0" opacity="0.2" />
            {/* Bulb */}
            <ellipse cx={x} cy={y} rx="2.5" ry="3.5" fill="#FFFEF5" />
          </g>
        );
      })}
    </svg>
  );
}

// ============================================
// ACCENTS - Gold panels like image 1
// ============================================

function DecorativeGoldPanel({ side }) {
  const flip = side === 'right';
  
  return (
    <svg viewBox="0 0 40 95" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs>
        <linearGradient id="goldPanel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      
      {/* Main panel frame */}
      <rect x="5" y="5" width="30" height="85" stroke="url(#goldPanel)" strokeWidth="2.5" fill="none" />
      
      {/* Inner decorative frame */}
      <rect x="10" y="10" width="20" height="75" stroke="#D4AF37" strokeWidth="1" fill="none" />
      
      {/* Geometric pattern inside - like image 1 */}
      <line x1="20" y1="15" x2="20" y2="80" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <line x1="12" y1="30" x2="28" y2="30" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <line x1="12" y1="47" x2="28" y2="47" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <line x1="12" y1="65" x2="28" y2="65" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      
      {/* Diamond accents */}
      <polygon points="20,20 24,25 20,30 16,25" fill="#D4AF37" opacity="0.3" />
      <polygon points="20,37 24,42 20,47 16,42" fill="#D4AF37" opacity="0.3" />
      <polygon points="20,55 24,60 20,65 16,60" fill="#D4AF37" opacity="0.3" />
      <polygon points="20,72 23,76 20,80 17,76" fill="#D4AF37" opacity="0.3" />
    </svg>
  );
}

function MirrorFrame() {
  return (
    <svg viewBox="0 0 70 90" className="w-full h-full">
      <defs>
        <linearGradient id="mirrorGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4E4BA" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <linearGradient id="mirrorSurface" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0F0F0" />
          <stop offset="50%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#D8D8D8" />
        </linearGradient>
      </defs>
      
      {/* Ornate frame */}
      <rect x="3" y="3" width="64" height="84" rx="3" stroke="url(#mirrorGold)" strokeWidth="5" fill="none" />
      
      {/* Mirror surface */}
      <rect x="10" y="10" width="50" height="70" rx="2" fill="url(#mirrorSurface)" />
      
      {/* Reflection */}
      <path d="M15 15 L30 15 L15 40 Z" fill="#FFFFFF" opacity="0.35" />
    </svg>
  );
}

function MoroccanLantern({ side }) {
  return (
    <svg viewBox="0 0 45 65" className="w-full h-full">
      <defs>
        <linearGradient id="lanternMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <radialGradient id="lanternLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8E0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFF8E0" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Lantern 1 - tall */}
      <g transform="translate(5, 2)">
        {/* Handle */}
        <path d="M8 0 Q12 -4, 16 0" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        {/* Top */}
        <polygon points="12,2 18,8 12,8 6,8" fill="url(#lanternMetal)" />
        {/* Body */}
        <rect x="4" y="8" width="16" height="35" stroke="url(#lanternMetal)" strokeWidth="1.5" fill="none" />
        {/* Glow inside */}
        <rect x="6" y="10" width="12" height="31" fill="url(#lanternLight)" />
        {/* Decorative bars */}
        <line x1="12" y1="8" x2="12" y2="43" stroke="#D4AF37" strokeWidth="0.5" />
        <line x1="4" y1="25" x2="20" y2="25" stroke="#D4AF37" strokeWidth="0.5" />
        {/* Base */}
        <rect x="3" y="43" width="18" height="4" fill="#D4AF37" />
      </g>
      
      {/* Lantern 2 - shorter */}
      <g transform="translate(24, 18)">
        <path d="M6 0 Q9 -3, 12 0" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <polygon points="9,2 14,6 9,6 4,6" fill="url(#lanternMetal)" />
        <rect x="3" y="6" width="12" height="26" stroke="url(#lanternMetal)" strokeWidth="1" fill="none" />
        <rect x="5" y="8" width="8" height="22" fill="url(#lanternLight)" />
        <line x1="9" y1="6" x2="9" y2="32" stroke="#D4AF37" strokeWidth="0.5" />
        <rect x="2" y="32" width="14" height="3" fill="#D4AF37" />
      </g>
    </svg>
  );
}

// ============================================
// FLOOR ELEMENTS
// ============================================

function AisleRunner() {
  return (
    <svg viewBox="0 0 200 45" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="runnerWhite" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F5F5" />
        </linearGradient>
      </defs>
      
      {/* Runner */}
      <rect x="55" y="5" width="90" height="38" fill="url(#runnerWhite)" />
      
      {/* Gold trim on edges */}
      <rect x="55" y="5" width="3" height="38" fill="#D4AF37" />
      <rect x="142" y="5" width="3" height="38" fill="#D4AF37" />
      
      {/* Center line detail */}
      <line x1="100" y1="8" x2="100" y2="40" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="6,4" />
    </svg>
  );
}

function StageRiser() {
  return (
    <svg viewBox="0 0 200 30" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="riserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
      </defs>
      
      {/* Platform */}
      <rect x="15" y="5" width="170" height="22" fill="url(#riserGrad)" />
      
      {/* Top edge highlight */}
      <rect x="15" y="5" width="170" height="2" fill="#FFFFFF" />
      
      {/* Front shadow */}
      <rect x="15" y="25" width="170" height="3" fill="rgba(0,0,0,0.08)" />
    </svg>
  );
}

function StageCarpet() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
      {/* Carpet base */}
      <rect x="12" y="5" width="176" height="52" fill="#FAF8F5" rx="2" />
      
      {/* Gold border */}
      <rect x="12" y="5" width="176" height="52" stroke="#D4AF37" strokeWidth="2.5" fill="none" rx="2" />
      
      {/* Inner border */}
      <rect x="18" y="11" width="164" height="40" stroke="#E8D5A0" strokeWidth="1" fill="none" rx="1" />
    </svg>
  );
}

function StageSteps() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full">
      <defs>
        <linearGradient id="stepWhite" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#ECECEC" />
        </linearGradient>
      </defs>
      
      {/* Bottom step */}
      <rect x="8" y="28" width="84" height="10" fill="url(#stepWhite)" />
      <rect x="8" y="28" width="84" height="1" fill="#FFF" />
      
      {/* Middle step */}
      <rect x="18" y="16" width="64" height="12" fill="url(#stepWhite)" />
      <rect x="18" y="16" width="64" height="1" fill="#FFF" />
      
      {/* Top step */}
      <rect x="28" y="4" width="44" height="12" fill="url(#stepWhite)" />
      <rect x="28" y="4" width="44" height="1" fill="#FFF" />
    </svg>
  );
}

// ============================================
// DEFAULT
// ============================================

function DefaultItem() {
  return (
    <svg viewBox="0 0 50 50" className="w-full h-full">
      <rect x="10" y="10" width="30" height="30" stroke="#D4AF37" strokeWidth="2" fill="none" rx="3" />
    </svg>
  );
}

export default StageItem;
