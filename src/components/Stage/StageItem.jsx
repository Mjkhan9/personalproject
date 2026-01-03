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
// CLEAN GEOMETRIC ICONS - NO BLOBS
// ============================================

function StageSVG({ itemId, instanceIndex }) {
  // BACKDROPS
  if (itemId === 'backdrop-white-draping') return <DrapingBackdrop color="white" />;
  if (itemId === 'backdrop-fairy-lights') return <FairyLightBackdrop />;
  if (itemId === 'backdrop-sequin-gold') return <DrapingBackdrop color="gold" />;
  if (itemId === 'backdrop-black-draping') return <DrapingBackdrop color="dark" />;
  
  // ARCHES - Just clean frames
  if (itemId === 'arch-circular-single') return <CircularArch />;
  if (itemId === 'arch-triple-set') return <TripleArch />;
  if (itemId === 'arch-hexagon') return <HexagonArch />;
  if (itemId === 'arch-rectangle') return <RectangleArch />;
  
  // SEATING
  if (itemId === 'sofa-cream-tufted') return <TuftedSofa />;
  if (itemId === 'sofa-velvet-blush') return <TuftedSofa color="blush" />;
  if (itemId === 'chairs-accent-pair') return <AccentChair side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'seating-floor-cushions') return <FloorCushions />;
  
  // FLORALS - Text labels only, no fake drawings
  if (itemId === 'floral-arch-arrangement') return <FloralLabel text="Arch Florals" />;
  if (itemId === 'floral-sofa-wrap') return <FloralLabel text="Sofa Wrap" small />;
  if (itemId === 'floral-aisle-boxes') return <FloralLabel text="Aisle Box" small />;
  if (itemId === 'floral-centerpieces') return <FloralLabel text="Centerpiece" />;
  
  // LIGHTING
  if (itemId === 'lighting-pillar-candles') return <PillarCandles />;
  if (itemId === 'lighting-candle-cluster') return <CandleCluster />;
  if (itemId === 'lighting-uplighting') return <Uplighting side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-string-lights') return <StringLights />;
  
  // ACCENTS
  if (itemId === 'accent-gold-panels') return <GoldPanel side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'accent-mirror-frame') return <MirrorFrame />;
  if (itemId === 'accent-lantern-set') return <Lanterns />;
  
  // FLOOR
  if (itemId === 'floor-aisle-runner') return <AisleRunner />;
  if (itemId === 'floor-stage-riser') return <StageRiser />;
  if (itemId === 'floor-carpet') return <StageCarpet />;
  if (itemId === 'floor-steps') return <StageSteps />;
  
  return <DefaultItem />;
}

// ============================================
// BACKDROPS
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
      
      <rect x="0" y="0" width="200" height="100" fill={`url(#drape-${color})`} />
      
      {/* Swag at top */}
      <path d="M0 0 Q50 12, 100 8 Q150 12, 200 0" fill={c.highlight} opacity="0.5" />
      
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
      
      <rect x="0" y="0" width="200" height="100" fill="#1a1a1a" />
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
      
      {/* Lights - small dots only */}
      {Array.from({ length: 120 }).map((_, i) => {
        const col = i % 15;
        const row = Math.floor(i / 15);
        const x = 12 + col * 13 + (Math.sin(i * 0.7) * 2);
        const y = 8 + row * 12 + (Math.cos(i * 0.5) * 2);
        const brightness = 0.6 + Math.sin(i * 0.3) * 0.4;
        return (
          <rect 
            key={i}
            x={x - 1} y={y - 1} width="2" height="2"
            fill="#FFFEF0" 
            opacity={brightness}
          />
        );
      })}
    </svg>
  );
}

// ============================================
// ARCHES - Clean gold frames, NO florals
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
      
      {/* Main arch frame */}
      <path 
        d="M15 118 L15 50 Q15 10, 50 10 Q85 10, 85 50 L85 118" 
        stroke="url(#archGold)" 
        strokeWidth="5" 
        fill="none"
        filter="url(#archGlow)"
      />
      
      {/* Inner arch line */}
      <path 
        d="M20 116 L20 52 Q20 15, 50 15 Q80 15, 80 52 L80 116" 
        stroke="#D4AF37" 
        strokeWidth="2" 
        fill="none"
        opacity="0.5"
      />
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
      
      {/* Three arch frames */}
      <path 
        d="M8 108 L8 45 Q8 6, 80 6 Q152 6, 152 45 L152 108" 
        stroke="url(#tripleGold)" 
        strokeWidth="3" 
        fill="none"
        filter="url(#tripleGlow)"
        opacity="0.6"
      />
      <path 
        d="M25 108 L25 48 Q25 12, 80 12 Q135 12, 135 48 L135 108" 
        stroke="url(#tripleGold)" 
        strokeWidth="4" 
        fill="none"
        filter="url(#tripleGlow)"
        opacity="0.8"
      />
      <path 
        d="M42 108 L42 50 Q42 18, 80 18 Q118 18, 118 50 L118 108" 
        stroke="url(#tripleGold)" 
        strokeWidth="5" 
        fill="none"
        filter="url(#tripleGlow)"
      />
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
        strokeWidth="5" 
        fill="none"
        strokeLinejoin="round"
        filter="url(#hexGlow)"
      />
      
      {/* Inner hexagon */}
      <polygon 
        points="50,12 85,29 85,76 50,93 15,76 15,29" 
        stroke="#D4AF37" 
        strokeWidth="2" 
        fill="none"
        strokeLinejoin="round"
        opacity="0.4"
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
        strokeWidth="5" 
        fill="none" 
        rx="2"
        filter="url(#rectGlow)"
      />
      
      {/* Inner rectangle */}
      <rect 
        x="16" y="11" width="68" height="93" 
        stroke="#D4AF37" 
        strokeWidth="2" 
        fill="none" 
        rx="1"
        opacity="0.4"
      />
    </svg>
  );
}

