import api from '../api/axiosConfig';

export const cmsService = {
  getContent: async () => {
    const { data } = await api.get('/content');
    return data;
  },

  updateContent: async (contentData) => {
    const { data } = await api.patch('/content', contentData);
    return data;
  },

  getFaqs: async (admin = false) => {
    const { data } = await api.get(`/faqs${admin ? '?admin=true' : ''}`);
    return data;
  },

  createFaq: async (faqData) => {
    const { data } = await api.post('/faqs', faqData);
    return data;
  },

  updateFaq: async (id, faqData) => {
    const { data } = await api.patch(`/faqs/${id}`, faqData);
    return data;
  },

  deleteFaq: async (id) => {
    const { data } = await api.delete(`/faqs/${id}`);
    return data;
  },
  
  getServices: async (admin = false) => {
    const { data } = await api.get(`/services${admin ? '?admin=true' : ''}`);
    return data;
  },
  
  createService: async (formData) => {
    const { data } = await api.post('/services', formData);
    return data;
  },
  
  updateService: async (id, formData) => {
    const { data } = await api.patch(`/services/${id}`, formData);
    return data;
  },
  
  deleteService: async (id) => {
    const { data } = await api.delete(`/services/${id}`);
    return data;
  }
};
