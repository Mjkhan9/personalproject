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
  // BACKDROPS
  if (itemId === 'backdrop-white-draping') return <WhiteDrapingBackdrop />;
  if (itemId === 'backdrop-fairy-lights') return <FairyLightBackdrop />;
  if (itemId === 'backdrop-sequin-gold') return <SequinBackdrop color="#D4AF37" />;
  if (itemId === 'backdrop-black-draping') return <WhiteDrapingBackdrop color="#1a1a1a" />;
  
  // ARCHES - Now with florals!
  if (itemId === 'arch-circular-single') return <FloralArch />;
  if (itemId === 'arch-triple-set') return <TripleFloralArch />;
  if (itemId === 'arch-hexagon') return <HexagonArch />;
  if (itemId === 'arch-rectangle') return <RectangleArch />;
  
  // SEATING
  if (itemId === 'sofa-cream-tufted') return <LuxuryTuftedSofa color="#F5F0E6" />;
  if (itemId === 'sofa-velvet-blush') return <LuxuryTuftedSofa color="#E8D5D5" />;
  if (itemId === 'chairs-accent-pair') return <ElegantAccentChair side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'cushions-floor-set') return <FloorCushions />;
  
  // FLORALS - Much more lush!
  if (itemId === 'floral-arch-arrangement') return <LushArchFlorals />;
  if (itemId === 'floral-sofa-wrap') return <SofaFloralWrap side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'floral-aisle-boxes') return <AisleFloralBox index={instanceIndex} />;
  if (itemId === 'floral-centerpieces') return <TallCenterpiece side={instanceIndex === 0 ? 'left' : 'right'} />;
  
  // LIGHTING
  if (itemId === 'lighting-pillar-candles') return <PillarCandles side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-candle-cluster') return <CandleCluster side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-uplighting') return <Uplighting side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'lighting-string-addition') return <StringLights />;
  
  // ACCENTS
  if (itemId === 'accent-gold-panels') return <DecorativeGoldPanel side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'accent-mirror-frame') return <OrnateArchedMirror />;
  if (itemId === 'accent-lantern-set') return <MoroccanLantern side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'accent-aisle-runner') return <AisleRunner />;
  
  // STAGE
  if (itemId === 'stage-white-riser') return <WhiteStagePlatform />;
  if (itemId === 'stage-carpet') return <PersianCarpet />;
  if (itemId === 'stage-steps') return <StageSteps />;
  
  return <DefaultItem color={color} />;
}

// ============================================
// BACKDROP COMPONENTS - More realistic
// ============================================

function WhiteDrapingBackdrop({ color = '#FAFAFA' }) {
  const isLight = color !== '#1a1a1a';
  
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="drapeGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isLight ? '#FFFFFF' : '#2a2a2a'} />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={isLight ? '#F0EDE8' : '#1a1a1a'} />
        </linearGradient>
        <filter id="fabricTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
          <feDiffuseLighting in="noise" lightingColor={isLight ? '#fff' : '#333'} surfaceScale="1" result="light">
            <feDistantLight azimuth="45" elevation="60"/>
          </feDiffuseLighting>
          <feBlend in="SourceGraphic" in2="light" mode="soft-light"/>
        </filter>
      </defs>
      
      {/* Main drape body */}
      <rect x="0" y="0" width="200" height="100" fill="url(#drapeGradLight)" />
      
      {/* Gathered swag at top */}
      <path
        d="M0 0 Q25 8, 50 3 Q75 10, 100 3 Q125 10, 150 3 Q175 8, 200 0 L200 18 Q175 22, 150 15 Q125 22, 100 15 Q75 22, 50 15 Q25 22, 0 18 Z"
        fill={isLight ? '#FFFFFF' : '#333'}
        opacity="0.9"
      />
      
      {/* Multiple drape folds for realism */}
      {[12, 28, 44, 60, 76, 92, 108, 124, 140, 156, 172, 188].map((x, i) => (
        <g key={i}>
          {/* Shadow fold */}
          <path
            d={`M${x} 18 Q${x + 3} 50, ${x + 1} 100`}
            stroke={isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.03)'}
            strokeWidth="10"
            fill="none"
          />
          {/* Highlight fold */}
          <path
            d={`M${x - 4} 18 Q${x - 2} 50, ${x - 4} 100`}
            stroke={isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.05)'}
            strokeWidth="3"
            fill="none"
          />
        </g>
      ))}
      
      {/* Bottom pooling effect */}
      <ellipse cx="100" cy="98" rx="95" ry="4" fill={isLight ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.2)'} />
    </svg>
  );
}

function FairyLightBackdrop() {
  // Create random but consistent light positions
  const lights = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 20; col++) {
      const baseX = col * 10 + 5;
      const baseY = row * 8 + 4;
      // Add slight randomness
      const offsetX = (Math.sin(row * col) * 2);
      const offsetY = (Math.cos(row + col) * 2);
      const brightness = 0.4 + Math.abs(Math.sin(row * 0.5 + col * 0.3)) * 0.6;
      lights.push({ x: baseX + offsetX, y: baseY + offsetY, brightness });
    }
  }
  
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <filter id="fairyGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="warmLight">
          <stop offset="0%" stopColor="#FFFEF5" stopOpacity="1"/>
          <stop offset="30%" stopColor="#FFE4B5" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="curtainBase" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      
      {/* Dark curtain base */}
      <rect x="0" y="0" width="200" height="100" fill="url(#curtainBase)" />
      
      {/* Sheer curtain layer */}
      <rect x="0" y="0" width="200" height="100" fill="#F5F0E6" opacity="0.08" />
      
      {/* Vertical string lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={`string-${i}`}
          x1={i * 10 + 5}
          y1="0"
          x2={i * 10 + 5}
          y2="100"
          stroke="#D4AF37"
          strokeWidth="0.2"
          opacity="0.3"
        />
      ))}
      
      {/* Fairy lights with glow */}
      {lights.map((light, i) => (
        <g key={i}>
          {/* Outer glow */}
          <circle 
            cx={light.x} 
            cy={light.y} 
            r={2.5 * light.brightness} 
            fill="url(#warmLight)" 
            opacity={light.brightness * 0.6}
          />
          {/* Core light */}
          <circle 
            cx={light.x} 
            cy={light.y} 
            r={0.8} 
            fill="#FFFEF8" 
            filter="url(#fairyGlow)"
            opacity={0.8 + light.brightness * 0.2}
          />
        </g>
      ))}
      
      {/* Ambient glow overlay */}
      <rect x="0" y="0" width="200" height="100" fill="#FFE4B5" opacity="0.05" />
    </svg>
  );
}

