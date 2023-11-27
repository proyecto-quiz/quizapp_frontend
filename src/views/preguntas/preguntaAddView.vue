<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue';
import { PreguntaForm } from '@@/types-forms';
import { useCursoStore, useQuestionSourceStore, usePreguntaStore } from '@/stores';
import { json } from 'stream/consumers';
const preguntaStore = usePreguntaStore();
const cursoStore = useCursoStore();
const QuestionSourceStore = useQuestionSourceStore();
const cursosStoreComp = computed(() => cursoStore);
const questionSourceStoreComp = computed(() => QuestionSourceStore.getQuestionSource);
const newAlterText = ref('');
const isAnswer = ref(false);
const contador = ref(0);

onMounted(async () => {
  await cursoStore.cursoAction();
  await QuestionSourceStore.questionSourceAction();
  var select = document.querySelector<HTMLSelectElement>('#list-curso');
  if (select != null) {
    select.options[0].selected = true;
  }
});
const selecTopic = ref();
const selecSource = ref();
const stateForm = reactive<PreguntaForm>({
  text: '',
  topic: null,
  imagen: null,
  alternatives: [],
});
async function handleFormClick() {
  let preguntaForm = new FormData();
  preguntaForm.append('topic', stateForm.topic);
  preguntaForm.append('text', stateForm.text);
  preguntaForm.append('alternatives', JSON.stringify(stateForm.alternatives));
  preguntaForm.append('question_sources', JSON.stringify(selecSource.value));
  if (stateForm.imagen != null) {
    preguntaForm.append('imagen', stateForm.imagen);
  }
  if (contador.value == 1) {
    await preguntaStore.preguntaAddAction(preguntaForm);
    stateForm.text = '';
    stateForm.alternatives = [];
    stateForm.imagen = null;
    contador.value = 0;
    alert(preguntaStore.messaje);
  } else {
    alert('agregar una respuesta');
  }
}

async function addNewAlternativa(alternativaText: string, answer: boolean) {
  if (answer == true) {
    if (contador.value < 1) {
      stateForm.alternatives.push({
        text: alternativaText,
        is_answer: answer,
      });
      contador.value = contador.value + 1;
    } else {
      alert('no puedes agregar mas de 1 respuestas');
    }
  } else {
    stateForm.alternatives.push({
      text: alternativaText,
      is_answer: answer,
    });
  }
  newAlterText.value = '';
  isAnswer.value = false;
}
async function removeAlternativa(index: number) {
  stateForm.alternatives.splice(index, 1);
  if (contador.value == 1) contador.value = 0;
}
async function editAlternativa(index: number) {
  var alter = stateForm.alternatives[index];
  newAlterText.value = alter.text;
  isAnswer.value = alter.is_answer;
  stateForm.alternatives.splice(index, 1);
  if (alter.is_answer === true) contador.value = 0;
}
const image = ref();
const answerColor = 'red';
async function onFleSelected(event: any) {
  let file = event.target.files[0];
  image.value = URL.createObjectURL(file); //url imagen
  stateForm.imagen = file;
}
async function imageDelete() {
  stateForm.imagen = null;
  image.value = null;
}

const showForm = ref(false);
</script>

