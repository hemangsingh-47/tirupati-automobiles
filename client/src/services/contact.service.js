import api from '../api/axiosConfig';

export const contactService = {
  createContact: async (contactData) => {
    const { data } = await api.post('/contact', contactData);
    return data;
  },

  getContacts: async () => {
    const { data } = await api.get('/contact');
    return data;
  }
};
