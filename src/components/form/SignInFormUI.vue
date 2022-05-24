<script setup lang="ts">
import InputForm from '@/components/ui/InputForm.vue';
import Alert from '@/components/ui/Alert.vue';
import useVuelidate from '@vuelidate/core';
import { useLocalStorage } from '@/composables';
import { TokenResponse } from '@@/types-response-users';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';
import { computed, onMounted, reactive, ref } from 'vue';
import { SignInForm } from '@@/types-forms';
import { email as emailValid, maxLength, minLength, required } from '@vuelidate/validators';
import Spinner from '@/components/ui/Spinner.vue';
import { formatResponse } from '@/utils';

// Icon
import Google from '@/components/draws/icons/Google.vue';

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

const [rememberPass, setRememberPassword, rememberPassComp] = useLocalStorage('rp', false);

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

  if (authStore.isError) stateForm.password = '';
}

// Ref
const signInFormRef = ref<HTMLElement>();

onMounted(() => {
  const query = router.currentRoute.value.query;

  if (authStore.isSuccess && query.up == 'success') {
    stateForm.email = authStore.saveValue;
  }
  signInFormRef.value?.classList.add('a--show');
});
</script>

<template>
  <section ref="signInFormRef" class="flex flex-col px-7 py-3 md:gap-5 md:px-10">
    <slot />
    <Alert v-if="authStoreComp.isError" outline type="danger" @on-close="authStore.resetAction()">
      <span v-for="(err, idx) in formatResponse(authStoreComp.message)" :key="err.value + idx">
        {{ err.value }}
        <br />
      </span>
    </Alert>
    <Alert
      v-if="authStoreComp.isSuccess"
      outline
      type="success"
      @on-close="authStore.resetAction()"
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
        :has-error="v$.email.$error || authStoreComp.isError"
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
        :has-error="v$.password.$error || authStoreComp.isError"
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
        @click="setRememberPassword(!rememberPass)"
      />
      <button
        class="button--secondary flex w-full flex-col items-center font-medium disabled:cursor-not-allowed disabled:bg-secondary/50 dark:disabled:bg-slate-500"
        type="submit"
        :disabled="v$.$error || authStoreComp.isLoading"
      >
        <Spinner v-if="authStoreComp.isLoading" type="contrast" class="h-7 w-7" />
        <span v-else class="flex justify-center">
          <i class="bx bx-log-in mr-2 text-2xl" /><span>Iniciar Sesión</span>
        </span>
      </button>
    </form>
    <div class="separator my-2 text-center">O</div>
    <button type="button" class="button--primary flex items-center justify-center gap-x-4">
      <Google />
      <span class="text-sm">Iniciar sesión con Google</span>
    </button>
  </section>
</template>
