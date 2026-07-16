import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit2, Trash2, X, Upload, 
  FileText, Image as ImageIcon, Eye, Download, CheckCircle, 
  XCircle, Link as LinkIcon, Calendar
} from 'lucide-react';
import api from '../../../api/axiosConfig';

const MEDIA_CATEGORIES = [
  'Offers', 'Announcements', 'Workshop News', 'Certificates', 
  'Insurance Documents', 'Price Lists', 'Brochures', 'Events', 'General'
];

const MediaManager = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    isFeatured: false,
    isPublished: true,
    showOnHomepage: false,
    expiryDate: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data } = await api.get('/media');
      if (data) {
        setMediaItems(data);
      }
    } catch (error) {
      alert('Failed to fetch media items');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'General',
      isFeatured: false,
      isPublished: true,
      showOnHomepage: false,
      expiryDate: '',
    });
    setFile(null);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      isFeatured: item.isFeatured,
      isPublished: item.isPublished,
      showOnHomepage: item.showOnHomepage,
      expiryDate: item.expiryDate ? new Date(item.expiryDate).toISOString().split('T')[0] : '',
    });
    setEditingId(item._id);
    setFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this media item?')) {
      try {
        await api.delete(`/media/${id}`);
        alert('Media item deleted successfully');
        fetchMedia();
      } catch (error) {
        alert('Failed to delete media item');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      if (file) {
        submitData.append('file', file);
      }

      if (editingId) {
        await api.put(`/media/${editingId}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Media item updated successfully');
      } else {
        if (!file) {
          alert('Please select a file to upload');
          setIsSubmitting(false);
          return;
        }
        await api.post('/media', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Media item created successfully');
      }

      fetchMedia();
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save media item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesType = selectedType ? item.fileType === selectedType : true;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Media Center & Notice Board</h1>
          <p className="text-gray mt-1">Manage documents, posters, and announcements.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-primary text-black px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Media
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface/50 p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-primary transition-colors"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary transition-colors"
          >
            <option value="">All Categories</option>
            {MEDIA_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary transition-colors"
          >
            <option value="">All Types</option>
            <option value="image">Images</option>
            <option value="pdf">PDF Documents</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-surface/50 border border-white/10 rounded-xl p-8 text-center">
          <ImageIcon className="w-12 h-12 text-gray mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No media found</h3>
          <p className="text-gray">No items match your current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredMedia.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-surface/50 border border-white/10 rounded-xl overflow-hidden group"
              >
                {/* Thumbnail Area */}
                <div className="relative h-48 bg-background flex items-center justify-center overflow-hidden border-b border-white/10">
                  {item.fileType === 'pdf' ? (
                    <div className="text-center p-6">
                      <FileText className="w-16 h-16 text-primary mx-auto mb-2" />
                      <p className="text-sm font-bold text-white uppercase bg-white/10 px-3 py-1 rounded-full inline-block">PDF Document</p>
                    </div>
                  ) : (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  
                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.isFeatured && (
                      <span className="bg-primary text-black text-xs font-bold px-2 py-1 rounded-md shadow-lg">Featured</span>
                    )}
                    {item.showOnHomepage && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">Homepage Pin</span>
                    )}
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md shadow-lg ${item.isPublished ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {item.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1 flex-1 pr-4" title={item.title}>{item.title}</h3>
                    <span className="text-xs font-medium text-gray bg-white/5 px-2 py-1 rounded border border-white/10 whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray line-clamp-2 mb-4 h-10">
                    {item.description || 'No description provided.'}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray mb-4">
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{item.downloadCount} Downloads</span>
                    </div>
                    {item.expiryDate && (
                      <div className={`flex items-center gap-1 ${new Date(item.expiryDate) < new Date() ? 'text-red-400' : ''}`}>
                        <Calendar className="w-4 h-4" />
                        <span>Exp: {new Date(item.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <a 
                        href={item.fileType === 'pdf' ? item.pdfUrl : item.imageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 text-white hover:bg-primary/20 hover:text-primary rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-white/5 text-white hover:bg-primary/20 hover:text-primary rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 bg-white/5 text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl relative z-10 max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? 'Edit Media Item' : 'Upload New Media'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="media-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary transition-colors"
                        placeholder="e.g. Independence Day Offer"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary transition-colors"
                        placeholder="Brief description of the media item..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary transition-colors"
                      >
                        {MEDIA_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray">Expiry Date (Optional)</label>
                      <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary transition-colors"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-background border border-white/10 rounded-xl space-y-4">
                    <h3 className="text-white font-medium border-b border-white/10 pb-2 mb-4">Display Settings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-6 h-6 bg-surface border border-white/20 rounded transition-colors group-hover:border-primary">
                          <input
                            type="checkbox"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleInputChange}
                            className="peer opacity-0 absolute inset-0 cursor-pointer"
                          />
                          <CheckCircle className="w-4 h-4 text-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-gray group-hover:text-white transition-colors">Publish Item</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-6 h-6 bg-surface border border-white/20 rounded transition-colors group-hover:border-primary">
                          <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleInputChange}
                            className="peer opacity-0 absolute inset-0 cursor-pointer"
                          />
                          <CheckCircle className="w-4 h-4 text-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-gray group-hover:text-white transition-colors">Mark as Featured</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-6 h-6 bg-surface border border-white/20 rounded transition-colors group-hover:border-primary">
                          <input
                            type="checkbox"
                            name="showOnHomepage"
                            checked={formData.showOnHomepage}
                            onChange={handleInputChange}
                            className="peer opacity-0 absolute inset-0 cursor-pointer"
                          />
                          <CheckCircle className="w-4 h-4 text-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-gray group-hover:text-white transition-colors">Pin to Homepage</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray">
                      Upload File {editingId ? '(Leave empty to keep current)' : '*'}
                    </label>
                    <div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary/50 transition-colors bg-background">
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*,application/pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required={!editingId}
                      />
                      <div className="flex flex-col items-center gap-2 pointer-events-none">
                        <Upload className="w-8 h-8 text-gray" />
                        <span className="text-white font-medium">
                          {file ? file.name : 'Click or drag file to upload'}
                        </span>
                        <span className="text-sm text-gray">
                          Supported formats: PDF, PNG, JPG, JPEG, WEBP (Max 20MB)
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-white/10 shrink-0 flex justify-end gap-4 bg-background rounded-b-2xl">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg text-white font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="media-form"
                  disabled={isSubmitting}
                  className="bg-primary text-black px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Media Item'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaManager;
