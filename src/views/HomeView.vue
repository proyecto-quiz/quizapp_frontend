<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';

// Icons
import Main01Draw from '@/components/draws/Main01Draw.vue';
import Main02Draw from '@/components/draws/Main02Draw.vue';
import Main03Draw from '@/components/draws/Main03Draw.vue';

import { useInterObserver } from '@/composables';

const observer = useInterObserver(
  (entry) => {
    entry.target.classList.toggle('show', entry.isIntersecting);
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
    }
  },
  {
    queryAllSelector: 'section.section',
  }
);
</script>

<template>
  <LayoutDefault title="Inicio" class="overflow-x-hidden">
    <section class="section section-1">
      <aside class="w-2/4 self-start">
        <h1 class="title-nb title-nb-01">
          <span class="text-[#09FCED]">Note</span><span class="text-secondary-normal">Blue</span>
        </h1>
        <p
          class="text-center text-sm leading-7 tracking-wide md:text-left md:text-base md:leading-9 md:tracking-wider"
        >
          Note Blue es una plataforma educativa pensada para el aprendizaje mediante la solución de
          preguntas, la constancia y la practica hacen al maestro por ello note blue tiene las
          preguntas y respuestas de múltiples ejercicios de los diferentes cursos y temas, y no es
          todo tenemos también las soluciones desarrolladas por nuestros colaboradores que son
          docentes capacitados y con amplia trayectoria en diferentes instituciones educativas, por
          si fuera poco podrás ver todo el avance y los puntajes obtenidos en cada curso y tema, y
          un modo experto donde podrás demostrar tus habilidades y ser el rey de las preguntas.
        </p>
      </aside>
      <aside class="w-2/4 self-center">
        <Main01Draw />
      </aside>
    </section>

    <section class="section section-2">
      <aside class="w-2/4 self-start">
        <h1 class="title-nb title-nb-02">
          <span class="mx-2">Preguntas</span>
          <span class="mx-2 text-contrast-01">Online</span>
        </h1>
        <p
          class="text-center text-sm leading-7 tracking-wide md:text-right md:text-base md:leading-9 md:tracking-wider"
        >
          Ahora con Note Blue podrás tener cerca de ti las preguntas y respuestas de los cursos y
          temas que mas quieres practicar sea el lugar donde te encuentres, con un clic podrás
          ingresar a nuestra plataforma desde cualquier dispositivo y seguir practicando para que
          ninguna pregunta te detenga de tus sueños y convertirte en el rey de las preguntas.
        </p>
      </aside>
      <aside class="w-2/4 self-start">
        <Main02Draw />
      </aside>
    </section>

    <section class="section section-3">
      <aside class="w-2/4 self-start">
        <h1 class="title-nb title-nb-03">
          <span class="mx-2">Preguntas</span>
          <span class="mx-2 text-contrast-01">Aleatorias</span>
        </h1>
        <p
          class="text-center text-sm leading-7 tracking-wide md:text-left md:text-base md:leading-9 md:tracking-wider"
        >
          Note Blue tiene una característica que es generar las preguntas de manera aleatoria de
          nuestro banco de preguntas y si repite una pregunta no te preocupes no es un error es una
          de las características pensadas para el aprendizaje de nuestros estudiantes, enfocada en
          la frase “la experiencia y la práctica hacen al maestro” por ello mientras mas veas la
          misma pregunta podrás tener la respuesta más rápida y lograras aprender.
        </p>
      </aside>
      <aside class="w-2/4 self-center">
        <Main03Draw />
      </aside>
    </section>
  </LayoutDefault>
  <Footer />
</template>

<style scoped>
.section {
  @apply flex min-h-screen flex-col items-center justify-start gap-2 py-3 md:gap-10;
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

.section-1 {
  @apply md:flex-row;
}

.section-2 {
  @apply md:flex-row-reverse;
}

.section-3 {
  @apply md:flex-row;
}

.title-nb {
  @apply my-4 text-center text-2xl leading-8 tracking-wider md:my-10 md:text-5xl;
}

.title-nb-01 {
  @apply md:text-left;
}

.title-nb-02 {
  @apply md:text-right;
}

.title-nb-03 {
  @apply md:text-left;
}

@media only screen and (max-width: 767px) {
  .section aside {
    @apply self-center;
  }

  .section aside svg {
    width: 200px;
    height: 200px;
  }
}

@media only screen and (min-width: 768px) {
  .section aside {
    @apply self-start;
  }

  .section aside svg {
    width: max(100%, 14rem);
  }
}
</style>
