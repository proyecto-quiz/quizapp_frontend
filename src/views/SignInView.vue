<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, email as emailValid, maxLength, minLength } from '@vuelidate/validators';
import { SignInForm } from '@@/types-forms';
import { TokenResponse } from '@@/types-response-users';
import { useAuthStore } from '@/stores';
import { useLocalStorage, useMediaQuery } from '@/composables';
import ButtonTheme from '@/components/ui/ButtonTheme.vue';
import Spinner from '@/components/ui/Spinner.vue';
import InputForm from '@/components/ui/InputForm.vue';
import Alert from '@/components/ui/Alert.vue';

// Utils
import summaryJson from '@/utils/summary.json';
import { formatResponse } from '@/utils';

// Assets
import Google from '@/components/draws/icons/Google.vue';
import SignInImage from '@/assets/images/sign-in.png';

const router = useRouter();
const authStore = useAuthStore();
const authStoreComp = computed(() => authStore);
const stateForm = reactive<SignInForm>({} as SignInForm);
const rules = computed<Record<string, any>>(() => ({
  email: { required, emailValid },
  password: { required, maxLength: maxLength(20), minLength: minLength(5) },
}));

// Hook Validate
const v$ = useVuelidate(rules, stateForm, { $autoDirty: true });

const setTokens = useLocalStorage<TokenResponse>('tokens', {
  accessToken: '',
  refreshToken: '',
})[1];

const [_, setRememberPassword, rememberPassComp] = useLocalStorage('rp', false);

async function handleFormSubmit() {
  let valid = await v$.value.$validate();
  if (!v$.value.$error && valid) {
    await authStore.signInAction(stateForm, async (tokens) => {
      setTokens({
        accessToken: tokens[0],
        refreshToken: tokens[1],
      });
      await authStore.meAction();
      setRememberPassword(authStore.user?.rememberPassword || false);
      await router.push({ name: 'Home' });
    });
  }
}

// Ref
const sectionSignRef = ref<HTMLElement>();

onBeforeMount(() => {
  window.document.title = 'NoteBlue - Iniciar Sesión';
});

onMounted(() => {
  const query = router.currentRoute.value.query;

  if (authStore.isSuccess && query.up == 'success') {
    stateForm.email = authStore.saveValue;
  }
  sectionSignRef.value?.classList.add('a--show');
});

const match = useMediaQuery('(min-width: 768px)');
</script>

<template>
  <main class="grid grid-rows-1 items-stretch md:h-screen md:grid-cols-2">
    <section v-if="match" class="relative flex h-screen flex-col">
      <p
        class="text--shadow fixed top-1/3 px-5 text-base leading-8 text-slate-100 sm:w-2/4 md:leading-11"
      >
        <i class="bx-pull-left bx bxs-quote-alt-left bx-lg" />
        {{ summaryJson['sign-in'].text }}
        <br />
        <span class="text-base font-medium">{{ summaryJson['sign-in'].author }} </span>
      </p>
      <img
        :src="SignInImage"
        class="absolute top-0 -z-10 h-full w-full rounded-none object-cover blur-sm"
        alt="Book Image"
      />
    </section>
    <section ref="sectionSignRef" class="flex flex-col px-7 py-3 md:gap-5 md:px-10">
      <div class="flex justify-between">
        <router-link
          type="button"
          title="Regresar"
          class="button--light flex items-center gap-1 text-sm"
          :to="{ name: 'Home' }"
        >
          <i class="bx bx-arrow-back bx-xs self-center" /> Regresar
        </router-link>

        <ButtonTheme />
      </div>
      <aside class="my-2">
        <h1 class="title-nb title-nb-01">
          <span class="text-[#09FCED]">Note</span><span class="text-secondary-normal">Blue</span>
        </h1>
        <h3 class="text-center text-lg md:text-left md:text-xl">Inicia sesión con tu cuenta</h3>
        <p class="text-center text-sm text-secondary-normal md:text-left">
          Puedes registrarte con tu
          <router-link
            :to="{ name: 'SignUp' }"
            class="text-secondary underline dark:text-contrast-02/90"
          >
            correo electrónico
          </router-link>
        </p>
      </aside>
      <span class="my-2 w-full border-t border-secondary dark:border-primary-light" />
      <Alert
        v-if="authStoreComp.isError"
        outline
        type="danger"
        @on-close="authStoreComp.resetAction()"
      >
        <span v-for="(err, idx) in formatResponse(authStoreComp.message)" :key="err.value + idx">
          {{ err.value }}
          <br />
        </span>
      </Alert>
      <Alert
        v-if="authStoreComp.isSuccess"
        outline
        type="success"
        @on-close="authStoreComp.resetAction()"
      >
        {{ authStoreComp.message }}
      </Alert>
      <form
        class="flex h-auto flex-col items-center justify-between gap-y-5"
        @submit.prevent="handleFormSubmit"
      >
        <InputForm
          v-model="stateForm.email"
          c-class="w-full block"
          is-focus
          label-name="Correo Electrónico"
          class="input w-full border border-secondary/20 bg-inherit"
          name="email"
          type="email"
          placeholder="my-mail@mail.com"
          :disabled="authStoreComp.isLoading"
          :has-error="v$.email.$error"
          :help-error-msg="v$.email.$errors[0]?.$message"
        />

        <InputForm
          v-model="stateForm.password"
          c-class="w-full block"
          label-name="Contraseña"
          class="input w-full border border-secondary/20 bg-inherit"
          name="password"
          type="password"
          autocomplete="false"
          :disabled="authStoreComp.isLoading"
          :has-error="v$.password.$error"
          :help-error-msg="v$.password.$errors[0]?.$message"
        />

        <InputForm
          v-model="stateForm.rememberPassword"
          :checked="rememberPassComp"
          c-class="flex w-full items-center gap-x-2"
          name="remember-password"
          type="checkbox"
          label-name="Recordar mi Contraseña"
          label-class="text-sm"
          class="rounded disabled:bg-slate-400"
          :disabled="authStoreComp.isLoading"
        />
        <button
          class="button--secondary flex w-full flex-col items-center font-medium disabled:cursor-not-allowed disabled:bg-secondary/50 dark:disabled:bg-slate-500"
          type="submit"
          :disabled="v$.$error || authStoreComp.isLoading"
        >
          <Spinner v-if="authStoreComp.isLoading" type="contrast" class="h-7 w-7" />
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>
      <div class="separator my-2 text-center">O</div>
      <button type="button" class="button--primary flex items-center justify-center gap-x-4">
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
