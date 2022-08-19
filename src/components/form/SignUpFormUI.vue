<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores';
import { SignUpForm } from '@@/types-forms';
import { email as emailValid, maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import Alert from '@/components/ui/Alert.vue';
import { formatResponse } from '@/utils';
import InputForm from '@/components/ui/InputForm.vue';
import Spinner from '@/components/ui/Spinner.vue';

const router = useRouter();
const authStore = useAuthStore();
const authStoreComp = computed(() => authStore);

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
      formRef.value?.reset();
      await router.push({ name: 'Sign', query: { up: 'success', type: 'sign-in' } });
    });
  }
}

// Ref
const signUpFormRef = ref<HTMLElement>();
const formRef = ref<HTMLFormElement>();

onMounted(() => {
  signUpFormRef.value?.classList.add('a--show');
});
</script>

<template>
  <section ref="signUpFormRef" class="flex flex-col px-7 py-3 md:gap-5 md:px-10">
    <slot />
    <Alert v-if="authStoreComp.isError" type="danger" outline @on-close="authStore.resetAction()">
      <span
        v-for="(err, idx) of formatResponse(authStoreComp.message, false)"
        :key="'err' + idx"
        class="first-letter:uppercase"
      >
        {{ err.value }}
        <br />
      </span>
    </Alert>

    <form ref="formRef" class="flex flex-1 flex-col gap-4" @submit.prevent="handleUpSubmit">
      <InputForm
        v-model="stateForm.email"
        is-focus
        label-name="Correo Electrónico"
        name="email"
        type="email"
        class="input w-full border border-secondary/20 bg-inherit"
        placeholder="my-email@mail-com"
        :disabled="authStoreComp.isLoading"
        :has-error="v$.email.$error"
        :help-error-msg="v$.email.$errors[0]?.$message"
      />

      <InputForm
        v-model="stateForm.username"
        label-name="Nombre de usuario"
        name="username"
        type="text"
        class="input w-full border border-secondary/20 bg-inherit"
        :disabled="authStoreComp.isLoading"
        :has-error="v$.username.$error"
        :help-error-msg="v$.username.$errors[0]?.$message"
      />

      <InputForm
        v-model="stateForm.password"
        label-name="Contraseña"
        name="password"
        type="password"
        class="input w-full border border-secondary/20 bg-inherit"
        :disabled="authStoreComp.isLoading"
        :has-error="v$.password.$error"
        :help-error-msg="v$.password.$errors[0]?.$message"
      />

      <InputForm
        v-model="stateForm.password2"
        label-name="Repite la contraseña"
        name="password2"
        type="password"
        class="input w-full border border-secondary/20 bg-inherit"
        :disabled="authStoreComp.isLoading"
        :has-error="v$.password2.$error"
        :help-error-msg="v$.password2.$errors[0]?.$message"
      />

      <button
        class="button button--secondary flex w-full flex-col items-center disabled:cursor-not-allowed disabled:bg-secondary/40"
        type="submit"
        :disabled="v$.$error || authStoreComp.isLoading"
      >
        <Spinner v-if="authStoreComp.isLoading" type="green" class="h-7 w-7" />
        <span v-else class="flex justify-center">
          <i class="bx bx-user-plus mr-2 text-2xl" /> Registrarse
        </span>
      </button>
    </form>
  </section>
</template>
