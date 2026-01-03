import { memo } from 'react';

// Memoized StageItem for performance
export const StageItem = memo(function StageItem({ item, instanceIndex = 0, totalInstances = 1 }) {
  const { id, color } = item;
  
  return (
    <div className="w-full h-full">
      <StageSVG 
        itemId={id} 
        color={color} 
        instanceIndex={instanceIndex}
        totalInstances={totalInstances}
      />
    </div>
  );
});

// Enhanced SVG components for stage visualization
function StageSVG({ itemId, color, instanceIndex, totalInstances }) {
  // Determine which SVG to render based on item ID
  
  // BACKDROPS
  if (itemId === 'backdrop-white-draping') {
    return <WhiteDrapingBackdrop />;
  }
  if (itemId === 'backdrop-fairy-lights') {
    return <FairyLightBackdrop />;
  }
  if (itemId === 'backdrop-sequin-gold') {
    return <SequinBackdrop color="#D4AF37" />;
  }
  if (itemId === 'backdrop-black-draping') {
    return <WhiteDrapingBackdrop color="#1a1a1a" />;
  }
  
  // ARCHES
  if (itemId === 'arch-circular-single') {
    return <CircularArch />;
  }
  if (itemId === 'arch-triple-set') {
    return <TripleArch />;
  }
  if (itemId === 'arch-hexagon') {
    return <HexagonArch />;
  }
  if (itemId === 'arch-rectangle') {
    return <RectangleArch />;
  }
  
  // SEATING
  if (itemId === 'sofa-cream-tufted') {
    return <TuftedSofa color="#F5F0E6" />;
  }
  if (itemId === 'sofa-velvet-blush') {
    return <TuftedSofa color="#E8D5D5" />;
  }
  if (itemId === 'chairs-accent-pair') {
    return <AccentChair side={instanceIndex === 0 ? 'left' : 'right'} />;
  }
  if (itemId === 'cushions-floor-set') {
    return <FloorCushions />;
  }
  
  // FLORALS
  if (itemId === 'floral-arch-arrangement') {
    return <ArchFlorals />;
  }
  if (itemId === 'floral-sofa-wrap') {
    return <SofaFlorals side={instanceIndex === 0 ? 'left' : 'right'} />;
  }
  if (itemId === 'floral-aisle-boxes') {
    return <AisleFloralBox index={instanceIndex} />;
  }
  if (itemId === 'floral-centerpieces') {
    return <Centerpiece side={instanceIndex === 0 ? 'left' : 'right'} />;
  }
  
  // LIGHTING
  if (itemId === 'lighting-pillar-candles') {
    return <PillarCandles side={instanceIndex === 0 ? 'left' : 'right'} />;
  }
  if (itemId === 'lighting-candle-cluster') {
    return <CandleCluster side={instanceIndex === 0 ? 'left' : 'right'} />;
  }
  if (itemId === 'lighting-uplighting') {
    return <Uplighting side={instanceIndex === 0 ? 'left' : 'right'} />;
  }
  if (itemId === 'lighting-string-addition') {
    return <StringLights />;
  }
  
  // ACCENTS
  if (itemId === 'accent-gold-panels') {
    return <GoldPanel side={instanceIndex === 0 ? 'left' : 'right'} />;
  }
  if (itemId === 'accent-mirror-frame') {
    return <OrnateMirror />;
  }
  if (itemId === 'accent-lantern-set') {
    return <MoroccanLantern side={instanceIndex === 0 ? 'left' : 'right'} />;
  }
  if (itemId === 'accent-aisle-runner') {
    return <AisleRunner />;
  }
  
  // STAGE
  if (itemId === 'stage-white-riser') {
    return <StagePlatform />;
  }
  if (itemId === 'stage-carpet') {
    return <PersianCarpet />;
  }
  if (itemId === 'stage-steps') {
    return <StageSteps />;
  }
  
  // Fallback
  return <DefaultItem color={color} />;
}

// ============================================
// BACKDROP COMPONENTS
// ============================================

