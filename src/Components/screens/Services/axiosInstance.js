// src/api/axiosInstance.js
import axios from 'axios';
import config from '../../Config/config.json';

const axiosInstance = axios.create({
  baseURL: config.SM_DEV_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Connection: 'keep-alive',
  },
});

// Request Interceptor: Attach access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const authUser = JSON.parse(localStorage.getItem('auth'));
    if (authUser && authUser.accessToken) {
      config.headers['x-auth-token'] = authUser.accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token refresh on 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const authUser = JSON.parse(localStorage.getItem('auth'));
        const refreshToken = authUser ? authUser.refreshToken : null;
        if (refreshToken) {
          const response = await axiosInstance.post('https://api.dev.wetflix.net/api/refresh', { refreshToken });
          const { accessToken } = response.data;
          if (accessToken) {
            // Update the access token in localStorage
            authUser.accessToken = accessToken;
            localStorage.setItem('auth', JSON.stringify(authUser));
            // Update the Authorization header
            originalRequest.headers['x-auth-token'] = accessToken;
            // Retry the original request with the new access token
            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Handle token refresh failure (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
