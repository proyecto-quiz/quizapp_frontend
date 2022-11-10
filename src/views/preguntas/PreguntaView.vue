<script setup lang="ts">
import { inject, onMounted, computed, reactive, ref } from 'vue';
import { usePreguntaStore } from '@/stores';
//import PreguntaImage from '@/assets/images/Geometria.jpg';
import { useRoute, useRouter } from 'vue-router';
import { SolucionForm } from '@@/types-forms';
import { useSolucionStore } from '@/stores';
import { UserResponse } from '@@/types-response-users';

import Spinner from '@/components/ui/Spinner.vue';
const user = inject<UserResponse>('user');
const route = useRoute();
const router = useRouter();
const preguntaStore = usePreguntaStore();
const solucionStore = useSolucionStore();
const preguntaStoreComp = computed(() => preguntaStore);
const preguntas = computed(() => {
  return preguntaStore.getPregunta;
});
const solucion = computed(() => {
  return solucionStore.getSolucion;
});
//refactor
onMounted(() => {
  const tipo = route.params.tipo;
  const id = String(route.params.id);
  solucionStore.$reset();
  if (tipo == 'general') {
    preguntaStore.preguntaGeneralAction();
  } else if (tipo == 'curso') {
    preguntaStore.preguntaCursoAction(id);
  } else if (tipo == 'tema') {
    preguntaStore.preguntaTemaAction(id);
  } else {
    router.push({ name: 'PreguntaTipo' });
  }
});

async function handlePreguntaClick() {
  const tipo = preguntaStore.tipo;
  if (tipo == 'general') {
    await preguntaStore.preguntaGeneralAction();
  } else if (tipo == 'curso') {
    const cursoId = preguntas.value?.cursoId;
    await preguntaStore.preguntaCursoAction(cursoId);
  } else if (tipo == 'tema') {
    const temaId = preguntas.value?.temaId;
    await preguntaStore.preguntaTemaAction(temaId);
  }
  solucionStore.$reset();
  stateForm.alternativaId = '';
}

const stateForm = reactive<SolucionForm>({
  preguntaId: '',
  alternativaId: '',
  tipo: '',
  //tema,curso
  id: '',
  nombre: '',
});

async function handleSelectClick() {
  stateForm.tipo = preguntaStore.tipo;
  stateForm.preguntaId = preguntas.value?.preguntaId;
  const t = preguntaStore.tipo;
  if (t == 'curso') {
    stateForm.id = preguntas.value?.cursoId;
    stateForm.nombre = preguntas.value?.curso;
  } else {
    stateForm.id = preguntas.value?.temaId;
    stateForm.nombre = preguntas.value?.tema;
  }
  await solucionStore.solucionAction(stateForm);
  await respuestaPregunta();
}
async function agregarSolucion() {
  let preguntaId = preguntas.value?.preguntaId;
  router.push({ name: 'SolucionAdd', params: { idPregunta: preguntaId } });
}
const respuestaP = ref();
const respuestaMessage = ref();
const respuestaColor = ref();
async function respuestaPregunta() {
  if (solucionStore.respuesta === 'correcta') {
    respuestaP.value = 'Bien';
    respuestaMessage.value = 'Felicidades...!!!';
    respuestaColor.value = 'green';
  } else {
    respuestaP.value = 'Mal';
    respuestaMessage.value = 'La respuesta es: ' + solucionStore.respuestaCorrecta;
    respuestaColor.value = 'red';
  }
}
</script>

