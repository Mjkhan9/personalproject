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
// CLEAN, ELEGANT SILHOUETTE ICONS
// Gold outlines on dark - blueprint style
// ============================================

function StageSVG({ itemId, instanceIndex }) {
  // BACKDROPS
  if (itemId === 'backdrop-white-draping') return <DrapingBackdrop color="white" />;
  if (itemId === 'backdrop-fairy-lights') return <FairyLightBackdrop />;
  if (itemId === 'backdrop-sequin-gold') return <DrapingBackdrop color="gold" />;
  if (itemId === 'backdrop-black-draping') return <DrapingBackdrop color="dark" />;
  
  // ARCHES
  if (itemId === 'arch-circular-single') return <CircularArch />;
  if (itemId === 'arch-triple-set') return <TripleArch />;
  if (itemId === 'arch-hexagon') return <HexagonArch />;
  if (itemId === 'arch-rectangle') return <RectangleArch />;
  
  // SEATING
  if (itemId === 'sofa-cream-tufted') return <TuftedSofa />;
  if (itemId === 'sofa-velvet-blush') return <TuftedSofa color="blush" />;
  if (itemId === 'chairs-accent-pair') return <AccentChair side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'seating-floor-cushions') return <FloorCushions />;
  
  // FLORALS
  if (itemId === 'floral-arch-arrangement') return <FloralCluster type="arch" />;
  if (itemId === 'floral-sofa-wrap') return <FloralCluster type="wrap" side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'floral-aisle-boxes') return <FloralCluster type="aisle" index={instanceIndex} />;
  if (itemId === 'floral-centerpieces') return <Centerpiece side={instanceIndex === 0 ? 'left' : 'right'} />;
  
  // LIGHTING
  if (itemId === 'lighting-pillar-candles') return <PillarCandles side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-candle-cluster') return <CandleCluster side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-uplighting') return <Uplighting side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-string-lights') return <StringLights />;
  
  // ACCENTS
  if (itemId === 'accent-gold-panels') return <GoldPanel side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'accent-mirror-frame') return <MirrorFrame />;
  if (itemId === 'accent-lantern-set') return <Lanterns side={instanceIndex === 0 ? 'left' : 'right'} />;
  
  // FLOOR
  if (itemId === 'floor-aisle-runner') return <AisleRunner />;
  if (itemId === 'floor-stage-riser') return <StageRiser />;
  if (itemId === 'floor-carpet') return <StageCarpet />;
  if (itemId === 'floor-steps') return <StageSteps />;
  
  return <DefaultItem />;
}

// ============================================
// BACKDROPS - Elegant draping silhouettes
// ============================================

function DrapingBackdrop({ color = 'white' }) {
  const colors = {
    white: { main: '#F5F5F5', accent: '#E8E8E8', highlight: '#FFFFFF' },
    gold: { main: '#D4AF37', accent: '#B8962E', highlight: '#F4E4BA' },
    dark: { main: '#2A2A2A', accent: '#1A1A1A', highlight: '#3A3A3A' }
  };
  const c = colors[color] || colors.white;
  
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`drape-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.highlight} />
          <stop offset="50%" stopColor={c.main} />
          <stop offset="100%" stopColor={c.accent} />
        </linearGradient>
      </defs>
      
      {/* Main drape */}
      <rect x="0" y="0" width="200" height="100" fill={`url(#drape-${color})`} />
      
      {/* Swag at top */}
      <path 
        d="M0 0 Q50 12, 100 8 Q150 12, 200 0" 
        fill={c.highlight} 
        opacity="0.5" 
      />
      
      {/* Vertical fold lines */}
      {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
        <line 
          key={i}
          x1={x} y1="8" x2={x} y2="100"
          stroke={color === 'white' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function FairyLightBackdrop() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <radialGradient id="lightGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9E6" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFF9E6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Dark backdrop */}
      <rect x="0" y="0" width="200" height="100" fill="#1a1a1a" />
      
      {/* Ambient glow */}
      <rect x="0" y="0" width="200" height="100" fill="url(#lightGlow)" opacity="0.15" />
      
      {/* String lines */}
      {Array.from({ length: 15 }).map((_, i) => (
        <line 
          key={`string-${i}`}
          x1={12 + i * 13} y1="0" x2={12 + i * 13} y2="100"
          stroke="#3a3a3a"
          strokeWidth="0.5"
        />
      ))}
      
      {/* Lights */}
      {Array.from({ length: 120 }).map((_, i) => {
        const col = i % 15;
        const row = Math.floor(i / 15);
        const x = 12 + col * 13 + (Math.sin(i * 0.7) * 2);
        const y = 8 + row * 12 + (Math.cos(i * 0.5) * 2);
        const brightness = 0.6 + Math.sin(i * 0.3) * 0.4;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={2.5} fill="#FFF9E6" opacity={brightness * 0.3} />
            <circle cx={x} cy={y} r={1} fill="#FFFEF0" opacity={brightness} />
          </g>
        );
      })}
    </svg>
  );
}

