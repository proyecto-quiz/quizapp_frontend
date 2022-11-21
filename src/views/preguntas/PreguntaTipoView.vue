<script setup lang="ts">
import { usePreguntaStore, useSolucionStore } from '@/stores';
import { useRouter } from 'vue-router';
//icons
import PrincipianteIconVue from '@/components/draws/icons/PrincipianteIcon.vue';
import IntermedioIcon from '../../components/draws/icons/IntermedioIcon.vue';
import AvanzadoIcon from '../../components/draws/icons/AvanzadoIcon.vue';
import { onMounted } from 'vue';

const preguntaStore = usePreguntaStore();
const solucionStore = useSolucionStore();
const router = useRouter();
onMounted(() => {
  preguntaStore.$reset();
  solucionStore.$reset();
});

function ClickSelectTipo(tipo: string) {
  if (tipo == 'general') {
    preguntaStore.preguntaGeneralAction();
    router.push({ name: 'Pregunta' });
  } else {
    router.push({ name: 'Cursos', params: { tipo: tipo } });
  }
}
</script>
<template>
  <div class="container">
    <section class="section-level h-full w-full p-4 pt-0 text-gray-400 antialiased">
      <div class="mx-auto px-4">
        <div id="title" class="mb-5 text-center">
          <h1 class="text-4xl font-bold text-secondary dark:text-white">Elige un Nivel</h1>
          <p class="text-light text-xl text-gray-500">
            Es importante elegir un nivel adecuado a su capacidad para un mejor aprendizaje
          </p>
        </div>
        <div
          class="grid grid-cols-1 grid-rows-1 justify-evenly gap-10 pt-10 md:grid-cols-2 lg:grid-cols-3"
        >
          <div class="card">
            <div class="w-full border-b border-secondary py-5">
              <h2 class="text-3xl font-bold text-secondary dark:text-white">Principiante</h2>
              <h3 class="mt-2 text-xl font-normal text-indigo-500">Preguntas por Temas</h3>
            </div>
            <div id="icon">
              <PrincipianteIconVue />
              <p class="text-sm text-gray-500">
                Perfecto para estudiantes que desean preguntas sobre un tema o que estén comenzando
              </p>
            </div>
            <button
              type="button"
              class="w-full rounded-xl bg-secondary py-4 text-xl font-medium text-white hover:bg-secondary-normal hover:text-white hover:shadow-lg"
              @click="ClickSelectTipo('tema')"
            >
              Elegir
            </button>
          </div>
          <div class="card">
            <div class="w-full border-b border-secondary py-5">
              <h2 class="text-3xl font-bold text-secondary dark:text-white">Intermedio</h2>
              <h3 class="mt-2 text-xl font-normal text-indigo-500">Preguntas por Curso</h3>
            </div>
            <div id="icon">
              <IntermedioIcon />
              <p class="text-sm text-gray-500">
                Perfecto para estudiantes que desean preguntas sobre un curso y que tengan mayor
                conocimiento
              </p>
            </div>

            <button
              type="button"
              class="w-full rounded-xl bg-secondary py-4 text-xl font-medium text-white hover:bg-secondary-normal hover:text-white hover:shadow-lg"
              @click="ClickSelectTipo('curso')"
            >
              Elegir
            </button>
          </div>
          <div class="card">
            <div class="w-full border-b border-secondary py-5">
              <h2 class="text-3xl font-bold text-secondary dark:text-white">Avanzado</h2>
              <h3 class="mt-2 text-xl font-normal text-indigo-500">Preguntas en General</h3>
            </div>
            <div id="icon">
              <AvanzadoIcon />
              <p class="text-sm text-gray-500">
                Perfecto para estudiantes expertos y quieran competir por ser el rey de las
                preguntas
              </p>
            </div>

            <button
              type="button"
              class="w-full rounded-xl bg-secondary py-4 text-xl font-medium text-white hover:bg-secondary-normal hover:text-white hover:shadow-lg"
              @click="ClickSelectTipo('general')"
            >
              Elegir
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.card {
  @apply h-full w-full rounded-lg p-4 text-center hover:shadow-lg;
  @apply flex flex-col items-center justify-between gap-5;
  @apply border border-primary-dark/20;
}
</style>