<template>
  <Transition name="view-pregunta">
    <section v-if="preguntaStoreComp.isLoading" class="spinner__loading">
      <Spinner type="green" class="h-8 w-8" />
    </section>
    <section v-else-if="preguntaStoreComp.getPregunta == null">
      <div class="flex items-center justify-between py-5">
        <h1 class="text-lg font-medium uppercase text-contrast-01 md:text-3xl">
          No tenemos preguntas
        </h1>
        <router-link :to="{ name: 'Cursos' }" class="button button--contrast-01 mt-4">
          Atras
        </router-link>
      </div>
    </section>
    <form v-else class="container" @submit.stop.prevent="handlePreguntaClick">
      <div class="pregunta">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-medium uppercase text-blue-600 dark:text-contrast-01 md:text-3xl">
            {{ preguntas?.curso }}
          </h1>
          <router-link :to="{ name: 'PreguntaTipo' }" class="button button--contrast-01 mt-4">
            Elegir otro Nivel
          </router-link>
        </div>
        <h2 class="text-lg font-light uppercase text-blue-500 dark:text-contrast-02 md:text-2xl">
          {{ preguntas?.tema }}
        </h2>
        <div class="grid-cols-1-col grid gap-2 sm:grid-cols-2">
          <div class="pregunta__text">
            <h1 class="py-2 text-lg font-semibold uppercase md:text-2xl">pregunta</h1>
            <p
              class="rounded-lg border border-green-600 p-2 text-2xl text-cyan-600 dark:text-cyan-300"
            >
              {{ preguntas?.texto }}
            </p>
            <div v-if="preguntas?.image != null">
              <img class="imagen" :src="preguntas?.image" alt="imagen_pregunta" />
            </div>
          </div>
          <div class="text-center">
            <h1 class="py-1 text-lg font-semibold uppercase md:text-2xl">Alternativas</h1>
            <div v-for="alternativa in preguntas?.alternativas" :key="alternativa.altId">
              <div class="w-full px-2 py-1">
                <input
                  :id="alternativa.altId"
                  v-model="stateForm.alternativaId"
                  class="peer hidden"
                  type="radio"
                  name="alternativaId"
                  :value="alternativa.altId"
                />
                <label
                  class="label show flex justify-center gap-1 rounded-xl bg-secondary bg-opacity-90 p-2 text-sky-300 shadow-xl hover:bg-opacity-75 peer-checked:bg-secondary peer-checked:text-white"
                  :for="alternativa.altId"
                >
                  <strong>
                    {{ alternativa.contenido }}
                  </strong>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="solucionStore.respuesta != null">
        <div
          class="flex-row justify-between rounded-lg bg-indigo-700 py-4 text-center md:flex lg:px-4"
        >
          <div
            class="m-2 flex items-center bg-indigo-800 p-2 leading-none text-indigo-100 lg:inline-flex lg:rounded-full"
            role="alert"
          >
            <span
              class="mr-3 flex rounded-full px-2 py-1 text-xs font-bold uppercase"
              :style="{ background: respuestaColor }"
            >
              {{ respuestaP }}
            </span>
            <span class="mr-2 flex-auto text-left font-semibold">
              {{ respuestaMessage }}
            </span>
            <svg
              class="h-4 w-4 fill-current opacity-75"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
              />
            </svg>
          </div>
          <div class="flex justify-center p-2 text-center">
            <a v-if="user?.role == 'ADMIN'" href="#solucion" class="button button--contrast-01">
              Ver Solución
            </a>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-between gap-4 p-4">
        <button
          v-if="solucionStore.respuesta === null"
          type="button"
          class="button button--secondary"
          @click.prevent="handleSelectClick"
        >
          Seleccionar
        </button>
        <button type="submit" class="button button--secondary--outline">Siguiente</button>
      </div>
      <Teleport to="#noteblue-app">
        <div id="solucion" class="modal snap-y overflow-scroll">
          <div class="modal-contenido text-justify">
            <a href="#">
              <div title="close" class="closeImage"></div>
            </a>
            <h2 class="text-center text-lg font-medium uppercase text-contrast-01 md:text-3xl">
              SOLUCIÓN
            </h2>
            <div v-if="solucion?.length >= 1">
              <div v-for="solucionItem in solucion" :key="solucionItem.solucionId">
                <p><strong>Author:</strong> {{ solucionItem.author }}</p>
                <p><strong>Resolución:</strong> {{ solucionItem.resolucion }}</p>
                <div class="snap-center">
                  <a href="solucionItem?.referencia">
                    <strong>Referencia:</strong>{{ solucionItem.referencia }}
                  </a>
                </div>
                <div v-if="solucionItem.referencia?.includes('https://')" class="p-10">
                  <iframe
                    class="aspect-video h-full w-full rounded-md"
                    :src="solucionItem.referencia"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div v-else>
                  <h2>{{ solucionItem.referencia }}</h2>
                </div>
              </div>
            </div>
            <div v-else>
              <h1 class="my-4 text-center text-lg">
                <strong>No hay solucines agregadas</strong>
              </h1>
            </div>
            <button type="button" class="button hover: bg-secondary" @click="agregarSolucion">
              Agregar una solución
            </button>
          </div>
        </div>
      </Teleport>
    </form>
  </Transition>
</template>
<style scoped>
.spinner__loading {
  @apply flex flex-col items-center justify-center gap-y-3;
}
.pregunta__text {
  @apply basis-1/2;
}

.imagen {
  @apply m-5 h-auto w-52 rounded-lg outline outline-offset-2 outline-cyan-500 sm:h-auto sm:min-w-[80%];
}

.pregunta {
  @apply mb-4 flex select-none flex-col gap-2 overflow-auto;
}

.label {
  @apply m-1 rounded-md px-3 outline outline-1 outline-offset-2;
}

.modal {
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s;
  z-index: 10;
  scroll-padding-bottom: auto;
}