function SequinBackdrop({ color = '#D4AF37' }) {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sequinBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="50%" stopColor="#B8962E" stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
        <filter id="sequinShine">
          <feGaussianBlur stdDeviation="0.3"/>
        </filter>
      </defs>
      
      <rect x="0" y="0" width="200" height="100" fill="url(#sequinBase)" />
      
      {/* Dense sequin pattern */}
      {Array.from({ length: 50 }).map((_, row) =>
        Array.from({ length: 50 }).map((_, col) => {
          const shimmer = Math.sin(row * 0.8 + col * 0.5) * 0.5 + 0.5;
          const isShiny = shimmer > 0.7;
          return (
            <circle
              key={`${row}-${col}`}
              cx={2 + col * 4}
              cy={1 + row * 2}
              r="1.2"
              fill={isShiny ? '#F4E4BA' : color}
              opacity={0.4 + shimmer * 0.5}
              filter={isShiny ? "url(#sequinShine)" : undefined}
            />
          );
        })
      )}
    </svg>
  );
}

// ============================================
// ARCH COMPONENTS - With lush florals!
// ============================================

function FloralArch() {
  return (
    <svg viewBox="0 0 100 130" className="w-full h-full">
      <defs>
        <linearGradient id="archMetal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B7355" />
          <stop offset="50%" stopColor="#A08060" />
          <stop offset="100%" stopColor="#8B7355" />
        </linearGradient>
        <filter id="leafShadow">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* Metal arch frame (subtle, behind greenery) */}
      <path
        d="M15 128 L15 55 Q15 12, 50 12 Q85 12, 85 55 L85 128"
        stroke="url(#archMetal)"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
      
      {/* Lush greenery covering the arch */}
      <g filter="url(#leafShadow)">
        {/* Left side greenery */}
        {[0, 15, 30, 45, 60, 75, 90, 105].map((y, i) => (
          <g key={`left-${i}`}>
            <ellipse cx={18 - i * 0.3} cy={25 + y * 0.95} rx={8 + Math.sin(i) * 2} ry={6} fill="#5A7F4B" opacity="0.9" transform={`rotate(${-20 + i * 3}, ${18}, ${25 + y})`} />
            <ellipse cx={14 - i * 0.2} cy={28 + y * 0.95} rx={6} ry={4} fill="#6B8E5E" opacity="0.8" transform={`rotate(${-30 + i * 2}, ${14}, ${28 + y})`} />
          </g>
        ))}
        
        {/* Right side greenery */}
        {[0, 15, 30, 45, 60, 75, 90, 105].map((y, i) => (
          <g key={`right-${i}`}>
            <ellipse cx={82 + i * 0.3} cy={25 + y * 0.95} rx={8 + Math.sin(i) * 2} ry={6} fill="#5A7F4B" opacity="0.9" transform={`rotate(${20 - i * 3}, ${82}, ${25 + y})`} />
            <ellipse cx={86 + i * 0.2} cy={28 + y * 0.95} rx={6} ry={4} fill="#6B8E5E" opacity="0.8" transform={`rotate(${30 - i * 2}, ${86}, ${28 + y})`} />
          </g>
        ))}
        
        {/* Top arch greenery - most dense */}
        {[-35, -25, -15, -5, 5, 15, 25, 35].map((offset, i) => (
          <g key={`top-${i}`}>
            <ellipse cx={50 + offset} cy={18 - Math.abs(offset) * 0.15} rx={7} ry={10} fill="#5A7F4B" opacity="0.9" />
            <ellipse cx={50 + offset + 2} cy={22 - Math.abs(offset) * 0.1} rx={5} ry={7} fill="#6B8E5E" opacity="0.8" />
          </g>
        ))}
      </g>
      
      {/* Flowers scattered on the arch */}
      {/* White roses */}
      {[[25, 30], [75, 30], [35, 45], [65, 45], [50, 15], [20, 60], [80, 60], [30, 80], [70, 80], [25, 100], [75, 100]].map(([x, y], i) => (
        <g key={`rose-${i}`}>
          <circle cx={x} cy={y} r={5} fill="#FEFEFE" />
          <circle cx={x} cy={y} r={3.5} fill="#F8F5F0" />
          <circle cx={x} cy={y} r={2} fill="#F0EBE3" />
          <circle cx={x} cy={y} r={0.8} fill="#E8E0D5" />
        </g>
      ))}
      
      {/* Small accent flowers */}
      {[[22, 40], [78, 40], [18, 70], [82, 70], [45, 20], [55, 20], [15, 90], [85, 90]].map(([x, y], i) => (
        <circle key={`accent-${i}`} cx={x} cy={y} r={3} fill="#F5E6E0" opacity="0.9" />
      ))}
    </svg>
  );
}

