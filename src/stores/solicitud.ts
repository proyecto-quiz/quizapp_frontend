import { defineStore, StoreState } from 'pinia';
import { listSolicitud, updateSolicitud, deleteSolicitud } from '@/api';
import { UsePreguntaResponse } from '@@/types-response-pregunta';
import { ErrorResponse, GetStatusStore, TypeStatusStore } from '@@/type-config-api';
type StateType = {
  preguntas: null | [];
  status: TypeStatusStore;
  message?: ErrorResponse['detail'];
};
type GettersType = {
  getListSolicitud(state: StoreState<StateType>): StateType['preguntas'];
} & GetStatusStore<StoreState<StateType>>;
type ActionsType = {
  listSolicitudAction(): Promise<void> | void;
  UpdateSolicitudAction(id: string | undefined, data: FormData): Promise<void> | void;
  DeleteSolicitudAction(id: string | undefined): Promise<void> | void;
};
export const useSolicitudStore = defineStore<'solicitud', StateType, GettersType, ActionsType>(
  'solicitud',
  {
    state: () => ({
      status: 'idle',
      preguntas: null,
      tipo: null,
      message: '',
    }),
    getters: {
      getListSolicitud(state) {
        return state.preguntas;
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
      async listSolicitudAction() {
        this.status = 'loading';
        const res = await listSolicitud();
        if (res.status === 200) {
          this.status = 'idle';
          this.preguntas = res.data;
        } else {
          this.status = 'error';
          this.preguntas = null;
        }
      },
      async UpdateSolicitudAction(id, data) {
        this.status = 'loading';
        const res = await updateSolicitud(id, data);
        if (res.status === 200) {
          this.status = 'idle';
          this.message = res.data.message;
        } else {
          this.status = 'error';
          this.message = 'error';
          this.preguntas = null;
        }
      },
      async DeleteSolicitudAction(id) {
        this.status = 'loading';
        const res = await deleteSolicitud(id);
        if (res.status === 204) {
          this.status = 'idle';
          this.message = res.data.message;
        } else {
          this.status = 'error';
          this.message = 'No es posible eliminar';
          this.preguntas = null;
        }
      },
    },
  }
);