// ============================================
// ARCHES - Clean gold outlines
// ============================================

function CircularArch() {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      <defs>
        <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <filter id="archGlow">
          <feGaussianBlur stdDeviation="2" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Main arch */}
      <path 
        d="M15 118 L15 50 Q15 10, 50 10 Q85 10, 85 50 L85 118" 
        stroke="url(#archGold)" 
        strokeWidth="4" 
        fill="none"
        filter="url(#archGlow)"
      />
      
      {/* Inner arch line */}
      <path 
        d="M20 116 L20 52 Q20 15, 50 15 Q80 15, 80 52 L80 116" 
        stroke="#D4AF37" 
        strokeWidth="1.5" 
        fill="none"
        opacity="0.6"
      />
      
      {/* Decorative top detail */}
      <circle cx="50" cy="10" r="3" fill="#D4AF37" />
    </svg>
  );
}

function TripleArch() {
  return (
    <svg viewBox="0 0 160 110" className="w-full h-full">
      <defs>
        <linearGradient id="tripleGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <filter id="tripleGlow">
          <feGaussianBlur stdDeviation="1.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer arch */}
      <path 
        d="M8 108 L8 45 Q8 6, 80 6 Q152 6, 152 45 L152 108" 
        stroke="url(#tripleGold)" 
        strokeWidth="3" 
        fill="none"
        filter="url(#tripleGlow)"
        opacity="0.7"
      />
      
      {/* Middle arch */}
      <path 
        d="M25 108 L25 48 Q25 12, 80 12 Q135 12, 135 48 L135 108" 
        stroke="url(#tripleGold)" 
        strokeWidth="4" 
        fill="none"
        filter="url(#tripleGlow)"
        opacity="0.85"
      />
      
      {/* Inner arch */}
      <path 
        d="M42 108 L42 50 Q42 18, 80 18 Q118 18, 118 50 L118 108" 
        stroke="url(#tripleGold)" 
        strokeWidth="5" 
        fill="none"
        filter="url(#tripleGlow)"
      />
      
      {/* Top decorative */}
      <circle cx="80" cy="6" r="2.5" fill="#D4AF37" />
      <circle cx="80" cy="12" r="2" fill="#D4AF37" opacity="0.8" />
      <circle cx="80" cy="18" r="2" fill="#D4AF37" opacity="0.6" />
    </svg>
  );
}

