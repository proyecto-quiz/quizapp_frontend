import { defineStore, StoreState } from 'pinia';
import { SignInForm, SignUpForm } from '@@/types-forms';
import { ErrorResponse, GetStatusStore, TypeStatusStore } from '@@/type-config-api';
import { TokenResponse, UserAuthenticateResponse } from '@@/types-response-users';
import { me, signIn, signOut, signUp } from '@/api';
import { useGetStorage } from '@/composables';

type StateType = {
  user: UserAuthenticateResponse['user'] | undefined;
  tokens: TokenResponse;
  isLoggedIn: boolean;
  message?: ErrorResponse['detail'];
  status: TypeStatusStore;
  isReady: boolean;

  saveValue?: any;
};

type ActionsType = {
  meAction(): Promise<void> | void;
  resetAction(): void;

  signInAction(data: SignInForm, fn: (tokens: string[]) => Promise<void>): Promise<void>;
  signOutAction(fn: () => Promise<void>): Promise<void>;
  signUpAction(data: SignUpForm, fn: () => Promise<void>): Promise<void>;
};

type GettersType = {
  isAuth(state: StoreState<StateType>): boolean;
  isReadyApp(state: StoreState<StateType>): boolean;
  userFullName(state: StoreState<StateType>): string;
} & GetStatusStore<StoreState<StateType>>;

export const useAuthStore = defineStore<'auth-store', StateType, GettersType, ActionsType>(
  'auth-store',
  {
    state: () => ({
      status: 'idle',
      user: undefined,
      tokens: {
        accessToken: useGetStorage<TokenResponse>('tokens')?.accessToken || '',
        refreshToken: useGetStorage<TokenResponse>('tokens')?.refreshToken || '',
      },

      isLoggedIn: false,
      isReady: false,
    }),
    getters: {
      isAuth(state) {
        return this.isLoggedIn && state.isLoggedIn;
      },
      isReadyApp(state) {
        return state.isReady;
      },

      userFullName(state) {
        const user = state.user;
        if (!!user?.name && !!user?.lastName) return `${state.user?.name} ${state.user?.lastName}`;
        return user?.username || '';
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
          this.tokens = res.data;
          await fn([this.tokens.accessToken, this.tokens.refreshToken]);
        } else {
          this.status = 'error';
          this.message = res.data.detail || res.data.nonFieldErrors;
        }
      },

      async meAction() {
        this.status = 'loading';
        const res = await me();
        if (res.status === 200) {
          this.isReady = Boolean(res.data.user);
          this.isLoggedIn = Boolean(res.data.user);
          this.user = res.data.user;
          localStorage.setItem('username', this.user.username);
        } else {
          this.isLoggedIn = false;
          this.user = undefined;
          this.isReady = true;
          localStorage.removeItem('username');
        }
        this.status = 'idle';
      },

      async signOutAction(fn) {
        this.status = 'loading';
        const res = await signOut();
        if (res.status == 200) await fn();

        this.resetAction();
      },

      async signUpAction(data, fn) {
        this.status = 'loading';
        const res = await signUp(data);
        if (res.status == 200 || res.status == 201) {
          this.status = 'success';
          this.message = res.data.message;
          await fn();
        } else {
          this.status = 'error';
          this.message = res.data.nonFieldErrors || res.data.detail || res.data;
        }
      },

      resetAction() {
        this.$reset();
        this.isReady = true;
      },
    },
  }
);
