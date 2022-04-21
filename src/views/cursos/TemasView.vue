<script setup lang="ts">
import { useRoute } from 'vue-router';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import CursoImage from '@/assets/images/Geometria.jpg';
const route = useRoute();
const temas = route.params.temas;
</script>
<template>
  <LayoutDefault title="Temas">
    <div class="container">
      <h1 class="py-5 text-lg font-medium uppercase md:text-3xl">Elige un tema</h1>
      <div class="lista">
        <div v-for="tema in JSON.parse(temas)" :key="tema.id" class="cursolist">
          <router-link :to="{ name: 'Pregunta', params: { id: tema.id, tipo: 'tema' } }">
            <img class="image" :src="CursoImage" alt="imagen tema" />
            <p>{{ tema.nombre }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
<style>
.image {
  @apply w-full;
}
.cursolist {
  @apply w-full transform overflow-hidden rounded
  bg-blue-300 text-center shadow-lg shadow-blue-500/50 transition duration-500 ease-in-out hover:-translate-y-1 hover:bg-blue-400;
}
.lista {
  @apply grid grid-cols-1 gap-5 overflow-auto py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}
</style>