function HexagonArch() {
  return (
    <svg viewBox="0 0 100 115" className="w-full h-full">
      <defs>
        <linearGradient id="hexGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <filter id="hexGlow">
          <feGaussianBlur stdDeviation="1.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Hexagon frame */}
      <polygon 
        points="50,5 92,25 92,80 50,100 8,80 8,25" 
        stroke="url(#hexGold)" 
        strokeWidth="4" 
        fill="none"
        strokeLinejoin="round"
        filter="url(#hexGlow)"
      />
      
      {/* Inner hexagon */}
      <polygon 
        points="50,12 85,29 85,76 50,93 15,76 15,29" 
        stroke="#D4AF37" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

function RectangleArch() {
  return (
    <svg viewBox="0 0 100 115" className="w-full h-full">
      <defs>
        <linearGradient id="rectGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <filter id="rectGlow">
          <feGaussianBlur stdDeviation="1.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Rectangle frame */}
      <rect 
        x="10" y="5" width="80" height="105" 
        stroke="url(#rectGold)" 
        strokeWidth="4" 
        fill="none" 
        rx="2"
        filter="url(#rectGlow)"
      />
      
      {/* Inner rectangle */}
      <rect 
        x="16" y="11" width="68" height="93" 
        stroke="#D4AF37" 
        strokeWidth="1.5" 
        fill="none" 
        rx="1"
        opacity="0.5"
      />
    </svg>
  );
}

// ============================================
// SEATING - Elegant silhouettes
// ============================================

function TuftedSofa({ color = 'cream' }) {
  const fill = color === 'blush' ? '#E8D5D5' : '#F5F0E6';
  const accent = color === 'blush' ? '#D8C5C5' : '#E5E0D8';
  
  return (
    <svg viewBox="0 0 140 55" className="w-full h-full">
      <defs>
        <linearGradient id={`sofa-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
        <filter id="sofaShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.2" />
        </filter>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="70" cy="52" rx="60" ry="4" fill="rgba(0,0,0,0.15)" />
      
      {/* Back */}
      <rect x="10" y="5" width="120" height="28" rx="6" fill={`url(#sofa-${color})`} filter="url(#sofaShadow)" />
      
      {/* Tufting lines on back */}
      {[30, 50, 70, 90, 110].map((x, i) => (
        <line key={i} x1={x} y1="8" x2={x} y2="30" stroke={accent} strokeWidth="1" opacity="0.5" />
      ))}
      {[12, 19, 26].map((y, i) => (
        <line key={`h-${i}`} x1="14" y1={y} x2="126" y2={y} stroke={accent} strokeWidth="1" opacity="0.3" />
      ))}
      
      {/* Seat */}
      <rect x="8" y="30" width="124" height="18" rx="4" fill={fill} />
      
      {/* Arms */}
      <rect x="2" y="12" width="12" height="36" rx="5" fill={fill} />
      <rect x="126" y="12" width="12" height="36" rx="5" fill={fill} />
      
      {/* Gold legs */}
      <rect x="18" y="48" width="6" height="6" rx="1" fill="#D4AF37" />
      <rect x="116" y="48" width="6" height="6" rx="1" fill="#D4AF37" />
    </svg>
  );
}

function AccentChair({ side }) {
  const flip = side === 'right';
  
  return (
    <svg viewBox="0 0 50 55" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs>
        <linearGradient id="chairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E6" />
          <stop offset="100%" stopColor="#E5E0D8" />
        </linearGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="25" cy="52" rx="20" ry="3" fill="rgba(0,0,0,0.12)" />
      
      {/* Back */}
      <path d="M8 8 Q8 2, 25 2 Q42 2, 42 8 L42 28 Q42 32, 38 32 L12 32 Q8 32, 8 28 Z" fill="url(#chairGrad)" />
      
      {/* Tufting */}
      <ellipse cx="25" cy="16" rx="12" ry="10" fill="none" stroke="#E5E0D8" strokeWidth="1" opacity="0.5" />
      
      {/* Seat */}
      <ellipse cx="25" cy="38" rx="18" ry="8" fill="#F5F0E6" />
      
      {/* Arm */}
      <path d="M4 12 Q2 12, 2 16 L2 38 Q2 42, 6 42 L10 42 L10 12 Z" fill="#F5F0E6" />
      
      {/* Gold legs */}
      <rect x="12" y="46" width="4" height="6" rx="1" fill="#D4AF37" />
      <rect x="34" y="46" width="4" height="6" rx="1" fill="#D4AF37" />
    </svg>
  );
}

function FloorCushions() {
  return (
    <svg viewBox="0 0 120 25" className="w-full h-full">
      {[
        { x: 10, y: 8, w: 22, h: 14, color: '#F5F0E6' },
        { x: 35, y: 6, w: 20, h: 16, color: '#E8D5D5' },
        { x: 58, y: 9, w: 24, h: 13, color: '#F5F0E6' },
        { x: 85, y: 7, w: 22, h: 15, color: '#E8D5D5' },
      ].map((c, i) => (
        <g key={i}>
          <ellipse cx={c.x + c.w/2} cy={c.y + c.h - 2} rx={c.w/2 + 2} ry={3} fill="rgba(0,0,0,0.08)" />
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={5} fill={c.color} />
        </g>
      ))}
    </svg>
  );
}

// ============================================
// FLORALS - Elegant abstract representations
// ============================================

function FloralCluster({ type, side, index }) {
  if (type === 'arch') {
    return (
      <svg viewBox="0 0 160 70" className="w-full h-full">
        <defs>
          <radialGradient id="floralGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#F5F0E6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E8E0D5" stopOpacity="0.5" />
          </radialGradient>
        </defs>
        
        {/* Left cluster */}
        <g transform="translate(20, 35)">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const angle = (i / 7) * Math.PI;
            const r = 8 + (i % 3) * 4;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r - 5;
            return <circle key={i} cx={x} cy={y} r={4 + (i % 2) * 2} fill="url(#floralGlow)" />;
          })}
        </g>
        
        {/* Center cluster - larger */}
        <g transform="translate(80, 25)">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const angle = (i / 9) * Math.PI * 2;
            const r = 6 + (i % 3) * 5;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return <circle key={i} cx={x} cy={y} r={5 + (i % 3) * 2} fill="url(#floralGlow)" />;
          })}
          <circle cx="0" cy="0" r="8" fill="#FFFFFF" opacity="0.9" />
        </g>
        
        {/* Right cluster */}
        <g transform="translate(140, 35)">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const angle = (i / 7) * Math.PI + Math.PI;
            const r = 8 + (i % 3) * 4;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r - 5;
            return <circle key={i} cx={x} cy={y} r={4 + (i % 2) * 2} fill="url(#floralGlow)" />;
          })}
        </g>
        
        {/* Greenery hints */}
        {[25, 55, 105, 135].map((x, i) => (
          <ellipse key={i} cx={x} cy={45} rx={6} ry={10} fill="#7A9E7A" opacity="0.4" />
        ))}
      </svg>
    );
  }
  
  if (type === 'wrap') {
    const flip = side === 'right';
    return (
      <svg viewBox="0 0 60 50" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
        <defs>
          <radialGradient id="wrapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F5F0E6" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        
        {/* Cascading florals */}
        {[
          { x: 30, y: 15, r: 8 },
          { x: 22, y: 22, r: 7 },
          { x: 38, y: 20, r: 6 },
          { x: 25, y: 32, r: 7 },
          { x: 35, y: 30, r: 6 },
          { x: 30, y: 40, r: 5 },
        ].map((f, i) => (
          <circle key={i} cx={f.x} cy={f.y} r={f.r} fill="url(#wrapGlow)" />
        ))}
        
        {/* Greenery */}
        <ellipse cx="20" cy="35" rx="5" ry="12" fill="#7A9E7A" opacity="0.35" />
        <ellipse cx="40" cy="38" rx="4" ry="10" fill="#7A9E7A" opacity="0.35" />
      </svg>
    );
  }
  
  // Aisle boxes
  return (
    <svg viewBox="0 0 35 35" className="w-full h-full">
      <defs>
        <radialGradient id="aisleGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F5F0E6" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      
      {/* Clear acrylic box suggestion */}
      <rect x="5" y="18" width="25" height="15" fill="rgba(255,255,255,0.1)" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      
      {/* Florals */}
      {[
        { x: 17, y: 10, r: 7 },
        { x: 10, y: 14, r: 5 },
        { x: 24, y: 13, r: 5 },
        { x: 14, y: 18, r: 4 },
        { x: 21, y: 17, r: 4 },
      ].map((f, i) => (
        <circle key={i} cx={f.x} cy={f.y} r={f.r} fill="url(#aisleGlow)" />
      ))}
    </svg>
  );
}

