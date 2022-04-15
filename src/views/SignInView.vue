<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
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
import Spinner from '@/components/ui/Spinner.vue';

const router = useRouter();

const authStore = computed(() => useAuthStore()).value;

const stateForm = reactive<SignInForm>({
  email: '',
  password: '',
  rememberPassword: false,
});
const emailRef = ref<HTMLInputElement>();

const rules = computed<Record<string, any>>(() => ({
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

onBeforeMount(() => {
  window.document.title = 'NoteBlue - Iniciar Sesión';
});

onMounted(() => {
  sectionSignRef.value?.classList.add('show');
  emailRef.value?.focus({ preventScroll: true });
});
</script>

<template>
  <main class="grid grid-rows-1 items-stretch md:h-screen md:grid-cols-2">
    <section class="relative hidden h-screen flex-col md:flex">
      <p
        class="text--shadow fixed top-1/3 px-5 text-base leading-8 text-slate-100 sm:w-2/4 md:leading-11"
      >
        <i className="bx-pull-left bx bxs-quote-alt-left bx-lg" />
        El Estudio te llevara lejos
        <br />
        <span class="text-base font-medium">Christian R.E.</span>
      </p>
      <img
        :src="SignInImage"
        class="absolute top-0 -z-10 h-full w-full rounded-none object-cover blur-sm"
        alt="Book Image"
      />
    </section>
    <section ref="sectionSignRef" class="flex flex-col px-7 py-3 md:gap-5 md:px-10">
      <div class="flex flex-initial justify-between">
        <button
          type="button"
          title="Regresar"
          class="button--light flex items-center gap-1 text-sm"
          @click.prevent="router.push({ name: 'Home' })"
        >
          <i class="bx bx-arrow-back bx-xs self-center" /> Regresar
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
        @on-close="authStore.resetAction()"
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
            ref="emailRef"
            v-model="stateForm.email"
            class="input w-full border border-secondary/20 bg-inherit"
            aria-required="true"
            required="true"
            name="email"
            type="email"
            placeholder="my-mail@mail.com"
            :disabled="authStore.status == 'loading'"
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
            :disabled="authStore.status == 'loading'"
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
            class="rounded disabled:bg-slate-400"
            :disabled="authStore.status == 'loading'"
          />
          <span class="text-sm">Recordar mi Contraseña</span>
        </label>

        <button
          :disabled="v$.email.$error || v$.password.$error || authStore.status === 'loading'"
          class="button--secondary flex w-full flex-col items-center font-medium disabled:bg-secondary/50 dark:disabled:bg-slate-500"
          type="submit"
        >
          <Spinner v-if="authStore.status == 'loading'" type="contrast" class="h-7 w-7" />
          <span v-else>Iniciar Sesión</span>
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
.text--shadow {
  text-shadow: 2px 4px 4px #0009;
}
</style>
