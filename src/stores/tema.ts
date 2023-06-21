import { defineStore, StoreState } from 'pinia';
import { tema } from '@/api';
import { GetStatusStore, TypeStatusStore } from '@@/type-config-api';

interface Itema {
  id: string;
  name: string;
  description: string;
  course: number;
}

type StateType = {
  temas: Itema[];
  status: TypeStatusStore;
};

type GettersType = {
  getTemas(state: StoreState<StateType>): StateType['temas'];
} & GetStatusStore<StoreState<StateType>>;

type ActionsType = {
  cursoAction(): Promise<void>;
};

export const useCursoStore = defineStore<'tema', StateType, GettersType, ActionsType>('tema', {
  state: () => ({
    status: 'idle',
    temas: [],
  }),
  getters: {
    getTemas(state) {
      return state.temas;
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
    async cursoAction() {
      this.status = 'loading';
      const res = await tema();
      if (res.status === 200) {
        this.status = 'idle';
        this.temas = res.data;
      } else {
        this.status = 'error';
        this.temas = [];
      }
    },
  },
});
