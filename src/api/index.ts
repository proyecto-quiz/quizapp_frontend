/**
 * Client axios
 */

import axios from 'axios';

// URL Api
const API_URL = <string>import.meta.env.VITE_APP_API_URL || '';

export const client = axios.create({ baseURL: API_URL });

/**
 * Interceptor request
 */
client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor response
 */
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
