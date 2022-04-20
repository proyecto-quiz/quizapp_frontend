<script setup lang="ts">
import { onMounted, computed, reactive } from 'vue';
import { usePreguntaStore } from '@/stores';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
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
  <LayoutDefault title="Pregunta">
    <div class="container">
      <div class="pregunta">
        <h1 class="text-lg font-medium uppercase md:text-3xl">
          {{ preguntas?.curso }}
        </h1>
        <h2 class="text-lg font-light uppercase md:text-2xl">{{ preguntas?.tema }}</h2>
        <div class="flex flex-col gap-2">
          <div class="preguntatext">
            <h1 class="font-semibold1 py-2 text-lg uppercase md:text-2xl">pregunta</h1>
            <p>
              {{ preguntas?.texto }}
            </p>
            <div v-if="preguntas?.imagen != null">
              <img class="imagen" :src="preguntas?.imagen" alt="imagen_pregunta" />
            </div>
          </div>
          <h1 class="py-1 text-lg font-semibold uppercase md:text-2xl">Alternativas</h1>
          <div v-for="alternativa in preguntas?.alternativas" :key="alternativa.altId">
            <div class="py-1 px-2">
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
      <div class="flex flex-row justify-between gap-4 p-5">
        <button type="button" class="button--secondary" @click.prevent="handleSelectClick">
          Seleccionar
        </button>
        <button class="button--secondary" @click.prevent="handlePreguntaClick">Siguiente</button>
      </div>
      <div class="flex flex-row gap-4">
        <button class="button">Respuesta: {{ solucionStore.respuesta }}</button>
        <button class="button">Ver Solución</button>
      </div>
    </div>
  </LayoutDefault>
</template>
<style>
.preguntatext {
  @apply basis-1/2;
}
.imagen {
  @apply m-5 w-3/12 rounded-lg outline outline-offset-2 outline-cyan-500;
}
.pregunta {
  @apply flex flex-col gap-2 overflow-auto;
}
.label {
  @apply m-3 rounded-md px-3 outline outline-1 outline-offset-2;
}
</style>
