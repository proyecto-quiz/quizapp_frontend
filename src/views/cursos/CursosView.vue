<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCursoStore } from '@/stores';
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
  <div class="container flex flex-col gap-2">
    <h1 class="text-lg font-medium uppercase md:text-3xl">Selecciona un curso</h1>
    <Transition name="view-courses">
      <section v-if="cursosStoreComp.isLoading" class="spinner__loading">
        <Spinner type="green" class="h-8 w-8" />
        <h5 class="text-center text-xl">Cargando cursos</h5>
      </section>
      <div v-else>
        <small class="font-medium tracking-tighter">
          Total cursos: {{ cursosStoreComp.count }}
        </small>
        <section class="lista">
          <div v-for="curso in cursosStoreComp.getCursos" :key="curso.id" class="curso">
            <template v-if="tipo === 'tema'">
              <router-link :to="{ name: 'Temas', params: { temas: JSON.stringify(curso.temas) } }">
                <img class="curso__image" :src="CursoImage" alt="image-curso" />
                <p class="p-2 font-semibold tracking-wide">{{ curso.nombre }}</p>
              </router-link>
            </template>
            <template v-else>
              <router-link :to="{ name: 'Pregunta' }" :title="curso.nombre">
                <img class="curso__image" :src="CursoImage" :alt="`Curso - ${curso.nombre}`" />
                <p class="p-2 font-semibold tracking-wide">{{ curso.nombre }}</p>
              </router-link>
            </template>
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.curso {
  @apply h-full w-full rounded text-center shadow-lg;
  @apply bg-secondary/80 text-primary-light shadow-blue-500/50;
  @apply hover:-translate-y-1 hover:bg-blue-500 hover:transition-transform hover:duration-200 hover:ease-in-out;
}

.spinner__loading {
  @apply flex flex-col items-center justify-center gap-y-3;
}

.curso__image {
  @apply h-auto w-full object-cover;
}

.lista {
  @apply grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
}

/* view-courses transition */
.view-courses-enter-from,
.view-courses-leave-to {
  opacity: 0;
}

.view-courses-enter-to,
.view-courses-leave-leave {
  opacity: 1;
}

.view-courses-enter-active,
.view-courses-leave-active {
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.115, 0.74, 0.855, 1);
  transition-delay: 50ms;
}
</style>
