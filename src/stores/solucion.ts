import { defineStore, StoreState } from 'pinia';
import { solucion, solucionAdd } from '@/api';
import { SolucionForm } from '@@/types-forms';
import { UseSolucionResponse } from '@@/types-response-solucion';
import { ErrorResponse, GetStatusStore, TypeStatusStore } from '@@/type-config-api';
type StateType = {
  status: TypeStatusStore;
  soluciones: [] | UseSolucionResponse;
  respuesta: string | boolean;
  respuestaCorrecta: string | null;
  message: ErrorResponse['detail'];
};
type GettersType = {
  getSolucion(state: StoreState<StateType>): StateType['soluciones'];
} & GetStatusStore<StoreState<StateType>>;
type ActionsType = {
  solucionAction(data: SolucionForm): Promise<void> | void;
  solucionAddAction(data: FormData): Promise<void> | void;
};
export const useSolucionStore = defineStore<'solucion', StateType, GettersType, ActionsType>(
  'solucion',
  {
    state: () => ({
      status: 'idle',
      soluciones: [],
      respuesta: false,
      respuestaCorrecta: null,
      message: '',
    }),
    getters: {
      getSolucion(state) {
        return state.soluciones;
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
      async solucionAction(data) {
        this.status = 'loading';
        const res = await solucion(data);
        console.log(res);
        if (res.status === 200) {
          this.status = 'idle';

          this.soluciones = res.data.solucion;
          this.respuesta = res.data.answer.is_answer;
          this.respuestaCorrecta = res.data.answer.correct_alternative;
        } else {
          this.status = 'error';
          this.message = res.data.message;
        }
      },
      async solucionAddAction(data) {
        const res = await solucionAdd(data);
        if (res.status === 201) {
          this.message = 'Guardado Correctamente';
          console.log('guardado');
        } else {
          this.message = 'Uno de los campos no es valido';
        }
      },
    },
  }
);
