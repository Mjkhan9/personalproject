import { motion } from 'framer-motion';
import { useSubtotal, useTotalItemCount } from '../../store/quoteStore';
import { Info } from 'lucide-react';

export function QuoteTotal() {
  const subtotal = useSubtotal();
  const totalItems = useTotalItemCount();

  // Placeholder delivery fee
  const deliveryFee = subtotal > 0 ? 150 : 0;
  // Placeholder tax (NJ 6.625%)
  const taxRate = 0.06625;
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  
  const total = subtotal + deliveryFee + tax;

  if (totalItems === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-3xl font-serif font-semibold text-neutral-dark">$0</p>
        <p className="text-xs text-text-muted mt-1">Add items to see total</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
    >
      {/* Subtotal */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-text-muted">Subtotal</span>
        <span className="font-medium">${subtotal.toLocaleString()}</span>
      </div>

      {/* Delivery */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-text-muted flex items-center gap-1">
          Delivery
          <span className="group relative">
            <Info className="w-3.5 h-3.5 text-text-muted/50 cursor-help" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Estimate for NJ/NY area
            </span>
          </span>
        </span>
        <span className="font-medium">${deliveryFee}</span>
      </div>

      {/* Tax */}
      <div className="flex justify-between text-sm mb-3">
        <span className="text-text-muted">Est. Tax (6.625%)</span>
        <span className="font-medium">${tax.toLocaleString()}</span>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-dark/10 my-3" />

      {/* Total */}
      <div className="flex justify-between items-end">
        <span className="text-text-muted">Estimated Total</span>
        <div className="text-right">
          <motion.span
            key={total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-serif font-bold text-primary block"
          >
            ${total.toLocaleString()}
          </motion.span>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-text-muted/70 mt-3 leading-relaxed">
        * Final pricing may vary based on venue, date availability, and additional customizations. 
        This quote is an estimate and will be confirmed by our team.
      </p>
    </motion.div>
  );
}
