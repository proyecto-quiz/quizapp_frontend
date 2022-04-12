/**
 * Client axios
 */

import axios from 'axios';
import { useGetStorage } from '@/composables';
import { RefreshTokenResponse, TokenResponse } from '@@/types-response-users';

// URL Api
const API_URL = <string>import.meta.env.VITE_APP_API_URL || '';
const API_V1 = `${API_URL}/api`;

export const client = axios.create({ baseURL: API_V1 });

const username = useGetStorage<string>('username');
const tokens = useGetStorage<TokenResponse>('tokens');

client.defaults.headers.common['Content-Type'] = 'application/json;';

if (tokens) {
  client.defaults.headers.common['Authorization'] = `Bearer ${tokens?.accessToken}`;
}

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

let isRefresh = false;
/**
 * Interceptor response default Axios
 */
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if ((error.response.status === 403 || error.response.status === 401) && !isRefresh) {
      isRefresh = true;
      const res = await client.post<RefreshTokenResponse>(
        `/auth/refresh-token/?username=${username}`,
        {
          refreshToken: tokens?.refreshToken,
        }
      );
      if (res.status === 200) {
        client.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
        return client(error.config);
      }
    }
    isRefresh = false;

    return Promise.reject(error);
  }
);