function WhiteDrapingBackdrop({ color = '#FAFAFA' }) {
  const isLight = color !== '#1a1a1a';
  const foldColor = isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)';
  const highlightColor = isLight ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)';
  
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="drapeBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.9" />
        </linearGradient>
        <filter id="drapeShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      {/* Main drape body */}
      <rect x="0" y="0" width="200" height="100" fill="url(#drapeBg)" />
      
      {/* Elegant swag at top */}
      <path
        d="M0 0 Q50 12, 100 0 Q150 12, 200 0 L200 15 Q150 25, 100 15 Q50 25, 0 15 Z"
        fill={color}
        filter="url(#drapeShadow)"
      />
      
      {/* Vertical pleats */}
      {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
        <g key={i}>
          <path
            d={`M${x} 15 Q${x + 2} 55, ${x} 100`}
            stroke={foldColor}
            strokeWidth="8"
            fill="none"
          />
          <path
            d={`M${x - 3} 15 Q${x - 1} 55, ${x - 3} 100`}
            stroke={highlightColor}
            strokeWidth="2"
            fill="none"
          />
        </g>
      ))}
    </svg>
  );
}

function FairyLightBackdrop() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <filter id="fairyGlow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="lightGlow">
          <stop offset="0%" stopColor="#FFF9E6" stopOpacity="1"/>
          <stop offset="50%" stopColor="#FFE4B5" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
        </radialGradient>
      </defs>
      
      {/* Background glow */}
      <rect x="0" y="0" width="200" height="100" fill="#1a1a1a" opacity="0.3" />
      
      {/* String light rows */}
      {[0, 20, 40, 60, 80].map((yOffset, rowIdx) => (
        <g key={rowIdx}>
          {/* Wire */}
          <path 
            d={`M0 ${10 + yOffset} Q50 ${20 + yOffset}, 100 ${10 + yOffset} Q150 ${yOffset}, 200 ${10 + yOffset}`}
            stroke="#D4AF37" 
            strokeWidth="0.3" 
            fill="none" 
            opacity="0.4"
          />
          {/* Lights */}
          {[15, 35, 55, 75, 95, 115, 135, 155, 175, 195].map((x, i) => {
            const y = 10 + yOffset + Math.sin((x + rowIdx * 30) * 0.1) * 5;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill="url(#lightGlow)" filter="url(#fairyGlow)" />
                <circle cx={x} cy={y} r="1.5" fill="#FFFEF0" />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

function SequinBackdrop({ color = '#D4AF37' }) {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <filter id="sequinShine">
          <feGaussianBlur stdDeviation="0.5" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      
      <rect x="0" y="0" width="200" height="100" fill={color} opacity="0.4" />
      
      {/* Sequin grid */}
      {Array.from({ length: 25 }).map((_, row) =>
        Array.from({ length: 40 }).map((_, col) => {
          const shimmer = Math.random();
          return (
            <circle
              key={`${row}-${col}`}
              cx={2.5 + col * 5}
              cy={2 + row * 4}
              r="1.8"
              fill={color}
              opacity={0.3 + shimmer * 0.7}
              filter={shimmer > 0.8 ? "url(#sequinShine)" : undefined}
            />
          );
        })
      )}
    </svg>
  );
}

// ============================================
// ARCH COMPONENTS
// ============================================

function CircularArch() {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      <defs>
        <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <filter id="archShadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Main arch */}
      <path
        d="M12 118 L12 50 Q12 8, 50 8 Q88 8, 88 50 L88 118"
        stroke="url(#archGold)"
        strokeWidth="6"
        fill="none"
        filter="url(#archShadow)"
        strokeLinecap="round"
      />
      
      {/* Inner highlight */}
      <path
        d="M15 116 L15 51 Q15 12, 50 12 Q85 12, 85 51 L85 116"
        stroke="#F4E4BA"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function TripleArch() {
  return (
    <svg viewBox="0 0 140 100" className="w-full h-full">
      <defs>
        <linearGradient id="tripleArchGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      {/* Back arch (largest) */}
      <path
        d="M5 98 L5 40 Q5 2, 70 2 Q135 2, 135 40 L135 98"
        stroke="url(#tripleArchGold)"
        strokeWidth="3"
        fill="none"
        opacity="0.4"
      />
      
      {/* Middle arch */}
      <path
        d="M20 98 L20 42 Q20 8, 70 8 Q120 8, 120 42 L120 98"
        stroke="url(#tripleArchGold)"
        strokeWidth="4"
        fill="none"
        opacity="0.7"
      />
      
      {/* Front arch (smallest, most prominent) */}
      <path
        d="M35 98 L35 44 Q35 14, 70 14 Q105 14, 105 44 L105 98"
        stroke="url(#tripleArchGold)"
        strokeWidth="5"
        fill="none"
      />
    </svg>
  );
}

function HexagonArch() {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      <defs>
        <linearGradient id="hexGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      <polygon
        points="50,5 92,28 92,82 50,105 8,82 8,28"
        stroke="url(#hexGold)"
        strokeWidth="5"
        fill="none"
        strokeLinejoin="round"
      />
      
      {/* Inner highlight */}
      <polygon
        points="50,12 86,32 86,78 50,98 14,78 14,32"
        stroke="#F4E4BA"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

function RectangleArch() {
  return (
    <svg viewBox="0 0 100 110" className="w-full h-full">
      <defs>
        <linearGradient id="rectGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      <rect
        x="8"
        y="5"
        width="84"
        height="100"
        stroke="url(#rectGold)"
        strokeWidth="6"
        fill="none"
        rx="3"
      />
      
      {/* Inner frame */}
      <rect
        x="14"
        y="11"
        width="72"
        height="88"
        stroke="#F4E4BA"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
        rx="2"
      />
    </svg>
  );
}

// ============================================
// SEATING COMPONENTS
// ============================================

function TuftedSofa({ color = '#F5F0E6' }) {
  return (
    <svg viewBox="0 0 120 55" className="w-full h-full">
      <defs>
        <linearGradient id="sofaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
        <filter id="sofaShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* Back rest */}
      <rect x="8" y="5" width="104" height="22" rx="6" fill="url(#sofaGrad)" filter="url(#sofaShadow)" />
      
      {/* Tufting on back */}
      {[22, 40, 58, 76, 94].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="16" r="1.5" fill="rgba(0,0,0,0.08)" />
          <line x1={x} y1="8" x2={x} y2="24" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
        </g>
      ))}
      
      {/* Seat cushion */}
      <rect x="8" y="25" width="104" height="18" rx="5" fill={color} />
      
      {/* Seat tufting lines */}
      <line x1="45" y1="27" x2="45" y2="41" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
      <line x1="75" y1="27" x2="75" y2="41" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
      
      {/* Arms */}
      <rect x="2" y="10" width="14" height="30" rx="5" fill={color} />
      <rect x="104" y="10" width="14" height="30" rx="5" fill={color} />
      
      {/* Gold legs */}
      <circle cx="18" cy="48" r="3.5" fill="#D4AF37" />
      <circle cx="102" cy="48" r="3.5" fill="#D4AF37" />
      
      {/* Highlight */}
      <rect x="10" y="6" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

function AccentChair({ side }) {
  const flip = side === 'right';
  return (
    <svg viewBox="0 0 50 60" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs>
        <linearGradient id="chairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E6" />
          <stop offset="100%" stopColor="#EBE6DC" />
        </linearGradient>
      </defs>
      
      {/* Chair back */}
      <rect x="8" y="5" width="34" height="28" rx="4" fill="url(#chairGrad)" />
      
      {/* Seat */}
      <rect x="5" y="30" width="40" height="15" rx="4" fill="#F5F0E6" />
      
      {/* Arm */}
      <rect x="2" y="15" width="8" height="26" rx="3" fill="#F5F0E6" />
      
      {/* Gold legs */}
      <circle cx="12" cy="52" r="2.5" fill="#D4AF37" />
      <circle cx="38" cy="52" r="2.5" fill="#D4AF37" />
    </svg>
  );
}

function FloorCushions() {
  const cushionColors = ['#D4AF37', '#F5F0E6', '#D4AF37', '#E8D5D5', '#D4AF37', '#F5F0E6'];
  return (
    <svg viewBox="0 0 140 30" className="w-full h-full">
      {cushionColors.map((color, i) => (
        <rect
          key={i}
          x={5 + i * 22}
          y={5 + (i % 2) * 6}
          width="20"
          height="14"
          rx="5"
          fill={color}
          opacity="0.9"
        />
      ))}
    </svg>
  );
}

// ============================================
// FLORAL COMPONENTS
// ============================================

function ArchFlorals() {
  return (
    <svg viewBox="0 0 160 70" className="w-full h-full">
      <defs>
        <filter id="floralShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      {/* Greenery base */}
      <ellipse cx="80" cy="45" rx="70" ry="18" fill="#6B8E5E" opacity="0.7" />
      
      {/* Main floral clusters - top center */}
      <g filter="url(#floralShadow)">
        {/* Large center roses */}
        {[60, 80, 100].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={25 + (i % 2) * 5} r={10} fill="#FEFEFE" />
            <circle cx={x} cy={25 + (i % 2) * 5} r={6} fill="#F8F0F0" />
            <circle cx={x} cy={25 + (i % 2) * 5} r={3} fill="#E8D5D5" />
          </g>
        ))}
        
        {/* Blush accent flowers */}
        {[45, 70, 90, 115].map((x, i) => (
          <circle key={`blush-${i}`} cx={x} cy={35 + (i % 2) * 8} r={7} fill="#E8D5D5" />
        ))}
        
        {/* Small filler flowers */}
        {[35, 55, 75, 95, 105, 125].map((x, i) => (
          <circle key={`filler-${i}`} cx={x} cy={40 + (i % 3) * 5} r={4} fill="#FFF5F5" opacity="0.9" />
        ))}
      </g>
      
      {/* Cascading greenery */}
      {[20, 140].map((x, i) => (
        <g key={`cascade-${i}`}>
          <ellipse cx={x} cy="40" rx="12" ry="20" fill="#7A9E6E" opacity="0.6" />
          <ellipse cx={x + (i === 0 ? -5 : 5)} cy="50" rx="8" ry="15" fill="#6B8E5E" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

function SofaFlorals({ side }) {
  const flip = side === 'right';
  return (
    <svg viewBox="0 0 50 50" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs>
        <filter id="sofaFloralShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.1"/>
        </filter>
      </defs>
      
      {/* Greenery */}
      <ellipse cx="25" cy="30" rx="20" ry="15" fill="#6B8E5E" opacity="0.6" />
      
      {/* Flowers */}
      <g filter="url(#sofaFloralShadow)">
        <circle cx="20" cy="20" r="8" fill="#FEFEFE" />
        <circle cx="20" cy="20" r="5" fill="#E8D5D5" />
        <circle cx="32" cy="25" r="6" fill="#F8F0F0" />
        <circle cx="15" cy="32" r="5" fill="#E8D5D5" />
        <circle cx="28" cy="35" r="4" fill="#FFF5F5" />
      </g>
    </svg>
  );
}

function AisleFloralBox({ index }) {
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      {/* Acrylic box */}
      <rect x="5" y="15" width="30" height="22" fill="rgba(255,255,255,0.3)" stroke="#D4AF37" strokeWidth="0.5" rx="2" />
      
      {/* Flowers */}
      <circle cx="15" cy="12" r="7" fill="#FEFEFE" />
      <circle cx="25" cy="10" r="6" fill="#E8D5D5" />
      <circle cx="20" cy="18" r="5" fill="#F8F0F0" />
      
      {/* Greenery */}
      <ellipse cx="12" cy="20" rx="5" ry="8" fill="#6B8E5E" opacity="0.5" />
      <ellipse cx="28" cy="22" rx="4" ry="6" fill="#7A9E6E" opacity="0.5" />
    </svg>
  );
}

function Centerpiece({ side }) {
  return (
    <svg viewBox="0 0 45 60" className="w-full h-full">
      {/* Tall vase */}
      <path d="M18 58 L16 35 Q15 30, 22.5 28 Q30 30, 29 35 L27 58 Z" fill="#D4AF37" />
      <ellipse cx="22.5" cy="28" rx="8" ry="3" fill="#D4AF37" />
      
      {/* Flowers */}
      <g>
        <circle cx="22.5" cy="12" r="10" fill="#FEFEFE" />
        <circle cx="22.5" cy="12" r="6" fill="#F8F0F0" />
        <circle cx="14" cy="18" r="7" fill="#E8D5D5" />
        <circle cx="31" cy="16" r="6" fill="#E8D5D5" />
        <circle cx="22.5" cy="22" r="5" fill="#FFF5F5" />
        
        {/* Greenery */}
        <ellipse cx="10" cy="22" rx="5" ry="10" fill="#6B8E5E" opacity="0.6" />
        <ellipse cx="35" cy="20" rx="5" ry="10" fill="#7A9E6E" opacity="0.6" />
      </g>
    </svg>
  );
}

// ============================================
// LIGHTING COMPONENTS
// ============================================

function PillarCandles({ side }) {
  return (
    <svg viewBox="0 0 35 70" className="w-full h-full">
      <defs>
        <filter id="candleGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="flameGrad">
          <stop offset="0%" stopColor="#FFFEF0" />
          <stop offset="40%" stopColor="#FFE4B5" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Gold stand */}
      <rect x="5" y="58" width="25" height="8" rx="2" fill="#D4AF37" />
      <ellipse cx="17.5" cy="58" rx="12" ry="3" fill="#B8962E" />
      
      {/* Candles at different heights */}
      {[[10, 30], [17.5, 20], [25, 35]].map(([x, h], i) => (
        <g key={i}>
          <rect x={x - 4} y={58 - h} width="8" height={h} rx="1" fill="#FFF9E6" />
          <ellipse cx={x} cy={58 - h} rx="4" ry="1.5" fill="#FFFEF0" />
          {/* Flame */}
          <ellipse cx={x} cy={52 - h} rx="3" ry="6" fill="url(#flameGrad)" filter="url(#candleGlow)" />
        </g>
      ))}
    </svg>
  );
}

function CandleCluster({ side }) {
  return (
    <svg viewBox="0 0 50 50" className="w-full h-full">
      <defs>
        <filter id="clusterGlow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Multiple candles */}
      {[[12, 25], [22, 18], [32, 22], [25, 30], [38, 28]].map(([x, h], i) => (
        <g key={i}>
          <rect x={x - 3} y={48 - h} width="6" height={h} rx="1" fill="#FFF9E6" />
          <ellipse cx={x} cy={44 - h} rx="2" ry="4" fill="#FFD700" filter="url(#clusterGlow)" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

function Uplighting({ side }) {
  return (
    <svg viewBox="0 0 30 100" className="w-full h-full">
      <defs>
        <linearGradient id="uplightBeam" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Light beam */}
      <path d="M15 95 L0 10 L30 10 Z" fill="url(#uplightBeam)" />
      
      {/* Fixture */}
      <rect x="5" y="88" width="20" height="10" rx="2" fill="#333" />
      <rect x="8" y="90" width="14" height="4" fill="#D4AF37" opacity="0.8" />
    </svg>
  );
}

function StringLights() {
  return (
    <svg viewBox="0 0 200 30" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <filter id="stringGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Wire strings */}
      <path d="M0 8 Q50 18, 100 8 Q150 -2, 200 8" stroke="#D4AF37" strokeWidth="0.4" fill="none" opacity="0.5" />
      <path d="M0 16 Q50 6, 100 16 Q150 26, 200 16" stroke="#D4AF37" strokeWidth="0.4" fill="none" opacity="0.5" />
      
      {/* Lights on first wire */}
      {[12, 30, 50, 70, 90, 110, 130, 150, 170, 188].map((x, i) => (
        <circle key={`top-${i}`} cx={x} cy={8 + Math.sin(x * 0.05) * 5} r="3" fill="#FFF9E6" filter="url(#stringGlow)" />
      ))}
      
      {/* Lights on second wire */}
      {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
        <circle key={`bot-${i}`} cx={x} cy={16 + Math.sin(x * 0.05) * 5} r="2.5" fill="#FFF9E6" filter="url(#stringGlow)" />
      ))}
    </svg>
  );
}

// ============================================
// ACCENT COMPONENTS
// ============================================

function GoldPanel({ side }) {
  return (
    <svg viewBox="0 0 35 100" className="w-full h-full">
      <defs>
        <linearGradient id="panelGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      
      {/* Main panel */}
      <rect x="3" y="3" width="29" height="94" rx="3" fill="none" stroke="url(#panelGold)" strokeWidth="2" />
      
      {/* Inner decorative frame */}
      <rect x="7" y="7" width="21" height="86" rx="2" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      
      {/* Center ornament */}
      <circle cx="17.5" cy="50" r="8" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
      <circle cx="17.5" cy="50" r="4" fill="#D4AF37" opacity="0.3" />
    </svg>
  );
}

function OrnateMirror() {
  return (
    <svg viewBox="0 0 60 80" className="w-full h-full">
      <defs>
        <linearGradient id="mirrorFrame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <radialGradient id="mirrorGlass">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#E8E8E8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D0D0D0" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      
      {/* Frame */}
      <ellipse cx="30" cy="40" rx="28" ry="38" fill="none" stroke="url(#mirrorFrame)" strokeWidth="4" />
      
      {/* Glass */}
      <ellipse cx="30" cy="40" rx="24" ry="34" fill="url(#mirrorGlass)" />
      
      {/* Reflection highlight */}
      <ellipse cx="22" cy="30" rx="8" ry="14" fill="white" opacity="0.25" />
    </svg>
  );
}

function MoroccanLantern({ side }) {
  return (
    <svg viewBox="0 0 35 60" className="w-full h-full">
      <defs>
        <filter id="lanternGlow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Hook */}
      <line x1="17.5" y1="0" x2="17.5" y2="8" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="17.5" cy="3" r="2" fill="#D4AF37" />
      
      {/* Lantern body */}
      <path d="M8 12 L8 45 Q8 52, 17.5 52 Q27 52, 27 45 L27 12 Q27 8, 17.5 8 Q8 8, 8 12 Z" 
            fill="none" stroke="#D4AF37" strokeWidth="2" />
      
      {/* Glass panels */}
      <rect x="10" y="14" width="15" height="34" rx="1" fill="#D4AF37" opacity="0.15" />
      
      {/* Inner glow */}
      <ellipse cx="17.5" cy="30" rx="5" ry="10" fill="#FFF9E6" opacity="0.5" filter="url(#lanternGlow)" />
      
      {/* Decorative bars */}
      <line x1="17.5" y1="12" x2="17.5" y2="48" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <line x1="10" y1="30" x2="25" y2="30" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

function AisleRunner() {
  return (
    <svg viewBox="0 0 60 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="runnerGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F5F0E6" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      
      {/* Runner fabric */}
      <rect x="5" y="0" width="50" height="100" fill="url(#runnerGrad)" />
      
      {/* Gold trim */}
      <rect x="8" y="3" width="44" height="94" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
      
      {/* Decorative ends */}
      <line x1="12" y1="8" x2="48" y2="8" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
      <line x1="12" y1="92" x2="48" y2="92" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

// ============================================
// STAGE BASE COMPONENTS
// ============================================

function StagePlatform() {
  return (
    <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="platformGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F5F5" />
        </linearGradient>
      </defs>
      
      {/* Platform top */}
      <rect x="0" y="5" width="200" height="35" fill="url(#platformGrad)" />
      
      {/* Top highlight */}
      <rect x="0" y="5" width="200" height="6" fill="rgba(255,255,255,0.5)" />
      
      {/* Front edge */}
      <rect x="0" y="38" width="200" height="10" fill="#EFEFEF" />
      
      {/* Shadow line */}
      <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
    </svg>
  );
}

function PersianCarpet() {
  return (
    <svg viewBox="0 0 160 70" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="carpetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      {/* Main carpet */}
      <rect x="5" y="5" width="150" height="60" fill="url(#carpetGrad)" rx="2" />
      
      {/* Border pattern */}
      <rect x="10" y="10" width="140" height="50" fill="none" stroke="#F4E4BA" strokeWidth="2" />
      <rect x="15" y="15" width="130" height="40" fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.4" />
      
      {/* Center medallion */}
      <ellipse cx="80" cy="35" rx="25" ry="12" fill="none" stroke="#F4E4BA" strokeWidth="1" opacity="0.5" />
      <ellipse cx="80" cy="35" rx="15" ry="7" fill="#8B7355" opacity="0.3" />
    </svg>
  );
}

function StageSteps() {
  return (
    <svg viewBox="0 0 100 35" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="stepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E6" />
          <stop offset="100%" stopColor="#EBE6DC" />
        </linearGradient>
      </defs>
      
      {/* Lower step */}
      <rect x="10" y="20" width="80" height="13" rx="2" fill="url(#stepGrad)" />
      <rect x="10" y="20" width="80" height="4" fill="rgba(255,255,255,0.3)" rx="2" />
      
      {/* Upper step */}
      <rect x="20" y="8" width="60" height="14" rx="2" fill="url(#stepGrad)" />
      <rect x="20" y="8" width="60" height="4" fill="rgba(255,255,255,0.4)" rx="2" />
    </svg>
  );
}

// ============================================
// DEFAULT FALLBACK
// ============================================

function DefaultItem({ color = '#D4AF37' }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="10" y="10" width="80" height="80" rx="8" fill={color} opacity="0.4" />
      <rect x="20" y="20" width="60" height="60" rx="4" fill={color} opacity="0.6" />
    </svg>
  );
}
