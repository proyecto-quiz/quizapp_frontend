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
      <aside class="w-11/12 self-start md:w-2/4">
        <h1 class="title-nb title-nb-01">
          <span class="text-[#09FCED]">Note</span><span class="text-secondary-normal">Blue</span>
        </h1>
        <p
          class="text-center text-sm leading-7 tracking-wide md:text-left md:text-base md:leading-9 md:tracking-wider"
        >
          <b>Note Blue</b> es una plataforma educativa con un sistema generador de preguntas pensada
          para el aprendizaje mediante la solución de preguntas, Cuenta con un banco de preguntas
          compartidas por nuestros usuarios y solucionado por nuestros colaboradores, por si fuera
          poco podrás ver todo el avance y los puntajes obtenidos en cada curso, y un modo experto
          donde podrás demostrar tus habilidades y ser el rey de las preguntas.
        </p>
        <div
          class="my-4 flex flex-col items-center justify-center gap-4 rounded-md bg-green-400 p-4 text-center shadow-md md:flex-row"
        >
          <i class="bx bxs-chevrons-right bx-fade-right" />
          <p class="font-bold dark:text-primary-dark">Puedes comenzar a practicar gratis</p>
          <router-link
            :to="{
              name: 'Sign',
              query: {
                type: 'sign-up',
              },
            }"
            class="button button--contrast-01"
          >
            Registrarse
          </router-link>
        </div>
      </aside>
      <aside class="w-2/4 self-center">
        <Main01Draw />
      </aside>
    </section>

    <section class="section section-2">
      <aside class="w-11/12 self-start md:w-2/4">
        <h1 class="title-nb title-nb-02">
          <span class="mx-2">Preguntas</span>
          <span class="mx-2 text-contrast-01">Online</span>
        </h1>
        <p
          class="text-center text-sm leading-7 tracking-wide md:text-right md:text-base md:leading-9 md:tracking-wider"
        >
          Ahora con <b>Note Blue</b> podrás tener cerca de ti las preguntas y respuestas de los
          cursos y temas que mas quieres practicar sea el lugar donde te encuentres, con un clic
          podrás ingresar a nuestra plataforma desde cualquier dispositivo y seguir practicando para
          que ninguna pregunta te detenga de tus sueños y convertirte en el rey de las preguntas.
        </p>
      </aside>
      <aside class="w-2/4 self-start">
        <Main02Draw />
      </aside>
    </section>

    <section class="section section-3">
      <aside class="w-11/12 self-start md:w-2/4">
        <h1 class="title-nb title-nb-03">
          <span class="mx-2">Preguntas</span>
          <span class="mx-2 text-contrast-01">Aleatorias</span>
        </h1>
        <p
          class="text-center text-sm leading-7 tracking-wide md:text-left md:text-base md:leading-9 md:tracking-wider"
        >
          <b>Note Blue</b> tiene una característica que es generar las preguntas de manera aleatoria
          de nuestro banco de preguntas y si repite una pregunta no te preocupes no es un error es
          una de las características pensadas para el aprendizaje de nuestros estudiantes, enfocada
          en la frase “la experiencia y la práctica hacen al maestro” por ello mientras mas veas la
          misma pregunta podrás tener la respuesta más rápida en un examen.
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
