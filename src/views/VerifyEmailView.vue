<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores';
import { useAuthRef } from '@/composables/stores';
import Spinner from '@/components/ui/Spinner.vue';
import Logo from '@/components/draws/icons/Logo.vue';
import { useRouter } from 'vue-router';
import { formatResponse } from '@/utils';
import Alert from '@/components/ui/Alert.vue';

const router = useRouter();
const authStore = useAuthStore();
const authStoreComp = computed(() => authStore);
const token = ref('');
const { isError, message, isSuccess, isLoading } = useAuthRef();
async function handleVerifyClick(token: string) {
  await authStoreComp.value.verifyAction(token);
  if (!isError.value) {
    router.push({ name: 'Sign', query: { up: 'success', type: 'sign-in' } });
  }
}
</script>
<template>
  <LayoutDefault title="validate">
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo class="mx-auto h-auto w-20" alt="logo note blue" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Valida tu correo electrónico
        </h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <slot />
        <Alert v-if="isError" outline type="danger" @on-close="authStore.resetAction">
          <span v-for="(err, idx) in formatResponse(message)" :key="err.value + idx">
            {{ err.value }}
            <br />
          </span>
        </Alert>
        <Alert v-if="isSuccess" outline type="success" @on-close="authStore.resetAction">
          {{ message }}
        </Alert>
        <form class="space-y-6">
          <div>
            <label for="token" class="block text-sm font-medium leading-6">Token</label>
            <div class="mt-2">
              <input
                id="token"
                v-model="token"
                name="token"
                type="text"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              class="button button--secondary flex w-full flex-col items-center font-medium disabled:cursor-not-allowed disabled:bg-secondary/50 dark:disabled:bg-slate-500"
              :disabled="isError || isLoading"
              @click="handleVerifyClick(token)"
            >
              <Spinner v-if="isLoading" type="contrast" class="h-7 w-7" />
              <span v-else class="flex justify-center">
                <span>Validar</span>
              </span>
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
          Enhorabuena!
          <a class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Gracias por probar nuestro app
          </a>
        </p>
      </div>
    </div>
  </LayoutDefault>
</template>
