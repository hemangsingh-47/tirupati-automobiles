import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Download, Eye, Calendar, Pin } from 'lucide-react';
import api from '../../api/axiosConfig';

const LatestUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data } = await api.get('/media?isPublished=true&limit=6');
        if (data) {
          const allMedia = data;
          const pinned = allMedia.filter(m => m.showOnHomepage);
          const unpinned = allMedia.filter(m => !m.showOnHomepage);
          const combined = [...pinned, ...unpinned].slice(0, 6);
          setUpdates(combined);
        }
      } catch (error) {
        console.error('Failed to fetch latest updates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const handleDownload = async (id, fileUrl) => {
    try {
      await api.post(`/media/${id}/download`);
      window.open(fileUrl, '_blank');
    } catch (error) {
      window.open(fileUrl, '_blank');
    }
  };

  if (loading || updates.length === 0) return null;

  return (
    <section className="py-20 bg-surface/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-bold text-white mb-4"
            >
              Notice <span className="text-primary">Board</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray max-w-2xl"
            >
              Latest updates, offers, and important documents from Tirupati Automobiles.
            </motion.p>
          </div>
          <Link 
            to="/media"
            className="hidden sm:flex items-center gap-2 text-primary hover:text-yellow-400 font-medium transition-colors group"
          >
            View All Updates
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-2xl border border-white/10 overflow-hidden group hover:border-primary/50 transition-colors flex flex-col"
            >
              <a 
                href={item.fileType === 'pdf' ? item.pdfUrl : item.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-48 bg-surface/50 overflow-hidden cursor-pointer"
              >
                {item.fileType === 'pdf' ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-background">
                    <FileText className="w-16 h-16 text-primary opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ) : (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                    {item.category}
                  </span>
                </div>
                {item.showOnHomepage && (
                  <div className="absolute top-4 right-4 text-primary bg-black/60 p-2 rounded-full backdrop-blur-sm" title="Pinned to Homepage">
                    <Pin className="w-4 h-4" />
                  </div>
                )}
              </a>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-gray mb-3">
                  <Calendar className="w-4 h-4" />
                  {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray text-sm line-clamp-2 mb-6 flex-1">
                  {item.description || 'View details in the Knowledge Section.'}
                </p>
                
                <div className="flex flex-col mt-auto">
                  <a 
                    href={item.fileType === 'pdf' ? item.pdfUrl : item.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-surface hover:bg-white/10 text-white py-2.5 rounded-xl font-medium transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" /> Open
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link 
            to="/media"
            className="inline-flex items-center justify-center gap-2 text-primary font-medium hover:text-yellow-400"
          >
            View All Updates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
