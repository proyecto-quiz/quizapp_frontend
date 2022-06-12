import { PiniaPlugin } from 'pinia';
import { useAuthStore } from '@/stores';
import { client } from '@/api';

export const setTokenAuth: PiniaPlugin = async (mini) => {
  const auth = useAuthStore(mini.pinia);
  auth.$subscribe(
    async (_mut, state) => {
      const tokens = state.tokens;
      if (tokens.accessToken) {
        client.defaults.headers.common['authorization'] = `Bearer ${tokens.accessToken}`;
      }
    },
    { immediate: true, deep: true }
  );
  if (auth.tokens.accessToken) {
    client.defaults.headers.common['authorization'] = `Bearer ${auth.tokens.accessToken}`;
  }
};