function TripleFloralArch() {
  return (
    <svg viewBox="0 0 160 110" className="w-full h-full">
      <defs>
        <linearGradient id="archMetalTriple" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6B5B4F" />
          <stop offset="50%" stopColor="#8B7355" />
          <stop offset="100%" stopColor="#6B5B4F" />
        </linearGradient>
      </defs>
      
      {/* Three arch frames */}
      <path d="M10 108 L10 45 Q10 8, 80 8 Q150 8, 150 45 L150 108" stroke="url(#archMetalTriple)" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M25 108 L25 48 Q25 15, 80 15 Q135 15, 135 48 L135 108" stroke="url(#archMetalTriple)" strokeWidth="2.5" fill="none" opacity="0.5" />
      <path d="M40 108 L40 50 Q40 22, 80 22 Q120 22, 120 50 L120 108" stroke="url(#archMetalTriple)" strokeWidth="3" fill="none" opacity="0.6" />
      
      {/* Greenery on all three arches */}
      {/* Outer arch greenery */}
      {[0, 20, 40, 60, 80].map((y, i) => (
        <g key={`outer-${i}`}>
          <ellipse cx={12} cy={20 + y} rx={10} ry={7} fill="#4A6F3B" opacity="0.7" transform={`rotate(-15, 12, ${20 + y})`} />
          <ellipse cx={148} cy={20 + y} rx={10} ry={7} fill="#4A6F3B" opacity="0.7" transform={`rotate(15, 148, ${20 + y})`} />
        </g>
      ))}
      
      {/* Middle arch greenery */}
      {[0, 18, 36, 54, 72].map((y, i) => (
        <g key={`mid-${i}`}>
          <ellipse cx={27} cy={25 + y} rx={9} ry={6} fill="#5A7F4B" opacity="0.8" transform={`rotate(-10, 27, ${25 + y})`} />
          <ellipse cx={133} cy={25 + y} rx={9} ry={6} fill="#5A7F4B" opacity="0.8" transform={`rotate(10, 133, ${25 + y})`} />
        </g>
      ))}
      
      {/* Inner arch greenery - most prominent */}
      {[0, 15, 30, 45, 60, 75].map((y, i) => (
        <g key={`inner-${i}`}>
          <ellipse cx={42} cy={28 + y} rx={8} ry={6} fill="#6B8E5E" opacity="0.9" transform={`rotate(-8, 42, ${28 + y})`} />
          <ellipse cx={118} cy={28 + y} rx={8} ry={6} fill="#6B8E5E" opacity="0.9" transform={`rotate(8, 118, ${28 + y})`} />
        </g>
      ))}
      
      {/* Top greenery clusters */}
      {[-50, -35, -20, 0, 20, 35, 50].map((offset, i) => (
        <ellipse key={`top-${i}`} cx={80 + offset} cy={12 + Math.abs(offset) * 0.2} rx={12} ry={8} fill="#5A7F4B" opacity="0.85" />
      ))}
      
      {/* Cascading flowers */}
      {[[15, 25], [145, 25], [30, 40], [130, 40], [45, 55], [115, 55], [80, 15], [65, 18], [95, 18], [50, 70], [110, 70], [35, 85], [125, 85]].map(([x, y], i) => (
        <g key={`flower-${i}`}>
          <circle cx={x} cy={y} r={4.5} fill="#FEFEFE" />
          <circle cx={x} cy={y} r={3} fill="#F8F5F0" />
          <circle cx={x} cy={y} r={1.5} fill="#F0E8E0" />
        </g>
      ))}
      
      {/* Blush accent flowers */}
      {[[20, 50], [140, 50], [55, 30], [105, 30], [80, 8], [40, 95], [120, 95]].map(([x, y], i) => (
        <circle key={`blush-${i}`} cx={x} cy={y} r={3.5} fill="#F0D5D0" opacity="0.9" />
      ))}
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
      
      {/* Hexagon frame */}
      <polygon
        points="50,8 88,28 88,78 50,98 12,78 12,28"
        stroke="url(#hexGold)"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
      />
      
      {/* Greenery on frame */}
      {[[12, 28], [12, 53], [12, 78], [50, 8], [88, 28], [88, 53], [88, 78], [50, 98]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={8} ry={5} fill="#6B8E5E" opacity="0.8" transform={`rotate(${i * 45}, ${x}, ${y})`} />
          <circle cx={x + (x < 50 ? 3 : -3)} cy={y} r={3} fill="#FEFEFE" />
        </g>
      ))}
      
      {/* Corner florals */}
      <circle cx={50} cy={8} r={5} fill="#FEFEFE" />
      <circle cx={50} cy={98} r={4} fill="#F5E6E0" />
    </svg>
  );
}

function RectangleArch() {
  return (
    <svg viewBox="0 0 100 115" className="w-full h-full">
      <defs>
        <linearGradient id="rectGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      {/* Rectangle frame */}
      <rect x="10" y="8" width="80" height="100" stroke="url(#rectGold)" strokeWidth="4" fill="none" rx="2" />
      
      {/* Greenery along frame */}
      {[0, 20, 40, 60, 80].map((y, i) => (
        <g key={i}>
          <ellipse cx={12} cy={15 + y} rx={7} ry={5} fill="#6B8E5E" opacity="0.8" transform={`rotate(-10, 12, ${15 + y})`} />
          <ellipse cx={88} cy={15 + y} rx={7} ry={5} fill="#6B8E5E" opacity="0.8" transform={`rotate(10, 88, ${15 + y})`} />
        </g>
      ))}
      
      {/* Top florals */}
      {[25, 50, 75].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={10} r={4} fill="#FEFEFE" />
          <circle cx={x} cy={10} r={2.5} fill="#F8F5F0" />
        </g>
      ))}
    </svg>
  );
}

// ============================================
// SEATING - Luxury tufted sofas
// ============================================

