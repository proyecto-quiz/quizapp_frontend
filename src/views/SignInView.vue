<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, email as emailValid, maxLength, minLength } from '@vuelidate/validators';
import { SignInForm } from '@@/types-forms';
import { useAuthStore } from '@/stores';
import { useLocalStorage } from '@/composables';
import ButtonTheme from '@/components/ui/ButtonTheme.vue';
import Alert from '@/components/ui/Alert.vue';

// Assets
import Google from '@/components/draws/icons/Google.vue';
import SignInImage from '@/assets/images/sign-in.png';
import { TokenResponse } from '@@/types-response-users';
import { storeToRefs } from 'pinia';

const router = useRouter();

const authStore = useAuthStore();

const stateForm = reactive<SignInForm>({
  email: '',
  password: '',
  rememberPassword: false,
});

const rules = computed(() => ({
  email: { required, emailValid },
  password: { required, maxLength: maxLength(20), minLength: minLength(5) },
  rememberPassword: {},
}));

// Hook Validate
const v$ = useVuelidate(rules, stateForm, { $autoDirty: true });

const setTokens = useLocalStorage<TokenResponse>('tokens', {
  accessToken: '',
  refreshToken: '',
})[1];

async function handleFormSubmit() {
  if (!v$.value.$error) {
    const signIn = await authStore.signInAction(stateForm);
    if (signIn.ok) {
      setTokens({
        accessToken: signIn.tokens[0],
        refreshToken: signIn.tokens[1],
      });
      await authStore.meAction();
      await router.push({ name: 'Home' });
    }
  }
}

// Ref
const sectionSignRef = ref<HTMLElement>();

const { isLoggedIn } = storeToRefs(authStore);

onBeforeMount(() => {
  if (isLoggedIn) {
    router.push({ name: 'Profile' });
  }
  window.document.title = 'NoteBlue - Iniciar Sesión';
  sectionSignRef.value?.classList.add('show');
});
</script>

<template>
  <main class="container mt-10 grid grid-rows-1 items-stretch gap-4 md:grid-cols-2">
    <section class="relative flex flex-col items-center py-3">
      <span class="absolute top-[1px] left-2 text-[7rem] md:left-14">“</span>
      <p class="self-center p-5 text-sm leading-11 text-slate-200 dark:text-primary-light sm:w-2/4">
        Those people who develop the ability to continuously acquire new and better forms of
        knowledge that thfromey can apply to their work and to their lives will be the movers and
        shakers in our society for the indefinite future
        <br />
        <span class="text-base font-medium">Brian Tracy</span>
      </p>
      <img
        :src="SignInImage"
        class="absolute top-0 -z-10 rounded bg-opacity-80 blur-[2px]"
        alt="Book Image"
      />
    </section>
    <section ref="sectionSignRef" class="flex flex-col px-5 py-2 md:gap-5">
      <div class="flex flex-initial justify-between">
        <button class="button--light w-fit text-sm" @click.prevent="router.push({ name: 'Home' })">
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
      <span class="my-2 w-full border-t border-secondary dark:border-primary-light" />
      <Alert
        v-if="authStore.status == 'error'"
        outline
        type="danger"
        @on-close="authStore.$reset()"
      >
        {{ authStore.message }}
      </Alert>
      <form
        class="flex h-auto flex-col items-center justify-between gap-y-5"
        @submit.prevent="handleFormSubmit"
      >
        <label class="block w-full" for="email">
          <span class="text-secondary dark:text-primary-light">Correo Electronico</span>
          <input
            id="email"
            v-model="stateForm.email"
            class="input w-full border border-secondary/20 bg-inherit"
            aria-required="true"
            required="true"
            name="email"
            type="email"
            placeholder="my-mail@mail.com"
          />
          <small v-if="v$.email.$error" class="text-red-500">{{
            v$.email.$errors[0].$message
          }}</small>
        </label>

        <label class="block w-full" for="password">
          <span class="text-secondary dark:text-primary-light">Contraseña</span>
          <input
            id="password"
            v-model="stateForm.password"
            class="input w-full border border-secondary/20 bg-inherit"
            name="password"
            type="password"
            placeholder="Contraseña"
          />
          <small v-if="v$.password.$error" class="text-red-500">{{
            v$.password.$errors[0].$message
          }}</small>
        </label>

        <label for="remember-password" class="flex w-full items-center justify-start gap-x-2">
          <input
            id="remember-password"
            v-model="stateForm.rememberPassword"
            type="checkbox"
            class="rounded"
          />
          <span class="text-sm">Recordar mi Contraseña</span>
        </label>

        <button
          :disabled="v$.email.$error || v$.password.$error"
          class="button--secondary w-full font-medium disabled:bg-slate-300 dark:disabled:bg-slate-500"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>
      <div class="separator my-2 text-center">O</div>
      <button class="button--primary flex items-center justify-center gap-x-4">
        <Google />
        <span class="text-sm">Iniciar sesión con Google</span>
      </button>
    </section>
  </main>
</template>

<style scoped>
.title-nb {
  @apply mb-2 text-center text-2xl leading-8 tracking-wider md:text-5xl;
}

.title-nb-01 {
  @apply md:text-left;
}
</style>
