import { useState, useEffect } from 'react';
import { Save, Store, MapPin, Phone, Clock, Share2, AlertCircle } from 'lucide-react';
import api from '../../api/axiosConfig';

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: '',
    tagline: '',
    phone: '',
    email: '',
    address: '',
    hoursWeekdays: '',
    hoursWeekend: '',
    facebook: '',
    instagram: '',
    whatsapp: '',
    googleMapsLink: '',
    emergencyNumber: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.patch('/settings', formData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-white">Loading...</div>;

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-8 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-bounce">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold">Settings saved successfully!</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-white">Workshop Settings</h1>
        <p className="text-gray text-sm">Manage your business profile and contact information.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <Store className="w-5 h-5 mr-2 text-primary" /> General Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Business Name</label>
                <input 
                  name="businessName"
                  value={formData.businessName || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Tagline</label>
                <input 
                  name="tagline"
                  value={formData.tagline || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <Phone className="w-5 h-5 mr-2 text-primary" /> Contact & Location
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Phone Number</label>
                <input 
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Email Address</label>
                <input 
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Full Address
              </label>
              <textarea 
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                rows="3"
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none resize-none"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-red-500" /> Emergency Support Number
              </label>
              <input 
                name="emergencyNumber"
                value={formData.emergencyNumber || ''}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500 outline-none"
                placeholder="24/7 Helpline..."
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Google Maps Embed Link
              </label>
              <input 
                name="googleMapsLink"
                value={formData.googleMapsLink || ''}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                placeholder="https://goo.gl/maps/..."
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <Share2 className="w-5 h-5 mr-2 text-primary" /> Social Links
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Facebook URL</label>
                <input 
                  name="facebook"
                  value={formData.facebook || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Instagram URL</label>
                <input 
                  name="instagram"
                  value={formData.instagram || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray mb-1">WhatsApp Number</label>
                <input 
                  name="whatsapp"
                  value={formData.whatsapp || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                  placeholder="+91..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Business Hours */}
          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
              <Clock className="w-5 h-5 mr-2 text-primary" /> Business Hours
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Monday - Saturday</label>
                <input 
                  name="hoursWeekdays"
                  value={formData.hoursWeekdays || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Sunday / Holidays</label>
                <input 
                  name="hoursWeekend"
                  value={formData.hoursWeekend || ''}
                  onChange={handleChange}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl sticky top-24">
            <button 
              type="submit"
              disabled={isSaving}
              className="w-full bg-primary text-background font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : (
                <>
                  <Save className="w-5 h-5 mr-2" /> Save Settings
                </>
              )}
            </button>
            <p className="text-xs text-gray text-center mt-4">
              Note: Changes here will update the public website.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