function Centerpiece({ side }) {
  return (
    <svg viewBox="0 0 45 70" className="w-full h-full">
      <defs>
        <linearGradient id="vaseGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4E4BA" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <radialGradient id="cpGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F5F0E6" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      
      {/* Tall vase */}
      <path d="M18 68 L16 40 Q14 35, 22 32 Q28 35, 26 40 L24 68 Z" fill="url(#vaseGold)" />
      <ellipse cx="21" cy="32" rx="7" ry="3" fill="#B8962E" />
      
      {/* Florals on top */}
      {[
        { x: 22, y: 15, r: 8 },
        { x: 14, y: 18, r: 6 },
        { x: 30, y: 17, r: 6 },
        { x: 18, y: 24, r: 5 },
        { x: 26, y: 23, r: 5 },
        { x: 10, y: 25, r: 4 },
        { x: 34, y: 24, r: 4 },
      ].map((f, i) => (
        <circle key={i} cx={f.x} cy={f.y} r={f.r} fill="url(#cpGlow)" />
      ))}
      
      {/* Greenery */}
      <ellipse cx="8" cy="28" rx="4" ry="10" fill="#7A9E7A" opacity="0.35" />
      <ellipse cx="36" cy="26" rx="4" ry="10" fill="#7A9E7A" opacity="0.35" />
    </svg>
  );
}

