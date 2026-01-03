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

// ============================================
// REALISTIC ROSE COMPONENT - Reusable
// ============================================
function RealisticRose({ x, y, size = 1, color = '#FEFEFE', opacity = 1 }) {
  const scale = size;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={opacity}>
      {/* Outer petals - layered */}
      <path
        d="M0,0 Q-3,-2 -4,2 Q-3,4 0,3 Q3,4 4,2 Q3,-2 0,0"
        fill={color}
        opacity="0.95"
      />
      <path
        d="M0,0 Q-2.5,-1.5 -3.5,1.5 Q-2.5,3.5 0,2.5 Q2.5,3.5 3.5,1.5 Q2.5,-1.5 0,0"
        fill={color === '#FEFEFE' ? '#FAF8F5' : color}
        opacity="0.9"
      />
      {/* Center petals */}
      <ellipse cx="0" cy="0.5" rx="1.5" ry="2" fill={color === '#FEFEFE' ? '#F5F0EA' : color} opacity="0.85" />
      <ellipse cx="-0.8" cy="0.3" rx="1" ry="1.5" fill={color === '#FEFEFE' ? '#F0EBE3' : color} opacity="0.8" />
      <ellipse cx="0.8" cy="0.3" rx="1" ry="1.5" fill={color === '#FEFEFE' ? '#F0EBE3' : color} opacity="0.8" />
      {/* Center */}
      <circle cx="0" cy="0.5" r="0.6" fill={color === '#FEFEFE' ? '#EDE5DB' : '#D4A5A5'} />
    </g>
  );
}

function RealisticBlushRose({ x, y, size = 1, opacity = 1 }) {
  const scale = size;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={opacity}>
      <path
        d="M0,0 Q-3,-2 -4,2 Q-3,4 0,3 Q3,4 4,2 Q3,-2 0,0"
        fill="#F5E0DD"
        opacity="0.95"
      />
      <path
        d="M0,0 Q-2.5,-1.5 -3.5,1.5 Q-2.5,3.5 0,2.5 Q2.5,3.5 3.5,1.5 Q2.5,-1.5 0,0"
        fill="#F0D5D0"
        opacity="0.9"
      />
      <ellipse cx="0" cy="0.5" rx="1.5" ry="2" fill="#E8C5C0" opacity="0.85" />
      <circle cx="0" cy="0.5" r="0.6" fill="#D4A5A5" />
    </g>
  );
}

