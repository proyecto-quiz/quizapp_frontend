<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { required, email as emailValid, maxLength, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import { useRouter } from 'vue-router';
import Google from '@/components/draws/icons/Google.vue';
import ButtonTheme from '@/components/ui/ButtonTheme.vue';

// Assets
import SignImage from '@/assets/images/sign-in.png';

interface Form {
  email: string;
  password: string;
  rememberPass: boolean;
}

const state = reactive<Form>({
  email: '',
  password: '',
  rememberPass: false,
});

const rules = computed(() => ({
  email: { required, emailValid },
  password: { required, maxLength: maxLength(20), minLength: minLength(5) },
  rememberPass: {},
}));

const v$ = useVuelidate(rules, state, { $autoDirty: true });

function handleFormSubmit() {
  if (v$.value.$error) {
    alert('Errors');
  } else {
    alert('Success');
  }
}
const router = useRouter();

// Ref
const sectionSignRef = ref<HTMLElement>();
onMounted(() => {
  sectionSignRef.value?.classList.add('show');
  window.document.title = 'Iniciar Sesión';
});
</script>

<template>
  <main class="container mt-10 grid grid-rows-1 items-stretch gap-4 md:grid-cols-2">
    <section class="relative flex flex-col items-center py-3">
      <span class="absolute top-[1px] left-2 text-[7rem] md:left-14">“</span>
      <p class="self-center p-5 text-sm leading-11 text-slate-200 dark:text-primary-light sm:w-2/4">
        Those people who develop the ability to continuously acquire new and better forms of
        knowledge that they can apply to their work and to their lives will be the movers and
        shakers in our society for the indefinite future
        <br />
        <span class="text-base font-medium">Brian Tracy</span>
      </p>
      <img
        :src="SignImage"
        class="absolute top-0 -z-10 rounded bg-opacity-80 blur-[2px]"
        alt="Book Image"
      />
    </section>
    <section ref="sectionSignRef" class="flex flex-col px-5 py-2 md:gap-5">
      <div class="flex flex-initial justify-between">
        <button @click.prevent="router.back" class="button--light w-fit text-sm">
          &#60; Regresar
        </button>
        <ButtonTheme />
      </div>
      <aside class="my-2">
        <h1 class="title-nb title-nb-01">
          <span class="text-[#09FCED]">Note</span><span class="text-secondary-normal">Blue</span>
        </h1>
        <h3 class="text-center text-lg md:text-left md:text-xl">Inicia sesión con tu cuenta</h3>
        <p class="text-center text-sm text-secondary-normal md:text-left">
          Puede registrarte con tu <a href="#" class="underline">correo electronico</a>
        </p>
      </aside>
      <span class="my-2 w-full border border-secondary dark:border-primary-light" />
      <form
        @submit.prevent="handleFormSubmit"
        class="flex h-auto flex-col items-center justify-between gap-y-5"
      >
        <label class="block w-full" for="email">
          <span class="text-secondary dark:text-primary-light">Correo Electronico</span>
          <input
            class="input w-full border border-secondary/20 dark:bg-primary-dark"
            id="email"
            aria-required="true"
            required="true"
            name="email"
            type="email"
            v-model="state.email"
            placeholder="my-mail@mail.com"
          />
          <small class="text-red-500" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</small>
        </label>

        <label class="block w-full" for="password">
          <span class="text-secondary dark:text-primary-light">Contraseña</span>
          <input
            class="input w-full border border-secondary/20 dark:bg-primary-dark"
            id="password"
            name="password"
            type="password"
            v-model="state.password"
            placeholder="Contraseña"
          />
          <small class="text-red-500" v-if="v$.password.$error">{{
            v$.password.$errors[0].$message
          }}</small>
        </label>

        <label for="remember-password" class="flex w-full items-center justify-start gap-x-2">
          <input
            v-model="state.rememberPass"
            type="checkbox"
            class="rounded"
            id="remember-password"
          />
          <span class="text-sm">Recordar mi Contraseña</span>
        </label>

        <button
          v-on:invalid="(e) => console.log(e)"
          :disabled="v$.email.$error || v$.password.$error"
          class="button--secondary w-full font-medium disabled:bg-slate-300"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>
      <div class="separetor my-2 text-center">O</div>
      <button class="button--primary flex items-center justify-center gap-x-4">
        <Google />
        <span class="text-sm">Iniciar sesión con Google</span>
      </button>
    </section>
  </main>
</template>

<style scoped>
.show {
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-name: hidden;
  animation-direction: normal;
}

@keyframes hidden {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.title-nb {
  @apply mb-2 text-center text-2xl leading-8 tracking-wider md:text-5xl;
}

.title-nb-01 {
  @apply md:text-left;
}
</style>
