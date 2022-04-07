<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import Main01Draw from '@/components/draws/Main01Draw.vue';
import Main02Draw from '@/components/draws/Main02Draw.vue';
import Main03Draw from '@/components/draws/Main03Draw.vue';
import { useInterObserver } from '@/composables';

useInterObserver(
  (entry) => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  },
  {
    queryAllSelector: 'section.section',
    init: {
      rootMargin: '-150px',
    },
  }
);
</script>

<template>
  <LayoutDefault title="Inicio">
    <section class="section section-1">
      <aside class="self-center">
        <h1 class="title-nb title-nb-01">
          <span class="text-[#09FCED]">Note</span><span class="text-secondary-normal">Blue</span>
        </h1>
        <p
          class="text-center text-sm leading-7 tracking-wide md:text-left md:text-base md:leading-9 md:tracking-wider"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue integer duis adipiscing
          pharetra suscipit nulla eget. Sed quis ac integer sit feugiat diam hendrerit sed. Nulla
          ipsum posuere egestas in egestas eu nisl. Vulputate in sed quam feugiat egestas urna.
          Lorem sagittis parturient praesent nunc morbi. Nulla nisl bibendum eget non. Praesent ac
          ullamcorper sagittis at sed vitae. Donec viverra eros sit at. Tristique id integer vitae,
          massa cras.
        </p>
      </aside>
      <aside class="self-center">
        <Main01Draw />
      </aside>
    </section>

    <section class="section section-2">
      <aside class="self-center">
        <h1 class="title-nb title-nb-02">
          <span class="mx-2">Preguntas</span>
          <span class="mx-2 text-contrast-01">Online</span>
        </h1>
        <p
          class="text-center text-sm leading-7 tracking-wide md:text-right md:text-base md:leading-9 md:tracking-wider"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue integer duis adipiscing
          pharetra suscipit nulla eget. Sed quis ac integer sit feugiat diam hendrerit sed. Nulla
          ipsum posuere egestas in egestas eu nisl. Vulputate in sed quam feugiat egestas urna.
          Lorem sagittis parturient praesent nunc morbi. Nulla nisl bibendum eget non. Praesent ac
          ullamcorper sagittis at sed vitae. Donec viverra eros sit at. Tristique id integer vitae,
          massa cras.
        </p>
      </aside>
      <aside class="self-center">
        <Main02Draw />
      </aside>
    </section>

    <section class="section section-3">
      <aside class="self-center">
        <h1 class="title-nb title-nb-03">
          <span class="mx-2">Preguntas</span>
          <span class="mx-2 text-contrast-01">Aleatorias</span>
        </h1>
        <p
          class="text-center text-sm leading-7 tracking-wide md:text-left md:text-base md:leading-9 md:tracking-wider"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue integer duis adipiscing
          pharetra suscipit nulla eget. Sed quis ac integer sit feugiat diam hendrerit sed. Nulla
          ipsum posuere egestas in egestas eu nisl. Vulputate in sed quam feugiat egestas urna.
          Lorem sagittis parturient praesent nunc morbi. Nulla nisl bibendum eget non. Praesent ac
          ullamcorper sagittis at sed vitae. Donec viverra eros sit at. Tristique id integer vitae,
          massa cras.
        </p>
      </aside>
      <aside class="self-center">
        <Main03Draw />
      </aside>
    </section>
  </LayoutDefault>
</template>

<style scoped>
.section {
  @apply flex flex-col items-start justify-between gap-2 py-3 md:h-screen md:gap-10;
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
  transition-property: transform opacity;
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
</style>