// ============================================
// LIGHTING - Warm glows
// ============================================

function PillarCandles({ side }) {
  const offset = side === 'right' ? 30 : 0;
  
  return (
    <svg viewBox="0 0 50 50" className="w-full h-full">
      <defs>
        <radialGradient id="candleGlow" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#FFF4D6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFF4D6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="candleBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFEF8" />
          <stop offset="100%" stopColor="#F5F0E6" />
        </linearGradient>
      </defs>
      
      {/* Candles at different heights */}
      {[
        { x: 10, h: 25 },
        { x: 22, h: 32 },
        { x: 34, h: 20 },
      ].map((c, i) => (
        <g key={i}>
          {/* Glow */}
          <ellipse cx={c.x + 3} cy={48 - c.h - 5} rx={8} ry={12} fill="url(#candleGlow)" />
          {/* Candle body */}
          <rect x={c.x} y={48 - c.h} width={6} height={c.h} fill="url(#candleBody)" rx="1" />
          {/* Flame */}
          <ellipse cx={c.x + 3} cy={48 - c.h - 3} rx={2} ry={4} fill="#FFE4A0" />
          <ellipse cx={c.x + 3} cy={48 - c.h - 2} rx={1} ry={2} fill="#FFFEF0" />
        </g>
      ))}
    </svg>
  );
}

function CandleCluster({ side }) {
  return (
    <svg viewBox="0 0 60 45" className="w-full h-full">
      <defs>
        <radialGradient id="clusterGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF4D6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFF4D6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Ambient glow */}
      <ellipse cx="30" cy="25" rx="28" ry="20" fill="url(#clusterGlow)" />
      
      {/* Multiple small candles */}
      {[
        { x: 12, h: 15 },
        { x: 20, h: 20 },
        { x: 28, h: 12 },
        { x: 36, h: 18 },
        { x: 44, h: 14 },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={43 - c.h} width={4} height={c.h} fill="#FFFEF8" rx="1" />
          <ellipse cx={c.x + 2} cy={43 - c.h - 2} rx={1.5} ry={3} fill="#FFE4A0" />
        </g>
      ))}
    </svg>
  );
}

