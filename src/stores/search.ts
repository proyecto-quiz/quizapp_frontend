import { defineStore, StoreState } from 'pinia';
import { UseSearchPreguntaResponse } from '@@/types-response-search';
import { search } from '@/api';
import { ErrorResponse, GetStatusStore, TypeStatusStore } from '@@/type-config-api';
type StateType = {
  listPregunta: [] | UseSearchPreguntaResponse['searchPregunta'];
  status: TypeStatusStore;
  messaje?: null | ErrorResponse['detail'];
};
type GettersType = {
  getListPregunta(state: StoreState<StateType>): StateType['listPregunta'];
} & GetStatusStore<StoreState<StateType>>;
type ActionsType = {
  SearchPreguntaAction(text: string | undefined): Promise<void> | void;
};
export const useSearchStore = defineStore<'searchPregunta', StateType, GettersType, ActionsType>(
  'searchPregunta',
  {
    state: () => ({
      status: 'idle',
      listPregunta: [],
      messaje: null,
    }),
    getters: {
      getListPregunta(state) {
        return state.listPregunta;
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
      async SearchPreguntaAction(text: string) {
        this.status = 'loading';
        const res = await search(text);
        if (res.status === 200) {
          this.status = 'idle';
          this.listPregunta = res.data;
        } else {
          this.status = 'error';
          this.messaje = res.data.detail;
          this.listPregunta = [];
        }
      },
    },
  }
);
