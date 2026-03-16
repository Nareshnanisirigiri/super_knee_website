import axios from 'axios';

const isLocal = window.location.hostname === 'localhost';
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || (isLocal 
    ? 'http://localhost:5000/api' 
    : 'https://superknee-backend.onrender.com/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
