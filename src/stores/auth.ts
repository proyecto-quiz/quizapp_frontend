import { defineStore, StoreState } from 'pinia';
import { me, signIn, signOut } from '@/api';
import { ErrorResponse } from '@@/type-config-api';
import { SignInForm } from '@@/types-forms';
import { TokenResponse, UserAuthenticateResponse } from '@@/types-response-users';
import { useGetStorage } from '@/composables';

type StateType = {
  user: null | UserAuthenticateResponse['user'];
  token: string;
  isLoggedIn: boolean | false;
  message?: ErrorResponse['detail'];
  status: 'error' | 'success' | 'idle' | 'loading';
  isReady: boolean;
};

type ActionsType = {
  signInAction(data: SignInForm): Promise<{ tokens: string[]; ok: boolean }>;
  signOutAction(_fn?: () => Promise<void> | void): Promise<void> | void;
  meAction(): Promise<void> | void;
};

type GettersType = {
  getUser(state: StoreState<StateType>): StateType['user'];
  isAuth(state: StoreState<StateType>): StateType['isLoggedIn'];
};

export const useAuthStore = defineStore<'auth-store', StateType, GettersType, ActionsType>(
  'auth-store',
  {
    state: () => ({
      status: 'idle',
      user: null,
      token: useGetStorage<TokenResponse>('tokens')?.accessToken || '',
      isLoggedIn: false,
      isReady: false,
    }),
    getters: {
      getUser(state) {
        return state.user;
      },
      isAuth(state) {
        return state.isLoggedIn;
      },
    },
    actions: {
      async signInAction(data) {
        this.status = 'loading';
        const res = await signIn(data);
        if (res.status === 200) {
          this.status = 'success';
          this.token = res.data.accessToken;
        } else {
          this.status = 'error';
          this.message = res.data.detail;
        }
        return {
          tokens: [res.data.accessToken, res.data.refreshToken],
          ok: res.status === 200,
        };
      },
      async meAction() {
        this.status = 'loading';
        const res = await me(this.token);
        if (res.status == 200) {
          this.status = 'idle';
          this.isLoggedIn = Boolean(res.data.user);
          this.isReady = Boolean(res.data.user);
          this.user = res.data.user;
        } else {
          this.isReady = true;
        }
        // TODO: Evaluation an else conditional
      },
      async signOutAction(fn) {
        this.status = 'loading';
        const res = await signOut();
        if (res.status == 200) {
          await fn?.();
          this.$reset();
        } else {
          this.$reset();
        }
      },
    },
  }
);
