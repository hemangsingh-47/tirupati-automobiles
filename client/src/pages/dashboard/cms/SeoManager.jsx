import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axiosConfig';

const SeoManager = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/settings');
      reset(data);
    } catch (error) {
      console.error('Failed to fetch settings', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      await api.patch('/settings', data);
      alert('SEO Settings updated successfully!');
    } catch (error) {
      alert('Failed to save SEO settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray">Loading SEO Settings...</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">SEO Settings</h1>
          <p className="text-gray text-sm">Manage Search Engine Optimization tags for better visibility.</p>
        </div>
        <button 
          onClick={handleSubmit(onSubmit)}
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary text-background font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save SEO'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl">
        <div>
          <label className="block text-sm font-medium text-gray mb-1">Global Meta Title</label>
          <input 
            type="text" 
            {...register('metaTitle')} 
            placeholder="Tirupati Automobiles - Professional Car Care"
            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary font-bold" 
          />
          <p className="text-xs text-gray mt-1">This appears as the blue clickable link in Google search results.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray mb-1">Global Meta Description</label>
          <textarea 
            {...register('metaDescription')} 
            rows="3" 
            placeholder="Expert car repair, maintenance, and insurance claims in Sirohi."
            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary resize-none"
          ></textarea>
          <p className="text-xs text-gray mt-1">The snippet text below the title in search results (aim for ~150-160 characters).</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray mb-1">Meta Keywords (Comma separated)</label>
          <input 
            type="text" 
            {...register('keywords')} 
            placeholder="car repair, mechanic, body shop, sirohi, insurance claim"
            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-primary text-sm" 
          />
        </div>
      </form>
    </div>
  );
};

export default SeoManager;
