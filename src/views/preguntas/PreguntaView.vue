<script setup lang="ts">
import { onMounted, computed, reactive } from 'vue';
import { usePreguntaStore } from '@/stores';
//import PreguntaImage from '@/assets/images/Geometria.jpg';
import { useRoute } from 'vue-router';
import { SolucionForm } from '@@/types-forms';
import { useSolucionStore } from '@/stores';

const route = useRoute();
const preguntaStore = usePreguntaStore();
const solucionStore = useSolucionStore();

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
  if (tipo == 'general') {
    preguntaStore.preguntaGeneralAction();
  } else if (tipo == 'tema') {
    preguntaStore.preguntaTemaAction(id);
  }
});

async function handlePreguntaClick() {
  const tipo = preguntaStore.tipo;
  if (tipo == 'general') {
    await preguntaStore.preguntaGeneralAction();
  } else if (tipo == 'tema') {
    const temaId = preguntas.value?.temaId;
    await preguntaStore.preguntaTemaAction(temaId);
  }
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
}
</script>

<template>
  <div class="container">
    <div class="pregunta">
      <h1 class="text-lg font-medium uppercase text-contrast-01 md:text-3xl">
        {{ preguntas?.curso }}
      </h1>
      <h2 class="text-lg font-light uppercase md:text-2xl">{{ preguntas?.tema }}</h2>
      <div class="flex flex-col gap-2">
        <div class="pregunta__text">
          <h1 class="py-2 text-lg font-semibold uppercase md:text-2xl">pregunta</h1>
          <p>
            {{ preguntas?.texto }}
          </p>
          <div v-if="preguntas?.imagen != null">
            <img class="imagen" :src="preguntas?.imagen" alt="imagen_pregunta" />
          </div>
        </div>
        <h1 class="py-1 text-lg font-semibold uppercase md:text-2xl">Alternativas</h1>
        <div v-for="alternativa in preguntas?.alternativas" :key="alternativa.altId">
          <div class="px-3 py-1">
            <input
              :id="alternativa.altId"
              v-model="stateForm.alternativaId"
              type="radio"
              name="alternativaId"
              :value="alternativa.altId"
            />
            <label class="label show" :for="alternativa.altId">{{ alternativa.contenido }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between gap-4">
      <button type="button" class="button button--secondary" @click.prevent="handleSelectClick">
        Seleccionar
      </button>
      <button class="button button--secondary" @click.prevent="handlePreguntaClick">
        Siguiente
      </button>
    </div>
    <div class="flex flex-row gap-4">
      <span>Respuesta: {{ solucionStore.respuesta }}</span>
      <a href="#solucion" class="button button--contrast-01">Ver Solución</a>
    </div>
    <Teleport to="#noteblue-app">
      <div id="solucion" class="modal">
        <div class="modal-contenido text-justify">
          <a href="#">X</a>
          <h2 class="my-4 text-center text-lg">SOLUCIÓN</h2>
          <div>
            <p><strong>Author:</strong> {{ solucion?.author }}</p>
            <p><strong>Resolución:</strong> {{ solucion?.resolucion }}</p>
            <p><strong>Referencia:</strong>{{ solucion?.referencia }}</p>
          </div>
        </div>
      </div>
    </Teleport>
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
</style>
