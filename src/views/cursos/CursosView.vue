<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCursoStore } from '@/stores/curso';
import { useRoute } from 'vue-router';
import Spinner from '@/components/ui/Spinner.vue';
import CursoImage from '@/assets/images/Geometria.jpg';

const route = useRoute();
const cursoStore = useCursoStore();
const cursosStoreComp = computed(() => cursoStore);

onMounted(async () => {
  cursoStore.cursos.length == 0 && (await cursoStore.cursoAction());
});
const tipo = route.params.tipo;
</script>
<template>
  <div class="container">
    <h1 class="mb-2 text-lg font-medium uppercase md:text-3xl">Selecciona un curso</h1>
    <template v-if="cursosStoreComp.isLoading">
      <div class="spinner__loading">
        <Spinner type="green" class="h-8 w-8" />
        <h5 class="text-center text-xl">Cargando cursos</h5>
      </div>
    </template>
    <template v-else>
      <p class="text-xs font-medium tracking-tighter">Total cursos: {{ cursosStoreComp.count }}</p>
      <div class="lista">
        <div v-for="curso in cursosStoreComp.getCursos" :key="curso.id" class="curso">
          <template v-if="tipo === 'tema'">
            <router-link :to="{ name: 'Temas' }">
              <img class="curso__image" :src="CursoImage" alt="image-curso" />
              <p class="p-2 font-semibold tracking-wide">{{ curso.nombre }}</p>
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{ name: 'Pregunta' }">
              <img class="curso__image" :src="CursoImage" alt="image-curso" />
              <p class="p-2 font-semibold tracking-wide">{{ curso.nombre }}</p>
            </router-link>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
<style scoped>
.curso {
  @apply h-full w-full rounded text-center shadow-lg;
  @apply bg-secondary/80 text-primary-light shadow-blue-500/50;
  @apply transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:bg-blue-500;
}

.spinner__loading {
  left: min(55%, 75%);
  top: 50%;
  @apply fixed flex flex-col items-center;
}

.curso__image {
  @apply h-auto w-full object-cover;
}

.lista {
  @apply grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}
</style>
