<script setup lang="ts">
import { onMounted, computed } from 'vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import CursoImage from '@/assets/images/Geometria.jpg';
import { useCursoStore } from '@/stores/curso';
import { useRoute } from 'vue-router';
const route = useRoute();
const cursoStore = useCursoStore();
const cursos = computed(() => {
  return cursoStore.getCursos;
});
const totalCursos = computed(() => {
  return cursos.value.length;
});

onMounted(() => {
  cursoStore.cursoAction();
});
const tipo = route.params.tipo;
</script>
<template>
  <LayoutDefault title="Cursos">
    <h1 class="py-5 text-lg font-medium uppercase md:text-3xl">Selecciona un curso</h1>
    <p>Total cursos: {{ totalCursos }}</p>
    <div class="lista">
      <div v-for="curso in cursos" :key="curso.id" class="card">
        <div v-if="tipo == 'tema'">
          <router-link :to="{ name: 'Temas', params: { temas: JSON.stringify(curso.temas) } }">
            <img class="image" :src="CursoImage" alt="image-curso" />
            <p>{{ curso.nombre }}</p>
          </router-link>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Pregunta', params: { temas: JSON.stringify(curso.temas) } }">
            <img class="image" :src="CursoImage" alt="image-curso" />
            <p>{{ curso.nombre }}</p>
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

.card {
  @apply w-full transform overflow-hidden rounded
  bg-blue-400 text-center shadow-lg shadow-blue-500/50 transition duration-500 ease-in-out hover:-translate-y-1 hover:bg-blue-500;
}

.lista {
  @apply grid grid-cols-1 gap-5 overflow-auto py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}
</style>