function LuxuryTuftedSofa({ color = '#F5F0E6' }) {
  const isDark = color === '#E8D5D5';
  
  return (
    <svg viewBox="0 0 140 60" className="w-full h-full">
      <defs>
        <linearGradient id="sofaCushion" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="50%" stopColor={isDark ? '#E0CDCD' : '#EDE8E0'} />
          <stop offset="100%" stopColor={isDark ? '#D8C5C5' : '#E5E0D8'} />
        </linearGradient>
        <filter id="sofaShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.25"/>
        </filter>
        <filter id="innerShadow">
          <feOffset dx="0" dy="1"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite operator="out" in="SourceGraphic"/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.1 0"/>
          <feBlend in="SourceGraphic"/>
        </filter>
      </defs>
      
      {/* Sofa shadow */}
      <ellipse cx="70" cy="58" rx="60" ry="4" fill="rgba(0,0,0,0.15)" />
      
      {/* Back rest - tall and tufted */}
      <rect x="12" y="5" width="116" height="28" rx="6" fill="url(#sofaCushion)" filter="url(#sofaShadow)" />
      
      {/* Channel tufting on back - vertical pleats */}
      {[24, 38, 52, 66, 80, 94, 108].map((x, i) => (
        <g key={`tuft-${i}`}>
          {/* Vertical channel line */}
          <line x1={x} y1="8" x2={x} y2="30" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
          {/* Button */}
          <circle cx={x} cy="19" r="1.8" fill="rgba(0,0,0,0.08)" />
        </g>
      ))}
      
      {/* Back cushion highlight */}
      <rect x="14" y="7" width="112" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
      
      {/* Seat cushion */}
      <rect x="12" y="30" width="116" height="18" rx="5" fill={color} />
      <rect x="14" y="32" width="112" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
      
      {/* Seat tufting - 3 sections */}
      <line x1="52" y1="33" x2="52" y2="45" stroke="rgba(0,0,0,0.05)" strokeWidth="1.5" />
      <line x1="88" y1="33" x2="88" y2="45" stroke="rgba(0,0,0,0.05)" strokeWidth="1.5" />
      
      {/* Rounded arms */}
      <path d="M4 12 Q4 8, 12 8 L12 42 Q4 42, 4 36 Z" fill={color} />
      <path d="M136 8 Q144 8, 144 12 L144 36 Q144 42, 136 42 Z" fill={color} />
      
      {/* Arm highlights */}
      <path d="M6 14 Q6 10, 12 10 L12 14 Z" fill="rgba(255,255,255,0.35)" />
      <path d="M136 10 Q142 10, 142 14 L136 14 Z" fill="rgba(255,255,255,0.35)" />
      
      {/* Gold legs */}
      <ellipse cx="25" cy="52" rx="4" ry="2.5" fill="#D4AF37" />
      <rect x="23" y="50" width="4" height="6" fill="#D4AF37" />
      <ellipse cx="115" cy="52" rx="4" ry="2.5" fill="#D4AF37" />
      <rect x="113" y="50" width="4" height="6" fill="#D4AF37" />
      
      {/* Leg highlights */}
      <ellipse cx="24" cy="51" rx="1.5" ry="1" fill="#F4E4BA" opacity="0.6" />
      <ellipse cx="114" cy="51" rx="1.5" ry="1" fill="#F4E4BA" opacity="0.6" />
    </svg>
  );
}

function ElegantAccentChair({ side }) {
  const flip = side === 'right';
  
  return (
    <svg viewBox="0 0 55 65" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs>
        <linearGradient id="chairFabric" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEFEFE" />
          <stop offset="100%" stopColor="#F0EBE3" />
        </linearGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="27" cy="62" rx="20" ry="3" fill="rgba(0,0,0,0.12)" />
      
      {/* Chair back - curved */}
      <path d="M8 8 Q27 3, 46 8 L44 35 Q27 38, 10 35 Z" fill="url(#chairFabric)" />
      
      {/* Back tufting */}
      <circle cx="20" cy="18" r="1.5" fill="rgba(0,0,0,0.06)" />
      <circle cx="34" cy="18" r="1.5" fill="rgba(0,0,0,0.06)" />
      <circle cx="27" cy="26" r="1.5" fill="rgba(0,0,0,0.06)" />
      
      {/* Seat */}
      <ellipse cx="27" cy="40" rx="22" ry="8" fill="#F5F0E6" />
      <ellipse cx="27" cy="38" rx="18" ry="5" fill="rgba(255,255,255,0.3)" />
      
      {/* Arm (one side visible) */}
      <path d="M3 15 Q0 15, 0 20 L0 42 Q0 45, 5 45 L8 35 L8 15 Z" fill="#F5F0E6" />
      
      {/* Gold legs */}
      <rect x="12" y="48" width="3" height="12" fill="#D4AF37" rx="1" />
      <rect x="38" y="48" width="3" height="12" fill="#D4AF37" rx="1" />
      <ellipse cx="13.5" cy="60" rx="2" ry="1" fill="#B8962E" />
      <ellipse cx="39.5" cy="60" rx="2" ry="1" fill="#B8962E" />
    </svg>
  );
}

function FloorCushions() {
  const cushions = [
    { x: 8, y: 12, w: 22, h: 14, color: '#D4AF37', rotate: -5 },
    { x: 28, y: 8, w: 20, h: 13, color: '#F5F0E6', rotate: 3 },
    { x: 50, y: 10, w: 22, h: 14, color: '#D4AF37', rotate: -2 },
    { x: 72, y: 6, w: 20, h: 12, color: '#E8D5D5', rotate: 5 },
    { x: 94, y: 10, w: 22, h: 14, color: '#D4AF37', rotate: -3 },
    { x: 116, y: 8, w: 18, h: 12, color: '#F5F0E6', rotate: 2 },
  ];
  
  return (
    <svg viewBox="0 0 140 28" className="w-full h-full">
      {cushions.map((c, i) => (
        <g key={i} transform={`rotate(${c.rotate}, ${c.x + c.w/2}, ${c.y + c.h/2})`}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={5} fill={c.color} opacity="0.9" />
          <rect x={c.x + 2} y={c.y + 2} width={c.w - 4} height={4} rx={2} fill="rgba(255,255,255,0.3)" />
        </g>
      ))}
    </svg>
  );
}

