import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    // Check if the request is for customer routes or customer-specific insurance routes
    if (config.url && (config.url.includes('/customers/') || config.url.includes('/insurance/customer'))) {
      const customerInfo = localStorage.getItem('customerInfo');
      if (customerInfo) {
        const { token } = JSON.parse(customerInfo);
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      // Otherwise use admin/staff token
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const { token } = JSON.parse(userInfo);
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Automatically unwrap our standardized backend format: { success: true, data: ... }
    // This provides backwards compatibility with React components during the refactoring process
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      if (response.data.success) {
        // If there's pagination, we inject it into the data object so the frontend can access it
        if (response.data.pagination && typeof response.data.data === 'object') {
          response.data.data.pagination = response.data.pagination;
        }
        response.data = response.data.data;
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
