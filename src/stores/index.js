import { defineStore } from 'pinia';

export const useAppStore = defineStore('app-store', {
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
