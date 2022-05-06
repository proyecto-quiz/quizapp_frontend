import { defineStore, StoreState } from 'pinia';
import { me, signIn, signOut, signUp } from '@/api';
import { ErrorResponse } from '@@/type-config-api';
import { SignInForm, SignUpForm } from '@@/types-forms';
import { TokenResponse, UserAuthenticateResponse } from '@@/types-response-users';
import { useGetStorage } from '@/composables';

type StateType = {
  user: UserAuthenticateResponse['user'] | null;
  token: string;
  isLoggedIn: boolean;
  message?: ErrorResponse['detail'];
  status: 'error' | 'success' | 'idle' | 'loading';
  isReady: boolean;

  saveValue?: any;
};

type ActionsType = {
  meAction(): Promise<void> | void;
  resetAction(): void;
  saveValueAction<T>(value: T): void;

  signInAction(data: SignInForm, fn: (tokens: string[]) => Promise<void> | void): Promise<void>;
  signOutAction(fn?: () => Promise<void> | void): Promise<void>;
  signUpAction(data: SignUpForm, fn?: () => Promise<void> | void): Promise<void>;
};

type GettersType = {
  getUser(state: StoreState<StateType>): StateType['user'];
  isAuth(state: StoreState<StateType>): boolean;
  isReadyApp(state: StoreState<StateType>): boolean;

  // Statuses
  isError(state: StoreState<StateType>): boolean;
  isIdle(state: StoreState<StateType>): boolean;
  isLoading(state: StoreState<StateType>): boolean;
  isSuccess(state: StoreState<StateType>): boolean;
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
        return this.isLoggedIn && state.isLoggedIn;
      },

      isReadyApp(state) {
        return state.isReady;
      },

      // Statuses
      isSuccess(state) {
        return state.status === 'success';
      },
      isIdle(state) {
        return state.status === 'idle';
      },
      isError(state) {
        return state.status === 'error';
      },
      isLoading(state) {
        return state.status === 'loading';
      },
    },
    actions: {
      async signInAction(data, fn) {
        this.status = 'loading';
        const res = await signIn(data);
        if (res.status === 200) {
          this.status = 'success';
          this.token = res.data.accessToken;
          await fn?.([res.data.accessToken, res.data.refreshToken]);
        } else {
          this.status = 'error';
          this.message = res.data.detail || res.data.nonFieldErrors;
        }
      },

      async meAction() {
        this.status = 'loading';
        const res = await me(this.token);
        if (res.status === 200) {
          this.isReady = Boolean(res.data.user);
          this.isLoggedIn = Boolean(res.data.user);
          this.user = res.data.user;
        } else {
          this.isLoggedIn = false;
          this.user = null;
          this.isReady = true;
        }
        this.status = 'idle';
      },

      async signOutAction(fn) {
        this.status = 'loading';
        const res = await signOut();
        if (res.status == 200) await fn?.();
        this.resetAction();
      },

      async signUpAction(data, fn) {
        this.status = 'loading';
        const res = await signUp(data);
        if (res.status == 200 || res.status == 201) {
          this.status = 'success';
          this.message = res.data.message;
          await fn?.();
        } else {
          this.status = 'error';
          this.message = res.data.nonFieldErrors || res.data.detail || res.data;
        }
      },

      saveValueAction<T = any>(value: T) {
        this.saveValue = value;
      },

      resetAction() {
        this.$reset();
        this.isReady = true;
      },
    },
  }
);