function Uplighting({ side }) {
  const color = side === 'left' ? '#D4AF37' : '#E8D5D5';
  
  return (
    <svg viewBox="0 0 30 80" className="w-full h-full">
      <defs>
        <linearGradient id={`uplight-${side}`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Light beam */}
      <path d="M5 78 L15 0 L25 78 Z" fill={`url(#uplight-${side})`} />
      
      {/* Light fixture */}
      <rect x="10" y="75" width="10" height="5" fill="#333" rx="1" />
    </svg>
  );
}

function StringLights() {
  return (
    <svg viewBox="0 0 200 30" className="w-full h-full">
      {/* String line */}
      <path 
        d="M0 5 Q50 15, 100 5 Q150 15, 200 5" 
        stroke="#444" 
        strokeWidth="1" 
        fill="none" 
      />
      
      {/* Lights along the string */}
      {Array.from({ length: 20 }).map((_, i) => {
        const t = i / 19;
        const x = t * 200;
        const y = 5 + Math.sin(t * Math.PI * 2) * 5;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={4} fill="#FFF4D6" opacity="0.4" />
            <circle cx={x} cy={y} r={2} fill="#FFFEF0" />
          </g>
        );
      })}
    </svg>
  );
}

// ============================================
// ACCENTS - Gold decorative elements
// ============================================

function GoldPanel({ side }) {
  const flip = side === 'right';
  
  return (
    <svg viewBox="0 0 35 90" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs>
        <linearGradient id="panelGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <filter id="panelGlow">
          <feGaussianBlur stdDeviation="1" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Main panel frame */}
      <rect x="5" y="5" width="25" height="80" stroke="url(#panelGold)" strokeWidth="2" fill="none" filter="url(#panelGlow)" />
      
      {/* Inner decorative pattern */}
      <rect x="10" y="10" width="15" height="70" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.5" />
      
      {/* Geometric accents */}
      <line x1="17.5" y1="15" x2="17.5" y2="75" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <circle cx="17.5" cy="25" r="3" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="17.5" cy="45" r="3" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="17.5" cy="65" r="3" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.6" />
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
        <linearGradient id="mirrorGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="50%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#D8D8D8" />
        </linearGradient>
      </defs>
      
      {/* Frame */}
      <rect x="5" y="5" width="60" height="80" rx="3" stroke="url(#mirrorGold)" strokeWidth="4" fill="none" />
      
      {/* Mirror surface */}
      <rect x="10" y="10" width="50" height="70" rx="2" fill="url(#mirrorGlass)" opacity="0.8" />
      
      {/* Reflection hint */}
      <path d="M15 15 L25 15 L15 35 Z" fill="#FFFFFF" opacity="0.4" />
    </svg>
  );
}

function Lanterns({ side }) {
  return (
    <svg viewBox="0 0 40 60" className="w-full h-full">
      <defs>
        <linearGradient id="lanternGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF4D6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFF4D6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Lantern 1 - taller */}
      <g transform="translate(5, 5)">
        {/* Handle */}
        <path d="M7 0 Q10 -3, 13 0" stroke="#D4AF37" strokeWidth="1" fill="none" />
        {/* Body */}
        <rect x="3" y="2" width="14" height="30" stroke="url(#lanternGold)" strokeWidth="1.5" fill="none" />
        {/* Glass panels */}
        <rect x="5" y="4" width="10" height="26" fill="url(#lanternGlow)" />
        {/* Cross bars */}
        <line x1="3" y1="17" x2="17" y2="17" stroke="#D4AF37" strokeWidth="1" />
        {/* Base */}
        <rect x="2" y="32" width="16" height="3" fill="#D4AF37" />
      </g>
      
      {/* Lantern 2 - shorter */}
      <g transform="translate(20, 20)">
        <path d="M5 0 Q7.5 -2, 10 0" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <rect x="2" y="2" width="11" height="22" stroke="url(#lanternGold)" strokeWidth="1.5" fill="none" />
        <rect x="4" y="4" width="7" height="18" fill="url(#lanternGlow)" />
        <line x1="2" y1="13" x2="13" y2="13" stroke="#D4AF37" strokeWidth="1" />
        <rect x="1" y="24" width="13" height="2.5" fill="#D4AF37" />
      </g>
    </svg>
  );
}

