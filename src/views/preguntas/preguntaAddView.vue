<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue';
import { usePreguntaStore } from '@/stores';
//import PreguntaImage from '@/assets/images/Geometria.jpg';
import { PreguntaForm } from '@@/types-forms';
import { useCursoStore } from '@/stores';
const preguntaStore = usePreguntaStore();
const cursoStore = useCursoStore();
const cursosStoreComp = computed(() => cursoStore);
onMounted(async () => {
  await cursoStore.cursoAction();
});
const selecTema = ref({
  id: '',
  nombre: '',
});
const stateForm = reactive<PreguntaForm>({
  texto: '',
  tema: '',
  alternativas: [],
});
async function handleSelectClick() {
  await preguntaStore.preguntaAddAction(stateForm);
}
const newAlterText = '';
const is_answer = false;
async function addNewAlternativa(newAlterText: string, is_answer: boolean) {
  stateForm.alternativas.push({
    contenido: newAlterText,
    is_answer: is_answer,
  });
}
async function removeAlter(index: number) {
  stateForm.alternativas.splice(index, 1);
}
const answerColor = 'red';
</script>

<template>
  <div class="container">
    <form class="p-4" @submit.prevent="handleSelectClick">
      <div class="pregunta">
        <h1 class="text-lg font-medium uppercase text-contrast-01 md:text-3xl">Agregar Pregunta</h1>
        <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
          <strong>Curso</strong>
          <select
            v-model="selecTema"
            class="z-1 mr-6 mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent p-2.5 px-0 pt-3 pb-2 text-secondary-normal focus:border-secondary-normal/20 focus:outline-none focus:ring-0"
          >
            <option disabled value="">Seleccione un curso</option>
            <option v-for="curso in cursosStoreComp.getCursos" :key="curso.id" :value="curso.temas">
              {{ curso.nombre }}
            </option>
          </select>
        </div>
        <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
          <strong>Tema</strong>
          <select
            id="floating_filled"
            v-model="stateForm.tema"
            class="z-1 mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pt-3 pb-2 text-secondary-normal focus:border-secondary focus:outline-none focus:ring-0"
            placeholder=" "
          >
            <option disabled value="">Seleccione un tema</option>
            <option v-for="(tema, index) in selecTema" :key="index" :value="tema.id">
              {{ tema.nombre }}
            </option>
          </select>
        </div>
        <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
          <strong>Pregunta</strong>
          <textarea
            v-model="stateForm.texto"
            class="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-secondary dark:text-white dark:placeholder-gray-400"
            placeholder="Escribe la pregunta..."
            required
          ></textarea>
        </div>

        <div
          class="mb-4 w-full rounded-lg border border-gray-200 bg-gray-200 dark:border-secondary dark:bg-secondary-normal/20"
        >
          <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
            <strong>Alternativas</strong>
            <textarea
              v-model="newAlterText"
              class="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-secondary dark:text-white dark:placeholder-gray-400"
              placeholder="Escribe la alternativa ..."
            ></textarea>
          </div>
          <div
            class="flex items-center justify-between border-t py-2 px-3 dark:border-secondary-normal/20"
          >
            <div class="flex space-x-1 pl-0 sm:pl-2">
              <label for="answer">¿Es la respuesta?</label>
              <input id="answer" v-model="is_answer" type="checkbox" />
            </div>

            <div v-if="stateForm.alternativas.length < 5">
              <button
                class="button button--secondary"
                @click.prevent="addNewAlternativa(newAlterText, is_answer)"
              >
                Agregar
              </button>
            </div>
            <div v-else><strong>5 alternativas como máximo</strong></div>
          </div>
        </div>
      </div>
      <div>
        <ul class="flex flex-col">
          <li
            v-for="(alterList, index) in stateForm.alternativas"
            :key="index"
            class="mx-4 my-2 flex w-full flex-row"
          >
            {{ index + 1 }})
            {{ alterList.contenido }}
            <strong v-if="alterList.is_answer == true" :style="{ color: answerColor }">
              respuesta</strong
            >
            <button
              class="button button--primary--outline mx-4 max-w-sm"
              @click.prevent="removeAlter(index)"
            >
              Eliminar
            </button>
          </li>
        </ul>
      </div>
      <div class="flex justify-between">
        <button type="submit" class="button button--secondary">Guardar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.pregunta__text {
  @apply basis-1/2;
}

.imagen {
  @apply m-5 w-3/12 rounded-lg outline outline-offset-2 outline-cyan-500;
}

.pregunta {
  @apply mb-4 flex select-none flex-col gap-2 overflow-auto;
}

.label {
  @apply m-3 rounded-md px-3 outline outline-1 outline-offset-2;
}
</style>