// ============================================
// FLORALS - Lush and abundant!
// ============================================

function LushArchFlorals() {
  return (
    <svg viewBox="0 0 180 80" className="w-full h-full">
      <defs>
        <filter id="floralDepth">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      {/* Dense greenery base layer */}
      <ellipse cx="90" cy="55" rx="80" ry="22" fill="#4A6F3B" opacity="0.6" />
      <ellipse cx="90" cy="50" rx="70" ry="18" fill="#5A7F4B" opacity="0.7" />
      
      {/* Cascading greenery on sides */}
      {[-75, -60, -45, 45, 60, 75].map((offset, i) => (
        <ellipse 
          key={i}
          cx={90 + offset} 
          cy={50 + Math.abs(offset) * 0.3} 
          rx={15} 
          ry={25 + Math.abs(offset) * 0.2} 
          fill="#6B8E5E" 
          opacity="0.6"
        />
      ))}
      
      {/* Large white roses - main focal points */}
      <g filter="url(#floralDepth)">
        {[[90, 25], [70, 30], [110, 30], [50, 38], [130, 38], [90, 40]].map(([x, y], i) => (
          <g key={`large-${i}`}>
            <circle cx={x} cy={y} r={12} fill="#FEFEFE" />
            <circle cx={x} cy={y} r={9} fill="#FAF8F5" />
            <circle cx={x} cy={y} r={6} fill="#F5F0EA" />
            <circle cx={x} cy={y} r={3} fill="#EDE5DB" />
          </g>
        ))}
      </g>
      
      {/* Medium white roses */}
      {[[60, 22], [120, 22], [40, 45], [140, 45], [75, 50], [105, 50]].map(([x, y], i) => (
        <g key={`med-${i}`}>
          <circle cx={x} cy={y} r={8} fill="#FEFEFE" />
          <circle cx={x} cy={y} r={5.5} fill="#F8F5F0" />
          <circle cx={x} cy={y} r={3} fill="#F0EBE3" />
        </g>
      ))}
      
      {/* Blush/pink accent roses */}
      {[[80, 35], [100, 35], [55, 28], [125, 28], [35, 50], [145, 50], [65, 55], [115, 55]].map(([x, y], i) => (
        <g key={`blush-${i}`}>
          <circle cx={x} cy={y} r={6} fill="#F5E0DD" />
          <circle cx={x} cy={y} r={4} fill="#F0D5D0" />
          <circle cx={x} cy={y} r={2} fill="#E8C5C0" />
        </g>
      ))}
      
      {/* Small filler flowers */}
      {[[45, 35], [135, 35], [30, 55], [150, 55], [85, 55], [95, 55], [70, 60], [110, 60]].map(([x, y], i) => (
        <circle key={`small-${i}`} cx={x} cy={y} r={4} fill="#FFF8F5" opacity="0.9" />
      ))}
      
      {/* Baby's breath accent dots */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = 25 + (i % 10) * 14 + Math.sin(i) * 5;
        const y = 30 + Math.floor(i / 10) * 15 + Math.cos(i) * 5;
        return <circle key={`breath-${i}`} cx={x} cy={y} r={1.5} fill="#FFFFFF" opacity="0.7" />;
      })}
    </svg>
  );
}

function SofaFloralWrap({ side }) {
  const flip = side === 'right';
  
  return (
    <svg viewBox="0 0 70 65" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs>
        <filter id="wrapShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      {/* Dense greenery base */}
      <ellipse cx="35" cy="40" rx="32" ry="22" fill="#4A6F3B" opacity="0.6" />
      <ellipse cx="30" cy="35" rx="28" ry="18" fill="#5A7F4B" opacity="0.7" />
      <ellipse cx="25" cy="45" rx="22" ry="16" fill="#6B8E5E" opacity="0.6" />
      
      {/* Cascading effect */}
      <ellipse cx="15" cy="50" rx={15} ry={12} fill="#6B8E5E" opacity="0.5" />
      <ellipse cx="55" cy="55" rx={12} ry={10} fill="#5A7F4B" opacity="0.5" />
      
      {/* Large roses */}
      <g filter="url(#wrapShadow)">
        {[[30, 25], [45, 35], [20, 40], [35, 50]].map(([x, y], i) => (
          <g key={`big-${i}`}>
            <circle cx={x} cy={y} r={10} fill="#FEFEFE" />
            <circle cx={x} cy={y} r={7} fill="#FAF8F5" />
            <circle cx={x} cy={y} r={4} fill="#F5F0EA" />
            <circle cx={x} cy={y} r={2} fill="#EDE5DB" />
          </g>
        ))}
      </g>
      
      {/* Medium roses */}
      {[[50, 22], [15, 30], [55, 48], [25, 55]].map(([x, y], i) => (
        <g key={`med-${i}`}>
          <circle cx={x} cy={y} r={7} fill="#FEFEFE" />
          <circle cx={x} cy={y} r={5} fill="#F8F5F0" />
          <circle cx={x} cy={y} r={2.5} fill="#F0EBE3" />
        </g>
      ))}
      
      {/* Blush accents */}
      {[[40, 28], [25, 45], [48, 42], [10, 50]].map(([x, y], i) => (
        <g key={`blush-${i}`}>
          <circle cx={x} cy={y} r={5} fill="#F5E0DD" />
          <circle cx={x} cy={y} r={3} fill="#F0D5D0" />
        </g>
      ))}
      
      {/* Filler flowers and baby's breath */}
      {[[55, 30], [12, 38], [38, 58], [60, 52]].map(([x, y], i) => (
        <circle key={`fill-${i}`} cx={x} cy={y} r={3.5} fill="#FFF8F5" opacity="0.9" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={`dot-${i}`} cx={10 + i * 5} cy={35 + Math.sin(i) * 15} r={1.2} fill="#FFFFFF" opacity="0.6" />
      ))}
    </svg>
  );
}