// ============================================
// FLOOR ELEMENTS
// ============================================

function AisleRunner() {
  return (
    <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="runnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F8F8F8" />
          <stop offset="100%" stopColor="#F0F0F0" />
        </linearGradient>
      </defs>
      
      {/* Runner base */}
      <rect x="60" y="5" width="80" height="35" fill="url(#runnerGrad)" />
      
      {/* Gold trim */}
      <line x1="60" y1="5" x2="60" y2="40" stroke="#D4AF37" strokeWidth="2" />
      <line x1="140" y1="5" x2="140" y2="40" stroke="#D4AF37" strokeWidth="2" />
      
      {/* Subtle pattern */}
      <line x1="100" y1="8" x2="100" y2="37" stroke="#E8E8E8" strokeWidth="1" strokeDasharray="4,4" />
    </svg>
  );
}

function StageRiser() {
  return (
    <svg viewBox="0 0 200 25" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="riserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8F8F8" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
      
      {/* Platform */}
      <rect x="20" y="5" width="160" height="18" fill="url(#riserGrad)" />
      
      {/* Edge highlight */}
      <line x1="20" y1="5" x2="180" y2="5" stroke="#FFFFFF" strokeWidth="2" />
      
      {/* Front edge shadow */}
      <rect x="20" y="20" width="160" height="3" fill="rgba(0,0,0,0.1)" />
    </svg>
  );
}

function StageCarpet() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <pattern id="carpetPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#F5F0E6" />
          <rect x="0" y="0" width="10" height="10" fill="#EDE8E0" opacity="0.5" />
          <rect x="10" y="10" width="10" height="10" fill="#EDE8E0" opacity="0.5" />
        </pattern>
      </defs>
      
      {/* Carpet area */}
      <rect x="15" y="5" width="170" height="50" fill="url(#carpetPattern)" rx="2" />
      
      {/* Gold border */}
      <rect x="15" y="5" width="170" height="50" stroke="#D4AF37" strokeWidth="2" fill="none" rx="2" />
    </svg>
  );
}

function StageSteps() {
  return (
    <svg viewBox="0 0 100 35" className="w-full h-full">
      <defs>
        <linearGradient id="stepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
      </defs>
      
      {/* Bottom step */}
      <rect x="10" y="25" width="80" height="8" fill="url(#stepGrad)" />
      <line x1="10" y1="25" x2="90" y2="25" stroke="#F5F5F5" strokeWidth="1" />
      
      {/* Middle step */}
      <rect x="20" y="15" width="60" height="10" fill="url(#stepGrad)" />
      <line x1="20" y1="15" x2="80" y2="15" stroke="#F5F5F5" strokeWidth="1" />
      
      {/* Top step */}
      <rect x="30" y="5" width="40" height="10" fill="url(#stepGrad)" />
      <line x1="30" y1="5" x2="70" y2="5" stroke="#F5F5F5" strokeWidth="1" />
    </svg>
  );
}

// ============================================
// DEFAULT FALLBACK
// ============================================

function DefaultItem() {
  return (
    <svg viewBox="0 0 50 50" className="w-full h-full">
      <rect x="10" y="10" width="30" height="30" stroke="#D4AF37" strokeWidth="2" fill="none" rx="3" />
      <circle cx="25" cy="25" r="8" stroke="#D4AF37" strokeWidth="1" fill="none" />
    </svg>
  );
}

export default StageItem;
