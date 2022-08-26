import { defineStore, StoreState } from 'pinia';
import { notaMe, notaRanking } from '@/api';
import { UseNotaResponse } from '@@/types-response-nota';
type StateType = {
  notas: null | UseNotaResponse[];
  notasRanking: null | [];
};
type GettersType = {
  getNotas(state: StoreState<StateType>): StateType['notas'];
};
type ActionsType = {
  notaMeAction(tipo: string | undefined): Promise<void> | void;
  notaRankingAction(tipo: string, idTemaCurso: string | undefined): Promise<void> | void;
};
export const useNotaStore = defineStore<'nota', StateType, GettersType, ActionsType>('nota', {
  state: () => ({
    notas: null,
    notasRanking: null,
  }),
  getters: {
    getNotas(state) {
      return state.notas;
    },
  },
  actions: {
    async notaMeAction(tipo) {
      const res = await notaMe(tipo);
      this.notas = res.data;
    },
    async notaRankingAction(tipo, idTemaCurso) {
      const res = await notaRanking(tipo, idTemaCurso);
      this.notasRanking = res.data;
    },
  },
});
