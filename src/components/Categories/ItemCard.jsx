import { motion } from 'framer-motion';
import { Plus, Check, Minus } from 'lucide-react';
import { useQuoteStore } from '../../store/quoteStore';

export function ItemCard({ item }) {
  const { addItem, removeItem, isItemSelected, getItemQuantity, updateQuantity } = useQuoteStore();
  const isSelected = isItemSelected(item.id);
  const quantity = getItemQuantity(item.id);

  const handleToggle = () => {
    if (isSelected) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    addItem(item);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={handleToggle}
      className={`
        relative group cursor-pointer rounded-lg overflow-hidden
        transition-all duration-300
        ${isSelected 
          ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/30' 
          : 'bg-white/5 border-2 border-white/10 hover:border-primary/40 shadow-md hover:shadow-lg backdrop-blur-sm'
        }
      `}
    >
      {/* Item Preview */}
      <div className="relative h-28 bg-gradient-to-br from-white/5 to-white/10 overflow-hidden">
        {/* SVG Preview of the item */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <ItemThumbnail item={item} />
        </div>
        
        {/* Selected overlay */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-primary/30 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg"
            >
              <Check className="w-5 h-5 text-neutral-dark" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Item Details */}
      <div className="p-3">
        <h4 className="font-medium text-sm text-white truncate mb-1">
          {item.name}
        </h4>
        <p className="text-xs text-white/50 line-clamp-2 h-8 mb-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-primary font-semibold">
            ${item.price}
          </span>
          
          {isSelected && item.maxQuantity > 1 ? (
            <div 
              className="flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDecrement}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-sm font-medium text-white">{quantity}</span>
              <button
                onClick={handleIncrement}
                disabled={quantity >= item.maxQuantity}
                className="w-6 h-6 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Plus className="w-3 h-3 text-neutral-dark" />
              </button>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                w-7 h-7 rounded-full flex items-center justify-center transition-colors
                ${isSelected 
                  ? 'bg-primary text-neutral-dark' 
                  : 'bg-white/10 text-white group-hover:bg-primary group-hover:text-neutral-dark'
                }
              `}
            >
              {isSelected ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Thumbnail SVG representations for each item type
function ItemThumbnail({ item }) {
  const color = item.color || '#D4AF37';
  
  switch (item.svgType) {
    case 'draping':
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <path
            d="M5 5 Q25 15, 50 5 Q75 -5, 95 5 L95 55 Q75 50, 50 55 Q25 60, 5 55 Z"
            fill={color}
            opacity="0.7"
          />
          <path
            d="M10 8 Q30 18, 50 8 Q70 -2, 90 8"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M10 20 Q30 30, 50 20 Q70 10, 90 20"
            stroke={color}
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
        </svg>
      );

    case 'fairy-lights':
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <path d="M5 5 Q50 15, 95 5" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
          {[15, 30, 45, 60, 75].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="8" x2={x} y2={20 + (i % 2) * 10} stroke="#D4AF37" strokeWidth="0.3" />
              <circle cx={x} cy={22 + (i % 2) * 10} r="3" fill="#FFF9E6" />
              <circle cx={x} cy={22 + (i % 2) * 10} r="2" fill="#D4AF37" opacity="0.6" />
            </g>
          ))}
        </svg>
      );

    case 'sequin':
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect x="5" y="5" width="90" height="50" fill={color} opacity="0.3" rx="2" />
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 12 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={10 + col * 7}
                cy={10 + row * 6}
                r="2"
                fill={color}
                opacity={0.3 + Math.random() * 0.5}
              />
            ))
          )}
        </svg>
      );

    case 'circular-arch':
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <path
            d="M15 75 L15 35 Q15 10, 50 10 Q85 10, 85 35 L85 75"
            stroke={color}
            strokeWidth="4"
            fill="none"
          />
        </svg>
      );

    case 'triple-arch':
      return (
        <svg viewBox="0 0 100 70" className="w-full h-full">
          <path d="M25 65 L25 35 Q25 15, 50 15 Q75 15, 75 35 L75 65" stroke={color} strokeWidth="3" fill="none" />
          <path d="M15 65 L15 40 Q15 10, 50 10 Q85 10, 85 40 L85 65" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M5 65 L5 45 Q5 5, 50 5 Q95 5, 95 45 L95 65" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" />
        </svg>
      );

    case 'hexagon':
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <polygon
            points="50,5 90,25 90,55 50,75 10,55 10,25"
            stroke={color}
            strokeWidth="3"
            fill="none"
          />
        </svg>
      );

    case 'rectangle-frame':
      return (
        <svg viewBox="0 0 100 70" className="w-full h-full">
          <rect x="15" y="5" width="70" height="60" stroke={color} strokeWidth="4" fill="none" rx="2" />
        </svg>
      );

    case 'sofa':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <rect x="5" y="20" width="90" height="25" rx="8" fill={color} />
          <rect x="10" y="15" width="20" height="15" rx="4" fill={color} opacity="0.8" />
          <rect x="70" y="15" width="20" height="15" rx="4" fill={color} opacity="0.8" />
          <rect x="5" y="25" width="90" height="8" rx="4" fill={color} opacity="0.6" />
          <circle cx="15" cy="48" r="3" fill="#D4AF37" />
          <circle cx="85" cy="48" r="3" fill="#D4AF37" />
        </svg>
      );

    case 'loveseat':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <rect x="15" y="22" width="70" height="22" rx="6" fill={color} />
          <rect x="18" y="18" width="15" height="12" rx="3" fill={color} opacity="0.8" />
          <rect x="67" y="18" width="15" height="12" rx="3" fill={color} opacity="0.8" />
          <circle cx="25" cy="47" r="2" fill="#D4AF37" />
          <circle cx="75" cy="47" r="2" fill="#D4AF37" />
        </svg>
      );

    case 'chair-pair':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {[20, 70].map((x, i) => (
            <g key={i}>
              <rect x={x - 12} y="15" width="24" height="25" rx="4" fill={color} />
              <rect x={x - 10} y="12" width="8" height="10" rx="2" fill={color} opacity="0.8" />
              <circle cx={x - 8} cy="43" r="2" fill="#D4AF37" />
              <circle cx={x + 8} cy="43" r="2" fill="#D4AF37" />
            </g>
          ))}
        </svg>
      );

    case 'cushions':
      return (
        <svg viewBox="0 0 100 30" className="w-full h-full">
          {[15, 30, 45, 55, 70, 85].map((x, i) => (
            <rect
              key={i}
              x={x - 8}
              y={8 + (i % 2) * 5}
              width="16"
              height="12"
              rx="4"
              fill={i % 2 === 0 ? color : '#F5F0E6'}
              opacity="0.9"
            />
          ))}
        </svg>
      );

    case 'arch-florals':
      return (
        <svg viewBox="0 0 100 70" className="w-full h-full">
          <g opacity="0.9">
            {[20, 35, 50, 65, 80].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={15 + Math.sin(i) * 5} r="8" fill={color} />
                <circle cx={x - 5} cy={20 + Math.cos(i) * 3} r="5" fill="#D4A5A5" />
                <circle cx={x + 5} cy={22 + Math.sin(i) * 4} r="6" fill="#F5F0E6" />
              </g>
            ))}
            {[15, 30, 70, 85].map((x, i) => (
              <circle key={`leaf-${i}`} cx={x} cy={30 + i * 2} r="4" fill="#8B9A7D" />
            ))}
          </g>
        </svg>
      );

    case 'sofa-florals':
      return (
        <svg viewBox="0 0 100 30" className="w-full h-full">
          <g>
            {[10, 25, 40, 60, 75, 90].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={15} r="6" fill={color} opacity="0.9" />
                <circle cx={x - 3} cy={18} r="4" fill="#D4A5A5" opacity="0.8" />
              </g>
            ))}
          </g>
        </svg>
      );

    case 'aisle-florals':
      return (
        <svg viewBox="0 0 100 25" className="w-full h-full">
          {[15, 40, 60, 85].map((x, i) => (
            <g key={i}>
              <rect x={x - 8} y="5" width="16" height="15" fill="rgba(255,255,255,0.5)" stroke="#D4AF37" strokeWidth="0.5" />
              <circle cx={x} cy={12} r="5" fill={color} />
              <circle cx={x - 4} cy={14} r="3" fill="#D4A5A5" />
              <circle cx={x + 4} cy={13} r="3" fill="#F5F0E6" />
            </g>
          ))}
        </svg>
      );

    case 'centerpieces':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {[30, 70].map((x, i) => (
            <g key={i}>
              <rect x={x - 3} y="30" width="6" height="15" fill="#D4AF37" />
              <circle cx={x} cy={20} r="10" fill={color} />
              <circle cx={x - 6} cy={18} r="6" fill="#D4A5A5" />
              <circle cx={x + 6} cy={22} r="5" fill="#F5F0E6" />
              <circle cx={x} cy={12} r="4" fill="#8B9A7D" />
            </g>
          ))}
        </svg>
      );

    case 'pillar-candles':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {[25, 50, 75].map((x, i) => (
            <g key={i}>
              <rect x={x - 4} y={40 - i * 8} width="8" height={10 + i * 8} fill="#FFF9E6" rx="1" />
              <ellipse cx={x} cy={38 - i * 8} rx="4" ry="2" fill="#FFE4B5" />
              <ellipse cx={x} cy={36 - i * 8} rx="2" ry="4" fill="#FFD700" opacity="0.8" />
              <rect x={x - 6} y="45" width="12" height="3" fill="#D4AF37" rx="1" />
            </g>
          ))}
        </svg>
      );

    case 'candle-cluster':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {[[30, 35], [45, 28], [55, 32], [70, 38]].map(([x, h], i) => (
            <g key={i}>
              <rect x={x - 3} y={50 - h} width="6" height={h - 5} fill="#FFF9E6" rx="1" />
              <ellipse cx={x} cy={47 - h} rx="2" ry="3" fill="#FFD700" opacity="0.8" />
            </g>
          ))}
        </svg>
      );

    case 'uplighting':
      return (
        <svg viewBox="0 0 100 20" className="w-full h-full">
          {[15, 35, 65, 85].map((x, i) => (
            <g key={i}>
              <rect x={x - 4} y="12" width="8" height="6" fill="#333" rx="1" />
              <path d={`M${x} 12 L${x - 8} 0 L${x + 8} 0 Z`} fill={color} opacity="0.4" />
            </g>
          ))}
        </svg>
      );

    case 'string-lights':
      return (
        <svg viewBox="0 0 100 30" className="w-full h-full">
          <path d="M0 10 Q25 20, 50 10 Q75 0, 100 10" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
          {[10, 25, 40, 55, 70, 85].map((x, i) => (
            <circle key={i} cx={x} cy={10 + Math.sin(i) * 5} r="2" fill="#FFF9E6" />
          ))}
        </svg>
      );

    case 'gold-panels':
      return (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {[25, 75].map((x, i) => (
            <g key={i}>
              <rect x={x - 15} y="5" width="30" height="40" fill="none" stroke={color} strokeWidth="2" rx="2" />
              <rect x={x - 12} y="8" width="24" height="34" fill="none" stroke={color} strokeWidth="1" rx="1" opacity="0.5" />
              <circle cx={x} cy="25" r="8" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
            </g>
          ))}
        </svg>
      );

    case 'mirror':
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <ellipse cx="50" cy="30" rx="25" ry="25" fill="none" stroke={color} strokeWidth="4" />
          <ellipse cx="50" cy="30" rx="20" ry="20" fill="#E8E8E8" opacity="0.5" />
          <ellipse cx="45" cy="25" rx="5" ry="8" fill="white" opacity="0.4" />
        </svg>
      );

    case 'lanterns':
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          {[25, 50, 75].map((x, i) => (
            <g key={i}>
              <rect x={x - 8} y={15 + i * 5} width="16" height={25 - i * 3} fill="none" stroke={color} strokeWidth="1.5" rx="2" />
              <rect x={x - 6} y={18 + i * 5} width="12" height={19 - i * 3} fill={color} opacity="0.2" rx="1" />
              <line x1={x} y1={10 + i * 5} x2={x} y2={15 + i * 5} stroke={color} strokeWidth="1" />
              <circle cx={x} cy={8 + i * 5} r="2" fill={color} />
            </g>
          ))}
        </svg>
      );

    case 'aisle-runner':
      return (
        <svg viewBox="0 0 100 40" className="w-full h-full">
          <rect x="30" y="5" width="40" height="30" fill={color} rx="1" />
          <rect x="32" y="7" width="36" height="26" fill="none" stroke="#D4AF37" strokeWidth="1" rx="1" />
          <line x1="35" y1="10" x2="65" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
          <line x1="35" y1="30" x2="65" y2="30" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
        </svg>
      );

    case 'platform':
      return (
        <svg viewBox="0 0 100 30" className="w-full h-full">
          <rect x="5" y="10" width="90" height="15" fill={color} rx="2" />
          <rect x="5" y="10" width="90" height="4" fill="rgba(0,0,0,0.05)" rx="1" />
          <line x1="10" y1="25" x2="10" y2="28" stroke="#ccc" strokeWidth="2" />
          <line x1="90" y1="25" x2="90" y2="28" stroke="#ccc" strokeWidth="2" />
        </svg>
      );

    case 'carpet':
      return (
        <svg viewBox="0 0 100 35" className="w-full h-full">
          <rect x="10" y="5" width="80" height="25" fill={color} rx="2" />
          <rect x="15" y="8" width="70" height="19" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
          <rect x="20" y="11" width="60" height="13" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );

    case 'steps':
      return (
        <svg viewBox="0 0 100 25" className="w-full h-full">
          <rect x="20" y="15" width="60" height="8" fill={color} rx="1" />
          <rect x="25" y="8" width="50" height="8" fill={color} rx="1" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect x="20" y="15" width="60" height="30" fill={color} opacity="0.5" rx="4" />
        </svg>
      );
  }
}

