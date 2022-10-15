import { defineStore, StoreState } from 'pinia';
import { preguntaGeneral, preguntaTema, preguntaCurso, preguntaAdd } from '@/api';
import { UsePreguntaResponse } from '@@/types-response-pregunta';
import { ErrorResponse, GetStatusStore, TypeStatusStore } from '@@/type-config-api';
type StateType = {
  preguntas: null | UsePreguntaResponse['pregunta'];
  tipo: string | null;
  status: TypeStatusStore;
  messaje?: ErrorResponse['detail'];
};
type GettersType = {
  getPregunta(state: StoreState<StateType>): StateType['preguntas'];
} & GetStatusStore<StoreState<StateType>>;
type ActionsType = {
  preguntaGeneralAction(): Promise<void> | void;
  preguntaTemaAction(id: string | undefined): Promise<void> | void;
  preguntaCursoAction(id: string | undefined): Promise<void> | void;
  preguntaAddAction(data: FormData): Promise<void> | void;
};
export const usePreguntaStore = defineStore<'pregunta', StateType, GettersType, ActionsType>(
  'pregunta',
  {
    state: () => ({
      status: 'idle',
      preguntas: null,
      tipo: null,
      messaje: '',
    }),
    getters: {
      getPregunta(state) {
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
      async preguntaGeneralAction() {
        this.status = 'loading';
        const res = await preguntaGeneral();
        if (res.status === 200) {
          this.status = 'idle';
          this.preguntas = res.data.pregunta;
          this.tipo = res.data.tipo;
        } else {
          this.status = 'error';
          this.preguntas = null;
          this.tipo = 'general';
        }
      },
      async preguntaTemaAction(id) {
        this.status = 'loading';
        const res = await preguntaTema(id);
        if (res.status === 200) {
          this.status = 'idle';
          this.preguntas = res.data.pregunta;
          this.tipo = res.data.tipo;
        } else {
          this.status = 'error';
          this.preguntas = null;
          this.tipo = 'tema';
          console.log(res);
        }
      },
      async preguntaCursoAction(id) {
        this.status = 'loading';
        const res = await preguntaCurso(id);
        if (res.status === 200) {
          this.status = 'idle';
          this.preguntas = res.data.pregunta;
          this.tipo = res.data.tipo;
        } else {
          this.status = 'error';
          this.preguntas = null;
          this.tipo = 'curso';
        }
      },
      async preguntaAddAction(data) {
        this.status = 'loading';
        const res = await preguntaAdd(data);
        console.log(res.status);
        if (res.status === 201) {
          this.status = 'idle';
          this.tipo = res.data.tipo;
          this.messaje = res.data.message;
        } else {
          this.status = 'error';
          this.messaje = 'Uno de los campos no es válido o obligatorio';
        }
      },
    },
  }
);