<template>
  <div class="container">
    <form class="p-4" @submit.prevent="handleFormClick">
      <div class="pregunta">
        <h1 class="text-lg font-medium uppercase text-contrast-01 md:text-3xl">Agregar Pregunta</h1>
        <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
          <strong>Curso</strong>
          <select
            id="list-curso"
            v-model="selecTopic"
            class="z-1 mr-6 mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent p-2.5 px-0 pt-3 pb-2 text-secondary-normal focus:border-secondary-normal/20 focus:outline-none focus:ring-0"
            required
          >
            <option disabled value="">Seleccione un curso</option>
            <option
              v-for="curso in cursosStoreComp.getCursos"
              :key="curso.id"
              :value="curso.topics"
            >
              {{ curso.name }}
            </option>
          </select>
        </div>

        <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
          <strong>Tema</strong>
          <select
            id="list-tema"
            v-model="stateForm.topic"
            class="z-1 mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pt-3 pb-2 text-secondary-normal focus:border-secondary focus:outline-none focus:ring-0"
            required
          >
            <option disabled value="">Seleccione un tema</option>
            <option v-for="(topic, index) in selecTopic" :key="index" :value="topic.id">
              {{ topic.name }}
            </option>
          </select>
        </div>
        <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
          <strong>Pregunta</strong>
          <textarea
            v-model="stateForm.text"
            class="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-secondary dark:text-white dark:placeholder-gray-400"
            placeholder="Escribe la pregunta..."
            required
          ></textarea>
        </div>
        <div class="flex flex-wrap justify-center">
          <div class="mb-3 w-max">
            <label for="formFile" class="form-label mb-2 inline-block dark:text-white">
              <strong>Agregar una imagen</strong>
            </label>
            <input
              id="formFile"
              class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none dark:text-secondary"
              type="file"
              accept=".gif,jpg,jpeg,.png"
              @change="onFleSelected"
            />
            <div v-if="image">
              <button
                type="button"
                class="button m-2 bg-red-500"
                onclick="document.getElementById('formFile').value = ''"
                @click="imageDelete"
              >
                Eliminar
              </button>
            </div>
          </div>
          <div v-if="image" class="m-4 flex justify-center">
            <img
              :src="image"
              class="h-auto w-96 rounded-lg outline outline-offset-2 outline-cyan-500"
            />
          </div>
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
              @keyup.enter="addNewAlternativa(newAlterText, isAnswer)"
            ></textarea>
          </div>
          <div
            class="flex items-center justify-between border-t py-2 px-3 dark:border-secondary-normal/20"
          >
            <div class="flex space-x-1 pl-0 sm:pl-2">
              <label for="answer">¿Es la respuesta?</label>
              <input id="answer" v-model="isAnswer" type="checkbox" />
            </div>
            <div v-if="stateForm.alternatives.length < 5">
              <button
                class="button button--secondary"
                @click.prevent="addNewAlternativa(newAlterText, isAnswer)"
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
            v-for="(alterList, index) in stateForm.alternatives"
            :key="index"
            class="mx-4 my-2 flex w-full flex-col justify-between gap-2 text-left md:flex-row"
          >
            <p class="text-left">
              {{ index + 1 }})
              {{ alterList.text }}
            </p>
            <label v-if="alterList.is_answer == true" :style="{ color: answerColor }" class="m-1">
              respuesta
            </label>
            <div class="flex gap-2">
              <button
                class="button button--primary--outline mx-4 max-w-sm"
                @click.prevent="removeAlternativa(index)"
              >
                Eliminar
              </button>
              <button
                class="button button--secondary mx-4 max-w-sm"
                @click.prevent="editAlternativa(index)"
              >
                Editar
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
        <div class="flex items-end justify-between">
          <label for="esExamen"><strong>¿Es pregunta de Examen?</strong></label>
          <button id="esExamen" @click.prevent="showForm = !showForm">
            <svg
              class="ms-2.5 h-2.5 w-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </div>
        <select
          v-show="showForm"
          id="list-source"
          v-model="selecSource"
          class="z-1 mr-6 mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent p-2.5 px-0 pt-3 pb-2 text-secondary-normal focus:border-secondary-normal/20 focus:outline-none focus:ring-0"
          multiple
          size="3"
        >
          <option
            v-for="questionSource in questionSourceStoreComp"
            :key="questionSource?.id"
            :value="questionSource?.id"
          >
            {{ questionSource?.content.title }}
          </option>
        </select>
      </div>
      <div v-if="stateForm.alternatives.length > 1" class="mt-4 flex justify-between">
        <button type="submit" class="button button--contrast-01">Guardar</button>
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
