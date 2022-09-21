<script setup lang="ts">
import { useInterObserver } from '@/composables';
import PrincipianteIconVue from '@/components/draws/icons/PrincipianteIcon.vue';
import IntermedioIcon from '../../components/draws/icons/IntermedioIcon.vue';
import AvanzadoIcon from '../../components/draws/icons/AvanzadoIcon.vue';
const observer = useInterObserver(
  (entry) => {
    entry.target.classList.toggle('show', entry.isIntersecting);
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
    }
  },
  {
    queryAllSelector: 'section.section',
    init: {
      root: document.querySelector('main.container'),
      rootMargin: '0px',
    },
  }
);
</script>
<template>
  <section class="section font-inter h-full w-full p-4 pt-0 text-gray-400 antialiased">
    <div class="mx-auto px-4">
      <div id="title" class="mb-5 text-center">
        <h1 class="text-4xl font-bold text-secondary dark:text-white">Elige un Nivel</h1>
        <p class="text-light text-xl text-gray-500">
          Es importante eleguir un nivel adecuado a su capacida para un mejor aprendizaje
        </p>
      </div>
      <div class="grid grid-cols-1 justify-evenly gap-10 pt-10 md:grid-cols-2 lg:grid-cols-3">
        <div
          class="w-full transform overflow-hidden rounded-lg text-center transition duration-200 ease-in hover:scale-105 hover:shadow-2xl"
        >
          <div class="w-full border-b border-secondary py-5">
            <h2 class="text-3xl font-bold text-secondary dark:text-white">Principiante</h2>
            <h3 class="mt-2 text-xl font-normal text-indigo-500">Preguntas por Temas</h3>
          </div>
          <div id="content" class="">
            <div id="icon" class="my-5">
              <PrincipianteIconVue />
              <p class="pt-2 text-sm text-gray-500">
                Perfecto para estudiantes que desean preguntas sobre un tema o que esten comenzando
              </p>
            </div>
            <div id="contain" class="mb-10 text-lg font-light leading-8">
              <div id="choose" class="mt-10 w-full px-6">
                <router-link
                  :to="{ name: 'Cursos', params: { tipo: 'tema' } }"
                  class="block w-full rounded-xl bg-secondary py-4 text-xl font-medium transition duration-200 ease-in-out hover:bg-secondary-normal hover:text-white hover:shadow-lg"
                >
                  Elegir
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full transform overflow-hidden rounded-lg text-center transition duration-200 ease-in hover:scale-105 hover:shadow-2xl"
        >
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
            <div id="contain" class="mb-10 text-lg font-light leading-8">
              <div id="choose" class="mt-10 w-full px-6">
                <router-link
                  :to="{ name: 'Cursos', params: { tipo: 'curso' } }"
                  class="block w-full rounded-xl bg-secondary py-4 text-xl font-medium transition duration-200 ease-in-out hover:bg-secondary-normal hover:text-white hover:shadow-lg"
                >
                  Elegir
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full transform overflow-hidden rounded-lg text-center transition duration-200 ease-in hover:scale-105 hover:shadow-2xl"
        >
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
            <div id="contain" class="mb-10 text-lg font-light leading-8">
              <div id="choose" class="mt-10 w-full px-6">
                <router-link
                  :to="{ name: 'Pregunta', params: { tipo: 'general' } }"
                  class="block w-full rounded-xl bg-secondary py-4 text-xl font-medium transition duration-200 ease-in-out hover:bg-secondary-normal hover:text-white hover:shadow-lg"
                >
                  Elegir
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.section {
  @apply flex min-h-screen flex-col justify-start gap-2 py-3 md:gap-10;
  opacity: 0;
  transform: translateX(-100px);
}

.section.show {
  opacity: 1;
  transform: translateX(0);
}

.section {
  transition-delay: 0.25s;
  transition-duration: 1.5s;
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>