function AisleFloralBox({ index }) {
  return (
    <svg viewBox="0 0 45 50" className="w-full h-full">
      {/* Acrylic/glass box */}
      <rect x="5" y="22" width="35" height="26" fill="rgba(255,255,255,0.2)" stroke="#D4AF37" strokeWidth="0.8" rx="2" />
      <rect x="7" y="24" width="31" height="2" fill="rgba(255,255,255,0.3)" />
      
      {/* Greenery */}
      <ellipse cx="22" cy="28" rx="16" ry="10" fill="#6B8E5E" opacity="0.6" />
      
      {/* Roses overflowing */}
      <g>
        <circle cx="22" cy="12" r={8} fill="#FEFEFE" />
        <circle cx="22" cy="12} r={5.5" fill="#FAF8F5" />
        <circle cx="22" cy="12" r={3} fill="#F0EBE3" />
        
        <circle cx="12" cy="18" r={6} fill="#FEFEFE" />
        <circle cx="12" cy="18" r={4} fill="#F8F5F0" />
        
        <circle cx="32" cy="16" r={6} fill="#FEFEFE" />
        <circle cx="32" cy="16" r={4} fill="#F8F5F0" />
        
        <circle cx="18" cy="22" r={5} fill="#F5E0DD" />
        <circle cx="28" cy="20" r={4} fill="#F5E0DD" />
      </g>
      
      {/* Baby's breath */}
      {[[8, 15], [36, 12], [15, 8], [30, 8], [6, 22], [38, 20]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.5} fill="#FFFFFF" opacity="0.8" />
      ))}
    </svg>
  );
}

function TallCenterpiece({ side }) {
  return (
    <svg viewBox="0 0 50 80" className="w-full h-full">
      {/* Tall gold vase */}
      <path d="M20 78 L18 45 Q17 40, 25 38 Q33 40, 32 45 L30 78 Z" fill="#D4AF37" />
      <ellipse cx="25" cy="38" rx="8" ry="3.5" fill="#B8962E" />
      <ellipse cx="25" cy="78" rx="6" ry="2" fill="#A08030" />
      {/* Vase highlight */}
      <path d="M21 50 L20 70" stroke="#F4E4BA" strokeWidth="2" opacity="0.4" />
      
      {/* Abundant florals on top */}
      <ellipse cx="25" cy="28" rx="20" ry="12" fill="#5A7F4B" opacity="0.6" />
      
      {/* Large roses */}
      <g>
        <circle cx="25" cy="15" r={9} fill="#FEFEFE" />
        <circle cx="25" cy="15" r={6} fill="#FAF8F5" />
        <circle cx="25" cy="15" r={3} fill="#F0EBE3" />
        
        <circle cx="15" cy="22" r={7} fill="#FEFEFE" />
        <circle cx="15" cy="22" r={4.5} fill="#F8F5F0" />
        
        <circle cx="35" cy="20" r={7} fill="#FEFEFE" />
        <circle cx="35" cy="20" r={4.5} fill="#F8F5F0" />
        
        <circle cx="10" cy="30" r={5} fill="#F5E0DD" />
        <circle cx="40" cy="28" r={5} fill="#F5E0DD" />
        
        <circle cx="25" cy="30" r={5} fill="#FEFEFE" />
      </g>
      
      {/* Cascading greenery */}
      <ellipse cx="8" cy="32" rx={6} ry={12} fill="#6B8E5E" opacity="0.5" />
      <ellipse cx="42" cy="30" rx={6} ry={12} fill="#6B8E5E" opacity="0.5" />
    </svg>
  );
}

// ============================================
// LIGHTING COMPONENTS
// ============================================

function PillarCandles({ side }) {
  return (
    <svg viewBox="0 0 40 80" className="w-full h-full">
      <defs>
        <filter id="candleGlow2">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="flameGrad2">
          <stop offset="0%" stopColor="#FFFEF5" />
          <stop offset="30%" stopColor="#FFE4B5" />
          <stop offset="70%" stopColor="#FFA500" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF6600" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="candleWax" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="50%" stopColor="#FFFEF5" />
          <stop offset="100%" stopColor="#FFF5D6" />
        </linearGradient>
      </defs>
      
      {/* Gold stand/base */}
      <rect x="5" y="68" width="30" height="10" rx="3" fill="#D4AF37" />
      <rect x="8" y="65" width="24" height="5" rx="2" fill="#B8962E" />
      <ellipse cx="20" cy="68" rx="10" ry="2" fill="#F4E4BA" opacity="0.5" />
      
      {/* Candles at different heights */}
      {[[12, 35], [20, 25], [28, 32]].map(([x, h], i) => (
        <g key={i}>
          {/* Candle body */}
          <rect x={x - 4} y={65 - h} width="8" height={h} rx="1" fill="url(#candleWax)" />
          <ellipse cx={x} cy={65 - h} rx="4" ry="2" fill="#FFFEF8" />
          
          {/* Wick */}
          <line x1={x} y1={65 - h - 2} x2={x} y2={65 - h - 6} stroke="#333" strokeWidth="0.8" />
          
          {/* Flame with glow */}
          <ellipse cx={x} cy={60 - h} rx="3.5" ry="7" fill="url(#flameGrad2)" filter="url(#candleGlow2)" />
          <ellipse cx={x} cy={59 - h} rx="1.5" ry="4" fill="#FFFEF8" />
        </g>
      ))}
    </svg>
  );
}

