import api from '../api/axiosConfig';

export const galleryService = {
  getGallery: async () => {
    const { data } = await api.get('/gallery');
    return data; // assumes data is the array of images
  }
};
