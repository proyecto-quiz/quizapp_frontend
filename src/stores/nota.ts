import { defineStore, StoreState } from 'pinia';
import { notaMe, notaRanking } from '@/api';
import { UseNotaResponse, useNotaRankingResponse } from '@@/types-response-nota';
type StateType = {
  notasMe: null | UseNotaResponse;
  notasRanking: null | useNotaRankingResponse;
};
type GettersType = {
  getNotas(state: StoreState<StateType>): StateType['notasMe'];
  getNotasRanking(state: StoreState<StateType>): StateType['notasRanking'];
};
type ActionsType = {
  notaMeAction(): Promise<void> | void;
  notaRankingAction(): Promise<void> | void;
};
export const useNotaStore = defineStore<'nota', StateType, GettersType, ActionsType>('nota', {
  state: () => ({
    notasMe: null,
    notasRanking: null,
  }),
  getters: {
    getNotas(state) {
      return state.notasMe;
    },
    getNotasRanking(state) {
      return state.notasRanking;
    },
  },
  actions: {
    async notaMeAction() {
      const res = await notaMe();
      this.notasMe = res.data;
    },
    async notaRankingAction() {
      const res = await notaRanking();
      this.notasRanking = res.data;
    },
  },
});