.modal-contenido {
  @apply relative my-24 mx-auto w-4/5 rounded-md bg-blue-600 p-5 shadow-md;
  background-color: #0084ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='600' y1='25' x2='600' y2='777'%3E%3Cstop offset='0' stop-color='%230084FF'/%3E%3Cstop offset='1' stop-color='%236F58FF'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='650' y1='25' x2='650' y2='777'%3E%3Cstop offset='0' stop-color='%230879ff'/%3E%3Cstop offset='1' stop-color='%235b44ff'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='700' y1='25' x2='700' y2='777'%3E%3Cstop offset='0' stop-color='%23106fff'/%3E%3Cstop offset='1' stop-color='%23472fff'/%3E%3C/linearGradient%3E%3ClinearGradient id='d' gradientUnits='userSpaceOnUse' x1='750' y1='25' x2='750' y2='777'%3E%3Cstop offset='0' stop-color='%231866ff'/%3E%3Cstop offset='1' stop-color='%23321bff'/%3E%3C/linearGradient%3E%3ClinearGradient id='e' gradientUnits='userSpaceOnUse' x1='800' y1='25' x2='800' y2='777'%3E%3Cstop offset='0' stop-color='%23205eff'/%3E%3Cstop offset='1' stop-color='%231c07ff'/%3E%3C/linearGradient%3E%3ClinearGradient id='f' gradientUnits='userSpaceOnUse' x1='850' y1='25' x2='850' y2='777'%3E%3Cstop offset='0' stop-color='%232857ff'/%3E%3Cstop offset='1' stop-color='%231200f1'/%3E%3C/linearGradient%3E%3ClinearGradient id='g' gradientUnits='userSpaceOnUse' x1='900' y1='25' x2='900' y2='777'%3E%3Cstop offset='0' stop-color='%233051ff'/%3E%3Cstop offset='1' stop-color='%230e00dd'/%3E%3C/linearGradient%3E%3ClinearGradient id='h' gradientUnits='userSpaceOnUse' x1='950' y1='25' x2='950' y2='777'%3E%3Cstop offset='0' stop-color='%23384cff'/%3E%3Cstop offset='1' stop-color='%230a00c8'/%3E%3C/linearGradient%3E%3ClinearGradient id='i' gradientUnits='userSpaceOnUse' x1='1000' y1='25' x2='1000' y2='777'%3E%3Cstop offset='0' stop-color='%234048ff'/%3E%3Cstop offset='1' stop-color='%230700b4'/%3E%3C/linearGradient%3E%3ClinearGradient id='j' gradientUnits='userSpaceOnUse' x1='1050' y1='25' x2='1050' y2='777'%3E%3Cstop offset='0' stop-color='%234b48ff'/%3E%3Cstop offset='1' stop-color='%230400a0'/%3E%3C/linearGradient%3E%3ClinearGradient id='k' gradientUnits='userSpaceOnUse' x1='1100' y1='25' x2='1100' y2='777'%3E%3Cstop offset='0' stop-color='%235e50ff'/%3E%3Cstop offset='1' stop-color='%2302008b'/%3E%3C/linearGradient%3E%3ClinearGradient id='l' gradientUnits='userSpaceOnUse' x1='1150' y1='25' x2='1150' y2='777'%3E%3Cstop offset='0' stop-color='%236F58FF'/%3E%3Cstop offset='1' stop-color='%23007'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg %3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' x='100' width='1100' height='800'/%3E%3Crect fill='url(%23c)' x='200' width='1000' height='800'/%3E%3Crect fill='url(%23d)' x='300' width='900' height='800'/%3E%3Crect fill='url(%23e)' x='400' width='800' height='800'/%3E%3Crect fill='url(%23f)' x='500' width='700' height='800'/%3E%3Crect fill='url(%23g)' x='600' width='600' height='800'/%3E%3Crect fill='url(%23h)' x='700' width='500' height='800'/%3E%3Crect fill='url(%23i)' x='800' width='400' height='800'/%3E%3Crect fill='url(%23j)' x='900' width='300' height='800'/%3E%3Crect fill='url(%23k)' x='1000' width='200' height='800'/%3E%3Crect fill='url(%23l)' x='1100' width='100' height='800'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

#solucion:target {
  opacity: 1;
  pointer-events: auto;
}
.closeImage {
  background: url('data:image/png;base64,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')
    left top no-repeat;
  width: 67px;
  height: 67px;
}
/* view-pregunta transition */
.view-pregunta-enter-from,
.view-pregunta-leave-to {
  opacity: 0;
}

.view-pregunta-enter-to,
.view-pregunta-leave-leave {
  opacity: 1;
}

.view-pregunta-enter-active,
.view-pregunta-leave-active {
  transition-property: opacity;
  transition-duration: 800ms;
  transition-timing-function: cubic-bezier(0.115, 0.74, 0.855, 1);
  transition-delay: 500ms;
}
</style>
