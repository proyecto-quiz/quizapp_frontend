<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { usePreguntaStore } from '@/stores';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
//import PreguntaImage from '@/assets/images/Geometria.jpg';
import { useRoute } from 'vue-router';
const route = useRoute();
const preguntaStore = usePreguntaStore();
const preguntas = computed(() => {
  return preguntaStore.getPregunta;
});
onMounted(() => {
  const tipo = route.params.tipo;
  //const id = route.params.id;
  if (tipo == 'general') {
    preguntaStore.preguntaGeneralAction();
  }
});
</script>
<template>
  <LayoutDefault title="Pregunta">
    <div class="container">
      <div class="pregunta">
        <h1 class="text-lg font-medium uppercase md:text-3xl">{{ preguntas.curso }}</h1>
        <h2 class="text-lg font-light uppercase md:text-2xl">{{ preguntas.tema }}</h2>
        <div class="flex flex-col gap-2">
          <div class="preguntatext">
            <h1 class="py-2 text-lg font-semibold uppercase md:text-2xl">pregunta</h1>
            <p>
              {{ preguntas.texto }}
            </p>
            <div v-if="preguntas.imagen != null">
              <img class="imagen" :src="preguntas.imagen" alt="imagen_pregunta" />
            </div>
          </div>
          <h1 class="py-1 text-lg font-semibold uppercase md:text-2xl">Alternativas</h1>
          <div v-for="alternativa in preguntas.alternativas" :key="alternativa.id">
            <div class="py-1 px-2">
              <input
                :id="alternativa.id"
                type="radio"
                name="alter"
                :value="alternativa.contenido"
              />
              <label class="label" for="huey">{{ alternativa.contenido }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <button class="button">Selecionar</button>
        <button class="button">Siguiente</button>
      </div>
      <div class="flex flex-row gap-4">
        <button class="button">Respuesta:</button>
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
