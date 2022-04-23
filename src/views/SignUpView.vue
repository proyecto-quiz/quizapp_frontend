<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { SignUpForm } from '@@/types-forms';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { required, email as emailValid, maxLength, minLength, sameAs } from '@vuelidate/validators';
import { useAuthStore } from '@/stores';
import InputForm from '@/components/ui/InputForm.vue';
import Alert from '@/components/ui/Alert.vue';
import Spinner from '@/components/ui/Spinner.vue';
import useVuelidate from '@vuelidate/core';
import { formatResponse } from '@/utils/strings';

const router = useRouter();
const authStore = computed(() => useAuthStore()).value;

const stateForm = reactive<SignUpForm>({} as SignUpForm);

const rules = computed<Record<string, any>>(() => ({
  email: { required, emailValid, maxLength: maxLength(50) },
  username: { required, maxLength: maxLength(50), minLength: minLength(5) },
  password: {
    maxLength: maxLength(20),
    minLength: minLength(4),
    required,
    sameAs: sameAs(stateForm.password2),
  },
  password2: { required, sameAs: sameAs(stateForm.password) },
}));

const v$ = useVuelidate(rules, stateForm, { $autoDirty: true, $lazy: true });

async function handleUpSubmit() {
  let valid = await v$.value.$validate();
  if (!v$.value.$error && valid) {
    authStore.resetAction();
    await authStore.signUpAction(stateForm, async () => {
      authStore.saveValueAction(stateForm.email);
      await router.push({ name: 'SignIn', query: { up: 'success' } });
    });
  } else return;
}
</script>

<template>
  <LayoutDefault title="Registrarse">
    <h1 class="my-3 text-lg font-medium tracking-wider first-letter:text-sky-600 md:text-4xl">
      Registrarse
    </h1>

    <Alert v-if="authStore.isError" type="danger" outline @on-close="authStore.resetAction()">
      <span
        v-for="(err, idx) of formatResponse(authStore.message, false)"
        :key="'err' + idx"
        class="first-letter:uppercase"
      >
        {{ err.value }}
        <br />
      </span>
    </Alert>

    <form class="flex flex-1 flex-col gap-4" @submit.prevent="handleUpSubmit">
      <InputForm
        v-model="stateForm.email"
        is-focus
        label-name="Email"
        label-class="text-secondary dark:text-contrast-01"
        name="email"
        type="email"
        class="input w-full border border-secondary/20 bg-inherit"
        placeholder="my-email@mail-com"
        :disabled="authStore.isLoading"
        :has-error="v$.email.$error"
        :help-error-msg="v$.email.$errors[0]?.$message"
      />

      <InputForm
        v-model="stateForm.username"
        label-name="Nombre de usuario"
        label-class="text-secondary dark:text-contrast-01"
        name="username"
        type="text"
        class="input w-full border border-secondary/20 bg-inherit"
        :disabled="authStore.isLoading"
        :has-error="v$.username.$error"
        :help-error-msg="v$.username.$errors[0]?.$message"
      />

      <InputForm
        v-model="stateForm.password"
        label-name="Contraseña"
        label-class="text-secondary dark:text-contrast-01"
        name="password"
        type="password"
        class="input w-full border border-secondary/20 bg-inherit"
        :disabled="authStore.isLoading"
        :has-error="v$.password.$error"
        :help-error-msg="v$.password.$errors[0]?.$message"
      />

      <InputForm
        v-model="stateForm.password2"
        label-name="Repite la contraseña"
        label-class="text-secondary dark:text-contrast-01"
        name="password2"
        type="password"
        class="input w-full border border-secondary/20 bg-inherit"
        :disabled="authStore.isLoading"
        :has-error="v$.password2.$error"
        :help-error-msg="v$.password2.$errors[0]?.$message"
      />

      <button
        class="button--secondary flex w-full flex-col items-center disabled:cursor-not-allowed disabled:bg-secondary/40"
        type="submit"
        :disabled="v$.$error || authStore.isLoading"
      >
        <Spinner v-if="authStore.isLoading" type="green" class="h-7 w-7" />
        <span v-else>Registrarse</span>
      </button>
    </form>
  </LayoutDefault>
</template>
