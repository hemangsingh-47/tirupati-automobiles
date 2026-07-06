import { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Trash2, X, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axiosConfig';

const CATEGORIES = ['Workshop', 'Repairs', 'Before/After', 'Events'];

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await api.get('/gallery');
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch gallery", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('category', category);

    try {
      const { data } = await api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImages([data, ...images]);
      setIsModalOpen(false);
      
      // Reset
      setSelectedFile(null);
      setPreviewUrl(null);
      setTitle('');
    } catch (error) {
      console.error("Upload failed", error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await api.delete(`/gallery/${id}`);
        setImages(images.filter(img => img._id !== id));
      } catch (error) {
        alert('Failed to delete image');
      }
    }
  };

  const updateOrder = async (id, newOrder) => {
    try {
      await api.patch(`/gallery/${id}`, { displayOrder: newOrder });
      fetchImages(); // Refresh to re-sort
    } catch (error) {
      alert('Failed to update order');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Gallery Manager</h1>
          <p className="text-gray text-sm">Upload and manage images shown on the public website.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
        >
          <Upload className="w-4 h-4" /> Upload Image
        </button>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-gray">Loading gallery...</div>
      ) : images.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-white/10 rounded-2xl">
          <ImageIcon className="w-12 h-12 text-gray mx-auto mb-4" />
          <p className="text-white font-medium mb-1">No images yet</p>
          <p className="text-gray text-sm mb-4">Upload your first image to showcase your workshop.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-primary hover:text-yellow-500 font-medium text-sm"
          >
            Click here to upload
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img._id} className="group relative bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] w-full overflow-hidden bg-background">
                <img 
                  src={`http://localhost:5000/uploads/${img.imageUrl}`} 
                  alt={img.title || 'Gallery image'} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium truncate">{img.title || 'Untitled'}</h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray">{img.category}</p>
                  <div className="flex items-center gap-2 bg-background border border-white/5 rounded-md px-2 py-1">
                    <button onClick={() => updateOrder(img._id, (img.displayOrder || 0) - 1)} className="text-gray hover:text-white" title="Move Up"><ArrowUp className="w-3 h-3" /></button>
                    <span className="text-xs font-mono text-gray">{img.displayOrder || 0}</span>
                    <button onClick={() => updateOrder(img._id, (img.displayOrder || 0) + 1)} className="text-gray hover:text-white" title="Move Down"><ArrowDown className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <button 
                  onClick={() => handleDelete(img._id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">Upload New Image</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleUpload} className="space-y-4">
                  {/* Image Preview / Selector */}
                  <div className="relative border-2 border-dashed border-white/10 rounded-xl bg-background overflow-hidden flex justify-center items-center h-48 group">
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <label className="cursor-pointer bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm font-medium transition-colors">
                            Change Image
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
                          </label>
                        </div>
                      </>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-white/5 transition-colors">
                        <Plus className="w-8 h-8 text-gray mb-2" />
                        <span className="text-sm font-medium text-gray">Select an image</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} required />
                      </label>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray mb-1">Title (Optional)</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. BMW Engine Repair"
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray mb-1">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={isUploading || !selectedFile}
                    className="w-full bg-primary text-background font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors mt-6 disabled:opacity-50"
                  >
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GalleryManager;