function CandleCluster({ side }) {
  const candles = [
    { x: 10, h: 20 }, { x: 18, h: 28 }, { x: 26, h: 22 },
    { x: 34, h: 30 }, { x: 42, h: 18 },
  ];
  
  return (
    <svg viewBox="0 0 52 55" className="w-full h-full">
      <defs>
        <filter id="clusterGlow2">
          <feGaussianBlur stdDeviation="2"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Base/tray */}
      <ellipse cx="26" cy="52" rx="24" ry="4" fill="#D4AF37" opacity="0.8" />
      
      {candles.map((c, i) => (
        <g key={i}>
          <rect x={c.x - 3} y={50 - c.h} width="6" height={c.h} rx="1" fill="#FFF9E6" />
          <ellipse cx={c.x} cy={50 - c.h} rx="3" ry="1.5" fill="#FFFEF8" />
          <ellipse cx={c.x} cy={46 - c.h} rx="2.5" ry="5" fill="#FFD700" filter="url(#clusterGlow2)" opacity="0.9" />
          <ellipse cx={c.x} cy={45 - c.h} rx="1" ry="2.5" fill="#FFFEF8" />
        </g>
      ))}
    </svg>
  );
}

function Uplighting({ side }) {
  return (
    <svg viewBox="0 0 35 110" className="w-full h-full">
      <defs>
        <linearGradient id="uplightBeam2" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#FFE4B5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFEF5" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Light beam */}
      <path d="M17.5 105 L2 15 L33 15 Z" fill="url(#uplightBeam2)" />
      
      {/* Fixture */}
      <rect x="7" y="98" width="21" height="10" rx="3" fill="#2a2a2a" />
      <rect x="10" y="100" width="15" height="5" rx="2" fill="#D4AF37" opacity="0.9" />
    </svg>
  );
}

