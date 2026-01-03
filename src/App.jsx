import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, ShoppingBag, X, Sparkles } from 'lucide-react';
import { MainLayout } from './components/Layout/MainLayout';
import { CategorySidebar } from './components/Categories/CategorySidebar';
import { MobileCategories } from './components/Categories/MobileCategories';
import { StagePreview } from './components/Stage/StagePreview';
import { QuoteSummary } from './components/Quote/QuoteSummary';
import { MobileQuoteDrawer } from './components/Quote/MobileQuoteDrawer';
import { InspirationGallery } from './components/Gallery/InspirationGallery';
import { useTotalItemCount, useSubtotal } from './store/quoteStore';

function App() {
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isMobileQuoteOpen, setIsMobileQuoteOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [isDesktopQuoteOpen, setIsDesktopQuoteOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const totalItems = useTotalItemCount();
  const subtotal = useSubtotal();

  return (
    <MainLayout>
      {/* Desktop Layout - Preview Dominant */}
      <div className="hidden lg:block h-[calc(100vh-140px)] relative">
        {/* Main Stage Preview - Takes full screen */}
        <div className="h-full">
          <StagePreview />
        </div>

        {/* Floating Item Browser - Slides in from left */}
        <motion.div
          initial={false}
          animate={{
            x: isDesktopSidebarOpen ? 0 : -380,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute left-0 top-0 bottom-0 w-[380px] bg-neutral-dark/95 backdrop-blur-lg border-r border-primary/20 shadow-2xl z-40 overflow-hidden"
        >
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/10">
              <h2 className="text-xl font-serif text-primary">Browse Decor</h2>
              <button
                onClick={() => setIsDesktopSidebarOpen(false)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>
            
            {/* Categories */}
            <div className="flex-1 overflow-y-auto">
              <CategorySidebar />
            </div>
          </div>
        </motion.div>

        {/* Floating Quote Panel - Slides in from right */}
        <motion.div
          initial={false}
          animate={{
            x: isDesktopQuoteOpen ? 0 : 360,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute right-0 top-0 bottom-0 w-[360px] bg-neutral-dark/95 backdrop-blur-lg border-l border-primary/20 shadow-2xl z-40 overflow-hidden"
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-primary/10">
              <h2 className="text-xl font-serif text-primary">Your Quote</h2>
              <button
                onClick={() => setIsDesktopQuoteOpen(false)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <QuoteSummary />
            </div>
          </div>
        </motion.div>

        {/* Floating Action Buttons - Bottom Center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {/* Inspiration Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsGalleryOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-medium shadow-lg hover:bg-white/20 transition-all"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Inspiration</span>
          </motion.button>

          {/* Browse Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-neutral-dark rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            <Grid3X3 className="w-5 h-5" />
            <span>Browse Items</span>
            {totalItems > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-neutral-dark text-primary text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </motion.button>

          {/* Quote Button */}
          {totalItems > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDesktopQuoteOpen(!isDesktopQuoteOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-primary/30 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>View Quote</span>
              <span className="text-primary font-bold">${subtotal.toLocaleString()}</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col h-[calc(100vh-140px)]">
        {/* Stage Preview - Full height */}
        <div className="flex-1 overflow-hidden">
          <StagePreview />
        </div>

        {/* Mobile Bottom Bar */}
        <div className="p-3 bg-neutral-dark border-t border-primary/20 flex gap-2">
          {/* Inspiration Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsGalleryOpen(true)}
            className="p-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl"
          >
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.button>

          {/* Browse Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileCategoriesOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-neutral-dark rounded-xl font-medium"
          >
            <Grid3X3 className="w-5 h-5" />
            Browse
          </motion.button>

          {/* Quote Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileQuoteOpen(true)}
            className="flex-1 relative flex items-center justify-center gap-2 py-3 bg-white/10 backdrop-blur-md text-white border border-primary/30 rounded-xl font-medium"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 ? (
              <span>${subtotal.toLocaleString()}</span>
            ) : (
              <span>Quote</span>
            )}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-neutral-dark text-xs font-bold rounded-full flex items-center justify-center">
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
      
      {/* Inspiration Gallery */}
      <InspirationGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </MainLayout>
  );
}

export default App;
