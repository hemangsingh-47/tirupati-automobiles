import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import api from '../../../api/axiosConfig';

const FaqManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    isActive: true,
    displayOrder: 0
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data } = await api.get('/faqs?admin=true');
      setFaqs(data);
    } catch (error) {
      alert('Failed to load FAQs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        isActive: faq.isActive,
        displayOrder: faq.displayOrder
      });
    } else {
      setEditingFaq(null);
      setFormData({
        question: '',
        answer: '',
        isActive: true,
        displayOrder: faqs.length
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        await api.patch(`/faqs/${editingFaq._id}`, formData);
      } else {
        await api.post('/faqs', formData);
      }
      setIsModalOpen(false);
      fetchFaqs();
    } catch (error) {
      alert('Failed to save FAQ');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this FAQ?')) {
      try {
        await api.delete(`/faqs/${id}`);
        fetchFaqs();
      } catch (error) {
        alert('Failed to delete FAQ');
      }
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await api.patch(`/faqs/${id}`, { isActive: !currentStatus });
      fetchFaqs();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray">Loading FAQs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">FAQ CMS</h1>
          <p className="text-gray text-sm">Manage frequently asked questions.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-background font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq._id} className="bg-surface border border-white/5 rounded-2xl p-6 shadow-xl flex gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
              <p className="text-gray text-sm">{faq.answer}</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0 border-l border-white/5 pl-4">
              <button 
                onClick={() => toggleActive(faq._id, faq.isActive)}
                className={`flex items-center justify-center gap-1 text-xs font-bold px-2 py-1.5 rounded-lg border transition-colors ${
                  faq.isActive ? 'text-green-500 border-green-500/30 bg-green-500/10' : 'text-gray border-white/20'
                }`}
              >
                {faq.isActive ? 'Visible' : 'Hidden'}
              </button>
              <button onClick={() => handleOpenModal(faq)} className="flex items-center justify-center gap-1 text-xs font-bold px-2 py-1.5 rounded-lg border border-white/10 text-white hover:bg-white/5">
                <Edit2 className="w-3 h-3" /> Edit
              </button>
              <button onClick={() => handleDelete(faq._id)} className="flex items-center justify-center gap-1 text-xs font-bold px-2 py-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        ))}
        {faqs.length === 0 && (
          <div className="p-12 text-center border border-white/5 rounded-2xl bg-surface">
            <p className="text-gray">No FAQs added yet.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4">
          <div className="bg-surface border border-white/10 rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold font-heading text-white mb-6">
              {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Question</label>
                <input type="text" required value={formData.question} onChange={e => setFormData({...formData, question: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Answer</label>
                <textarea required rows="4" value={formData.answer} onChange={e => setFormData({...formData, answer: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary resize-none"></textarea>
              </div>

              <div className="pt-2">
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqManager;