function StringLights() {
  const rows = [
    { y: 6, amplitude: 4 },
    { y: 14, amplitude: 5 },
    { y: 22, amplitude: 4 },
  ];
  
  return (
    <svg viewBox="0 0 200 30" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <filter id="stringGlow2">
          <feGaussianBlur stdDeviation="1.2"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {rows.map((row, rowIdx) => {
        const points = [];
        for (let x = 0; x <= 200; x += 10) {
          const y = row.y + Math.sin(x * 0.05 + rowIdx) * row.amplitude;
          points.push(`${x},${y}`);
        }
        
        return (
          <g key={rowIdx}>
            {/* Wire */}
            <polyline
              points={points.join(' ')}
              stroke="#8B7355"
              strokeWidth="0.4"
              fill="none"
              opacity="0.5"
            />
            
            {/* Lights */}
            {Array.from({ length: 18 }).map((_, i) => {
              const x = 6 + i * 11;
              const y = row.y + Math.sin(x * 0.05 + rowIdx) * row.amplitude;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={3} fill="#FFF9E6" filter="url(#stringGlow2)" opacity="0.9" />
                  <circle cx={x} cy={y} r={1.2} fill="#FFFEF8" />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// ============================================
// ACCENT COMPONENTS
// ============================================

function DecorativeGoldPanel({ side }) {
  return (
    <svg viewBox="0 0 40 110" className="w-full h-full">
      <defs>
        <linearGradient id="panelGold2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <pattern id="latticePattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6 L6 0 M6 12 L12 6" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.5" />
        </pattern>
      </defs>
      
      {/* Outer frame */}
      <rect x="3" y="3" width="34" height="104" rx="2" fill="none" stroke="url(#panelGold2)" strokeWidth="3" />
      
      {/* Inner decorative panel */}
      <rect x="7" y="7" width="26" height="96" rx="1" fill="url(#latticePattern)" opacity="0.3" />
      
      {/* Lattice/geometric pattern */}
      <rect x="7" y="7" width="26" height="96" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
      
      {/* Decorative elements */}
      <circle cx="20" cy="30" r="8" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      <circle cx="20" cy="55" r="6" fill="#D4AF37" opacity="0.2" />
      <circle cx="20" cy="80" r="8" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      
      {/* Corner accents */}
      <circle cx="10" cy="10" r="2" fill="#D4AF37" opacity="0.6" />
      <circle cx="30" cy="10" r="2" fill="#D4AF37" opacity="0.6" />
      <circle cx="10" cy="100" r="2" fill="#D4AF37" opacity="0.6" />
      <circle cx="30" cy="100" r="2" fill="#D4AF37" opacity="0.6" />
    </svg>
  );
}

function OrnateArchedMirror() {
  return (
    <svg viewBox="0 0 70 95" className="w-full h-full">
      <defs>
        <linearGradient id="mirrorFrame2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A08050" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#8B7355" />
        </linearGradient>
        <linearGradient id="mirrorGlass2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8F8F8" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#E8E8E8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D8D8D8" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      
      {/* Arched frame - ornate style like in reference */}
      <path
        d="M8 92 L8 35 Q8 8, 35 8 Q62 8, 62 35 L62 92 Z"
        stroke="url(#mirrorFrame2)"
        strokeWidth="5"
        fill="none"
      />
      
      {/* Inner frame line */}
      <path
        d="M13 90 L13 37 Q13 13, 35 13 Q57 13, 57 37 L57 90 Z"
        stroke="#D4AF37"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      
      {/* Mirror glass */}
      <path
        d="M15 88 L15 38 Q15 16, 35 16 Q55 16, 55 38 L55 88 Z"
        fill="url(#mirrorGlass2)"
      />
      
      {/* Reflection highlight */}
      <ellipse cx="28" cy="45" rx="10" ry="18" fill="white" opacity="0.2" />
      
      {/* Decorative mullions (like the reference window) */}
      <line x1="35" y1="16" x2="35" y2="88" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
      <path d="M15 55 Q35 50, 55 55" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.3" />
      
      {/* Top arch detail */}
      <circle cx="35" cy="20" r="3" fill="#D4AF37" opacity="0.5" />
    </svg>
  );
}

function MoroccanLantern({ side }) {
  return (
    <svg viewBox="0 0 40 70" className="w-full h-full">
      <defs>
        <filter id="lanternGlow2">
          <feGaussianBlur stdDeviation="2.5"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="lanternGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
      </defs>
      
      {/* Hanging chain */}
      <line x1="20" y1="0" x2="20" y2="8" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="20" cy="4" r="2" fill="#D4AF37" />
      
      {/* Lantern top */}
      <path d="M12 10 L20 5 L28 10 Z" fill="url(#lanternGold)" />
      
      {/* Lantern body */}
      <path 
        d="M10 12 L10 50 Q10 58, 20 58 Q30 58, 30 50 L30 12 Q30 8, 20 8 Q10 8, 10 12 Z" 
        fill="none" 
        stroke="url(#lanternGold)" 
        strokeWidth="2"
      />
      
      {/* Glass panels with pattern */}
      <rect x="12" y="14" width="16" height="40" fill="#D4AF37" opacity="0.1" />
      
      {/* Decorative pattern */}
      <path d="M20 14 L20 54" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
      <path d="M12 25 L28 25" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
      <path d="M12 35 L28 35" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
      <path d="M12 45 L28 45" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
      
      {/* Inner glow */}
      <ellipse cx="20" cy="35" rx="6" ry="12" fill="#FFF9E6" opacity="0.6" filter="url(#lanternGlow2)" />
      <ellipse cx="20" cy="35" rx="3" ry="6" fill="#FFFEF8" opacity="0.8" />
      
      {/* Bottom detail */}
      <ellipse cx="20" cy="58" rx="5" ry="2" fill="#D4AF37" />
      <circle cx="20" cy="62" r="2" fill="#D4AF37" />
    </svg>
  );
}

function AisleRunner() {
  return (
    <svg viewBox="0 0 65 110" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="runnerGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEFEFE" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FAF8F5" />
          <stop offset="100%" stopColor="#F5F0E6" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      
      {/* Runner fabric with slight perspective */}
      <path d="M10 0 L55 0 L60 110 L5 110 Z" fill="url(#runnerGrad2)" />
      
      {/* Gold trim border */}
      <path d="M12 3 L53 3 L57 107 L8 107 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
      
      {/* Inner decorative line */}
      <path d="M16 8 L49 8 L53 102 L12 102 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
      
      {/* Subtle pattern */}
      <line x1="32.5" y1="15" x2="32.5" y2="95" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

// ============================================
// STAGE BASE COMPONENTS
// ============================================

function WhiteStagePlatform() {
  return (
    <svg viewBox="0 0 200 55" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="platformTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F5F5" />
        </linearGradient>
        <linearGradient id="platformFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0F0F0" />
          <stop offset="100%" stopColor="#E5E5E5" />
        </linearGradient>
      </defs>
      
      {/* Platform top surface */}
      <rect x="0" y="5" width="200" height="35" fill="url(#platformTop)" />
      
      {/* Top edge highlight */}
      <rect x="0" y="5" width="200" height="8" fill="rgba(255,255,255,0.6)" />
      
      {/* Front face */}
      <rect x="0" y="38" width="200" height="15" fill="url(#platformFront)" />
      
      {/* Edge detail */}
      <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
      
      {/* Subtle floor reflection */}
      <rect x="5" y="10" width="190" height="25" fill="rgba(212,175,55,0.02)" />
    </svg>
  );
}

function PersianCarpet() {
  return (
    <svg viewBox="0 0 160 75" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="carpetGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4A030" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B89828" />
        </linearGradient>
        <pattern id="carpetPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none" />
          <circle cx="10" cy="10" r="3" fill="#8B7355" opacity="0.3" />
        </pattern>
      </defs>
      
      {/* Carpet base */}
      <rect x="5" y="5" width="150" height="65" rx="2" fill="url(#carpetGrad2)" />
      
      {/* Pattern overlay */}
      <rect x="5" y="5" width="150" height="65" fill="url(#carpetPattern)" />
      
      {/* Decorative border */}
      <rect x="10" y="10" width="140" height="55" fill="none" stroke="#F4E4BA" strokeWidth="3" />
      <rect x="18" y="18" width="124" height="39" fill="none" stroke="#8B7355" strokeWidth="1.5" opacity="0.5" />
      
      {/* Center medallion */}
      <ellipse cx="80" cy="37.5" rx="30" ry="15" fill="none" stroke="#F4E4BA" strokeWidth="2" opacity="0.6" />
      <ellipse cx="80" cy="37.5" rx="18" ry="9" fill="#8B7355" opacity="0.25" />
      <ellipse cx="80" cy="37.5" rx="8" ry="4" fill="#F4E4BA" opacity="0.4" />
    </svg>
  );
}

function StageSteps() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="stepGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F0F0" />
        </linearGradient>
      </defs>
      
      {/* Bottom step */}
      <rect x="5" y="25" width="90" height="13" rx="2" fill="url(#stepGrad2)" />
      <rect x="5" y="25" width="90" height="4" fill="rgba(255,255,255,0.5)" rx="2" />
      
      {/* Top step */}
      <rect x="15" y="10" width="70" height="17" rx="2" fill="url(#stepGrad2)" />
      <rect x="15" y="10" width="70" height="5" fill="rgba(255,255,255,0.6)" rx="2" />
      
      {/* Edge shadows */}
      <line x1="5" y1="38" x2="95" y2="38" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
      <line x1="15" y1="27" x2="85" y2="27" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
    </svg>
  );
}

// ============================================
// DEFAULT FALLBACK
// ============================================

function DefaultItem({ color = '#D4AF37' }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="15" y="15" width="70" height="70" rx="8" fill={color} opacity="0.3" />
      <rect x="25" y="25" width="50" height="50" rx="4" fill={color} opacity="0.5" />
    </svg>
  );
}
