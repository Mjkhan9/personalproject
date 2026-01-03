import { motion } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { useQuoteStore } from '../../store/quoteStore';

export function QuoteItem({ item }) {
  const { removeItem, updateQuantity } = useQuoteStore();
  const { id, name, price, quantity, maxQuantity } = item;

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      updateQuantity(id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    updateQuantity(id, quantity - 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className="group bg-neutral-light rounded-xl p-3 hover:bg-accent/20 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Item info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-neutral-dark truncate">
            {name}
          </h4>
          <p className="text-primary font-semibold mt-1">
            ${price}
            {quantity > 1 && (
              <span className="text-text-muted font-normal text-xs ml-1">
                × {quantity}
              </span>
            )}
          </p>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-2">
          {maxQuantity > 1 && (
            <div className="flex items-center gap-1 bg-white rounded-lg p-1">
              <button
                onClick={handleDecrement}
                className="w-6 h-6 rounded flex items-center justify-center hover:bg-neutral-light transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={handleIncrement}
                disabled={quantity >= maxQuantity}
                className="w-6 h-6 rounded flex items-center justify-center hover:bg-neutral-light transition-colors disabled:opacity-50"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {/* Remove button */}
          <button
            onClick={() => removeItem(id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Line total for quantities > 1 */}
      {quantity > 1 && (
        <div className="mt-2 pt-2 border-t border-neutral-dark/5 flex justify-between text-xs">
          <span className="text-text-muted">Line total:</span>
          <span className="font-semibold text-neutral-dark">${(price * quantity).toLocaleString()}</span>
        </div>
      )}
    </motion.div>
  );
}

