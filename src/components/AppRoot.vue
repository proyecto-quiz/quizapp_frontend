<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useDarkTheme, useLocalStorage } from '@/composables';
import { useAuthStore } from '@/stores';
import Spinner from './ui/Spinner.vue';

const authStore = useAuthStore();
const isReady = computed(() => useAuthStore().isReadyApp);

const setUsername = useLocalStorage<string>('username')[1];
const divRef = ref<HTMLDivElement>();

onBeforeMount(async () => {
  // await authStore.meAction();
  setUsername(authStore.user?.username || '');
});

onMounted(() => {
  let element = divRef.value;
  if (!authStore.isReadyApp) element?.classList.add('a--show');
  else {
    element?.classList.remove('a--show');
    element?.classList.add('a--hidden');
  }
});

useDarkTheme();
</script>

<template>
  <template v-if="!isReady">
    <div ref="divRef" class="flex flex-col items-center gap-3 pt-10">
      <h1 class="self-center text-5xl font-semibold">
        <span class="text-[#09FCED]">Note</span>
        <span class="text-secondary-normal">Blue</span>
      </h1>
      <h3
        class="py-2 text-center text-lg font-medium tracking-wider dark:text-contrast-01 md:text-xl"
      >
        Cargando
      </h3>
      <Spinner type="secondary" style="width: 50px; height: 50px; border-width: 6px" />
    </div>
  </template>
  <template v-else>
    <slot />
  </template>
</template>
