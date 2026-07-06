import api from '../api/axiosConfig';

export const reviewService = {
  getReviews: async (admin = false) => {
    const { data } = await api.get(`/reviews${admin ? '?all=true' : ''}`);
    return data;
  },

  createReview: async (reviewData) => {
    const { data } = await api.post('/reviews', reviewData);
    return data;
  },

  updateReview: async (id, reviewData) => {
    const { data } = await api.patch(`/reviews/${id}`, reviewData);
    return data;
  },

  deleteReview: async (id) => {
    const { data } = await api.delete(`/reviews/${id}`);
    return data;
  }
};
