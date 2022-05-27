<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@/composables';
import SignInFormUI from '@/components/form/SignInFormUI.vue';
import SignUpFormUI from '@/components/form/SignUpFormUI.vue';
import ButtonTheme from '@/components/ui/ButtonTheme.vue';
// Utils
import summaryJson from '@/utils/summary.json';
// Assets
import SignInImage from '@/assets/images/sign-in.png';

const route = useRoute();

const matchUp = computed(() => route.query.type === 'sign-up');

onMounted(() => {
  window.document.title = 'NoteBlue - Iniciar Sesión';
});

const match = useMediaQuery('(min-width: 768px)');
</script>

<template>
  <section class="top-4 z-10 mt-2 flex w-full justify-between px-10 md:fixed md:mt-4">
    <router-link
      type="button"
      title="Regresar"
      class="button--contrast-01 flex items-center gap-1 text-sm"
      :to="{ name: 'Home' }"
    >
      <i class="bx bx-arrow-back bx-xs self-center" /> Regresar
    </router-link>
    <ButtonTheme />
  </section>
  <main class="grid md:h-screen md:grid-cols-2">
    <section v-if="match" class="relative flex h-screen flex-col">
      <p
        class="text--shadow fixed top-1/3 px-5 text-base leading-8 text-slate-100 sm:w-2/4 md:leading-11"
      >
        <i class="bx-pull-left bx bxs-quote-alt-left bx-lg" />
        {{ summaryJson['sign-in'].text }}
        <br />
        <span class="text-base font-medium" v-text="summaryJson['sign-in'].author" />
      </p>
      <img
        :src="SignInImage"
        class="absolute top-0 -z-10 h-full w-full rounded-none object-cover blur-sm"
        alt="Book Image"
      />
    </section>
    <SignInFormUI v-if="!matchUp">
      <aside class="my-2">
        <h1 class="title-nb title-nb-01">
          <span class="text-[#09FCED]" v-text="'Note'" />
          <span class="text-secondary-normal" v-text="'Blue'" />
        </h1>
        <h3 class="text-center text-lg md:text-left md:text-xl">Inicia sesión con tu cuenta</h3>
        <p class="text-center text-sm text-secondary-normal md:text-left">
          Puedes registrarte con tu
          <router-link
            :to="{ name: 'Sign', query: { type: 'sign-up' } }"
            class="text-secondary underline dark:text-contrast-02/90"
          >
            correo electrónico
          </router-link>
        </p>
      </aside>
      <span class="my-2 w-full border-t border-secondary dark:border-primary-light" />
    </SignInFormUI>
    <SignUpFormUI v-else>
      <aside class="my-2">
        <h1 class="title-nb title-nb-01">
          <span class="text-[#09FCED]">Note</span><span class="text-secondary-normal">Blue</span>
        </h1>
        <h3 class="text-center text-lg md:text-left md:text-xl">Ya puedes crearte una cuenta!</h3>
        <p class="text-center text-sm text-secondary-normal md:text-left">
          <router-link
            :to="{ name: 'Sign', query: { type: 'sign-in' } }"
            class="text-secondary underline dark:text-contrast-02/90"
          >
            Inicia sesión
          </router-link>
          con tu cuenta
        </p>
      </aside>
      <span class="my-2 w-full border-t border-secondary dark:border-primary-light" />
    </SignUpFormUI>
  </main>
</template>

<style scoped>
.text--shadow {
  text-shadow: 2px 4px 4px #0009;
}

.title-nb {
  @apply mb-2 text-center text-2xl leading-8 tracking-wider md:text-5xl;
}

.title-nb-01 {
  @apply md:text-left;
}
</style>
