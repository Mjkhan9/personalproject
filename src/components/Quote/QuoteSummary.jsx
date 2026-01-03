import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronUp, Send } from 'lucide-react';
import { useSelectedItemsArray, useTotalItemCount, useSubtotal } from '../../store/quoteStore';
import { QuoteItem } from './QuoteItem';
import { QuoteTotal } from './QuoteTotal';
import { QuoteForm } from './QuoteForm';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';

export function QuoteSummary() {
  const selectedItems = useSelectedItemsArray();
  const totalItems = useTotalItemCount();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const hasItems = selectedItems.length > 0;

  return (
    <>
      <div className="h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-neutral-dark to-neutral-dark/90 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-semibold">Your Quote</h2>
                <p className="text-xs text-white/60">
                  {hasItems ? `${totalItems} item${totalItems > 1 ? 's' : ''} selected` : 'No items yet'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="popLayout">
            {hasItems ? (
              <motion.div layout className="space-y-3">
                {selectedItems.map((item) => (
                  <QuoteItem key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-neutral-light flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-text-muted" />
                </div>
                <p className="text-text-muted text-sm">
                  Your selections will appear here
                </p>
                <p className="text-text-muted/70 text-xs mt-1">
                  Click items from the categories to add them
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Total & Actions */}
        <div className="border-t border-neutral-light">
          <QuoteTotal />
          
          <div className="px-4 pb-4">
            <Button
              onClick={() => setIsFormOpen(true)}
              disabled={!hasItems}
              className="w-full"
              size="lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Get Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Quote Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Request Your Quote"
        size="lg"
      >
        <QuoteForm onClose={() => setIsFormOpen(false)} />
      </Modal>
    </>
  );
}

// Mobile floating summary button
export function MobileQuoteSummary({ onClick }) {
  const totalItems = useTotalItemCount();
  const subtotal = useSubtotal();

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-neutral-dark text-white p-4 shadow-2xl lg:hidden z-30"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-neutral-dark text-xs font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">View Quote</p>
            <p className="text-xs text-white/60">{totalItems} items</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-primary">${subtotal.toLocaleString()}</span>
          <ChevronUp className="w-5 h-5" />
        </div>
      </button>
    </motion.div>
  );
}
