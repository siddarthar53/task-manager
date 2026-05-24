import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// AUTH APIs
export const authAPI = {
  register: (data) =>
    API.post('/auth/register', data),

  login: (data) =>
    API.post('/auth/login', data),

  logout: () =>
    API.post('/auth/logout'),

  getMe: () =>
    API.get('/auth/me'),
};

// TASK APIs
export const tasksAPI = {
  getAll: (params, signal) =>
    API.get('/tasks', {
      params,
      signal,
    }),

  create: (data) =>
    API.post('/tasks', data),

  update: (id, data) =>
    API.patch(`/tasks/${id}`, data),

  delete: (id) =>
    API.delete(`/tasks/${id}`),
};

export default API;