function RealisticLeaf({ x, y, angle = 0, size = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle}) scale(${size})`}>
      <path
        d="M0,0 Q-1.5,2 -1,4 Q0,5 1,4 Q1.5,2 0,0"
        fill="#4A6F3B"
        opacity="0.4"
      />
      <path
        d="M0,0 Q-1,1.5 -0.7,3 Q0,3.5 0.7,3 Q1,1.5 0,0"
        fill="#5A7F4B"
        opacity="0.3"
      />
    </g>
  );
}

// Enhanced SVG components for stage visualization
function StageSVG({ itemId, color, instanceIndex, totalInstances }) {
  // BACKDROPS
  if (itemId === 'backdrop-white-draping') return <WhiteDrapingBackdrop />;
  if (itemId === 'backdrop-fairy-lights') return <FairyLightBackdrop />;
  if (itemId === 'backdrop-sequin-gold') return <SequinBackdrop color="#D4AF37" />;
  if (itemId === 'backdrop-black-draping') return <WhiteDrapingBackdrop color="#1a1a1a" />;
  
  // ARCHES - Realistic with proper florals
  if (itemId === 'arch-circular-single') return <FloralArch />;
  if (itemId === 'arch-triple-set') return <TripleFloralArch />;
  if (itemId === 'arch-hexagon') return <HexagonArch />;
  if (itemId === 'arch-rectangle') return <RectangleArch />;
  
  // SEATING
  if (itemId === 'sofa-cream-tufted') return <LuxuryTuftedSofa color="#F5F0E6" />;
  if (itemId === 'sofa-velvet-blush') return <LuxuryTuftedSofa color="#E8D5D5" />;
  if (itemId === 'chairs-accent-pair') return <ElegantAccentChair side={instanceIndex === 0 ? 'left' : 'right'} />;
  if (itemId === 'cushions-floor-set') return <FloorCushions />;
  
  // FLORALS - Realistic arrangements
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
// BACKDROP COMPONENTS
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
      
      <rect x="0" y="0" width="200" height="100" fill="url(#drapeGradLight)" />
      
      {/* Gathered swag at top */}
      <path
        d="M0 0 Q25 8, 50 3 Q75 10, 100 3 Q125 10, 150 3 Q175 8, 200 0 L200 18 Q175 22, 150 15 Q125 22, 100 15 Q75 22, 50 15 Q25 22, 0 18 Z"
        fill={isLight ? '#FFFFFF' : '#333'}
        opacity="0.9"
      />
      
      {/* Drape folds */}
      {[12, 28, 44, 60, 76, 92, 108, 124, 140, 156, 172, 188].map((x, i) => (
        <g key={i}>
          <path
            d={`M${x} 18 Q${x + 3} 50, ${x + 1} 100`}
            stroke={isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.03)'}
            strokeWidth="10"
            fill="none"
          />
          <path
            d={`M${x - 4} 18 Q${x - 2} 50, ${x - 4} 100`}
            stroke={isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.05)'}
            strokeWidth="3"
            fill="none"
          />
        </g>
      ))}
      
      <ellipse cx="100" cy="98" rx="95" ry="4" fill={isLight ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.2)'} />
    </svg>
  );
}

function FairyLightBackdrop() {
  const lights = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 20; col++) {
      const baseX = col * 10 + 5;
      const baseY = row * 8 + 4;
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
      
      <rect x="0" y="0" width="200" height="100" fill="url(#curtainBase)" />
      <rect x="0" y="0" width="200" height="100" fill="#F5F0E6" opacity="0.08" />
      
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
      
      {lights.map((light, i) => (
        <g key={i}>
          <circle 
            cx={light.x} 
            cy={light.y} 
            r={2.5 * light.brightness} 
            fill="url(#warmLight)" 
            opacity={light.brightness * 0.6}
          />
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
// ARCH COMPONENTS - Realistic with proper roses
// ============================================

function FloralArch() {
  return (
    <svg viewBox="0 0 100 130" className="w-full h-full">
      <defs>
        <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <filter id="archGlow">
          <feGaussianBlur stdDeviation="1" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="archShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* Elegant gold arch frame with depth */}
      <path
        d="M15 128 L15 55 Q15 12, 50 12 Q85 12, 85 55 L85 128"
        stroke="url(#archGold)"
        strokeWidth="3"
        fill="none"
        opacity="0.95"
        filter="url(#archGlow)"
      />
      
      {/* Inner highlight for dimension */}
      <path
        d="M17 126 L17 56 Q17 14, 50 14 Q83 14, 83 56 L83 126"
        stroke="#F4E4BA"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      
      {/* Realistic roses - top center */}
      <RealisticRose x={50} y={18} size={5} />
      <RealisticRose x={46} y={16} size={4} />
      <RealisticRose x={54} y={16} size={4} />
      
      {/* Cascading roses down the sides */}
      {[[22, 35], [78, 35], [18, 55], [82, 55], [20, 75], [80, 75], [22, 95], [78, 95]].map(([x, y], i) => (
        <g key={`rose-${i}`}>
          <RealisticRose x={x} y={y} size={4} />
          <RealisticRose x={x + 2} y={y - 1} size={3.5} opacity={0.85} />
          <RealisticRose x={x - 2} y={y - 1} size={3.5} opacity={0.85} />
        </g>
      ))}
      
      {/* Blush roses for variety */}
      {[[25, 30], [75, 30], [30, 50], [70, 50]].map(([x, y], i) => (
        <RealisticBlushRose key={`blush-${i}`} x={x} y={y} size={3.5} />
      ))}
      
      {/* Elegant leaves */}
      {[[16, 50], [84, 50], [17, 70], [83, 70], [19, 90], [81, 90]].map(([x, y], i) => (
        <RealisticLeaf key={`leaf-${i}`} x={x} y={y} angle={i * 30} size={1.2} />
      ))}
      
      {/* Baby's breath */}
      {[[25, 25], [75, 25], [30, 45], [70, 45], [25, 65], [75, 65], [28, 85], [72, 85]].map(([x, y], i) => (
        <circle key={`breath-${i}`} cx={x} cy={y} r={1.2} fill="#FFFFFF" opacity="0.6" />
      ))}
    </svg>
  );
}

function TripleFloralArch() {
  return (
    <svg viewBox="0 0 160 110" className="w-full h-full">
      <defs>
        <linearGradient id="archGoldTriple" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <filter id="tripleGlow">
          <feGaussianBlur stdDeviation="0.8" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Three elegant gold arch frames with depth */}
      <path d="M10 108 L10 45 Q10 8, 80 8 Q150 8, 150 45 L150 108" stroke="url(#archGoldTriple)" strokeWidth="2.5" fill="none" opacity="0.8" filter="url(#tripleGlow)" />
      <path d="M25 108 L25 48 Q25 15, 80 15 Q135 15, 135 48 L135 108" stroke="url(#archGoldTriple)" strokeWidth="3" fill="none" opacity="0.85" filter="url(#tripleGlow)" />
      <path d="M40 108 L40 50 Q40 22, 80 22 Q120 22, 120 50 L120 108" stroke="url(#archGoldTriple)" strokeWidth="3.5" fill="none" opacity="0.9" filter="url(#tripleGlow)" />
      
      {/* Realistic rose clusters - top center */}
      <RealisticRose x={80} y={12} size={6} />
      <RealisticRose x={76} y={10} size={5} />
      <RealisticRose x={84} y={10} size={5} />
      
      {/* Outer arch roses */}
      {[[15, 30], [145, 30], [12, 50], [148, 50], [15, 70], [145, 70], [18, 90], [142, 90]].map(([x, y], i) => (
        <g key={`outer-${i}`}>
          <RealisticRose x={x} y={y} size={4.5} />
          <RealisticRose x={x + 2} y={y - 1} size={4} opacity={0.85} />
        </g>
      ))}
      
      {/* Middle arch roses */}
      {[[30, 35], [130, 35], [28, 55], [132, 55], [30, 75], [130, 75]].map(([x, y], i) => (
        <RealisticRose key={`mid-${i}`} x={x} y={y} size={4} />
      ))}
      
      {/* Inner arch roses */}
      {[[45, 40], [115, 40], [42, 60], [118, 60], [45, 80], [115, 80]].map(([x, y], i) => (
        <RealisticRose key={`inner-${i}`} x={x} y={y} size={3.5} />
      ))}
      
      {/* Blush roses */}
      {[[20, 45], [140, 45], [55, 25], [105, 25], [35, 65], [125, 65], [40, 85], [120, 85]].map(([x, y], i) => (
        <RealisticBlushRose key={`blush-${i}`} x={x} y={y} size={3} />
      ))}
      
      {/* Elegant leaves */}
      {[[18, 55], [142, 55], [32, 70], [128, 70], [38, 88], [122, 88]].map(([x, y], i) => (
        <RealisticLeaf key={`leaf-${i}`} x={x} y={y} angle={i * 25} size={1} />
      ))}
      
      {/* Baby's breath */}
      {[[25, 20], [135, 20], [22, 40], [138, 40], [28, 60], [132, 60], [30, 80], [130, 80]].map(([x, y], i) => (
        <circle key={`breath-${i}`} cx={x} cy={y} r={1} fill="#FFFFFF" opacity="0.5" />
      ))}
    </svg>
  );
}

function HexagonArch() {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      <defs>
        <linearGradient id="hexGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <filter id="hexGlow">
          <feGaussianBlur stdDeviation="0.8" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Hexagon frame */}
      <polygon
        points="50,8 88,28 88,78 50,98 12,78 12,28"
        stroke="url(#hexGold)"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
        filter="url(#hexGlow)"
        opacity="0.9"
      />
      
      {/* Realistic roses at corners */}
      {[[12, 28], [12, 53], [12, 78], [50, 8], [88, 28], [88, 53], [88, 78], [50, 98]].map(([x, y], i) => (
        <g key={i}>
          <RealisticRose x={x} y={y} size={3.5} />
          {i % 2 === 0 && (
            <RealisticRose x={x + (x < 50 ? 2 : -2)} y={y} size={3} opacity={0.85} />
          )}
        </g>
      ))}
      
      {/* Top center */}
      <RealisticRose x={50} y={8} size={4.5} />
      <RealisticRose x={48} y={6} size={3.5} />
      <RealisticRose x={52} y={6} size={3.5} />
      
      {/* Bottom center */}
      <RealisticBlushRose x={50} y={98} size={3.5} />
    </svg>
  );
}

function RectangleArch() {
  return (
    <svg viewBox="0 0 100 115" className="w-full h-full">
      <defs>
        <linearGradient id="rectGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8962E" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#F4E4BA" />
          <stop offset="100%" stopColor="#B8962E" />
        </linearGradient>
        <filter id="rectGlow">
          <feGaussianBlur stdDeviation="0.8" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Rectangle frame */}
      <rect x="10" y="8" width="80" height="100" stroke="url(#rectGold)" strokeWidth="3.5" fill="none" rx="2" filter="url(#rectGlow)" opacity="0.9" />
      
      {/* Realistic roses along frame */}
      {[0, 20, 40, 60, 80].map((y, i) => (
        <g key={i}>
          <RealisticRose x={12} y={15 + y} size={3.5} />
          <RealisticRose x={88} y={15 + y} size={3.5} />
        </g>
      ))}
      
      {/* Top florals */}
      {[25, 50, 75].map((x, i) => (
        <g key={i}>
          <RealisticRose x={x} y={10} size={4} />
          <RealisticRose x={x - 1.5} y={8} size={3} opacity={0.9} />
          <RealisticRose x={x + 1.5} y={8} size={3} opacity={0.9} />
        </g>
      ))}
    </svg>
  );
}

// ============================================
// SEATING - Enhanced luxury sofas
// ============================================

function LuxuryTuftedSofa({ color = '#F5F0E6' }) {
  const isDark = color === '#E8D5D5';
  
  return (
    <svg viewBox="0 0 148 60" className="w-full h-full">
      <defs>
        <linearGradient id="sofaCushion" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="50%" stopColor={isDark ? '#E0CDCD' : '#EDE8E0'} />
          <stop offset="100%" stopColor={isDark ? '#D8C5C5' : '#E5E0D8'} />
        </linearGradient>
        <filter id="sofaShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.25"/>
        </filter>
        <filter id="sofaDepth">
          <feGaussianBlur stdDeviation="0.5"/>
        </filter>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="74" cy="58" rx="62" ry="4" fill="rgba(0,0,0,0.2)" />
      
      {/* Back rest - with proper perspective */}
      <rect x="10" y="4" width="128" height="30" rx="7" fill="url(#sofaCushion)" filter="url(#sofaShadow)" />
      
      {/* Channel tufting - realistic depth */}
      {[26, 40, 54, 68, 82, 96, 110].map((x, i) => (
        <g key={`tuft-${i}`}>
          <line x1={x} y1="6" x2={x} y2="32" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
          <circle cx={x} cy="19" r="2.2" fill="rgba(0,0,0,0.1)" />
          {/* Highlight */}
          <line x1={x - 0.5} y1="6" x2={x - 0.5} y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
        </g>
      ))}
      
      {/* Top highlight */}
      <rect x="12" y="6" width="124" height="6" rx="3" fill="rgba(255,255,255,0.5)" />
      
      {/* Seat cushion */}
      <rect x="10" y="30" width="128" height="20" rx="6" fill={color} />
      <rect x="12" y="32" width="124" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
      
      {/* Seat tufting */}
      <line x1="54" y1="33" x2="54" y2="47" stroke="rgba(0,0,0,0.06)" strokeWidth="2" />
      <line x1="94" y1="33" x2="94" y2="47" stroke="rgba(0,0,0,0.06)" strokeWidth="2" />
      
      {/* Rounded arms - properly sized */}
      <path d="M2 14 Q2 8, 10 8 L10 46 Q2 46, 2 38 Z" fill={color} />
      <path d="M138 8 Q146 8, 146 14 L146 38 Q146 46, 138 46 Z" fill={color} />
      
      {/* Arm highlights */}
      <path d="M4 16 Q4 10, 10 10 L10 14 Z" fill="rgba(255,255,255,0.4)" />
      <path d="M138 10 Q144 10, 144 14 L138 14 Z" fill="rgba(255,255,255,0.4)" />
      
      {/* Gold legs - properly positioned */}
      <ellipse cx="27" cy="52" rx="4.5" ry="3" fill="#D4AF37" />
      <rect x="24.5" y="50" width="5" height="7" fill="#D4AF37" rx="1" />
      <ellipse cx="121" cy="52" rx="4.5" ry="3" fill="#D4AF37" />
      <rect x="118.5" y="50" width="5" height="7" fill="#D4AF37" rx="1" />
      
      {/* Leg highlights */}
      <ellipse cx="26" cy="51" rx="2" ry="1.2" fill="#F4E4BA" opacity="0.7" />
      <ellipse cx="120" cy="51" rx="2" ry="1.2" fill="#F4E4BA" opacity="0.7" />
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
      <ellipse cx="27" cy="62" rx="22" ry="3" fill="rgba(0,0,0,0.15)" />
      
      {/* Chair back - curved with depth */}
      <path d="M6 6 Q27 2, 48 6 L46 36 Q27 39, 8 36 Z" fill="url(#chairFabric)" />
      
      {/* Back tufting */}
      <circle cx="18" cy="16" r="1.8" fill="rgba(0,0,0,0.08)" />
      <circle cx="36" cy="16" r="1.8" fill="rgba(0,0,0,0.08)" />
      <circle cx="27" cy="24" r="1.8" fill="rgba(0,0,0,0.08)" />
      
      {/* Seat */}
      <ellipse cx="27" cy="42" rx="24" ry="9" fill="#F5F0E6" />
      <ellipse cx="27" cy="40" rx="20} ry="6" fill="rgba(255,255,255,0.4)" />
      
      {/* Arm */}
      <path d="M1 13 Q-1 13, -1 18 L-1 44 Q-1 47, 4 47 L6 36 L6 13 Z" fill="#F5F0E6" />
      
      {/* Gold legs */}
      <rect x="10" y="48" width="3.5" height="14" fill="#D4AF37" rx="1" />
      <rect x="40" y="48" width="3.5" height="14" fill="#D4AF37" rx="1" />
      <ellipse cx="11.75" cy="60" rx="2.5" ry="1.5" fill="#B8962E" />
      <ellipse cx="41.75" cy="60" rx="2.5" ry="1.5" fill="#B8962E" />
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
// FLORALS - Realistic arrangements
// ============================================

function LushArchFlorals() {
  return (
    <svg viewBox="0 0 180 80" className="w-full h-full">
      <defs>
        <filter id="floralDepth">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      {/* Realistic rose clusters - NO green blobs */}
      <g filter="url(#floralDepth)">
        {/* Large focal roses */}
        {[[90, 25], [70, 30], [110, 30], [50, 38], [130, 38], [90, 40]].map(([x, y], i) => (
          <g key={`large-${i}`}>
            <RealisticRose x={x} y={y} size={6} />
            <RealisticRose x={x - 3} y={y - 2} size={5} opacity={0.9} />
            <RealisticRose x={x + 3} y={y - 2} size={5} opacity={0.9} />
            <RealisticRose x={x - 2} y={y + 2} size={4.5} opacity={0.85} />
            <RealisticRose x={x + 2} y={y + 2} size={4.5} opacity={0.85} />
          </g>
        ))}
      </g>
      
      {/* Medium roses */}
      {[[60, 22], [120, 22], [40, 45], [140, 45], [75, 50], [105, 50]].map(([x, y], i) => (
        <g key={`med-${i}`}>
          <RealisticRose x={x} y={y} size={4.5} />
          <RealisticRose x={x + 2} y={y - 1} size={4} opacity={0.9} />
        </g>
      ))}
      
      {/* Blush roses */}
      {[[80, 35], [100, 35], [55, 28], [125, 28], [35, 50], [145, 50], [65, 55], [115, 55]].map(([x, y], i) => (
        <RealisticBlushRose key={`blush-${i}`} x={x} y={y} size={3.5} />
      ))}
      
      {/* Small filler roses */}
      {[[45, 35], [135, 35], [30, 55], [150, 55], [85, 55], [95, 55], [70, 60], [110, 60]].map(([x, y], i) => (
        <RealisticRose key={`small-${i}`} x={x} y={y} size={2.5} opacity={0.9} />
      ))}
      
      {/* Elegant leaves scattered */}
      {[[55, 40], [125, 40], [45, 50], [135, 50], [35, 58], [145, 58]].map(([x, y], i) => (
        <RealisticLeaf key={`leaf-${i}`} x={x} y={y} angle={i * 40} size={1.5} />
      ))}
      
      {/* Baby's breath */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = 25 + (i % 10) * 14 + Math.sin(i) * 5;
        const y = 30 + Math.floor(i / 10) * 15 + Math.cos(i) * 5;
        return <circle key={`breath-${i}`} cx={x} cy={y} r={1.2} fill="#FFFFFF" opacity="0.7" />;
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
      
      {/* Realistic rose clusters - NO green blobs */}
      <g filter="url(#wrapShadow)">
        {/* Large roses */}
        {[[30, 25], [45, 35], [20, 40], [35, 50]].map(([x, y], i) => (
          <g key={`big-${i}`}>
            <RealisticRose x={x} y={y} size={5} />
            <RealisticRose x={x - 2.5} y={y - 1.5} size={4} opacity={0.9} />
            <RealisticRose x={x + 2.5} y={y - 1.5} size={4} opacity={0.9} />
          </g>
        ))}
      </g>
      
      {/* Medium roses */}
      {[[50, 22], [15, 30], [55, 48], [25, 55]].map(([x, y], i) => (
        <RealisticRose key={`med-${i}`} x={x} y={y} size={3.5} />
      ))}
      
      {/* Blush roses */}
      {[[40, 28], [25, 45], [48, 42], [10, 50]].map(([x, y], i) => (
        <RealisticBlushRose key={`blush-${i}`} x={x} y={y} size={3} />
      ))}
      
      {/* Filler roses */}
      {[[55, 30], [12, 38], [38, 58], [60, 52]].map(([x, y], i) => (
        <RealisticRose key={`fill-${i}`} x={x} y={y} size={2.5} opacity={0.9} />
      ))}
      
      {/* Leaves */}
      {[[18, 35], [52, 40], [22, 52], [48, 58]].map(([x, y], i) => (
        <RealisticLeaf key={`leaf-${i}`} x={x} y={y} angle={i * 30} size={1.2} />
      ))}
      
      {/* Baby's breath */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={`dot-${i}`} cx={10 + i * 5} cy={35 + Math.sin(i) * 15} r={1} fill="#FFFFFF" opacity="0.6" />
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
      
      {/* Realistic roses overflowing */}
      <g>
        <RealisticRose x={22} y={12} size={4.5} />
        <RealisticRose x={18} y={14} size={3.5} />
        <RealisticRose x={26} y={14} size={3.5} />
        
        <RealisticRose x={12} y={18} size={3.5} />
        <RealisticRose x={32} y={16} size={3.5} />
        
        <RealisticBlushRose x={18} y={22} size={3} />
        <RealisticBlushRose x={28} y={20} size={3} />
      </g>
      
      {/* Baby's breath */}
      {[[8, 15], [36, 12], [15, 8], [30, 8], [6, 22], [38, 20]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.2} fill="#FFFFFF" opacity="0.8" />
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
      <path d="M21 50 L20 70" stroke="#F4E4BA" strokeWidth="2" opacity="0.4" />
      
      {/* Realistic roses on top - NO green blobs */}
      <g>
        <RealisticRose x={25} y={15} size={5} />
        <RealisticRose x={20} y={18} size={4} />
        <RealisticRose x={30} y={17} size={4} />
        
        <RealisticRose x={15} y={22} size={3.5} />
        <RealisticRose x={35} y={20} size={3.5} />
        
        <RealisticBlushRose x={10} y={30} size={3} />
        <RealisticBlushRose x={40} y={28} size={3} />
        
        <RealisticRose x={25} y={30} size={3} />
      </g>
      
      {/* Elegant leaves */}
      {[[12, 25], [38, 23], [10, 32], [40, 30]].map(([x, y], i) => (
        <RealisticLeaf key={`leaf-${i}`} x={x} y={y} angle={i * 45} size={1.3} />
      ))}
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
      
      {/* Gold stand */}
      <rect x="5" y="68" width="30" height="10" rx="3" fill="#D4AF37" />
      <rect x="8" y="65" width="24" height="5" rx="2" fill="#B8962E" />
      <ellipse cx="20" cy="68" rx="10" ry="2" fill="#F4E4BA" opacity="0.5" />
      
      {/* Candles at different heights */}
      {[[12, 35], [20, 25], [28, 32]].map(([x, h], i) => (
        <g key={i}>
          <rect x={x - 4} y={65 - h} width="8" height={h} rx="1" fill="url(#candleWax)" />
          <ellipse cx={x} cy={65 - h} rx="4" ry="2" fill="#FFFEF8" />
          <line x1={x} y1={65 - h - 2} x2={x} y2={65 - h - 6} stroke="#333" strokeWidth="0.8" />
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
      
      <path d="M17.5 105 L2 15 L33 15 Z" fill="url(#uplightBeam2)" />
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
            <polyline
              points={points.join(' ')}
              stroke="#8B7355"
              strokeWidth="0.4"
              fill="none"
              opacity="0.5"
            />
            
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
      
      <rect x="3" y="3" width="34" height="104" rx="2" fill="none" stroke="url(#panelGold2)" strokeWidth="3" />
      <rect x="7" y="7" width="26" height="96" rx="1" fill="url(#latticePattern)" opacity="0.3" />
      <rect x="7" y="7" width="26" height="96" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
      
      <circle cx="20" cy="30" r="8" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      <circle cx="20" cy="55" r="6" fill="#D4AF37" opacity="0.2" />
      <circle cx="20" cy="80" r="8" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      
      {[[10, 10], [30, 10], [10, 100], [30, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#D4AF37" opacity="0.6" />
      ))}
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
      
      <path
        d="M8 92 L8 35 Q8 8, 35 8 Q62 8, 62 35 L62 92 Z"
        stroke="url(#mirrorFrame2)"
        strokeWidth="5"
        fill="none"
      />
      
      <path
        d="M13 90 L13 37 Q13 13, 35 13 Q57 13, 57 37 L57 90 Z"
        stroke="#D4AF37"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      
      <path
        d="M15 88 L15 38 Q15 16, 35 16 Q55 16, 55 38 L55 88 Z"
        fill="url(#mirrorGlass2)"
      />
      
      <ellipse cx="28" cy="45" rx="10" ry="18" fill="white" opacity="0.2" />
      <line x1="35" y1="16" x2="35" y2="88" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
      <path d="M15 55 Q35 50, 55 55" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.3" />
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
      
      <line x1="20" y1="0" x2="20" y2="8" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="20" cy="4" r="2" fill="#D4AF37" />
      <path d="M12 10 L20 5 L28 10 Z" fill="url(#lanternGold)" />
      
      <path 
        d="M10 12 L10 50 Q10 58, 20 58 Q30 58, 30 50 L30 12 Q30 8, 20 8 Q10 8, 10 12 Z" 
        fill="none" 
        stroke="url(#lanternGold)" 
        strokeWidth="2"
      />
      
      <rect x="12" y="14" width="16" height="40" fill="#D4AF37" opacity="0.1" />
      <path d="M20 14 L20 54" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
      {[25, 35, 45].map((y, i) => (
        <path key={i} d={`M12 ${y} L28 ${y}`} stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
      ))}
      
      <ellipse cx="20" cy="35" rx="6" ry="12" fill="#FFF9E6" opacity="0.6" filter="url(#lanternGlow2)" />
      <ellipse cx="20" cy="35" rx="3" ry="6" fill="#FFFEF8" opacity="0.8" />
      
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
      
      <path d="M10 0 L55 0 L60 110 L5 110 Z" fill="url(#runnerGrad2)" />
      <path d="M12 3 L53 3 L57 107 L8 107 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
      <path d="M16 8 L49 8 L53 102 L12 102 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
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
      
      <rect x="0" y="5" width="200" height="35" fill="url(#platformTop)" />
      <rect x="0" y="5" width="200" height="8" fill="rgba(255,255,255,0.6)" />
      <rect x="0" y="38" width="200" height="15" fill="url(#platformFront)" />
      <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
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
      
      <rect x="5" y="5" width="150" height="65" rx="2" fill="url(#carpetGrad2)" />
      <rect x="5" y="5" width="150" height="65" fill="url(#carpetPattern)" />
      <rect x="10" y="10" width="140" height="55" fill="none" stroke="#F4E4BA" strokeWidth="3" />
      <rect x="18" y="18" width="124" height="39" fill="none" stroke="#8B7355" strokeWidth="1.5" opacity="0.5" />
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
      
      <rect x="5" y="25" width="90" height="13" rx="2" fill="url(#stepGrad2)" />
      <rect x="5" y="25" width="90" height="4" fill="rgba(255,255,255,0.5)" rx="2" />
      <rect x="15" y="10" width="70" height="17" rx="2" fill="url(#stepGrad2)" />
      <rect x="15" y="10" width="70" height="5" fill="rgba(255,255,255,0.6)" rx="2" />
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
