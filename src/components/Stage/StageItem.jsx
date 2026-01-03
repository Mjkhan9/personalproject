import { motion } from 'framer-motion';
import { useQuoteStore } from '../../store/quoteStore';
import { X } from 'lucide-react';
import { useState } from 'react';

export function StageItem({ item }) {
  const removeItem = useQuoteStore((state) => state.removeItem);
  const [isHovered, setIsHovered] = useState(false);

  const { stagePosition, layer, color, svgType, name, quantity } = item;
  
  // Calculate actual position styles
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
      {/* Item SVG */}
      <div className="w-full h-full">
        <StageSVG type={svgType} color={color} quantity={quantity} />
      </div>

      {/* Hover tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 -top-8 bg-neutral-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 flex items-center gap-2"
        >
          {name}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item.id);
            }}
            className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// SVG components for stage visualization
function StageSVG({ type, color, quantity = 1 }) {
  const fill = color || '#D4AF37';
  
  switch (type) {
    case 'draping':
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`drape-grad-${fill}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.9" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 Q25 10, 50 0 Q75 -10, 100 0 L100 60 Q75 55, 50 60 Q25 65, 0 60 Z"
            fill={`url(#drape-grad-${fill})`}
          />
          {/* Pleating lines */}
          {[15, 30, 45, 60, 75, 90].map((x) => (
            <path
              key={x}
              d={`M${x} 0 Q${x + 2} 30, ${x} 60`}
              stroke={fill === '#1a1a1a' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
              strokeWidth="0.5"
              fill="none"
            />
          ))}
        </svg>
      );

    case 'fairy-lights':
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Multiple draped string rows */}
          {[0, 15, 30, 45].map((yOffset) => (
            <g key={yOffset}>
              <path 
                d={`M0 ${5 + yOffset} Q25 ${15 + yOffset}, 50 ${5 + yOffset} Q75 ${-5 + yOffset}, 100 ${5 + yOffset}`}
                stroke="#D4AF37" 
                strokeWidth="0.3" 
                fill="none" 
              />
              {[10, 25, 40, 55, 70, 85].map((x, i) => (
                <g key={`${yOffset}-${i}`}>
                  <line 
                    x1={x} 
                    y1={5 + yOffset + Math.sin(i) * 3} 
                    x2={x} 
                    y2={12 + yOffset + (i % 3) * 4} 
                    stroke="#D4AF37" 
                    strokeWidth="0.2" 
                  />
                  <circle 
                    cx={x} 
                    cy={14 + yOffset + (i % 3) * 4} 
                    r="2" 
                    fill="#FFF9E6"
                    filter="url(#glow)"
                  />
                </g>
              ))}
            </g>
          ))}
        </svg>
      );

    case 'sequin':
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
          <rect x="0" y="0" width="100" height="60" fill={fill} opacity="0.6" />
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 18 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={3 + col * 5.5}
                cy={3 + row * 5}
                r="1.5"
                fill={fill}
                opacity={0.4 + Math.random() * 0.6}
              />
            ))
          )}
        </svg>
      );

    case 'circular-arch':
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <defs>
            <linearGradient id="arch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.8" />
              <stop offset="50%" stopColor={fill} stopOpacity="1" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M10 78 L10 35 Q10 5, 50 5 Q90 5, 90 35 L90 78"
            stroke="url(#arch-grad)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'triple-arch':
      return (
        <svg viewBox="0 0 100 70" className="w-full h-full">
          <path d="M5 68 L5 40 Q5 3, 50 3 Q95 3, 95 40 L95 68" stroke={fill} strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M15 68 L15 38 Q15 8, 50 8 Q85 8, 85 38 L85 68" stroke={fill} strokeWidth="3" fill="none" opacity="0.7" />
          <path d="M25 68 L25 36 Q25 13, 50 13 Q75 13, 75 36 L75 68" stroke={fill} strokeWidth="4" fill="none" />
        </svg>
      );

    case 'hexagon':
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <polygon
            points="50,2 95,22 95,58 50,78 5,58 5,22"
            stroke={fill}
            strokeWidth="4"
            fill="none"
          />
        </svg>
      );

    case 'rectangle-frame':
      return (
        <svg viewBox="0 0 100 70" className="w-full h-full">
          <rect x="8" y="3" width="84" height="64" stroke={fill} strokeWidth="5" fill="none" rx="3" />
        </svg>
      );

    case 'sofa':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient id="sofa-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Back */}
          <rect x="5" y="5" width="90" height="20" rx="6" fill="url(#sofa-grad)" />
          {/* Seat */}
          <rect x="5" y="22" width="90" height="18" rx="5" fill={fill} opacity="0.9" />
          {/* Arms */}
          <rect x="2" y="8" width="12" height="28" rx="4" fill={fill} />
          <rect x="86" y="8" width="12" height="28" rx="4" fill={fill} />
          {/* Cushion lines */}
          <line x1="35" y1="24" x2="35" y2="38" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <line x1="65" y1="24" x2="65" y2="38" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          {/* Legs */}
          <circle cx="18" cy="45" r="3" fill="#D4AF37" />
          <circle cx="82" cy="45" r="3" fill="#D4AF37" />
        </svg>
      );

    case 'loveseat':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <rect x="10" y="8" width="80" height="18" rx="5" fill={fill} />
          <rect x="10" y="23" width="80" height="15" rx="4" fill={fill} opacity="0.9" />
          <rect x="6" y="12" width="12" height="24" rx="4" fill={fill} />
          <rect x="82" y="12" width="12" height="24" rx="4" fill={fill} />
          <line x1="50" y1="25" x2="50" y2="36" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <circle cx="22" cy="42" r="2.5" fill="#D4AF37" />
          <circle cx="78" cy="42" r="2.5" fill="#D4AF37" />
        </svg>
      );

    case 'chair-pair':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {[22, 78].map((x, i) => (
            <g key={i}>
              <rect x={x - 14} y="8" width="28" height="28" rx="5" fill={fill} />
              <rect x={x - 12} y="5" width="10" height="14" rx="3" fill={fill} opacity="0.8" />
              <circle cx={x - 9} cy="42" r="2.5" fill="#D4AF37" />
              <circle cx={x + 9} cy="42" r="2.5" fill="#D4AF37" />
            </g>
          ))}
        </svg>
      );

    case 'cushions':
      return (
        <svg viewBox="0 0 100 30" className="w-full h-full">
          {[12, 28, 44, 56, 72, 88].map((x, i) => (
            <rect
              key={i}
              x={x - 10}
              y={6 + (i % 2) * 6}
              width="20"
              height="14"
              rx="5"
              fill={i % 2 === 0 ? fill : '#F5F0E6'}
            />
          ))}
        </svg>
      );

    case 'arch-florals':
      return (
        <svg viewBox="0 0 100 70" className="w-full h-full">
          <defs>
            <filter id="floral-shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2"/>
            </filter>
          </defs>
          {/* Top cluster */}
          <g filter="url(#floral-shadow)">
            {[30, 42, 50, 58, 70].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={10 + Math.sin(i) * 3} r={8 - i % 2} fill={fill} />
                <circle cx={x - 4} cy={14 + Math.cos(i) * 2} r={5} fill="#D4A5A5" />
                <circle cx={x + 4} cy={16} r={4} fill="#FEFEFE" opacity="0.9" />
              </g>
            ))}
          </g>
          {/* Side cascades */}
          {[
            { x: 15, startY: 20 },
            { x: 85, startY: 20 }
          ].map((side, si) => (
            <g key={si}>
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <circle cx={side.x + (si === 0 ? i * 3 : -i * 3)} cy={side.startY + i * 12} r={6 - i * 0.5} fill={fill} />
                  <circle cx={side.x + (si === 0 ? i * 3 + 3 : -i * 3 - 3)} cy={side.startY + i * 12 + 4} r={4} fill="#D4A5A5" />
                </g>
              ))}
            </g>
          ))}
          {/* Greenery accents */}
          {[20, 35, 65, 80].map((x, i) => (
            <ellipse key={i} cx={x} cy={22 + (i % 2) * 5} rx={4} ry={6} fill="#8B9A7D" opacity="0.8" />
          ))}
        </svg>
      );

    case 'sofa-florals':
      return (
        <svg viewBox="0 0 100 30" className="w-full h-full">
          <g>
            {[8, 22, 38, 62, 78, 92].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={15} r={7} fill={fill} />
                <circle cx={x - 4} cy={18} r={4} fill="#D4A5A5" />
                <circle cx={x + 4} cy={12} r={3} fill="#FEFEFE" opacity="0.9" />
                <ellipse cx={x + 6} cy={20} rx={3} ry={4} fill="#8B9A7D" opacity="0.7" />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'aisle-florals':
      return (
        <svg viewBox="0 0 100 25" className="w-full h-full">
          {[12, 37, 63, 88].map((x, i) => (
            <g key={i}>
              <rect x={x - 10} y="4" width="20" height="18" fill="rgba(255,255,255,0.3)" stroke="#D4AF37" strokeWidth="0.5" rx="1" />
              <circle cx={x} cy={13} r={6} fill={fill} />
              <circle cx={x - 5} cy={15} r={4} fill="#D4A5A5" />
              <circle cx={x + 5} cy={11} r={3.5} fill="#FEFEFE" opacity="0.9" />
            </g>
          ))}
        </svg>
      );

    case 'centerpieces':
      return (
        <svg viewBox="0 0 100 55" className="w-full h-full">
          {[28, 72].map((x, i) => (
            <g key={i}>
              {/* Vase */}
              <path d={`M${x - 4} 55 L${x - 6} 40 L${x + 6} 40 L${x + 4} 55 Z`} fill="#D4AF37" />
              <ellipse cx={x} cy="40" rx="7" ry="3" fill="#D4AF37" />
              {/* Flowers */}
              <circle cx={x} cy={22} r={10} fill={fill} />
              <circle cx={x - 8} cy={18} r={7} fill="#D4A5A5" />
              <circle cx={x + 8} cy={20} r={6} fill="#FEFEFE" opacity="0.9" />
              <circle cx={x} cy={12} r={5} fill="#8B9A7D" />
              <circle cx={x - 5} cy={28} r={4} fill={fill} opacity="0.8" />
              <circle cx={x + 6} cy={30} r={4} fill="#D4A5A5" opacity="0.8" />
            </g>
          ))}
        </svg>
      );

    case 'pillar-candles':
      const candlePositions = quantity >= 2 ? [25, 50, 75] : [50];
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <defs>
            <filter id="flame-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {candlePositions.map((x, i) => (
            <g key={i}>
              {/* Stand */}
              <rect x={x - 8} y="50" width="16" height="6" fill="#D4AF37" rx="1" />
              {/* Candle */}
              <rect x={x - 5} y={20 + i * 5} width="10" height={30 - i * 5} fill="#FFF9E6" rx="2" />
              {/* Flame */}
              <ellipse cx={x} cy={16 + i * 5} rx="3" ry="6" fill="#FFD700" filter="url(#flame-glow)" />
              <ellipse cx={x} cy={14 + i * 5} rx="1.5" ry="3" fill="#FFF" opacity="0.8" />
            </g>
          ))}
        </svg>
      );

    case 'candle-cluster':
      return (
        <svg viewBox="0 0 100 55" className="w-full h-full">
          <defs>
            <filter id="cluster-glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {[[25, 38], [40, 28], [55, 33], [70, 40], [50, 42]].map(([x, h], i) => (
            <g key={i}>
              <rect x={x - 4} y={55 - h} width="8" height={h - 8} fill="#FFF9E6" rx="1" />
              <ellipse cx={x} cy={45 - h} rx="2.5" ry="5" fill="#FFD700" filter="url(#cluster-glow)" />
            </g>
          ))}
        </svg>
      );

    case 'uplighting':
      return (
        <svg viewBox="0 0 100 25" className="w-full h-full">
          <defs>
            <linearGradient id="uplight-beam" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.8" />
              <stop offset="100%" stopColor={fill} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[12, 37, 63, 88].map((x, i) => (
            <g key={i}>
              <rect x={x - 5} y="18" width="10" height="6" fill="#333" rx="1" />
              <path d={`M${x} 18 L${x - 12} 0 L${x + 12} 0 Z`} fill="url(#uplight-beam)" />
            </g>
          ))}
        </svg>
      );

    case 'string-lights':
      return (
        <svg viewBox="0 0 100 25" className="w-full h-full">
          <defs>
            <filter id="string-glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M0 8 Q25 18, 50 8 Q75 -2, 100 8" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
          <path d="M0 15 Q25 5, 50 15 Q75 25, 100 15" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
          {[8, 22, 36, 50, 64, 78, 92].map((x, i) => (
            <circle key={i} cx={x} cy={8 + Math.sin(i) * 4} r="2.5" fill="#FFF9E6" filter="url(#string-glow)" />
          ))}
          {[15, 29, 43, 57, 71, 85].map((x, i) => (
            <circle key={`b-${i}`} cx={x} cy={15 + Math.cos(i) * 4} r="2" fill="#FFF9E6" filter="url(#string-glow)" />
          ))}
        </svg>
      );

    case 'gold-panels':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {[25, 75].map((x, i) => (
            <g key={i}>
              <rect x={x - 18} y="3" width="36" height="44" fill="none" stroke={fill} strokeWidth="2" rx="2" />
              <rect x={x - 14} y="7" width="28" height="36" fill="none" stroke={fill} strokeWidth="1" rx="1" opacity="0.6" />
              <circle cx={x} cy="25" r="10" fill="none" stroke={fill} strokeWidth="1" opacity="0.5" />
              {/* Decorative corner details */}
              <path d={`M${x - 14} 7 L${x - 8} 13`} stroke={fill} strokeWidth="0.5" opacity="0.5" />
              <path d={`M${x + 14} 7 L${x + 8} 13`} stroke={fill} strokeWidth="0.5" opacity="0.5" />
              <path d={`M${x - 14} 43 L${x - 8} 37`} stroke={fill} strokeWidth="0.5" opacity="0.5" />
              <path d={`M${x + 14} 43 L${x + 8} 37`} stroke={fill} strokeWidth="0.5" opacity="0.5" />
            </g>
          ))}
        </svg>
      );

    case 'mirror':
      return (
        <svg viewBox="0 0 100 70" className="w-full h-full">
          <ellipse cx="50" cy="35" rx="30" ry="30" fill="none" stroke={fill} strokeWidth="5" />
          <ellipse cx="50" cy="35" rx="25" ry="25" fill="#E8E8E8" opacity="0.4" />
          <ellipse cx="42" cy="28" rx="8" ry="12" fill="white" opacity="0.3" />
        </svg>
      );

    case 'lanterns':
      return (
        <svg viewBox="0 0 100 70" className="w-full h-full">
          {[25, 50, 75].map((x, i) => (
            <g key={i}>
              {/* Hook */}
              <line x1={x} y1={5 + i * 5} x2={x} y2={12 + i * 5} stroke={fill} strokeWidth="1" />
              <circle cx={x} cy={4 + i * 5} r="2" fill={fill} />
              {/* Lantern body */}
              <rect x={x - 10} y={14 + i * 5} width="20" height={28 - i * 3} fill="none" stroke={fill} strokeWidth="2" rx="2" />
              <rect x={x - 8} y={16 + i * 5} width="16" height={24 - i * 3} fill={fill} opacity="0.15" rx="1" />
              {/* Inner glow */}
              <ellipse cx={x} cy={26 + i * 5} rx="4" ry="6" fill="#FFF9E6" opacity="0.6" />
              {/* Decorative bars */}
              <line x1={x} y1={14 + i * 5} x2={x} y2={42 + i * 2} stroke={fill} strokeWidth="0.5" opacity="0.5" />
            </g>
          ))}
        </svg>
      );

    case 'aisle-runner':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient id="runner-grad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor={fill} stopOpacity="0.6" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <rect x="25" y="2" width="50" height="46" fill="url(#runner-grad)" rx="2" />
          <rect x="28" y="5" width="44" height="40" fill="none" stroke="#D4AF37" strokeWidth="1" rx="1" />
          <line x1="32" y1="10" x2="68" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
          <line x1="32" y1="40" x2="68" y2="40" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
        </svg>
      );

    case 'platform':
      return (
        <svg viewBox="0 0 100 35" className="w-full h-full">
          <defs>
            <linearGradient id="platform-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fill} />
              <stop offset="100%" stopColor={fill} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          {/* Platform top */}
          <rect x="3" y="8" width="94" height="18" fill="url(#platform-grad)" rx="2" />
          {/* Highlight */}
          <rect x="3" y="8" width="94" height="5" fill="rgba(255,255,255,0.1)" rx="2" />
          {/* Shadow edge */}
          <rect x="3" y="24" width="94" height="3" fill="rgba(0,0,0,0.1)" />
          {/* Side */}
          <rect x="3" y="26" width="94" height="6" fill={fill} opacity="0.7" rx="1" />
        </svg>
      );

    case 'carpet':
      return (
        <svg viewBox="0 0 100 40" className="w-full h-full">
          <rect x="5" y="3" width="90" height="34" fill={fill} rx="2" />
          {/* Pattern */}
          <rect x="10" y="7" width="80" height="26" fill="none" stroke="#D4AF37" strokeWidth="1.5" rx="1" />
          <rect x="15" y="11" width="70" height="18" fill="none" stroke="#D4AF37" strokeWidth="0.8" rx="1" opacity="0.6" />
          {/* Center medallion */}
          <ellipse cx="50" cy="20" rx="12" ry="6" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
        </svg>
      );

    case 'steps':
      return (
        <svg viewBox="0 0 100 30" className="w-full h-full">
          {/* Lower step */}
          <rect x="15" y="18" width="70" height="10" fill={fill} rx="1" />
          <rect x="15" y="18" width="70" height="3" fill="rgba(255,255,255,0.1)" rx="1" />
          {/* Upper step */}
          <rect x="22" y="8" width="56" height="11" fill={fill} rx="1" />
          <rect x="22" y="8" width="56" height="3" fill="rgba(255,255,255,0.15)" rx="1" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect x="10" y="10" width="80" height="40" fill={fill} opacity="0.5" rx="4" />
        </svg>
      );
  }
}

