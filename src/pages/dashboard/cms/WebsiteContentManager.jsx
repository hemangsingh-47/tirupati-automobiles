import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axiosConfig';

const WebsiteContentManager = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  
  // Watch toggle values for immediate UI feedback
  const watchShowHero = watch('showHero');
  const watchShowServices = watch('showServices');
  const watchShowGallery = watch('showGallery');
  const watchShowTestimonials = watch('showTestimonials');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/content');
      reset(data); // Populate form
    } catch (error) {
      console.error('Failed to fetch content', error);
      alert('Failed to load content settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      await api.patch('/content', data);
      alert('Website Content updated successfully!');
    } catch (error) {
      console.error('Failed to save content', error);
      alert('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray">Loading Content Editor...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Website Content CMS</h1>
          <p className="text-gray text-sm">Manage the public text, statistics, and sections of the website.</p>
        </div>
        <button 
          onClick={handleSubmit(onSubmit)}
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary text-background font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save Content'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Section Toggles */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Homepage Sections</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 'showHero', label: 'Hero Section' },
              { id: 'showServices', label: 'Services Section' },
              { id: 'showGallery', label: 'Gallery Section' },
              { id: 'showTestimonials', label: 'Testimonials Section' },
              { id: 'showStats', label: 'Statistics Bar' },
              { id: 'showBrands', label: 'Brands Banner' },
              { id: 'showFaq', label: 'FAQ Section' },
            ].map((toggle) => (
              <label key={toggle.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" {...register(toggle.id)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-background rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray after:border-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
                <span className="text-sm font-medium text-gray group-hover:text-white transition-colors">
                  {toggle.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Hero Section Text</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray mb-1">Title</label>
              <input type="text" {...register('heroTitle')} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray mb-1">Subtitle</label>
              <input type="text" {...register('heroSubtitle')} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray mb-1">Description</label>
              <textarea {...register('heroDescription')} rows="3" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary resize-none"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Primary Button Text</label>
                <input type="text" {...register('heroCtaPrimaryText')} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Secondary Button Text</label>
                <input type="text" {...register('heroCtaSecondaryText')} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">About Section Text</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray mb-1">Title</label>
              <input type="text" {...register('aboutTitle')} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray mb-1">Description</label>
              <textarea {...register('aboutDescription')} rows="4" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Statistics Counters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="p-4 bg-background border border-white/5 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-white">Statistic {num}</h3>
                <div>
                  <label className="block text-xs text-gray mb-1">Label (e.g. Happy Customers)</label>
                  <input type="text" {...register(`stat${num}Label`)} className="w-full bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-white outline-none focus:border-primary text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray mb-1">Value (e.g. 5000+)</label>
                  <input type="text" {...register(`stat${num}Value`)} className="w-full bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-white outline-none focus:border-primary font-bold font-heading" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </form>
    </div>
  );
};

export default WebsiteContentManager;
