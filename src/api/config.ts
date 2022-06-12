/**
 * Client axios
 */

import axios from 'axios';
import { RefreshTokenResponse, TokenResponse } from '@@/types-response-users';
import { useGetStorage } from '@/composables';

// URL Api
const API_URL = import.meta.env.VITE_APP_API_URL || '';
const API_V1 = `${API_URL}/api`;

export const client = axios.create({ baseURL: API_V1 });
client.defaults.headers.common['Content-Type'] = 'application/json;';

const username = localStorage.getItem('username');
const tokens = useGetStorage<TokenResponse>('tokens');

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
        client.defaults.headers.common['authorization'] = `Bearer ${res.data.accessToken}`;
        return client(error.config);
      }
    }
    isRefresh = false;

    return Promise.reject(error);
  }
);
