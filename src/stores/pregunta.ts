import { defineStore, StoreState } from 'pinia';
import { preguntaGeneral, preguntaTema, preguntaCurso, preguntaAdd } from '@/api';
import { UsePreguntaResponse } from '@@/types-response-pregunta';
import { PreguntaForm } from '@@/types-forms';

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
  preguntaCursoAction(id: string | undefined): Promise<void> | void;
  preguntaAddAction(data: PreguntaForm): Promise<void> | void;
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
      },
      async preguntaTemaAction(id) {
        const res = await preguntaTema(id);
        this.preguntas = res.data.pregunta;
        this.tipo = res.data.tipo;
      },
      async preguntaCursoAction(id) {
        const res = await preguntaCurso(id);
        this.preguntas = res.data.pregunta;
        this.tipo = res.data.tipo;
      },
      async preguntaAddAction(data) {
        const res = await preguntaAdd(data);
        console.log(res.status);
        if (res.status === 201) {
          console.log('guardado');
        } else {
          console.log('error');
        }
      },
    },
  }
);
