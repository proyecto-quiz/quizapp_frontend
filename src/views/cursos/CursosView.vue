<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { usePreguntaStore } from '@/stores';
import { useRoute, useRouter } from 'vue-router';
import { useCursoStore } from '@/stores';
import Spinner from '@/components/ui/Spinner.vue';
//import CursoImage from '@/assets/images/Geometria.jpg';
const preguntaStore = usePreguntaStore();
const route = useRoute();
const router = useRouter();
const cursoStore = useCursoStore();
const cursosStoreComp = computed(() => cursoStore);
if (!route.params.tipo == true) {
  router.push({ name: 'PreguntaTipo' });
}
onMounted(async () => {
  cursoStore.cursos.length == 0 && (await cursoStore.cursoAction());
});

const tipo = route.params.tipo;

function clickPregunta(id: string) {
  preguntaStore.preguntaCursoAction(id);
  router.push({ name: 'Pregunta' });
}
function clickTemas(temas: any) {
  router.push({ name: 'Temas', params: { temas: temas } });
}
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
        <div class="flex items-center justify-between">
          <small class="text-lg font-medium tracking-tighter">
            Total cursos: {{ cursosStoreComp.countCursos }}
          </small>
          <router-link :to="{ name: 'PreguntaTipo' }" class="button button--contrast-01 mt-4">
            Elegir otro Nivel
          </router-link>
        </div>
        <section class="lista">
          <div v-for="curso in cursosStoreComp.getCursos" :key="curso.id" class="curso">
            <template v-if="tipo === 'tema'">
              <button
                class="m-1 h-full w-full rounded bg-secondary p-1 active:m-0"
                @click="clickTemas(JSON.stringify(curso.temas))"
              >
                <!--<img class="curso__image" :src="CursoImage" alt="image-curso" /> -->
                <p class="p-2 font-semibold tracking-wide">
                  {{ curso.nombre }} ({{ curso.countPreguntaCurso }})
                </p>
              </button>
            </template>
            <template v-else>
              <button
                class="m-1 h-full w-full rounded bg-secondary p-1 active:m-0"
                :title="curso.nombre"
                @click="clickPregunta(curso.id)"
              >
                <!--<img class="curso__image" :src="CursoImage" :alt="`Curso - ${curso.nombre}`" /> -->
                <p class="p-2 font-semibold tracking-wide">
                  {{ curso.nombre }} ({{ curso.countPreguntaCurso }})
                </p>
              </button>
            </template>
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.curso {
  @apply h-full w-full rounded  text-center;
  @apply bg-secondary/80 text-primary-light hover:shadow-blue-500/50;
  @apply hover:-translate-y-1 hover:bg-blue-500 hover:shadow-lg hover:transition-transform hover:duration-200 hover:ease-in-out;
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
