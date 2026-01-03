import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, ShoppingBag } from 'lucide-react';
import { MainLayout } from './components/Layout/MainLayout';
import { CategorySidebar } from './components/Categories/CategorySidebar';
import { MobileCategories } from './components/Categories/MobileCategories';
import { StagePreview } from './components/Stage/StagePreview';
import { QuoteSummary } from './components/Quote/QuoteSummary';
import { MobileQuoteDrawer } from './components/Quote/MobileQuoteDrawer';
import { useTotalItemCount, useSubtotal } from './store/quoteStore';

function App() {
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isMobileQuoteOpen, setIsMobileQuoteOpen] = useState(false);
  
  const totalItems = useTotalItemCount();
  const subtotal = useSubtotal();

  return (
    <MainLayout>
      {/* Desktop Layout - Redesigned for larger stage preview */}
      <div className="hidden lg:grid h-[calc(100vh-160px)] max-w-[1920px] mx-auto p-3 gap-3" 
           style={{ gridTemplateColumns: '280px 1fr 300px' }}>
        {/* Left Panel - Categories (narrower) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden"
        >
          <CategorySidebar />
        </motion.div>

        {/* Center Panel - Stage Preview (MUCH LARGER) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="min-w-0 h-full"
        >
          <StagePreview />
        </motion.div>

        {/* Right Panel - Quote Summary (narrower) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden"
        >
          <QuoteSummary />
        </motion.div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col h-[calc(100vh-140px)]">
        {/* Stage Preview */}
        <div className="flex-1 p-3 pb-0">
          <StagePreview />
        </div>

        {/* Mobile Bottom Bar */}
        <div className="p-3 bg-white border-t border-neutral-light flex gap-2">
          {/* Browse Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileCategoriesOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-dark text-white rounded-xl font-medium"
          >
            <Grid3X3 className="w-5 h-5" />
            Browse Decor
          </motion.button>

          {/* Quote Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileQuoteOpen(true)}
            className="flex-1 relative flex items-center justify-center gap-2 py-3 bg-primary text-neutral-dark rounded-xl font-medium"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 ? (
              <span>${subtotal.toLocaleString()}</span>
            ) : (
              <span>Quote</span>
            )}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-dark text-white text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Modals */}
      <MobileCategories 
        isOpen={isMobileCategoriesOpen} 
        onClose={() => setIsMobileCategoriesOpen(false)} 
      />
      <MobileQuoteDrawer 
        isOpen={isMobileQuoteOpen} 
        onClose={() => setIsMobileQuoteOpen(false)} 
      />
    </MainLayout>
  );
}

export default App;
