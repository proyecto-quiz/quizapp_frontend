import { defineStore, StoreState } from 'pinia';
import { notaMe, notaRanking } from '@/api';
import { UseNotaResponse, useNotaRankingResponse } from '@@/types-response-nota';
type StateType = {
  notas: null | UseNotaResponse[];
  notasRanking: null | useNotaRankingResponse;
};
type GettersType = {
  getNotas(state: StoreState<StateType>): StateType['notas'];
  getNotasRanking(state: StoreState<StateType>): StateType['notasRanking'];
};
type ActionsType = {
  notaMeAction(tipo: string | undefined): Promise<void> | void;
  notaRankingAction(): Promise<void> | void;
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
    getNotasRanking(state) {
      return state.notasRanking;
    },
  },
  actions: {
    async notaMeAction(tipo) {
      const res = await notaMe(tipo);
      this.notas = res.data;
    },
    async notaRankingAction() {
      const res = await notaRanking();
      this.notasRanking = res.data;
    },
  },
});
