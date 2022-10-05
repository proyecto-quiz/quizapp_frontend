<script setup lang="ts">
import { reactive } from 'vue';
import { SolucionAddForm } from '@@/types-forms';
import { useSolucionStore } from '@/stores';
import { useRoute } from 'vue-router';
const route = useRoute();
const solucionStore = useSolucionStore();

const preguntaId = route.params.idPregunta;
const solucionForm = reactive<SolucionAddForm>({
  imagen: null,
  pregunta: String(preguntaId),
  referencia: '',
  resolucion: '',
});
async function handleSolucionClick() {
  await solucionStore.solucionAddAction(solucionForm);
  alert('guardado');
}
</script>
<template>
  <form
    class="container mb-4 flex select-none flex-col gap-2 overflow-auto"
    @submit.stop.prevent="handleSolucionClick"
  >
    <h1 class="text-center text-lg font-medium uppercase text-contrast-01 md:text-3xl">
      agregar solución
    </h1>
    <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
      <strong>Resolución</strong>
      <textarea
        v-model="solucionForm.resolucion"
        class="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-secondary dark:text-white dark:placeholder-gray-400"
        placeholder="Explicación de la respuesta"
        required
      ></textarea>
    </div>
    <div class="rounded-t-lg bg-white py-2 px-4 dark:bg-secondary">
      <strong>Referencia</strong>
      <textarea
        v-model="solucionForm.referencia"
        class="w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-secondary dark:text-white dark:placeholder-gray-400"
        placeholder="Link de Web, Libro, Revista, etc. "
        required
      ></textarea>
    </div>
    <button type="submit" class="button button--secondary--outline">Guardar</button>
  </form>
</template>

<style></style>
