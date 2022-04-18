import { defineStore, StoreState } from 'pinia';
import { preguntaGeneral } from '@/api';

interface preguntaInterface {
  id: string;
  texto: string | null;
  alternativas: [
    {
      id: string;
      contenido: string;
    }
  ];
  imagen: string;
  tema: string;
  curso: string;
}
type StateType = {
  preguntas: preguntaInterface;
  tipo: string | null;
};
type GettersType = {
  getPregunta(state: StoreState<StateType>): StateType['preguntas'];
};
type ActionsType = {
  preguntaGeneralAction(): Promise<void> | void;
};
export const usePreguntaStore = defineStore<'pregunta', StateType, GettersType, ActionsType>(
  'pregunta',
  {
    state: () => ({
      preguntas: [],
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
    },
  }
);
