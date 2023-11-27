import { defineStore, StoreState } from 'pinia';
import { questionSource } from '@/api';
//import { UseResponse, useNotaRankingResponse } from '@@/types-response-nota';
type StateType = {
  questionSource: [] | null;
};
type GettersType = {
  getQuestionSource(state: StoreState<StateType>): StateType['questionSource'];
};
type ActionsType = {
  questionSourceAction(): Promise<void> | void;
};
export const useQuestionSourceStore = defineStore<'questionSource', StateType, GettersType, ActionsType>('questionSource', {
  state: () => ({
    questionSource: [],
  }),
  getters: {
    getQuestionSource(state) {
      return state.questionSource;
    },
  },
  actions: {
    async questionSourceAction() {
      const res = await questionSource();
      this.questionSource = res.data;
    },
  },
});