// ============================================
// SEATING
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
      
      {/* Tufting lines */}
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
      
      {/* Tufting line */}
      <path d="M15 10 Q25 18, 35 10" stroke="#E5E0D8" strokeWidth="1" fill="none" opacity="0.5" />
      
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
// FLORALS - Simple text labels, NO blobs
// ============================================

function FloralLabel({ text, small = false }) {
  const height = small ? 30 : 50;
  const width = small ? 60 : 120;
  const fontSize = small ? 8 : 10;
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <linearGradient id="floralTag" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Tag background */}
      <rect 
        x="2" y="2" 
        width={width - 4} height={height - 4} 
        rx="4" 
        fill="url(#floralTag)" 
        stroke="#D4AF37" 
        strokeWidth="1"
        strokeDasharray="4,2"
      />
      
      {/* Flower icon - simple */}
      <text 
        x={width / 2} 
        y={height / 2 - (small ? 2 : 4)} 
        textAnchor="middle" 
        fill="#D4AF37" 
        fontSize={fontSize + 4}
      >
        ✿
      </text>
      
      {/* Label */}
      <text 
        x={width / 2} 
        y={height / 2 + (small ? 8 : 12)} 
        textAnchor="middle" 
        fill="#D4AF37" 
        fontSize={fontSize}
        fontFamily="serif"
      >
        {text}
      </text>
    </svg>
  );
}

// ============================================
// LIGHTING
// ============================================

function PillarCandles() {
  return (
    <svg viewBox="0 0 50 50" className="w-full h-full">
      <defs>
        <linearGradient id="candleBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFEF8" />
          <stop offset="100%" stopColor="#F5F0E6" />
        </linearGradient>
        <radialGradient id="flame" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#FFFEF0" />
          <stop offset="50%" stopColor="#FFE4A0" />
          <stop offset="100%" stopColor="#FFD060" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Candles at different heights */}
      {[
        { x: 10, h: 25 },
        { x: 22, h: 32 },
        { x: 34, h: 20 },
      ].map((c, i) => (
        <g key={i}>
          {/* Candle body */}
          <rect x={c.x} y={48 - c.h} width={6} height={c.h} fill="url(#candleBody)" rx="1" />
          {/* Flame */}
          <ellipse cx={c.x + 3} cy={48 - c.h - 4} rx={3} ry={5} fill="url(#flame)" />
        </g>
      ))}
    </svg>
  );
}

function CandleCluster() {
  return (
    <svg viewBox="0 0 60 45" className="w-full h-full">
      <defs>
        <radialGradient id="clusterFlame" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#FFFEF0" />
          <stop offset="100%" stopColor="#FFD060" stopOpacity="0" />
        </radialGradient>
      </defs>
      
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
          <ellipse cx={c.x + 2} cy={43 - c.h - 3} rx={2} ry={4} fill="url(#clusterFlame)" />
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
      
      {/* Lights - small rectangles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const t = i / 19;
        const x = t * 200;
        const y = 5 + Math.sin(t * Math.PI * 2) * 5;
        return (
          <rect 
            key={i}
            x={x - 1.5} y={y - 1.5} width="3" height="3"
            fill="#FFFEF0"
            rx="0.5"
          />
        );
      })}
    </svg>
  );
}

// ============================================
// ACCENTS
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
      
      {/* Inner decorative lines */}
      <rect x="10" y="10" width="15" height="70" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.5" />
      <line x1="17.5" y1="15" x2="17.5" y2="75" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
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

function Lanterns() {
  return (
    <svg viewBox="0 0 40 60" className="w-full h-full">
      <defs>
        <linearGradient id="lanternGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF4D6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFF4D6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Lantern 1 */}
      <g transform="translate(5, 5)">
        <path d="M7 0 Q10 -3, 13 0" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <rect x="3" y="2" width="14" height="30" stroke="url(#lanternGold)" strokeWidth="1.5" fill="none" />
        <rect x="5" y="4" width="10" height="26" fill="url(#lanternGlow)" />
        <line x1="3" y1="17" x2="17" y2="17" stroke="#D4AF37" strokeWidth="1" />
        <rect x="2" y="32" width="16" height="3" fill="#D4AF37" />
      </g>
      
      {/* Lantern 2 */}
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
      
      <rect x="60" y="5" width="80" height="35" fill="url(#runnerGrad)" />
      
      {/* Gold trim */}
      <line x1="60" y1="5" x2="60" y2="40" stroke="#D4AF37" strokeWidth="2" />
      <line x1="140" y1="5" x2="140" y2="40" stroke="#D4AF37" strokeWidth="2" />
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
      
      <rect x="20" y="5" width="160" height="18" fill="url(#riserGrad)" />
      <line x1="20" y1="5" x2="180" y2="5" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="20" y="20" width="160" height="3" fill="rgba(0,0,0,0.1)" />
    </svg>
  );
}

function StageCarpet() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
      <rect x="15" y="5" width="170" height="50" fill="#F5F0E6" rx="2" />
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
      
      <rect x="10" y="25" width="80" height="8" fill="url(#stepGrad)" />
      <rect x="20" y="15" width="60" height="10" fill="url(#stepGrad)" />
      <rect x="30" y="5" width="40" height="10" fill="url(#stepGrad)" />
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
