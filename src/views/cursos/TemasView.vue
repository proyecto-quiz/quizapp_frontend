<script setup lang="ts">
import { useRoute } from 'vue-router';
//import CursoImage from '@/assets/images/Geometria.jpg';
const route = useRoute();
const jsonTemas = String(route.params.temas);
const temas = JSON.parse(jsonTemas);
console.log(temas);
</script>
<template>
  <div class="container">
    <h1 class="py-5 text-lg font-medium uppercase md:text-3xl">Elige un tema</h1>
    <small class="font-medium tracking-tighter"> Total Temas: {{ temas.length }} </small>
    <div v-if="temas.length > 0" class="lista">
      <div v-for="tema in temas" :key="tema.id" class="tema">
        <router-link :to="{ name: 'Pregunta', params: { id: tema.id, tipo: 'tema' } }">
          <!-- <img class="image" :src="CursoImage" alt="imagen tema" />-->
          <p>{{ tema.nombre }} ({{ tema.countPreguntaTema }})</p>
        </router-link>
      </div>
    </div>
    <div v-else>
      <h1>Este curso aun no tiene temas</h1>
    </div>
    <div class="py-5">
      <router-link
        :to="{ name: 'Cursos', params: { tipo: 'tema' } }"
        class="button button--contrast-01 mt-4"
      >
        Atras
      </router-link>
    </div>
  </div>
</template>
<style>
.tema {
  @apply h-full w-full rounded p-2 text-center;
  @apply bg-secondary/80 text-primary-light hover:shadow-blue-500/50;
  @apply hover:-translate-y-1 hover:bg-blue-500 hover:shadow-lg hover:transition-transform hover:duration-200 hover:ease-in-out;
}
.image {
  @apply w-full;
}

.lista {
  @apply grid grid-cols-1 gap-5 overflow-auto py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}
</style>
