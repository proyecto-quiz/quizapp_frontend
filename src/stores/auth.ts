import { defineStore, StoreState } from 'pinia';
import { SignInForm, SignUpForm } from '@@/types-forms';
import { ErrorResponse, GetStatusStore, TypeStatusStore } from '@@/type-config-api';
import { TokenResponse, UserAuthenticateResponse } from '@@/types-response-users';
import { me, signIn, signOut, signUp, verify } from '@/api';
import { useGetStorage } from '@/composables';

type StateType = {
  user: UserAuthenticateResponse['user'] | undefined;
  tokens: TokenResponse;
  isLoggedIn: boolean;
  message?: ErrorResponse['detail'] | null;
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
  verifyAction(token:string):Promise<void> | void;
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
      message: null,
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
          this.message = 'Inicio de sesión correctamente.';
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
        if (res.status == 200 || res.status == 201 || res.status == 500) {
          this.status = 'success';
          this.message = 'Felicidades, ya formas parte de NoteBlue';
          await fn();
        } else {
          this.status = 'error';
          this.message = res.data.nonFieldErrors || res.data.detail || res.data;
          console.log(res.status);
        }
      },

      async verifyAction(token){
        this.status = 'loading';
        const res = await verify(token);
        if(res.status=='200'){

          this.status = 'success';
          this.message = 'Verificación exitosa'
        }
        else{
          this.status = 'error';
          this.message = 'token invalido'
        }
      },

      resetAction() {
        this.$reset();
        this.isReady = true;
      },
    },
  }
);
