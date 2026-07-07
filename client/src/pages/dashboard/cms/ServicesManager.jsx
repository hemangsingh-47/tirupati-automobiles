import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, GripVertical, Check, X } from 'lucide-react';
import api from '../../../api/axiosConfig';
import { getUploadUrl } from '../../../utils/uploadUrl';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'General Service',
    icon: 'Wrench',
    isFeatured: false,
    isActive: true,
    displayOrder: 0
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services?admin=true');
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services', error);
      alert('Failed to load services.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        shortDescription: service.shortDescription,
        fullDescription: service.fullDescription || '',
        category: service.category,
        icon: service.icon,
        isFeatured: service.isFeatured,
        isActive: service.isActive,
        displayOrder: service.displayOrder
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        shortDescription: '',
        fullDescription: '',
        category: 'General Service',
        icon: 'Wrench',
        isFeatured: false,
        isActive: true,
        displayOrder: services.length
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingService) {
        await api.patch(`/services/${editingService._id}`, data);
      } else {
        await api.post('/services', data);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error('Failed to save service', error);
      alert('Failed to save service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error('Failed to delete service', error);
        alert('Failed to delete service');
      }
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await api.patch(`/services/${id}`, { isActive: !currentStatus });
      fetchServices();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray">Loading Services...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Services CMS</h1>
          <p className="text-gray text-sm">Manage workshop services displayed on the public website.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-background font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray text-sm border-b border-white/10">
            <tr>
              <th className="p-4 font-medium">Service</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-background border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                      {service.imageUrl ? (
                        <img src={getUploadUrl(service.imageUrl)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-gray" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{service.title}</p>
                      <p className="text-xs text-gray truncate max-w-[250px]">{service.shortDescription}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xs font-medium px-2 py-1 bg-white/5 text-gray rounded-md border border-white/10">
                    {service.category}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleActive(service._id, service.isActive)}
                    className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border transition-colors ${
                      service.isActive ? 'text-green-500 border-green-500/30 bg-green-500/10 hover:bg-green-500/20' : 'text-gray border-white/20 hover:bg-white/5'
                    }`}
                  >
                    {service.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {service.isActive ? 'Active' : 'Hidden'}
                  </button>
                </td>
                <td className="p-4">
                  {service.isFeatured && (
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md border border-primary/20">Featured</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(service)} className="p-2 text-gray hover:text-white bg-background border border-white/10 rounded-lg hover:border-white/30 transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(service._id)} className="p-2 text-gray hover:text-red-500 bg-background border border-white/10 rounded-lg hover:border-red-500/30 hover:bg-red-500/10 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray">No services found. Click "Add Service" to create one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-surface border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative my-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold font-heading text-white mb-6">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray mb-1">Service Title</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary">
                    <option value="General Service">General Service</option>
                    <option value="Repairs & Denting">Repairs & Denting</option>
                    <option value="Detailing & Cleaning">Detailing & Cleaning</option>
                    <option value="Inspection & Support">Inspection & Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray mb-1">Short Description</label>
                <input type="text" required value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray mb-1">Service Image</label>
                <div className="flex items-center gap-4">
                  {(imageFile || editingService?.imageUrl) && (
                    <div className="w-16 h-16 rounded-lg bg-background border border-white/10 overflow-hidden shrink-0">
                      <img src={imageFile ? URL.createObjectURL(imageFile) : getUploadUrl(editingService.imageUrl)} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={e => setImageFile(e.target.files[0])} className="text-sm text-gray file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-background hover:file:bg-yellow-500 cursor-pointer" accept="image/*" />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="rounded bg-background border-white/10 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray">Featured Service</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded bg-background border-white/10 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray">Active (Visible)</span>
                </label>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-white/10 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg font-medium text-white bg-white/5 hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-lg font-bold text-background bg-primary hover:bg-yellow-500 transition-colors">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
