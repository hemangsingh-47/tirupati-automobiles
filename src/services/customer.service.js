import api from '../api/axiosConfig';

export const customerService = {
  register: async (userData) => {
    const { data } = await api.post('/customers/auth/register', userData);
    return data;
  },

  login: async (email, password) => {
    const { data } = await api.post('/customers/auth/login', { email, password });
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get('/customers/auth/profile');
    return data;
  },

  updateProfile: async (profileData) => {
    const { data } = await api.put('/customers/auth/profile', profileData);
    return data;
  },

  getNotifications: async () => {
    const { data } = await api.get('/customers/notifications');
    return data;
  },

  markNotificationRead: async (id) => {
    const { data } = await api.patch(`/customers/notifications/${id}/read`);
    return data;
  }
};
