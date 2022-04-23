import { defineStore, StoreState } from 'pinia';
import { curso } from '@/api';

interface cursoint {
  id: string;
  nombre: string;
  temas: [];
}
type StateType = {
  cursos: cursoint[];
};
type GettersType = {
  getCursos(state: StoreState<StateType>): StateType['cursos'];
};
type ActionsType = {
  cursoAction(): Promise<void> | void;
};

export const useCursoStore = defineStore<'curso', StateType, GettersType, ActionsType>('curso', {
  state: () => ({
    cursos: [],
  }),
  getters: {
    getCursos(state) {
      return state.cursos;
    },
  },
  actions: {
    async cursoAction() {
      const res = await curso();
      console.log(res.data);
      if (res.status === 200) {
        this.cursos = res.data.cursos;
      }
    },
  },
});
