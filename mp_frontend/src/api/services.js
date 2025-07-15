import api from './config';

// Products API
export const productsAPI = {
  getAll: () => api.get('/products/'),
  getById: (id) => api.get(`/products/${id}/`),
  create: (data) => api.post('/products/', data),
  update: (id, data) => api.put(`/products/${id}/`, data),
  delete: (id) => api.delete(`/products/${id}/`),
  getByCategory: (category) => api.get(`/products/?category=${category}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories/'),
  getById: (id) => api.get(`/categories/${id}/`),
};

// User API
export const userAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.put('/auth/profile/', data),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart/'),
  add: (product, quantity = 1) => api.post('/cart/add/', { product, quantity }),
  update: (itemId, quantity) => api.patch(`/cart/item/${itemId}/update/`, { quantity }),
  remove: (itemId) => api.delete(`/cart/item/${itemId}/remove/`),
  clear: () => api.post('/cart/clear/'),
};

// Search API
export const searchAPI = {
  searchProducts: (query) => api.get(`/search/?q=${query}`),
  searchByImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post('/search/image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register/', data),
  login: (data) => api.post('/auth/login/', data),
  refresh: (data) => api.post('/auth/refresh/', data),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.put('/auth/profile/', data),
  changePassword: (data) => api.post('/auth/password/change/', data),
  resetPasswordRequest: (data) => api.post('/auth/password_reset/', data),
  resetPasswordConfirm: ({ uid, token, new_password }) =>
    api.post(`/auth/reset/${uid}/${token}/`, { new_password }),
};

// Orders API
export const ordersAPI = {
  getMyOrders: () => api.get('/orders/my/'),
};