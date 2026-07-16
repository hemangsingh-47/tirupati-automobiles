import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, FileText, Image as ImageIcon, Download, 
  Eye, Calendar, Filter, X
} from 'lucide-react';
import api from '../api/axiosConfig';

const MEDIA_CATEGORIES = [
  'Offers', 'Announcements', 'Workshop News', 'Certificates', 
  'Insurance Documents', 'Price Lists', 'Brochures', 'Events', 'General'
];

const MediaCenter = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data } = await api.get('/media?isPublished=true');
      if (data) {
        setMediaItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadClick = async (id, fileUrl) => {
    try {
      // Trigger download tracking
      await api.post(`/media/${id}/download`);
      
      // Update local state for immediate UI feedback
      setMediaItems(prev => prev.map(item => 
        item._id === id ? { ...item, downloadCount: (item.downloadCount || 0) + 1 } : item
      ));

      // Open in new tab or trigger download
      window.open(fileUrl, '_blank');
    } catch (error) {
      console.error('Error tracking download:', error);
      // Still open link even if tracking fails
      window.open(fileUrl, '_blank');
    }
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' ? true : item.category === selectedCategory;
    const matchesType = selectedType === 'All' ? true : item.fileType === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-12 bg-surface/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Knowledge <span className="text-primary">Section</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray max-w-2xl mx-auto"
          >
            Stay updated with our latest offers, workshop news, and download important documents.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 bg-surface/50 p-6 rounded-2xl border border-white/10 shadow-lg">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" />
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-primary transition-colors focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 bg-background border border-white/10 rounded-xl px-4 py-1">
              <Filter className="w-4 h-4 text-gray" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-white outline-none py-2 cursor-pointer appearance-none flex-1"
              >
                <option value="All" className="bg-surface text-white">All Categories</option>
                {MEDIA_CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="bg-surface text-white">{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex bg-background border border-white/10 rounded-xl p-1 overflow-hidden">
              <button
                onClick={() => setSelectedType('All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === 'All' ? 'bg-primary text-black' : 'text-gray hover:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('pdf')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === 'pdf' ? 'bg-primary text-black' : 'text-gray hover:text-white'}`}
              >
                <FileText className="w-4 h-4" /> PDFs
              </button>
              <button
                onClick={() => setSelectedType('image')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === 'image' ? 'bg-primary text-black' : 'text-gray hover:text-white'}`}
              >
                <ImageIcon className="w-4 h-4" /> Posters
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredMedia.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-surface/30 rounded-2xl border border-white/5"
          >
            <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No media found</h3>
            <p className="text-gray">Try adjusting your search or filters.</p>
            {(searchTerm || selectedCategory !== 'All' || selectedType !== 'All') && (
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedType('All'); }}
                className="mt-6 text-primary hover:text-yellow-400 font-medium transition-colors underline"
              >
                Clear all filters
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMedia.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-surface/40 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group flex flex-col h-full"
                >
                  <a 
                    href={item.fileType === 'pdf' ? item.pdfUrl : item.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-48 bg-background/50 flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    {item.fileType === 'pdf' ? (
                      <div className="text-center p-6 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-surface to-background">
                        <FileText className="w-16 h-16 text-primary mx-auto mb-3 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">PDF Document</span>
                      </div>
                    ) : (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10">
                      <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                        {item.category}
                      </span>
                      {item.isFeatured && (
                        <span className="bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                          Featured
                        </span>
                      )}
                    </div>
                  </a>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray line-clamp-2 mb-4 flex-1">
                      {item.description || 'No description provided.'}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray mb-5 pb-4 border-b border-white/10">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-primary/70" />
                        {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex flex-col mt-auto">
                      <a 
                        href={item.fileType === 'pdf' ? item.pdfUrl : item.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl font-medium transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" /> Open
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCenter;
