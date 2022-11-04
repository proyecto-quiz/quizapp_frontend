import { defineStore, StoreState } from 'pinia';
import { curso } from '@/api';
import { GetStatusStore, TypeStatusStore } from '@@/type-config-api';

interface temas {
  id: string;
  nombre: string;
  countPreguntaTema: number;
}
interface ICurso {
  id: string;
  nombre: string;
  countPreguntaCurso: number;
  temas: [temas];
}

type StateType = {
  cursos: ICurso[];
  countCursos: number;
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
    countCursos: 0,
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
        this.countCursos = res.data.count;
      } else {
        this.status = 'error';
        this.cursos = [];
        this.countCursos = 0;
      }
    },
  },
});
