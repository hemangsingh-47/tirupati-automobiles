import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, Sparkles, X } from 'lucide-react';
import api from '../../api/axiosConfig';

const FeaturedUpdate = () => {
  const [featuredItem, setFeaturedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/media?isPublished=true&featured=true&limit=1');
        if (data && data.length > 0) {
          setFeaturedItem(data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch featured update:', error);
      }
    };
    fetchFeatured();
  }, []);

  const handleDownload = async () => {
    if (!featuredItem) return;
    try {
      await api.post(`/media/${featuredItem._id}/download`);
      window.open(featuredItem.fileType === 'pdf' ? featuredItem.pdfUrl : featuredItem.imageUrl, '_blank');
    } catch (error) {
      window.open(featuredItem.fileType === 'pdf' ? featuredItem.pdfUrl : featuredItem.imageUrl, '_blank');
    }
  };

  if (!featuredItem || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20"
      >
        <div className="bg-gradient-to-r from-surface to-background border border-primary/30 rounded-2xl p-1 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="bg-background rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 relative z-10">
            {/* Close button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-gray hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge */}
            <div className="absolute -top-3 -left-3 bg-primary text-black text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg transform -rotate-12">
              <Sparkles className="w-3 h-3" /> Featured Update
            </div>

            {/* Thumbnail */}
            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-surface/50 relative">
              {featuredItem.fileType === 'pdf' ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <FileText className="w-10 h-10 text-primary mb-1" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">PDF</span>
                </div>
              ) : (
                <img 
                  src={featuredItem.imageUrl} 
                  alt={featuredItem.title} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left pt-2 sm:pt-0 pr-6">
              <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1 block">
                {featuredItem.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">
                {featuredItem.title}
              </h3>
              <p className="text-gray text-sm line-clamp-2 mb-4">
                {featuredItem.description || 'Check out our latest update in the Media Center!'}
              </p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a 
                  href={featuredItem.fileType === 'pdf' ? featuredItem.pdfUrl : featuredItem.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-surface hover:bg-white/10 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm border border-white/5"
                >
                  <Eye className="w-4 h-4" /> Preview
                </a>
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-primary hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeaturedUpdate;
