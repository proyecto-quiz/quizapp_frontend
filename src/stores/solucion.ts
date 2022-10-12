import { defineStore, StoreState } from 'pinia';
import { solucion, solucionAdd } from '@/api';
import { SolucionForm } from '@@/types-forms';
import { UseSolucionResponse } from '@@/types-response-solucion';
type StateType = {
  soluciones: [] | UseSolucionResponse;
  respuesta: string | null;
  respuestaCorrecta: string | null;
  message: string | null;
};
type GettersType = {
  getSolucion(state: StoreState<StateType>): StateType['soluciones'];
};
type ActionsType = {
  solucionAction(data: SolucionForm): Promise<void> | void;
  solucionAddAction(data: FormData): Promise<void> | void;
};
export const useSolucionStore = defineStore<'solucion', StateType, GettersType, ActionsType>(
  'solucion',
  {
    state: () => ({
      soluciones: [],
      respuesta: null,
      respuestaCorrecta: null,
      message: null,
    }),
    getters: {
      getSolucion(state) {
        return state.soluciones;
      },
    },
    actions: {
      async solucionAction(data) {
        const res = await solucion(data);
        this.soluciones = res.data.solucion;
        this.respuesta = res.data.respuesta;
        this.respuestaCorrecta = res.data.respuestaCorrecta;
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
