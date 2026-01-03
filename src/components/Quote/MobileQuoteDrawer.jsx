import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShoppingBag } from 'lucide-react';
import { useSelectedItemsArray, useTotalItemCount } from '../../store/quoteStore';
import { QuoteItem } from './QuoteItem';
import { QuoteTotal } from './QuoteTotal';
import { QuoteForm } from './QuoteForm';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';

export function MobileQuoteDrawer({ isOpen, onClose }) {
  const selectedItems = useSelectedItemsArray();
  const totalItems = useTotalItemCount();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const hasItems = selectedItems.length > 0;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 lg:hidden max-h-[85vh] flex flex-col"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-neutral-light rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-4 border-b border-neutral-light">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-semibold">Your Quote</h2>
                    <p className="text-xs text-text-muted">
                      {hasItems ? `${totalItems} item${totalItems > 1 ? 's' : ''} selected` : 'No items yet'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-neutral-light flex items-center justify-center hover:bg-accent/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {hasItems ? (
                  <div className="space-y-3">
                    {selectedItems.map((item) => (
                      <QuoteItem key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-neutral-light flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-text-muted" />
                    </div>
                    <p className="text-text-muted text-sm">
                      Your selections will appear here
                    </p>
                  </div>
                )}
              </div>

              {/* Total & Actions */}
              <div className="border-t border-neutral-light bg-white">
                <QuoteTotal />
                
                <div className="px-4 pb-6 flex gap-3">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex-1"
                  >
                    Continue
                  </Button>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    disabled={!hasItems}
                    className="flex-1"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Get Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quote Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Request Your Quote"
        size="lg"
      >
        <QuoteForm onClose={() => {
          setIsFormOpen(false);
          onClose();
        }} />
      </Modal>
    </>
  );
}
