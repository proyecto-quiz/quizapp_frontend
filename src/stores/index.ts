import { defineStore } from 'pinia';

type AppStateType = {
  user: null;
  token?: string;
  isLoggedIn: boolean | false;
};

export const useAppStore = defineStore<'app-store', AppStateType>('app-store', {
  state: () => ({
    user: null,
    token: '',
    isLoggedIn: false,
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setUserAction() {
      this.user = Object.assign({}, this.user, {
        name: 'user 1',
        email: 'user@mail.com',
      });
      this.isLoggedIn = Boolean(this.user);
    },
  },
});
