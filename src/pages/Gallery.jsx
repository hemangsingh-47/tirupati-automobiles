import { useState } from 'react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import CtaSection from '../components/home/CtaSection';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const categories = ['All', 'Workshop', 'Painting', 'Accident Repair', 'Before & After', 'Insurance'];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Workshop' },
  { src: 'https://images.unsplash.com/photo-1507560461415-99731cfa81c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Painting' },
  { src: 'https://images.unsplash.com/photo-1600661653561-629509216228?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Accident Repair' },
  { src: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Before & After' },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Insurance' },
  { src: 'https://images.unsplash.com/photo-1503375894314-46765ff0a8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Workshop' },
  { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Accident Repair' },
  { src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Workshop' }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <main>
      <PageHero 
        title="Our Gallery" 
        description="Take a visual tour inside our state-of-the-art facility. See the precision, care, and technology we use every day."
        image="https://images.unsplash.com/photo-1632823462996-e251a34005aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      <section className="py-24 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Inside Tirupati" title="Workshop Gallery" centered />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-primary text-background' 
                    : 'bg-surface text-gray border border-white/10 hover:border-primary hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Premium Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src + index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group rounded-2xl overflow-hidden aspect-square cursor-pointer bg-surface border border-white/5"
                  onClick={() => setLightboxImage(image.src)}
                >
                  <img 
                    src={image.src} 
                    alt={image.category} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-background/90 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider shadow-lg">
                    {image.category}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 bg-surface rounded-full flex items-center justify-center text-white hover:text-primary transition-colors border border-white/10"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImage}
              alt="Lightbox"
              className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CtaSection />
    </main>
  );
};

export default Gallery;
