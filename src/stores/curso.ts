import { defineStore, StoreState } from 'pinia';
import { curso } from '@/api';
import { GetStatusStore, TypeStatusStore } from '@@/type-config-api';

interface cursoint {
  id: string;
  nombre: string;
  temas: [];
}

type StateType = {
  cursos: cursoint[];
  count: number;
  status: TypeStatusStore;
};

type GettersType = {
  getCursos(state: StoreState<StateType>): StateType['cursos'];
} & GetStatusStore<StoreState<StateType>>;

type ActionsType = {
  cursoAction(): Promise<void>;
};

export const useCursoStore = defineStore<'curso', StateType, GettersType, ActionsType>('curso', {
  state: () => ({
    status: 'idle',
    cursos: [],
    count: 0,
  }),
  getters: {
    getCursos(state) {
      return state.cursos;
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
      const res = await curso();
      if (res.status === 200) {
        this.status = 'idle';
        this.cursos = res.data.cursos;
        this.count = res.data.count;
      } else {
        this.status = 'error';
      }
    },
  },
});
