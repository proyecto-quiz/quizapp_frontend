import { defineStore, StoreState } from 'pinia';
import { solucion } from '@/api';
import { SolucionForm } from '@@/types-forms';
import { UseSolucionResponse } from '@@/types-response-solucion';
type StateType = {
  soluciones: [] | UseSolucionResponse;
  respuesta: string | null;
  respuestaCorrecta: string | null;
};
type GettersType = {
  getSolucion(state: StoreState<StateType>): StateType['soluciones'];
};
type ActionsType = {
  solucionAction(data: SolucionForm): Promise<void> | void;
};
export const useSolucionStore = defineStore<'solucion', StateType, GettersType, ActionsType>(
  'solucion',
  {
    state: () => ({
      soluciones: [],
      respuesta: null,
      respuestaCorrecta: null,
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
    },
  }
);
