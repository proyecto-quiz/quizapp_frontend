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
            Es importante eleguir un nivel adecuado a su capacida para un mejor aprendizaje
          </p>
        </div>
        <div class="grid grid-cols-1 justify-evenly gap-10 pt-10 md:grid-cols-2 lg:grid-cols-3">
          <div class="w-full rounded-lg text-center ease-in hover:scale-105 hover:shadow-2xl">
            <div class="w-full border-b border-secondary py-5">
              <h2 class="text-3xl font-bold text-secondary dark:text-white">Principiante</h2>
              <h3 class="mt-2 text-xl font-normal text-indigo-500">Preguntas por Temas</h3>
            </div>
            <div id="content">
              <div id="icon" class="my-5">
                <PrincipianteIconVue />
                <p class="pt-2 text-sm text-gray-500">
                  Perfecto para estudiantes que desean preguntas sobre un tema o que esten
                  comenzando
                </p>
              </div>
              <div id="contain" class="mb-10 text-lg font-light">
                <div id="choose" class="mt-10 w-full px-6">
                  <button
                    class="block w-full rounded-xl bg-secondary py-4 text-xl font-medium hover:bg-secondary-normal hover:text-white hover:shadow-lg"
                    @click="ClickSelectTipo('tema')"
                  >
                    Elegir
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full rounded-lg text-center hover:scale-105 hover:shadow-2xl">
            <div class="w-full border-b border-secondary py-5">
              <h2 class="text-3xl font-bold text-secondary dark:text-white">Intermedio</h2>
              <h3 class="mt-2 text-xl font-normal text-indigo-500">Preguntas por Curso</h3>
            </div>
            <div id="content" class="">
              <div id="icon" class="my-5">
                <IntermedioIcon />
                <p class="pt-2 text-sm text-gray-500">
                  Perfecto para estudiantes que desean preguntas sobre un curso y que tengan mayor
                  conocimiento
                </p>
              </div>
              <div id="contain" class="mb-10 text-lg font-light">
                <div id="choose" class="mt-10 w-full px-6">
                  <button
                    class="block w-full rounded-xl bg-secondary py-4 text-xl font-medium hover:bg-secondary-normal hover:text-white hover:shadow-lg"
                    @click="ClickSelectTipo('curso')"
                  >
                    Elegir
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full rounded-lg text-center hover:scale-105 hover:shadow-2xl">
            <div class="w-full border-b border-secondary py-5">
              <h2 class="text-3xl font-bold text-secondary dark:text-white">Avanzado</h2>
              <h3 class="mt-2 text-xl font-normal text-indigo-500">Preguntas en General</h3>
            </div>
            <div id="content" class="">
              <div id="icon" class="my-5">
                <AvanzadoIcon />
                <p class="pt-2 text-sm text-gray-500">
                  Perfecto para estudiantes expertos y quieran competir por ser el rey de las
                  preguntas
                </p>
              </div>
              <div id="contain" class="lead mb-10 text-lg font-light">
                <div id="choose" class="mt-10 w-full px-6">
                  <button
                    class="block w-full rounded-xl bg-secondary py-4 text-xl font-medium hover:bg-secondary-normal hover:text-white hover:shadow-lg"
                    @click="ClickSelectTipo('general')"
                  >
                    Elegir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
