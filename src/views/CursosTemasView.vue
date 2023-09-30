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
      <h1 class="title-nb-cursos">
        <span class="mx-2">Nuestros</span>
        <span class="mx-2 text-contrast-01">Cursos</span>
      </h1>
      <Transition name="view-courses">
        <section v-if="cursosStoreComp.isLoading" class="spinner__loading">
          <Spinner type="green" class="h-8 w-8" />
          <h5 class="text-center text-xl">Cargando cursos</h5>
        </section>
        <div v-else>
          <section class="list__card">
            <div v-for="curso in cursosStoreComp.getCursos" :key="curso.id" class="curso">
              <div class="book text-xs">
                <p>{{ curso.description }}</p>
                <div class="cover uppercase">
                  <p>{{ curso.name }}</p>
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
  @apply justify-center text-center;
  @apply text-secondary-light;
  @apply hover:-translate-y-1  hover:transition-transform hover:duration-200 hover:ease-in-out;
}

.spinner__loading {
  @apply flex flex-col items-center justify-center gap-y-3;
}

.list__card {
  @apply mb-4 grid grid-cols-1 justify-center gap-5  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4;
}

.title-nb-cursos {
  @apply my-4 text-center text-2xl leading-8 tracking-wider md:my-10 md:text-5xl;
}

.book {
  @apply bg-secondary-normal;
  position: relative;
  border-radius: 10px;
  width: 220px;
  height: 300px;

  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.cover {
  @apply bg-secondary;
  top: 0;
  position: absolute;

  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform-origin: 0;
  -ms-transform-origin: 0;
  transform-origin: 0;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.book:hover .cover {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: rotatey(-80deg);
  -ms-transform: rotatey(-80deg);
  transform: rotatey(-80deg);
}

p {
  padding: 0;
  font-size: 20px;
  font-weight: bolder;
}
.book p {
  padding-left: 20%;
  padding-right: 2%;
}
.cover p {
  padding-left: 0;
}
</style>
