import api from '../api/axiosConfig';

export const bookingService = {
  createBooking: async (formData) => {
    // Requires multipart/form-data because of image uploads
    // Axios handles the boundary automatically when passing a FormData object
    const { data } = await api.post('/bookings', formData);
    return data;
  },

  createCustomerBooking: async (formData) => {
    const { data } = await api.post('/customers/bookings', formData);
    return data;
  },
  
  getBookings: async (page = 1, limit = 10, status = '') => {
    let url = `/bookings?page=${page}&limit=${limit}`;
    if (status && status !== 'All') {
      url += `&status=${status}`;
    }
    const { data } = await api.get(url);
    return data;
  }
};
