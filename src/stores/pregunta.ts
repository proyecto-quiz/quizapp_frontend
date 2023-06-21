import { defineStore, StoreState } from 'pinia';
import { preguntaGeneral, preguntaTema, preguntaCurso, preguntaAdd } from '@/api';
import { UsePreguntaResponse } from '@@/types-response-pregunta';
import { ErrorResponse, GetStatusStore, TypeStatusStore } from '@@/type-config-api';
type StateType = {
  pregunta: null | UsePreguntaResponse['pregunta'];
  level: string | null;
  status: TypeStatusStore;
  messaje?: ErrorResponse['detail'];
  preguntaStatus?: boolean;
};
type GettersType = {
  getPregunta(state: StoreState<StateType>): StateType['pregunta'];
} & GetStatusStore<StoreState<StateType>>;
type ActionsType = {
  responderAction(): Promise<void>;
  resetPreguntaStatusAction(): Promise<void>;
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
      pregunta: null,
      level: null,
      messaje: '',
      preguntaStatus: false,
    }),
    getters: {
      getPregunta(state) {
        return state.pregunta;
      },
      getPreguntaStatus(state) {
        return state.preguntaStatus;
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
      async responderAction() {
        this.preguntaStatus = true;
      },
      async resetPreguntaStatusAction() {
        this.preguntaStatus = false;
      },
      async preguntaGeneralAction() {
        this.status = 'loading';
        const res = await preguntaGeneral();
        if (res.status === 200) {
          this.status = 'idle';
          this.pregunta = res.data.question;
          this.level = res.data.level;
        } else {
          this.status = 'error';
          this.pregunta = null;
          this.level = 'advanced';
        }
      },
      async preguntaTemaAction(id) {
        this.status = 'loading';
        const res = await preguntaTema(id);
        if (res.status === 200) {
          this.status = 'idle';
          this.pregunta = res.data.question;
          this.level = res.data.level;
        } else {
          this.status = 'error';
          this.pregunta = null;
          this.level = 'basic';
        }
      },
      async preguntaCursoAction(id) {
        this.status = 'loading';
        const res = await preguntaCurso(id);
        if (res.status === 200) {
          this.status = 'idle';
          this.pregunta = res.data.question;
          this.level = res.data.level;
        } else {
          this.status = 'error';
          this.pregunta = null;
          this.level = 'medium';
        }
      },
      async preguntaAddAction(data) {
        this.status = 'loading';
        const res = await preguntaAdd(data);
        if (res.status === 201) {
          this.status = 'idle';
          this.level = res.data.level;
          this.messaje = res.data.message;
        } else {
          this.status = 'error';
          this.messaje = 'Uno de los campos no es válido o obligatorio';
        }
      },
    },
  }
);
