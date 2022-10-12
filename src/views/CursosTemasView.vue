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
      <h1 class="text-lg font-medium uppercase md:text-3xl">Nuestros Cursos</h1>
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
              <div class="divide-y divide-secondary dark:divide-gray-100">
                <div class="title bg-blue-900">
                  <h1 class="t-stroke-shadow p-2 font-semibold tracking-wide">
                    {{ curso.nombre }}
                  </h1>
                </div>
                <div class="mt-2 flex flex-wrap p-2 pt-2 text-center">
                  <div v-for="tema in curso.temas" :key="tema.id">
                    <div
                      class="mr-2 mb-2 rounded-full bg-green-400 px-3 py-1 text-xs text-green-900"
                    >
                      {{ tema.nombre }}
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
  @apply hover:-translate-y-1 hover:bg-blue-500 hover:transition-transform hover:duration-200 hover:ease-in-out;
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
  @apply rounded-t-md;
  background-image: radial-gradient(
    circle at 50% -20.71%,
    #ade5ff 0,
    #7dcefb 25%,
    #3cb5f2 50%,
    #009ce9 75%,
    #0085e0 100%
  );
}
.t-stroke-shadow {
  color: #e8858e;

  text-shadow: -3px 3px #ffffff, -2px 2px #ffffff, -1px -1px #ffffff, 3px -3px #ffffff,
    3px 3px #f3f3f2, 6px 6px #6ac7c2;
}
</style>
