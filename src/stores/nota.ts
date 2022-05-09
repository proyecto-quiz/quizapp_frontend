import { defineStore, StoreState } from 'pinia';
import { notaMe } from '@/api';
import { UseNotaResponse } from '@@/types-response-nota';
type StateType = {
  notas: null | UseNotaResponse[];
};
type GettersType = {
  getNotas(state: StoreState<StateType>): StateType['notas'];
};
type ActionsType = {
  notaMeAction(tipo: string | undefined): Promise<void> | void;
};
export const useNotaStore = defineStore<'nota', StateType, GettersType, ActionsType>('nota', {
  state: () => ({
    notas: null,
  }),
  getters: {
    getNotas(state) {
      return state.notas;
    },
  },
  actions: {
    async notaMeAction(tipo) {
      const res = await notaMe(tipo);
      console.log(res);
      this.notas = res.data;
    },
  },
});
