import { defineStore, StoreState } from 'pinia';
import { preguntaGeneral, preguntaTema } from '@/api';
import { UsePreguntaResponse } from '@@/types-response-pregunta';

type StateType = {
  preguntas: null | UsePreguntaResponse['pregunta'];
  tipo: string | null;
};
type GettersType = {
  getPregunta(state: StoreState<StateType>): StateType['preguntas'];
};
type ActionsType = {
  preguntaGeneralAction(): Promise<void> | void;
  preguntaTemaAction(id: string | undefined): Promise<void> | void;
};
export const usePreguntaStore = defineStore<'pregunta', StateType, GettersType, ActionsType>(
  'pregunta',
  {
    state: () => ({
      preguntas: null,
      tipo: null,
    }),
    getters: {
      getPregunta(state) {
        return state.preguntas;
      },
    },
    actions: {
      async preguntaGeneralAction() {
        const res = await preguntaGeneral();
        this.preguntas = res.data.pregunta;
        this.tipo = res.data.tipo;
        console.log(this.preguntas);
      },
      async preguntaTemaAction(id) {
        const res = await preguntaTema(id);
        this.preguntas = res.data.pregunta;
        this.tipo = res.data.tipo;
        console.log(this.preguntas);
      },
    },
  }
);
