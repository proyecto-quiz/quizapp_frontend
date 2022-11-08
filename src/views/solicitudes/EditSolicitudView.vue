<script setup lang="ts">
import { onMounted, computed, ref, reactive } from 'vue';
import { useCursoStore } from '@/stores';
import { useRoute, useRouter } from 'vue-router';
import { PreguntaForm } from '@@/types-forms';
import { useSolicitudStore } from '@/stores';
const solicitudStore = useSolicitudStore();
const route = useRoute();
const router = useRouter();
const paramPregunta = route.params.pregunta;
const pregunta = JSON.parse(paramPregunta);
console.log(pregunta);
const cursoStore = useCursoStore();
const cursosStoreComp = computed(() => cursoStore);

onMounted(async () => {
  for (var al in pregunta.alternativas) {
    addNewAlternativa(
      pregunta.alternativas[al]['contenido'],
      pregunta.alternativas[al]['isAnswer']
    );
  }
  await cursoStore.cursoAction();
  getcurso.value.find(filtCurso);
  stateForm.texto = pregunta.texto;
  stateForm.tema = pregunta.tema;
  image.value = pregunta.image;
  is_revisied.value = pregunta.isRevisied;
});
const getcurso = computed(() => cursoStore.getCursos);
const selecTema = ref();
function filtCurso(item: any, index: any) {
  for (const tem of item.temas) {
    if (tem.id === pregunta.tema) {
      var select = document.querySelector<HTMLSelectElement>('#listcurso');
      if (select != null) {
        select.options[index + 1].selected = true;
      }
      selecTema.value = item.temas;
    }
  }
}

//const paramCurso = cursosStoreComp.prototype.filter();
const stateForm = reactive<PreguntaForm>({
  texto: '',
  tema: '',
  imagen: null,
  alternativas: [],
});
const newAlterText = ref('');
const isAnswer = ref(false);
const is_revisied = ref();
async function addNewAlternativa(newAlterText: string, isAnswer: boolean) {
  stateForm.alternativas.push({
    contenido: newAlterText,
    is_answer: isAnswer,
  });
}
async function handleFormClick() {
  let preguntaForm = new FormData();
  preguntaForm.append('texto', stateForm.texto);
  preguntaForm.append('tema', stateForm.tema);
  preguntaForm.append('alternativas', JSON.stringify(stateForm.alternativas));
  if (stateForm.imagen != null) {
    preguntaForm.append('imagen', stateForm.imagen);
  }
  preguntaForm.append('is_revisied', is_revisied.value);
  await solicitudStore.UpdateSolicitudAction(pregunta.id, preguntaForm);
  alert(solicitudStore.message);
  await router.push({ name: 'Solicitud' });
}
async function removeAlter(index: number) {
  stateForm.alternativas.splice(index, 1);
}
const image = ref();
async function onFleSelected(event: any) {
  let file = event.target.files[0];
  image.value = URL.createObjectURL(file); //url imagen
  stateForm.imagen = file;
}
async function imageDelete() {
  stateForm.imagen = null;
  image.value = null;
}
</script>
<template>
  <div class="container">
    <form class="p-4" @submit.prevent="handleFormClick">
      <div class="pregunta">
        <h1 class="text-lg font-medium uppercase text-contrast-01 md:text-3xl">Agregar Pregunta</h1>
        <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
          <strong>Curso</strong>
          <select
            id="listcurso"
            v-model="selecTema"
            class="z-1 mr-6 mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent p-2.5 px-0 pt-3 pb-2 text-secondary-normal focus:border-secondary-normal/20 focus:outline-none focus:ring-0"
            required
          >
            <option disabled value="">Seleccione un curso</option>
            <option
              v-for="curso in cursosStoreComp.getCursos"
              :key="curso.id"
              :name="curso.id"
              :value="curso.temas"
            >
              {{ curso.nombre }}
            </option>
          </select>
        </div>

        <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
          <strong>Tema</strong>
          <select
            id="list-tema"
            v-model="stateForm.tema"
            class="z-1 mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pt-3 pb-2 text-secondary-normal focus:border-secondary focus:outline-none focus:ring-0"
            required
          >
            <option disabled value="">Seleccione un tema</option>
            <option v-for="(tema, index) in selecTema" :key="index" :value="tema?.id">
              {{ tema?.nombre }}
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
            ></textarea>
          </div>
          <div
            class="flex items-center justify-between border-t py-2 px-3 dark:border-secondary-normal/20"
          >
            <div class="flex space-x-1 pl-0 sm:pl-2">
              <label for="answer">¿Es la respuesta?</label>
              <input id="answer" v-model="isAnswer" type="checkbox" />
            </div>
            <div v-if="stateForm.alternativas.length < 5">
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
            v-for="(alterList, index) in stateForm.alternativas"
            :key="index"
            class="mx-4 my-2 flex w-full flex-row"
          >
            {{ index + 1 }})
            {{ alterList.contenido }}
            <strong v-if="alterList.is_answer == true" :style="{ color: 'red' }" class="m-1">
              respuesta
            </strong>
            <button
              class="button button--primary--outline mx-4 max-w-sm"
              @click.prevent="removeAlter(index)"
            >
              Eliminar
            </button>
          </li>
        </ul>
      </div>
      <div v-if="stateForm.alternativas.length > 1" class="flex justify-between">
        <a class="button button--contrast-01" href="solicitud">Atras</a>
        <div>
          <label for="validate" class="text-green-600">Revisado</label>
          <input
            v-model="is_revisied"
            name="validate"
            type="checkbox"
            class="m-2 appearance-none p-2 checked:bg-blue-500"
          />
        </div>
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
