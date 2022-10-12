<script setup lang="ts">
import { reactive, ref } from 'vue';
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
  let solutionForm = new FormData();
  solutionForm.append('pregunta', solucionForm.pregunta);
  solutionForm.append('referencia', solucionForm.referencia);
  solutionForm.append('resolucion', solucionForm.resolucion);
  if (solucionForm.imagen != null) {
    solutionForm.append('imagen', solucionForm.imagen);
  }
  await solucionStore.solucionAddAction(solutionForm);
  alert(solucionStore.message);
}
const image = ref();
async function onFleSelected(event: File) {
  image.value = URL.createObjectURL(event.target.files[0]); //url imagen
  var file = event.target.files[0];
  solucionForm.imagen = file;
  console.log(solucionForm.imagen);
}
</script>
<template>
  <form
    enctype="multipart/form-data"
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
    <div class="flex justify-center">
      <div class="w-100 mb-3">
        <label for="formFile" class="form-label mb-2 inline-block dark:text-white">
          <strong>Agregar una imagen</strong>
        </label>
        <input
          id="formFile"
          class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none dark:text-secondary"
          type="file"
          placeholder="sin"
          accept=".gif,jpg,jpeg,.png"
          @change="onFleSelected"
        />
      </div>
    </div>
    <img :src="image" />
    <button type="submit" class="button button--secondary--outline">Guardar</button>
  </form>
</template>

<style></style>
