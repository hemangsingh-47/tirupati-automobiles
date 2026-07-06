import { useState, useEffect } from 'react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import CtaSection from '../components/home/CtaSection';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, RefreshCw } from 'lucide-react';
import { galleryService } from '../services/gallery.service';

const categories = ['All', 'Workshop', 'Repairs', 'Before/After', 'Events'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await galleryService.getGallery();
      setImages(data);
    } catch (err) {
      setError('Failed to load gallery images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

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

          {/* State Handling */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-gray">Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-8 rounded-xl text-center">
              <p className="mb-4">{error}</p>
              <button onClick={fetchImages} className="text-primary hover:underline">Retry Loading</button>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 border border-white/10 rounded-2xl bg-surface/50">
              <p className="text-gray text-lg">No images available yet.</p>
            </div>
          ) : (
            /* Premium Grid */
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredImages.map((image) => (
                  <motion.div
                    key={image._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="relative group rounded-2xl overflow-hidden aspect-square cursor-pointer bg-surface border border-white/5"
                    onClick={() => setLightboxImage(image.imageUrl)}
                  >
                    <img 
                      src={`http://localhost:5000/uploads/${image.imageUrl}`} 
                      alt={image.title || image.category} 
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
          )}
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
              src={`http://localhost:5000/uploads/${lightboxImage}`}
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
