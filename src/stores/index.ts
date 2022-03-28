import { defineStore, StoreState } from 'pinia';

type StateType = {
  user: null;
  token?: string;
  isLoggedIn: boolean | false;
};

type ActionsType = {
  setUserAction: () => void;
};

type GettersType = {
  getUser(_state: StoreState<StateType>): StateType['user'];
};

export const useAppStore = defineStore<'app-store', StateType, GettersType, ActionsType>(
  'app-store',
  {
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
  }
);
