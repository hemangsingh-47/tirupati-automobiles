import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { galleryService } from '../../services/gallery.service';
import { getUploadUrl } from '../../utils/uploadUrl';

const GalleryPreview = () => {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await galleryService.getGallery();
        setImages(data.slice(0, 4)); // Get only latest 4 images
      } catch (error) {
        console.error('Failed to load gallery preview', error);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block"
            >
              Our Workshop
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-heading font-bold text-white"
            >
              Inside Tirupati Automobiles
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/gallery" 
              className="inline-flex items-center text-primary font-semibold hover:text-yellow-400 transition-colors group"
            >
              View Full Gallery
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={img._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl group ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
            >
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src={getUploadUrl(img.imageUrl)} 
                alt={img.title || "Workshop preview"} 
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${index === 0 ? 'min-h-[400px]' : 'min-h-[200px]'}`}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-background transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
          
          {images.length === 0 && (
             <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-10 border border-white/5 rounded-xl text-gray">
               Photos will be added soon...
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
