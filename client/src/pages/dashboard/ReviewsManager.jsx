import { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, Trash2, Edit2, Plus, X } from 'lucide-react';
import api from '../../api/axiosConfig';

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    comment: '',
    isApproved: true,
    isFeatured: false
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get('/reviews?all=true');
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id, field, value) => {
    try {
      const { data } = await api.patch(`/reviews/${id}`, { [field]: value });
      setReviews(reviews.map(r => r._id === id ? data : r));
    } catch (error) {
      alert(`Failed to update review status`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this review?")) {
      try {
        await api.delete(`/reviews/${id}`);
        setReviews(reviews.filter(r => r._id !== id));
      } catch (error) {
        alert('Failed to delete review');
      }
    }
  };

  const handleOpenModal = (review = null) => {
    if (review) {
      setEditingReview(review);
      setFormData({
        customerName: review.customerName,
        rating: review.rating,
        comment: review.comment,
        isApproved: review.isApproved,
        isFeatured: review.isFeatured
      });
    } else {
      setEditingReview(null);
      setFormData({
        customerName: '',
        rating: 5,
        comment: '',
        isApproved: true,
        isFeatured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await api.patch(`/reviews/${editingReview._id}`, formData);
      } else {
        await api.post('/reviews', formData);
      }
      setIsModalOpen(false);
      fetchReviews();
    } catch (error) {
      alert('Failed to save review');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Reviews Management</h1>
          <p className="text-gray text-sm">Approve customer reviews before they appear on the website.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-background font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-gray">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="p-12 text-center bg-surface border border-white/5 rounded-2xl">
          <p className="text-white font-medium mb-1">No reviews yet</p>
          <p className="text-gray text-sm">When customers submit reviews, they will appear here for approval.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-surface border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              {/* Status Badge */}
              <div className="absolute top-0 right-0 px-4 py-1 text-xs font-bold rounded-bl-xl border-b border-l border-white/10">
                {review.isApproved ? (
                  <span className="text-green-500">Public (Approved)</span>
                ) : (
                  <span className="text-orange-500">Pending Approval</span>
                )}
              </div>

              <div className="flex justify-between items-start mb-4 mt-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{review.customerName}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-gray/30'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="bg-background border border-white/5 p-4 rounded-xl text-sm text-gray-300 mb-6 italic">
                "{review.comment}"
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleUpdateStatus(review._id, 'isApproved', !review.isApproved)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      review.isApproved 
                        ? 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20' 
                        : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                    }`}
                  >
                    {review.isApproved ? (
                      <><XCircle className="w-4 h-4" /> Unpublish</>
                    ) : (
                      <><CheckCircle className="w-4 h-4" /> Approve</>
                    )}
                  </button>

                  <button 
                    onClick={() => handleUpdateStatus(review._id, 'isFeatured', !review.isFeatured)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      review.isFeatured 
                        ? 'bg-primary/10 text-primary border-primary/30' 
                        : 'bg-transparent text-gray border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${review.isFeatured ? 'fill-primary' : ''}`} />
                    Featured
                  </button>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(review)}
                    className="p-2 text-gray hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    title="Edit Review"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(review._id)}
                    className="p-2 text-gray hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4">
          <div className="bg-surface border border-white/10 rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold font-heading text-white mb-6">
              {editingReview ? 'Edit Review' : 'Add Manual Review'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Customer Name</label>
                <input type="text" required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Rating (1-5)</label>
                <select value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary">
                  {[5,4,3,2,1].map(num => (
                    <option key={num} value={num}>{num} Stars</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray mb-1">Review Comment</label>
                <textarea required rows="4" value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary resize-none"></textarea>
              </div>

              <div className="pt-2 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isApproved} onChange={e => setFormData({...formData, isApproved: e.target.checked})} className="rounded bg-background border-white/10 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray">Approved (Visible)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="rounded bg-background border-white/10 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray">Featured (Homepage)</span>
                </label>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-white/10 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg font-medium text-white bg-white/5 hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-lg font-bold text-background bg-primary hover:bg-yellow-500 transition-colors">
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsManager;
