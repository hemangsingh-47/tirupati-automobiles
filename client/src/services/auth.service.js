import api from '../api/axiosConfig';

export const authService = {
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  
  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  }
};
