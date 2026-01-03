import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Real inspiration images - using placeholder URLs that represent luxury wedding setups
// In production, these would be actual photos from AK Enchanted Events
const inspirationImages = [
  {
    id: 1,
    title: 'Dark Luxury Gold',
    description: 'Dramatic dark backdrop with gold accents, circular arch, and abundant white florals',
    tags: ['Dark Theme', 'Gold Accents', 'Circular Arch', 'White Florals'],
    // Placeholder - replace with actual image
    gradient: 'from-amber-900 via-black to-amber-950',
  },
  {
    id: 2,
    title: 'Classic White Elegance',
    description: 'Clean white draping with vertical gold pillars adorned with cascading florals',
    tags: ['White Theme', 'Pillars', 'Minimal', 'Elegant'],
    gradient: 'from-gray-100 via-white to-gray-200',
  },
  {
    id: 3,
    title: 'Bold Floral Statement',
    description: 'Multiple arched frames covered in rich burgundy and red florals',
    tags: ['Bold Color', 'Triple Arch', 'Statement Florals'],
    gradient: 'from-rose-800 via-red-900 to-rose-950',
  },
  {
    id: 4,
    title: 'Romantic Garden',
    description: 'Soft neutral tones with abundant mixed florals in pink, white, and green',
    tags: ['Romantic', 'Garden Style', 'Mixed Florals', 'Neutral'],
    gradient: 'from-pink-100 via-rose-200 to-pink-100',
  },
  {
    id: 5,
    title: 'Grand White Ballroom',
    description: 'Opulent white setup with chandelier, cascading greenery, and dramatic draping',
    tags: ['Grand', 'White', 'Chandelier', 'Greenery'],
    gradient: 'from-gray-50 via-white to-gray-100',
  },
];

export function InspirationGallery({ isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % inspirationImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + inspirationImages.length) % inspirationImages.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute inset-4 md:inset-8 bg-neutral-900 rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <div>
                <h2 className="text-xl md:text-2xl font-serif text-white">Inspiration Gallery</h2>
                <p className="text-sm text-white/60">Real setups from AK Enchanted Events</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white/70" />
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="p-4 md:p-6 overflow-y-auto" style={{ maxHeight: 'calc(100% - 80px)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {inspirationImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image);
                    setCurrentIndex(index);
                  }}
                >
                  {/* Image placeholder - shows gradient representing the style */}
                  <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${image.gradient} relative overflow-hidden`}>
                    {/* Overlay content suggesting the setup */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-2 border-2 border-current rounded-full flex items-center justify-center opacity-30">
                          <Sparkles className="w-8 h-8" />
                        </div>
                        <p className="text-xs opacity-50">Photo Preview</p>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium">View Details</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-3">
                    <h3 className="font-medium text-white">{image.title}</h3>
                    <p className="text-sm text-white/60 mt-1 line-clamp-2">{image.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {image.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to action */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-center">
              <h3 className="text-lg font-serif text-white mb-2">Want to See More?</h3>
              <p className="text-white/70 text-sm mb-4">
                Browse our full portfolio on Instagram or schedule a consultation to discuss your vision.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  View Instagram
                </a>
                <button className="px-4 py-2 bg-primary text-neutral-dark rounded-lg text-sm font-medium hover:bg-primary-light transition-colors">
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lightbox for selected image */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                  setSelectedImage(inspirationImages[(currentIndex - 1 + inspirationImages.length) % inspirationImages.length]);
                }}
                className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>

              <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <div className={`aspect-video rounded-xl bg-gradient-to-br ${selectedImage.gradient} flex items-center justify-center`}>
                  <div className="text-center p-8">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg opacity-50">Full Photo View</p>
                    <p className="text-sm opacity-30 mt-2">Replace with actual event photos</p>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-serif text-white">{selectedImage.title}</h3>
                  <p className="text-white/70 mt-2">{selectedImage.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {selectedImage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-3 py-1 rounded-full bg-primary/20 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                  setSelectedImage(inspirationImages[(currentIndex + 1) % inspirationImages.length]);
                }}
                className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

