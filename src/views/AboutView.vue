<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { useInterObserver } from '@/composables';
import GitHub from '@/components/draws/icons/GitHub.vue';
import imgCris from '@/assets/images/cris.jpg';
import imgJose from '@/assets/images/jose.png';
import Facebook from '@/components/draws/icons/Facebook.vue';
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
const teamNB = [
  {
    id: 1,
    nombre: 'Cristian R. E.',
    image: imgCris,
    role: 'backend Developer',
  },
  {
    id: 2,
    nombre: 'José T. C.',
    image: imgJose,
    role: 'Full Stack Developer',
  },
];
</script>
<template>
  <LayoutDefault title="Sobre Nosotros">
    <section class="section section-history item-center my-0 self-center text-justify">
      <h1 class="title-nb team-nb">
        <span class="mx-2">Sobre</span>
        <span class="mx-2 text-contrast-01">Nosotros</span>
      </h1>
      <div class="item-center container mx-auto grid gap-20 self-center p-1 md:grid-cols-2">
        <div class="mt-4 flex flex-wrap justify-center gap-10 hover:text-secondary-light">
          <div
            class="group flex transform flex-col items-center rounded-xl p-8 transition-colors duration-200 hover:bg-blue-600"
          >
            <strong class="text-xl">Misión</strong>
            <p class="text-lg">
              Note Blue es una plataforma educativa desarrollada con el fin de apoyar en la
              formación de los estudiantes en los diferentes cursos y afrontar un examen de manera
              satisfactoria, enfocada en la enseñanza por medio de preguntas y respuestas.
            </p>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap justify-center gap-6 hover:text-secondary-light">
          <div
            class="group flex transform flex-col items-center rounded-xl p-8 transition-colors duration-200 hover:bg-blue-600"
          >
            <strong class="text-xl">Visión</strong>
            <p class="text-lg">
              Lograr ser una plataforma educativa con la mayor cantidad de banco de preguntas y
              respuestas de calidad mientras buscamos posicionarnos en el mercado, haciendo uso de
              las tecnologías para superar las barreras.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <aside class="item-center self-center">
        <h1 class="title-nb team-nb">
          <span class="mx-2">Equipo de</span>
          <span class="mx-2 text-contrast-01">Desarrollo</span>
        </h1>
        <div class="container mx-auto p-1">
          <div class="mt-1 flex flex-wrap justify-center gap-10">
            <div
              v-for="team in teamNB"
              :key="team.id"
              class="group flex transform flex-col items-center rounded-xl p-8 transition-colors duration-200 hover:bg-blue-600"
            >
              <img
                class="h-32 w-32 rounded-full object-cover ring-4 group-hover:ring-white dark:ring-white"
                :src="team.image"
                alt=""
              />
              <h1
                class="mt-4 text-2xl font-semibold capitalize group-hover:text-white dark:text-white"
              >
                {{ team.nombre }}
              </h1>
              <p class="mt-2 capitalize group-hover:text-gray-300 dark:text-primary-light/60">
                {{ team.role }}
              </p>
              <div class="-mx-2 mt-3 flex">
                <a
                  href="#"
                  class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white dark:text-gray-300 dark:hover:text-gray-300"
                  aria-label="Facebook"
                >
                  <Facebook class="group-hover:fill-current" />
                </a>
                <a
                  href="#"
                  class="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white dark:text-gray-300 dark:hover:text-gray-300"
                  aria-label="Github"
                >
                  <GitHub class="group-hover:fill-current" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  </LayoutDefault>
</template>
<style scoped>
.section {
  @apply flex  flex-col justify-start;
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
.title-nb {
  @apply my-4 text-center text-2xl leading-8 tracking-wider md:my-10 md:text-5xl;
}
</style>
