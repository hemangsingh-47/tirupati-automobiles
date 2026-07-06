import api from '../api/axiosConfig';

export const settingsService = {
  getSettings: async () => {
    const { data } = await api.get('/settings');
    return data;
  },

  updateSettings: async (settingsData) => {
    const { data } = await api.patch('/settings', settingsData);
    return data;
  }
};
