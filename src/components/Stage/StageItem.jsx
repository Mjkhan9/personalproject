import { motion } from 'framer-motion';
import { useQuoteStore } from '../../store/quoteStore';
import { X } from 'lucide-react';
import { useState, useId } from 'react';

export function StageItem({ item }) {
  const removeItem = useQuoteStore((state) => state.removeItem);
  const [isHovered, setIsHovered] = useState(false);
  const uniqueId = useId();

  const { stagePosition, layer, color, svgType, name, quantity } = item;
  
  const positionStyle = {
    position: 'absolute',
    left: `${stagePosition.x - stagePosition.width / 2}%`,
    top: `${stagePosition.y - stagePosition.height / 2}%`,
    width: `${stagePosition.width}%`,
    height: `${stagePosition.height}%`,
    zIndex: layer * 10,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={positionStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer group"
    >
      <div className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
        <StageSVG type={svgType} color={color} quantity={quantity} uniqueId={uniqueId} />
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 -top-10 bg-gradient-to-r from-neutral-dark to-neutral-dark/95 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-50 flex items-center gap-2 shadow-xl"
        >
          <span className="font-medium">{name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item.id);
            }}
            className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Enhanced SVG components with realistic details
function StageSVG({ type, color, quantity = 1, uniqueId }) {
  const fill = color || '#D4AF37';
  const id = uniqueId || 'stage';
  
  switch (type) {
    case 'draping':
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`drape-main-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.95" />
              <stop offset="40%" stopColor={fill} stopOpacity="0.85" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id={`drape-highlight-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="20%" stopColor="#fff" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.25" />
              <stop offset="80%" stopColor="#fff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <filter id={`drape-shadow-${id}`}>
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Main draping fabric */}
          <path
            d="M0 0 
               Q 30 8, 50 2 Q 70 -4, 100 2 Q 130 8, 150 2 Q 170 -4, 200 0
               L200 100 
               Q 150 95, 100 100 Q 50 105, 0 100 Z"
            fill={`url(#drape-main-${id})`}
            filter={`url(#drape-shadow-${id})`}
          />
          
          {/* Fabric folds - vertical pleating */}
          {[20, 45, 70, 95, 120, 145, 170].map((x, i) => (
            <path
              key={i}
              d={`M${x} 0 Q${x + (i % 2 ? 3 : -3)} 50, ${x} 100`}
              stroke={fill === '#1a1a1a' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
              strokeWidth="1.5"
              fill="none"
            />
          ))}
          
          {/* Swag curves at top */}
          <path
            d="M0 0 Q 25 15, 50 5 Q 75 -5, 100 5 Q 125 15, 150 5 Q 175 -5, 200 0"
            stroke={fill === '#1a1a1a' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0 8 Q 25 20, 50 12 Q 75 4, 100 12 Q 125 20, 150 12 Q 175 4, 200 8"
            stroke={fill === '#1a1a1a' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}
            strokeWidth="1"
            fill="none"
          />
          
          {/* Highlight overlay */}
          <rect x="0" y="0" width="200" height="100" fill={`url(#drape-highlight-${id})`} />
          
          {/* Subtle shimmer on fabric */}
          <ellipse cx="60" cy="30" rx="25" ry="40" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="140" cy="50" rx="30" ry="45" fill="rgba(255,255,255,0.06)" />
        </svg>
      );

    case 'fairy-lights':
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <radialGradient id={`light-glow-${id}`}>
              <stop offset="0%" stopColor="#FFF9E6" stopOpacity="1" />
              <stop offset="40%" stopColor="#FFE4B5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>
            <filter id={`light-blur-${id}`}>
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id={`curtain-bg-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a2a2a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          {/* Sheer curtain background */}
          <rect x="0" y="0" width="200" height="100" fill={`url(#curtain-bg-${id})`} />
          
          {/* Multiple rows of string lights */}
          {[
            { y: 10, amplitude: 8, lights: 12 },
            { y: 30, amplitude: 10, lights: 11 },
            { y: 50, amplitude: 8, lights: 12 },
            { y: 70, amplitude: 10, lights: 11 },
            { y: 90, amplitude: 6, lights: 10 },
          ].map((row, rowIndex) => (
            <g key={rowIndex}>
              {/* String wire */}
              <path
                d={`M0 ${row.y} ${Array.from({ length: 10 }, (_, i) => 
                  `Q ${20 * i + 10} ${row.y + (i % 2 ? row.amplitude : -row.amplitude)}, ${20 * i + 20} ${row.y}`
                ).join(' ')}`}
                stroke="#D4AF37"
                strokeWidth="0.4"
                fill="none"
                opacity="0.6"
              />
              
              {/* Lights with glow */}
              {Array.from({ length: row.lights }, (_, i) => {
                const x = 8 + i * (184 / (row.lights - 1));
                const yOffset = Math.sin(i * 0.8) * (row.amplitude * 0.6);
                return (
                  <g key={i}>
                    {/* Outer glow */}
                    <circle
                      cx={x}
                      cy={row.y + yOffset}
                      r="6"
                      fill={`url(#light-glow-${id})`}
                      opacity="0.7"
                    />
                    {/* Light bulb */}
                    <circle
                      cx={x}
                      cy={row.y + yOffset}
                      r="2.5"
                      fill="#FFF9E6"
                      filter={`url(#light-blur-${id})`}
                    />
                    {/* Bright center */}
                    <circle
                      cx={x}
                      cy={row.y + yOffset}
                      r="1"
                      fill="#FFFFFF"
                    />
                  </g>
                );
              })}
            </g>
          ))}
        </svg>
      );

    case 'sequin':
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`sequin-bg-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.85" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id={`sequin-shine-${id}`}>
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="50%" stopColor={fill} stopOpacity="0.6" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.3" />
            </radialGradient>
          </defs>
          
          {/* Base fabric */}
          <rect x="0" y="0" width="200" height="100" fill={`url(#sequin-bg-${id})`} rx="2" />
          
          {/* Sequin grid */}
          {Array.from({ length: 20 }).map((_, row) =>
            Array.from({ length: 35 }).map((_, col) => {
              const baseX = col * 5.8 + (row % 2 ? 2.9 : 0);
              const baseY = row * 5 + 2;
              const shimmer = Math.random();
              return (
                <g key={`${row}-${col}`}>
                  <circle
                    cx={baseX}
                    cy={baseY}
                    r="2"
                    fill={shimmer > 0.7 ? `url(#sequin-shine-${id})` : fill}
                    opacity={0.5 + shimmer * 0.5}
                  />
                  {shimmer > 0.85 && (
                    <circle
                      cx={baseX - 0.5}
                      cy={baseY - 0.5}
                      r="0.8"
                      fill="#fff"
                      opacity="0.9"
                    />
                  )}
                </g>
              );
            })
          )}
          
          {/* Shimmer highlights */}
          <ellipse cx="50" cy="30" rx="30" ry="20" fill="rgba(255,255,255,0.15)" />
          <ellipse cx="150" cy="60" rx="35" ry="25" fill="rgba(255,255,255,0.12)" />
        </svg>
      );

    case 'circular-arch':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id={`arch-gold-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8962E" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F4E4BA" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8962E" />
            </linearGradient>
            <linearGradient id={`arch-shadow-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B7320" />
              <stop offset="50%" stopColor="#B8962E" />
              <stop offset="100%" stopColor="#8B7320" />
            </linearGradient>
            <filter id={`arch-glow-${id}`}>
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.4"/>
            </filter>
          </defs>
          
          {/* Main arch structure - outer */}
          <path
            d="M8 95 L8 40 Q8 5, 50 5 Q92 5, 92 40 L92 95"
            stroke={`url(#arch-gold-${id})`}
            strokeWidth="6"
            fill="none"
            filter={`url(#arch-glow-${id})`}
            strokeLinecap="round"
          />
          
          {/* Inner detail line */}
          <path
            d="M14 95 L14 42 Q14 12, 50 12 Q86 12, 86 42 L86 95"
            stroke={`url(#arch-shadow-${id})`}
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          
          {/* Decorative details at base */}
          <rect x="4" y="88" width="12" height="8" fill={`url(#arch-gold-${id})`} rx="1" />
          <rect x="84" y="88" width="12" height="8" fill={`url(#arch-gold-${id})`} rx="1" />
          
          {/* Top ornament */}
          <circle cx="50" cy="5" r="4" fill={`url(#arch-gold-${id})`} />
          <circle cx="50" cy="5" r="2" fill="#F4E4BA" />
        </svg>
      );

    case 'triple-arch':
      return (
        <svg viewBox="0 0 120 90" className="w-full h-full">
          <defs>
            <linearGradient id={`triple-gold-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8962E" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F4E4BA" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8962E" />
            </linearGradient>
            <filter id={`triple-glow-${id}`}>
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#D4AF37" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          {/* Back arch (largest) */}
          <path
            d="M3 88 L3 45 Q3 3, 60 3 Q117 3, 117 45 L117 88"
            stroke={`url(#triple-gold-${id})`}
            strokeWidth="3"
            fill="none"
            opacity="0.5"
            strokeLinecap="round"
          />
          
          {/* Middle arch */}
          <path
            d="M15 88 L15 42 Q15 10, 60 10 Q105 10, 105 42 L105 88"
            stroke={`url(#triple-gold-${id})`}
            strokeWidth="4"
            fill="none"
            opacity="0.75"
            filter={`url(#triple-glow-${id})`}
            strokeLinecap="round"
          />
          
          {/* Front arch (smallest, most prominent) */}
          <path
            d="M28 88 L28 40 Q28 18, 60 18 Q92 18, 92 40 L92 88"
            stroke={`url(#triple-gold-${id})`}
            strokeWidth="5"
            fill="none"
            filter={`url(#triple-glow-${id})`}
            strokeLinecap="round"
          />
          
          {/* Decorative balls at intersections */}
          <circle cx="60" cy="3" r="3" fill="#D4AF37" />
          <circle cx="60" cy="10" r="2.5" fill="#F4E4BA" />
          <circle cx="60" cy="18" r="3.5" fill="#D4AF37" filter={`url(#triple-glow-${id})`} />
        </svg>
      );

    case 'hexagon':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id={`hex-gold-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8962E" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#F4E4BA" />
            </linearGradient>
            <filter id={`hex-glow-${id}`}>
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          {/* Main hexagon */}
          <polygon
            points="50,3 93,25 93,75 50,97 7,75 7,25"
            stroke={`url(#hex-gold-${id})`}
            strokeWidth="5"
            fill="none"
            filter={`url(#hex-glow-${id})`}
            strokeLinejoin="round"
          />
          
          {/* Inner hexagon detail */}
          <polygon
            points="50,12 84,30 84,70 50,88 16,70 16,30"
            stroke="#D4AF37"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          
          {/* Corner ornaments */}
          {[[50,3], [93,25], [93,75], [50,97], [7,75], [7,25]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4" fill="#F4E4BA" />
          ))}
        </svg>
      );

    case 'rectangle-frame':
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <defs>
            <linearGradient id={`rect-gold-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B7320" />
              <stop offset="25%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F4E4BA" />
              <stop offset="75%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8B7320" />
            </linearGradient>
            <filter id={`rect-shadow-${id}`}>
              <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.4"/>
            </filter>
          </defs>
          
          {/* Outer frame */}
          <rect
            x="5" y="3" width="90" height="74"
            stroke={`url(#rect-gold-${id})`}
            strokeWidth="6"
            fill="none"
            rx="3"
            filter={`url(#rect-shadow-${id})`}
          />
          
          {/* Inner frame detail */}
          <rect
            x="12" y="10" width="76" height="60"
            stroke="#D4AF37"
            strokeWidth="2"
            fill="none"
            rx="2"
            opacity="0.6"
          />
          
          {/* Corner decorations */}
          {[[12, 10], [88, 10], [12, 70], [88, 70]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="#D4AF37" />
              <circle cx={x} cy={y} r="2.5" fill="#F4E4BA" />
            </g>
          ))}
        </svg>
      );

    case 'sofa':
      return (
        <svg viewBox="0 0 180 80" className="w-full h-full">
          <defs>
            <linearGradient id={`sofa-top-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id={`sofa-front-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.9" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id={`sofa-arm-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.8" />
              <stop offset="50%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.8" />
            </linearGradient>
            <filter id={`sofa-shadow-${id}`}>
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.35"/>
            </filter>
          </defs>
          
          {/* Back cushion */}
          <path
            d="M20 8 Q90 2, 160 8 L160 32 Q90 28, 20 32 Z"
            fill={`url(#sofa-top-${id})`}
            filter={`url(#sofa-shadow-${id})`}
          />
          
          {/* Left arm */}
          <path
            d="M5 12 Q2 12, 2 18 L2 55 Q2 62, 8 62 L22 62 L22 12 Q14 10, 5 12"
            fill={`url(#sofa-arm-${id})`}
          />
          
          {/* Right arm */}
          <path
            d="M175 12 Q178 12, 178 18 L178 55 Q178 62, 172 62 L158 62 L158 12 Q166 10, 175 12"
            fill={`url(#sofa-arm-${id})`}
          />
          
          {/* Seat cushion */}
          <rect x="20" y="30" width="140" height="28" rx="6" fill={`url(#sofa-front-${id})`} />
          
          {/* Tufting channels */}
          {[50, 90, 130].map((x, i) => (
            <line key={i} x1={x} y1="32" x2={x} y2="56" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
          ))}
          
          {/* Tufting buttons */}
          {[50, 90, 130].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="18" r="3" fill="rgba(0,0,0,0.1)" />
              <circle cx={x} cy="18" r="1.5" fill="rgba(255,255,255,0.2)" />
            </g>
          ))}
          
          {/* Base/skirt */}
          <rect x="15" y="58" width="150" height="8" rx="2" fill={fill} opacity="0.7" />
          
          {/* Gold legs */}
          <rect x="25" y="66" width="8" height="12" rx="1" fill="#D4AF37" />
          <rect x="147" y="66" width="8" height="12" rx="1" fill="#D4AF37" />
          <rect x="80" y="66" width="6" height="10" rx="1" fill="#D4AF37" opacity="0.7" />
          
          {/* Leg highlights */}
          <rect x="26" y="67" width="2" height="10" rx="0.5" fill="#F4E4BA" opacity="0.6" />
          <rect x="148" y="67" width="2" height="10" rx="0.5" fill="#F4E4BA" opacity="0.6" />
          
          {/* Cushion highlights */}
          <ellipse cx="60" cy="42" rx="20" ry="8" fill="rgba(255,255,255,0.1)" />
          <ellipse cx="120" cy="42" rx="20" ry="8" fill="rgba(255,255,255,0.1)" />
        </svg>
      );

    case 'loveseat':
      return (
        <svg viewBox="0 0 140 70" className="w-full h-full">
          <defs>
            <linearGradient id={`love-main-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.8" />
            </linearGradient>
            <filter id={`love-shadow-${id}`}>
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Back */}
          <path
            d="M18 6 Q70 2, 122 6 L122 28 Q70 24, 18 28 Z"
            fill={`url(#love-main-${id})`}
            filter={`url(#love-shadow-${id})`}
          />
          
          {/* Arms */}
          <rect x="4" y="10" width="16" height="42" rx="6" fill={fill} opacity="0.9" />
          <rect x="120" y="10" width="16" height="42" rx="6" fill={fill} opacity="0.9" />
          
          {/* Seat */}
          <rect x="18" y="26" width="104" height="24" rx="5" fill={fill} opacity="0.85" />
          
          {/* Tufting */}
          <line x1="70" y1="28" x2="70" y2="48" stroke="rgba(0,0,0,0.06)" strokeWidth="2" />
          <circle cx="70" cy="15" r="2.5" fill="rgba(0,0,0,0.08)" />
          
          {/* Base */}
          <rect x="14" y="50" width="112" height="6" rx="2" fill={fill} opacity="0.7" />
          
          {/* Legs */}
          <rect x="22" y="56" width="6" height="10" rx="1" fill="#D4AF37" />
          <rect x="112" y="56" width="6" height="10" rx="1" fill="#D4AF37" />
        </svg>
      );

    case 'chair-pair':
      return (
        <svg viewBox="0 0 160 60" className="w-full h-full">
          <defs>
            <linearGradient id={`chair-main-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.85" />
            </linearGradient>
            <filter id={`chair-shadow-${id}`}>
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25"/>
            </filter>
          </defs>
          
          {/* Left chair */}
          <g filter={`url(#chair-shadow-${id})`}>
            <rect x="8" y="5" width="32" height="20" rx="4" fill={`url(#chair-main-${id})`} />
            <rect x="10" y="23" width="28" height="22" rx="4" fill={fill} opacity="0.9" />
            <rect x="4" y="10" width="8" height="32" rx="3" fill={fill} opacity="0.85" />
            <rect x="36" y="10" width="8" height="32" rx="3" fill={fill} opacity="0.85" />
            <rect x="12" y="45" width="4" height="12" rx="1" fill="#D4AF37" />
            <rect x="32" y="45" width="4" height="12" rx="1" fill="#D4AF37" />
          </g>
          
          {/* Right chair */}
          <g filter={`url(#chair-shadow-${id})`}>
            <rect x="120" y="5" width="32" height="20" rx="4" fill={`url(#chair-main-${id})`} />
            <rect x="122" y="23" width="28" height="22" rx="4" fill={fill} opacity="0.9" />
            <rect x="116" y="10" width="8" height="32" rx="3" fill={fill} opacity="0.85" />
            <rect x="148" y="10" width="8" height="32" rx="3" fill={fill} opacity="0.85" />
            <rect x="124" y="45" width="4" height="12" rx="1" fill="#D4AF37" />
            <rect x="144" y="45" width="4" height="12" rx="1" fill="#D4AF37" />
          </g>
        </svg>
      );

    case 'cushions':
      return (
        <svg viewBox="0 0 140 30" className="w-full h-full">
          <defs>
            <filter id={`cushion-shadow-${id}`}>
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.2"/>
            </filter>
          </defs>
          
          {[
            { x: 10, color: fill, rotate: -5 },
            { x: 32, color: '#F5F0E6', rotate: 3 },
            { x: 54, color: fill, rotate: -2 },
            { x: 76, color: '#E8D5D5', rotate: 4 },
            { x: 98, color: '#F5F0E6', rotate: -3 },
            { x: 120, color: fill, rotate: 2 },
          ].map((cushion, i) => (
            <g key={i} transform={`rotate(${cushion.rotate} ${cushion.x + 10} 15)`}>
              <rect
                x={cushion.x}
                y="5"
                width="20"
                height="18"
                rx="5"
                fill={cushion.color}
                filter={`url(#cushion-shadow-${id})`}
              />
              {/* Piping detail */}
              <rect
                x={cushion.x + 1}
                y="6"
                width="18"
                height="16"
                rx="4"
                fill="none"
                stroke="rgba(212,175,55,0.3)"
                strokeWidth="0.5"
              />
              {/* Highlight */}
              <ellipse
                cx={cushion.x + 10}
                cy="11"
                rx="6"
                ry="4"
                fill="rgba(255,255,255,0.2)"
              />
            </g>
          ))}
        </svg>
      );

    case 'arch-florals':
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full">
          <defs>
            <radialGradient id={`rose-${id}`}>
              <stop offset="0%" stopColor="#FEFEFE" />
              <stop offset="40%" stopColor={fill} />
              <stop offset="100%" stopColor="#C4A5A5" />
            </radialGradient>
            <radialGradient id={`peony-${id}`}>
              <stop offset="0%" stopColor="#FFF5F5" />
              <stop offset="50%" stopColor="#E8D5D5" />
              <stop offset="100%" stopColor="#D4A5A5" />
            </radialGradient>
            <radialGradient id={`white-rose-${id}`}>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F5F0E6" />
              <stop offset="100%" stopColor="#E8E0D0" />
            </radialGradient>
            <filter id={`floral-glow-${id}`}>
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25"/>
            </filter>
          </defs>
          
          {/* Top center cluster */}
          <g filter={`url(#floral-glow-${id})`}>
            {/* Large central roses */}
            <circle cx="60" cy="12" r="10" fill={`url(#rose-${id})`} />
            <circle cx="45" cy="16" r="8" fill={`url(#peony-${id})`} />
            <circle cx="75" cy="16" r="8" fill={`url(#white-rose-${id})`} />
            <circle cx="52" cy="8" r="6" fill={`url(#white-rose-${id})`} />
            <circle cx="68" cy="8" r="6" fill={`url(#rose-${id})`} />
            
            {/* Rose spiral details */}
            <path d="M60 12 Q58 10, 60 8 Q62 10, 60 12" fill="rgba(0,0,0,0.1)" />
            <path d="M45 16 Q43 14, 45 12 Q47 14, 45 16" fill="rgba(0,0,0,0.08)" />
            
            {/* Greenery */}
            <ellipse cx="35" cy="14" rx="5" ry="8" fill="#7A8B6A" transform="rotate(-20 35 14)" />
            <ellipse cx="85" cy="14" rx="5" ry="8" fill="#7A8B6A" transform="rotate(20 85 14)" />
            <ellipse cx="40" cy="22" rx="4" ry="6" fill="#8B9B7A" transform="rotate(-10 40 22)" />
            <ellipse cx="80" cy="22" rx="4" ry="6" fill="#8B9B7A" transform="rotate(10 80 22)" />
          </g>
          
          {/* Left cascade */}
          <g filter={`url(#floral-glow-${id})`}>
            {[
              { cx: 18, cy: 28, r: 7, type: 'rose' },
              { cx: 12, cy: 38, r: 6, type: 'peony' },
              { cx: 16, cy: 48, r: 5, type: 'white' },
              { cx: 14, cy: 58, r: 5, type: 'rose' },
              { cx: 18, cy: 68, r: 4, type: 'peony' },
            ].map((flower, i) => (
              <g key={i}>
                <circle 
                  cx={flower.cx} 
                  cy={flower.cy} 
                  r={flower.r} 
                  fill={`url(#${flower.type === 'rose' ? `rose-${id}` : flower.type === 'peony' ? `peony-${id}` : `white-rose-${id}`})`}
                />
                <ellipse cx={flower.cx - flower.r - 2} cy={flower.cy + 2} rx="3" ry="5" fill="#7A8B6A" transform={`rotate(-30 ${flower.cx - flower.r - 2} ${flower.cy + 2})`} />
              </g>
            ))}
          </g>
          
          {/* Right cascade */}
          <g filter={`url(#floral-glow-${id})`}>
            {[
              { cx: 102, cy: 28, r: 7, type: 'white' },
              { cx: 108, cy: 38, r: 6, type: 'rose' },
              { cx: 104, cy: 48, r: 5, type: 'peony' },
              { cx: 106, cy: 58, r: 5, type: 'white' },
              { cx: 102, cy: 68, r: 4, type: 'rose' },
            ].map((flower, i) => (
              <g key={i}>
                <circle 
                  cx={flower.cx} 
                  cy={flower.cy} 
                  r={flower.r} 
                  fill={`url(#${flower.type === 'rose' ? `rose-${id}` : flower.type === 'peony' ? `peony-${id}` : `white-rose-${id}`})`}
                />
                <ellipse cx={flower.cx + flower.r + 2} cy={flower.cy + 2} rx="3" ry="5" fill="#8B9B7A" transform={`rotate(30 ${flower.cx + flower.r + 2} ${flower.cy + 2})`} />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'sofa-florals':
      return (
        <svg viewBox="0 0 160 35" className="w-full h-full">
          <defs>
            <radialGradient id={`sofa-rose-${id}`}>
              <stop offset="0%" stopColor="#FEFEFE" />
              <stop offset="40%" stopColor={fill} />
              <stop offset="100%" stopColor="#C4A5A5" />
            </radialGradient>
            <radialGradient id={`sofa-white-${id}`}>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F5F0E6" />
              <stop offset="100%" stopColor="#E8DDD0" />
            </radialGradient>
            <filter id={`sofa-floral-shadow-${id}`}>
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.2"/>
            </filter>
          </defs>
          
          {/* Left arrangement */}
          <g filter={`url(#sofa-floral-shadow-${id})`}>
            {[
              { cx: 12, cy: 18, r: 8, type: 'rose' },
              { cx: 25, cy: 15, r: 7, type: 'white' },
              { cx: 20, cy: 26, r: 6, type: 'rose' },
              { cx: 8, cy: 28, r: 5, type: 'white' },
              { cx: 32, cy: 22, r: 5, type: 'rose' },
            ].map((f, i) => (
              <circle key={i} cx={f.cx} cy={f.cy} r={f.r} fill={`url(#sofa-${f.type}-${id})`} />
            ))}
            <ellipse cx="5" cy="20" rx="3" ry="6" fill="#7A8B6A" transform="rotate(-20 5 20)" />
            <ellipse cx="36" cy="18" rx="3" ry="5" fill="#8B9B7A" transform="rotate(15 36 18)" />
          </g>
          
          {/* Right arrangement */}
          <g filter={`url(#sofa-floral-shadow-${id})`}>
            {[
              { cx: 148, cy: 18, r: 8, type: 'white' },
              { cx: 135, cy: 15, r: 7, type: 'rose' },
              { cx: 140, cy: 26, r: 6, type: 'white' },
              { cx: 152, cy: 28, r: 5, type: 'rose' },
              { cx: 128, cy: 22, r: 5, type: 'white' },
            ].map((f, i) => (
              <circle key={i} cx={f.cx} cy={f.cy} r={f.r} fill={`url(#sofa-${f.type}-${id})`} />
            ))}
            <ellipse cx="155" cy="20" rx="3" ry="6" fill="#7A8B6A" transform="rotate(20 155 20)" />
            <ellipse cx="124" cy="18" rx="3" ry="5" fill="#8B9B7A" transform="rotate(-15 124 18)" />
          </g>
        </svg>
      );

    case 'aisle-florals':
      return (
        <svg viewBox="0 0 160 30" className="w-full h-full">
          <defs>
            <linearGradient id={`box-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
            <radialGradient id={`aisle-rose-${id}`}>
              <stop offset="0%" stopColor="#FFF" />
              <stop offset="50%" stopColor={fill} />
              <stop offset="100%" stopColor="#C4A5A5" />
            </radialGradient>
          </defs>
          
          {[18, 58, 102, 142].map((x, i) => (
            <g key={i}>
              {/* Acrylic box */}
              <rect x={x - 14} y="8" width="28" height="20" rx="2" fill={`url(#box-${id})`} stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
              
              {/* Flowers */}
              <circle cx={x} cy="14" r="6" fill={`url(#aisle-rose-${id})`} />
              <circle cx={x - 7} cy="16" r="4" fill="#F5F0E6" />
              <circle cx={x + 7} cy="15" r="4" fill="#E8D5D5" />
              <circle cx={x - 4} cy="20" r="3" fill={fill} opacity="0.8" />
              <circle cx={x + 4} cy="21" r="3" fill="#F5F0E6" opacity="0.9" />
              
              {/* Greenery */}
              <ellipse cx={x - 10} cy="18" rx="2" ry="4" fill="#7A8B6A" transform={`rotate(-25 ${x - 10} 18)`} />
              <ellipse cx={x + 10} cy="18" rx="2" ry="4" fill="#8B9B7A" transform={`rotate(25 ${x + 10} 18)`} />
            </g>
          ))}
        </svg>
      );

    case 'centerpieces':
      return (
        <svg viewBox="0 0 140 60" className="w-full h-full">
          <defs>
            <linearGradient id={`vase-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8962E" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8962E" />
            </linearGradient>
            <radialGradient id={`center-rose-${id}`}>
              <stop offset="0%" stopColor="#FFF" />
              <stop offset="40%" stopColor={fill} />
              <stop offset="100%" stopColor="#B4A5A5" />
            </radialGradient>
            <filter id={`center-shadow-${id}`}>
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {[35, 105].map((x, i) => (
            <g key={i} filter={`url(#center-shadow-${id})`}>
              {/* Gold vase */}
              <path d={`M${x - 5} 58 L${x - 8} 42 Q${x - 10} 38, ${x - 6} 36 L${x + 6} 36 Q${x + 10} 38, ${x + 8} 42 L${x + 5} 58 Z`} fill={`url(#vase-${id})`} />
              <ellipse cx={x} cy="36" rx="8" ry="3" fill="#D4AF37" />
              
              {/* Flowers */}
              <circle cx={x} cy="22" r="9" fill={`url(#center-rose-${id})`} />
              <circle cx={x - 10} cy="18" r="7" fill="#F5F0E6" />
              <circle cx={x + 10} cy="20" r="6" fill="#E8D5D5" />
              <circle cx={x - 6} cy="28" r="5" fill={fill} opacity="0.9" />
              <circle cx={x + 8} cy="26" r="5" fill="#F5F0E6" />
              <circle cx={x} cy="12" r="5" fill="#E8D5D5" />
              
              {/* Greenery */}
              <ellipse cx={x - 14} cy="22" rx="3" ry="6" fill="#7A8B6A" transform={`rotate(-30 ${x - 14} 22)`} />
              <ellipse cx={x + 14} cy="22" rx="3" ry="6" fill="#8B9B7A" transform={`rotate(30 ${x + 14} 22)`} />
              <ellipse cx={x - 8} cy="32" rx="2" ry="4" fill="#7A8B6A" transform={`rotate(-15 ${x - 8} 32)`} />
              <ellipse cx={x + 8} cy="32" rx="2" ry="4" fill="#8B9B7A" transform={`rotate(15 ${x + 8} 32)`} />
            </g>
          ))}
        </svg>
      );

    case 'pillar-candles':
      const positions = quantity >= 2 ? [20, 50, 80] : [50];
      return (
        <svg viewBox="0 0 100 70" className="w-full h-full">
          <defs>
            <linearGradient id={`candle-wax-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5EDE0" />
              <stop offset="50%" stopColor="#FFFAF0" />
              <stop offset="100%" stopColor="#F5EDE0" />
            </linearGradient>
            <radialGradient id={`flame-${id}`}>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FFE4B5" />
              <stop offset="60%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
            </radialGradient>
            <filter id={`flame-glow-${id}`}>
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id={`stand-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8962E" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8962E" />
            </linearGradient>
          </defs>
          
          {positions.map((x, i) => {
            const height = 30 - i * 6;
            const y = 62 - height;
            return (
              <g key={i}>
                {/* Gold stand */}
                <rect x={x - 10} y="58" width="20" height="8" rx="2" fill={`url(#stand-${id})`} />
                <rect x={x - 8} y="55" width="16" height="5" rx="1" fill="#D4AF37" />
                
                {/* Candle body */}
                <rect x={x - 6} y={y} width="12" height={height} rx="2" fill={`url(#candle-wax-${id})`} />
                
                {/* Melted wax drips */}
                <path d={`M${x - 4} ${y} Q${x - 5} ${y + 5}, ${x - 4} ${y + 8}`} fill="#FFFAF0" />
                <path d={`M${x + 3} ${y} Q${x + 5} ${y + 4}, ${x + 3} ${y + 6}`} fill="#FFFAF0" />
                
                {/* Wick */}
                <rect x={x - 0.5} y={y - 4} width="1" height="5" fill="#333" />
                
                {/* Flame */}
                <ellipse cx={x} cy={y - 8} rx="4" ry="8" fill={`url(#flame-${id})`} filter={`url(#flame-glow-${id})`} />
                
                {/* Inner flame */}
                <ellipse cx={x} cy={y - 6} rx="1.5" ry="4" fill="#FFF" opacity="0.9" />
              </g>
            );
          })}
        </svg>
      );

    case 'candle-cluster':
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <defs>
            <linearGradient id={`cluster-wax-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F0E8D8" />
              <stop offset="50%" stopColor="#FFFAF0" />
              <stop offset="100%" stopColor="#F0E8D8" />
            </linearGradient>
            <radialGradient id={`cluster-flame-${id}`}>
              <stop offset="0%" stopColor="#FFF" />
              <stop offset="40%" stopColor="#FFE4B5" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
            <filter id={`cluster-glow-${id}`}>
              <feGaussianBlur stdDeviation="2"/>
            </filter>
          </defs>
          
          {[
            { x: 22, h: 28 },
            { x: 38, h: 35 },
            { x: 52, h: 25 },
            { x: 66, h: 32 },
            { x: 80, h: 22 },
          ].map((candle, i) => (
            <g key={i}>
              <rect x={candle.x - 4} y={55 - candle.h} width="8" height={candle.h} rx="1" fill={`url(#cluster-wax-${id})`} />
              <rect x={candle.x - 0.3} y={52 - candle.h} width="0.6" height="4" fill="#444" />
              <ellipse cx={candle.x} cy={48 - candle.h} rx="3" ry="5" fill={`url(#cluster-flame-${id})`} filter={`url(#cluster-glow-${id})`} />
              <ellipse cx={candle.x} cy={49 - candle.h} rx="1" ry="2.5" fill="#FFF" opacity="0.9" />
            </g>
          ))}
          
          {/* Base tray */}
          <ellipse cx="50" cy="57" rx="38" ry="4" fill="#D4AF37" opacity="0.8" />
        </svg>
      );

    case 'uplighting':
      return (
        <svg viewBox="0 0 160 30" className="w-full h-full">
          <defs>
            <linearGradient id={`uplight-beam-${id}`} x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.9" />
              <stop offset="50%" stopColor={fill} stopOpacity="0.4" />
              <stop offset="100%" stopColor={fill} stopOpacity="0" />
            </linearGradient>
            <filter id={`uplight-glow-${id}`}>
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {[20, 55, 105, 140].map((x, i) => (
            <g key={i}>
              {/* Light fixture */}
              <rect x={x - 6} y="22" width="12" height="7" rx="1" fill="#2a2a2a" />
              <rect x={x - 4} y="24" width="8" height="3" rx="0.5" fill="#444" />
              
              {/* Light beam */}
              <path 
                d={`M${x} 22 L${x - 18} 0 L${x + 18} 0 Z`} 
                fill={`url(#uplight-beam-${id})`}
                filter={`url(#uplight-glow-${id})`}
              />
              
              {/* Lens glow */}
              <circle cx={x} cy="23" r="3" fill={fill} opacity="0.8" filter={`url(#uplight-glow-${id})`} />
            </g>
          ))}
        </svg>
      );

    case 'string-lights':
      return (
        <svg viewBox="0 0 160 30" className="w-full h-full">
          <defs>
            <radialGradient id={`string-bulb-${id}`}>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FFF9E6" />
              <stop offset="100%" stopColor="#FFE4B5" stopOpacity="0.8" />
            </radialGradient>
            <filter id={`string-glow-${id}`}>
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Wire strings */}
          <path d="M0 8 Q40 16, 80 8 Q120 0, 160 8" stroke="#8B7320" strokeWidth="0.5" fill="none" />
          <path d="M0 18 Q40 10, 80 18 Q120 26, 160 18" stroke="#8B7320" strokeWidth="0.5" fill="none" />
          
          {/* Top row bulbs */}
          {[12, 32, 52, 72, 92, 112, 132, 152].map((x, i) => (
            <g key={`t-${i}`}>
              <circle cx={x} cy={8 + Math.sin(i * 0.9) * 4} r="4" fill={`url(#string-bulb-${id})`} filter={`url(#string-glow-${id})`} />
              <circle cx={x} cy={8 + Math.sin(i * 0.9) * 4} r="1.5" fill="#FFF" />
            </g>
          ))}
          
          {/* Bottom row bulbs */}
          {[22, 42, 62, 82, 102, 122, 142].map((x, i) => (
            <g key={`b-${i}`}>
              <circle cx={x} cy={18 - Math.sin(i * 0.9) * 4} r="3.5" fill={`url(#string-bulb-${id})`} filter={`url(#string-glow-${id})`} />
              <circle cx={x} cy={18 - Math.sin(i * 0.9) * 4} r="1.2" fill="#FFF" />
            </g>
          ))}
        </svg>
      );

    case 'gold-panels':
      return (
        <svg viewBox="0 0 140 60" className="w-full h-full">
          <defs>
            <linearGradient id={`panel-gold-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B7320" />
              <stop offset="25%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F4E4BA" />
              <stop offset="75%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8B7320" />
            </linearGradient>
            <filter id={`panel-shadow-${id}`}>
              <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.4"/>
            </filter>
          </defs>
          
          {[35, 105].map((x, i) => (
            <g key={i} filter={`url(#panel-shadow-${id})`}>
              {/* Outer frame */}
              <rect x={x - 22} y="3" width="44" height="54" rx="2" fill="none" stroke={`url(#panel-gold-${id})`} strokeWidth="3" />
              
              {/* Inner frame */}
              <rect x={x - 18} y="7" width="36" height="46" rx="1" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
              
              {/* Decorative pattern */}
              <circle cx={x} cy="30" r="12" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
              <circle cx={x} cy="30" r="8" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4" />
              
              {/* Corner ornaments */}
              {[
                [x - 15, 10], [x + 15, 10],
                [x - 15, 50], [x + 15, 50]
              ].map(([cx, cy], j) => (
                <g key={j}>
                  <circle cx={cx} cy={cy} r="3" fill="#D4AF37" />
                  <circle cx={cx} cy={cy} r="1.5" fill="#F4E4BA" />
                </g>
              ))}
              
              {/* Filigree lines */}
              <path d={`M${x - 15} 15 Q${x} 20, ${x + 15} 15`} stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.5" />
              <path d={`M${x - 15} 45 Q${x} 40, ${x + 15} 45`} stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.5" />
            </g>
          ))}
        </svg>
      );

    case 'mirror':
      return (
        <svg viewBox="0 0 80 90" className="w-full h-full">
          <defs>
            <linearGradient id={`mirror-frame-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B7320" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F4E4BA" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8B7320" />
            </linearGradient>
            <linearGradient id={`mirror-glass-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8E8E8" />
              <stop offset="50%" stopColor="#F5F5F5" />
              <stop offset="100%" stopColor="#D8D8D8" />
            </linearGradient>
            <filter id={`mirror-shadow-${id}`}>
              <feDropShadow dx="2" dy="3" stdDeviation="4" floodOpacity="0.35"/>
            </filter>
          </defs>
          
          {/* Frame */}
          <ellipse cx="40" cy="45" rx="35" ry="40" fill="none" stroke={`url(#mirror-frame-${id})`} strokeWidth="6" filter={`url(#mirror-shadow-${id})`} />
          
          {/* Inner frame detail */}
          <ellipse cx="40" cy="45" rx="30" ry="35" fill="none" stroke="#D4AF37" strokeWidth="2" />
          
          {/* Mirror glass */}
          <ellipse cx="40" cy="45" rx="28" ry="33" fill={`url(#mirror-glass-${id})`} opacity="0.6" />
          
          {/* Reflection highlights */}
          <ellipse cx="30" cy="35" rx="10" ry="15" fill="white" opacity="0.4" transform="rotate(-20 30 35)" />
          <ellipse cx="52" cy="55" rx="6" ry="10" fill="white" opacity="0.2" transform="rotate(20 52 55)" />
          
          {/* Top ornament */}
          <circle cx="40" cy="5" r="5" fill="#D4AF37" />
          <circle cx="40" cy="5" r="2.5" fill="#F4E4BA" />
        </svg>
      );

    case 'lanterns':
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full">
          <defs>
            <linearGradient id={`lantern-gold-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B7320" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8B7320" />
            </linearGradient>
            <radialGradient id={`lantern-glow-${id}`}>
              <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFE4B5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
            <filter id={`lantern-shadow-${id}`}>
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {[
            { x: 25, y: 10, scale: 1 },
            { x: 60, y: 5, scale: 1.1 },
            { x: 95, y: 12, scale: 0.9 },
          ].map((lantern, i) => (
            <g key={i} filter={`url(#lantern-shadow-${id})`} transform={`scale(${lantern.scale})`} style={{ transformOrigin: `${lantern.x}px ${lantern.y + 30}px` }}>
              {/* Hook and chain */}
              <circle cx={lantern.x} cy={lantern.y} r="3" fill="#D4AF37" />
              <line x1={lantern.x} y1={lantern.y + 3} x2={lantern.x} y2={lantern.y + 12} stroke="#D4AF37" strokeWidth="1" />
              
              {/* Lantern top */}
              <path d={`M${lantern.x - 8} ${lantern.y + 15} L${lantern.x} ${lantern.y + 10} L${lantern.x + 8} ${lantern.y + 15}`} fill={`url(#lantern-gold-${id})`} />
              
              {/* Lantern body */}
              <rect x={lantern.x - 10} y={lantern.y + 15} width="20" height="35" rx="2" fill="none" stroke={`url(#lantern-gold-${id})`} strokeWidth="2" />
              
              {/* Glass panels */}
              <rect x={lantern.x - 8} y={lantern.y + 17} width="16" height="31" rx="1" fill={`url(#lantern-glow-${id})`} />
              
              {/* Decorative bars */}
              <line x1={lantern.x} y1={lantern.y + 15} x2={lantern.x} y2={lantern.y + 50} stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
              <line x1={lantern.x - 10} y1={lantern.y + 32} x2={lantern.x + 10} y2={lantern.y + 32} stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
              
              {/* Lantern bottom */}
              <rect x={lantern.x - 10} y={lantern.y + 50} width="20" height="4" rx="1" fill={`url(#lantern-gold-${id})`} />
              
              {/* Inner glow */}
              <ellipse cx={lantern.x} cy={lantern.y + 35} rx="5" ry="8" fill="#FFF9E6" opacity="0.6" />
            </g>
          ))}
        </svg>
      );

    case 'aisle-runner':
      return (
        <svg viewBox="0 0 60 120" className="w-full h-full">
          <defs>
            <linearGradient id={`runner-main-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.9" />
              <stop offset="50%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id={`runner-trim-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8962E" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8962E" />
            </linearGradient>
          </defs>
          
          {/* Main runner */}
          <rect x="5" y="0" width="50" height="120" fill={`url(#runner-main-${id})`} />
          
          {/* Gold trim borders */}
          <rect x="5" y="0" width="3" height="120" fill={`url(#runner-trim-${id})`} />
          <rect x="52" y="0" width="3" height="120" fill={`url(#runner-trim-${id})`} />
          
          {/* Decorative pattern */}
          <rect x="10" y="5" width="40" height="110" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4" />
          
          {/* End tassels/fringe hint at top */}
          <rect x="5" y="0" width="50" height="4" fill="#D4AF37" opacity="0.6" />
          <rect x="5" y="116" width="50" height="4" fill="#D4AF37" opacity="0.6" />
          
          {/* Subtle pattern */}
          <line x1="10" y1="15" x2="50" y2="15" stroke="#D4AF37" strokeWidth="0.3" opacity="0.3" />
          <line x1="10" y1="105" x2="50" y2="105" stroke="#D4AF37" strokeWidth="0.3" opacity="0.3" />
        </svg>
      );

    case 'platform':
      return (
        <svg viewBox="0 0 180 40" className="w-full h-full">
          <defs>
            <linearGradient id={`platform-top-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} />
              <stop offset="30%" stopColor={fill} stopOpacity="0.95" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id={`platform-side-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.8" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.6" />
            </linearGradient>
            <filter id={`platform-shadow-${id}`}>
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Platform top surface */}
          <rect x="5" y="5" width="170" height="20" rx="2" fill={`url(#platform-top-${id})`} filter={`url(#platform-shadow-${id})`} />
          
          {/* Top surface highlight */}
          <rect x="5" y="5" width="170" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
          
          {/* Front face */}
          <rect x="5" y="24" width="170" height="12" rx="1" fill={`url(#platform-side-${id})`} />
          
          {/* Edge detail */}
          <line x1="5" y1="24" x2="175" y2="24" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          
          {/* Decorative trim */}
          <rect x="10" y="28" width="160" height="4" rx="0.5" fill="rgba(212,175,55,0.3)" />
        </svg>
      );

    case 'carpet':
      return (
        <svg viewBox="0 0 160 50" className="w-full h-full">
          <defs>
            <linearGradient id={`carpet-main-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.95" />
              <stop offset="50%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.9" />
            </linearGradient>
            <pattern id={`carpet-pattern-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="transparent" />
              <circle cx="10" cy="10" r="3" fill="#D4AF37" opacity="0.2" />
              <path d="M0 0 L5 5 M15 15 L20 20 M0 20 L5 15 M15 5 L20 0" stroke="#D4AF37" strokeWidth="0.5" opacity="0.15" />
            </pattern>
          </defs>
          
          {/* Main carpet */}
          <rect x="8" y="5" width="144" height="40" rx="3" fill={`url(#carpet-main-${id})`} />
          
          {/* Pattern overlay */}
          <rect x="8" y="5" width="144" height="40" rx="3" fill={`url(#carpet-pattern-${id})`} />
          
          {/* Border frames */}
          <rect x="12" y="9" width="136" height="32" rx="2" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />
          <rect x="18" y="13" width="124" height="24" rx="1" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
          
          {/* Center medallion */}
          <ellipse cx="80" cy="25" rx="18" ry="8" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
          <ellipse cx="80" cy="25" rx="10" ry="5" fill="#D4AF37" opacity="0.15" />
          
          {/* Fringe at ends */}
          <rect x="5" y="5" width="4" height="40" fill={fill} opacity="0.7" />
          <rect x="151" y="5" width="4" height="40" fill={fill} opacity="0.7" />
        </svg>
      );

    case 'steps':
      return (
        <svg viewBox="0 0 120 35" className="w-full h-full">
          <defs>
            <linearGradient id={`step-top-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.9" />
            </linearGradient>
            <filter id={`step-shadow-${id}`}>
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25"/>
            </filter>
          </defs>
          
          {/* Lower/wider step */}
          <rect x="10" y="20" width="100" height="12" rx="2" fill={`url(#step-top-${id})`} filter={`url(#step-shadow-${id})`} />
          <rect x="10" y="20" width="100" height="4" rx="1" fill="rgba(255,255,255,0.1)" />
          
          {/* Upper/narrower step */}
          <rect x="20" y="8" width="80" height="13" rx="2" fill={`url(#step-top-${id})`} filter={`url(#step-shadow-${id})`} />
          <rect x="20" y="8" width="80" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
          
          {/* Step face shadows */}
          <rect x="10" y="31" width="100" height="2" fill="rgba(0,0,0,0.1)" />
          <rect x="20" y="20" width="80" height="2" fill="rgba(0,0,0,0.08)" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <defs>
            <linearGradient id={`default-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="80" height="40" fill={`url(#default-grad-${id})`} rx="4" />
        </svg>
      );
  }
}
