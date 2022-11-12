<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { onMounted, computed } from 'vue';
import { useCursoStore } from '@/stores';
import Spinner from '@/components/ui/Spinner.vue';
const cursoStore = useCursoStore();
const cursosStoreComp = computed(() => cursoStore);
onMounted(async () => {
  cursoStore.cursos.length == 0 && (await cursoStore.cursoAction());
});
</script>
<template>
  <LayoutDefault title="Nuestros Cursos">
    <div class="container flex flex-col gap-2">
      <h1 class="title-nb title-nb-cursos">
        <span class="mx-2">Nuestros</span>
        <span class="mx-2 text-contrast-01">Cursos</span>
      </h1>
      <Transition name="view-courses">
        <section v-if="cursosStoreComp.isLoading" class="spinner__loading">
          <Spinner type="green" class="h-8 w-8" />
          <h5 class="text-center text-xl">Cargando cursos</h5>
          <span class="mx-2 text-contrast-01">Aleatorias</span>
        </section>
        <div v-else>
          <small class="font-medium tracking-tighter">
            Total cursos: {{ cursosStoreComp.countCursos }}
          </small>
          <section class="lista">
            <div v-for="curso in cursosStoreComp.getCursos" :key="curso.id" class="curso">
              <div class="divide-y divide-secondary-normal dark:divide-gray-100">
                <div class="title bg-blue-900">
                  <h1 class="p-2 font-semibold uppercase tracking-wide">
                    {{ curso.nombre }}
                  </h1>
                </div>
                <div class="mt-2 flex flex-wrap p-2 pt-2 text-center">
                  <div v-for="tema in curso.temas" :key="tema.id">
                    <div
                      class="mr-2 mb-2 rounded-full bg-secondary-normal px-3 py-1 text-xs text-blue-900"
                    >
                      {{ tema.nombre }} ({{ tema.countPreguntaTema }})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Transition>
    </div>
  </LayoutDefault>
</template>

<style scoped>
.curso {
  @apply h-full w-full justify-center rounded-md text-center shadow-lg;
  @apply text-primary-dark dark:text-primary-light;
  @apply hover:-translate-y-1 hover:bg-secondary hover:transition-transform hover:duration-200 hover:ease-in-out;
}

.spinner__loading {
  @apply flex flex-col items-center justify-center gap-y-3;
}

.curso__image {
  @apply h-auto w-full object-cover;
}

.lista {
  @apply grid grid-cols-1 justify-center gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5;
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
.title {
  @apply rounded-t-md bg-secondary text-secondary-light;
}
.title-nb {
  @apply my-4 text-center text-2xl leading-8 tracking-wider md:my-10 md:text-5xl;
}
</style>
