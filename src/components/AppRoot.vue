<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useDarkTheme, useLocalStorage } from '@/composables';
import { useAuthStore } from '@/stores';
import Spinner from './ui/Spinner.vue';

const store = computed(() => useAuthStore()).value;

const setUsername = useLocalStorage<string>('username')[1];
useDarkTheme();

onBeforeMount(async () => {
  await store.meAction();
  Promise.resolve(setUsername(store.user?.username || ''));
});
</script>

<template>
  <template v-if="!store.isReady">
    <div class="flex flex-col items-center">
      <h1 class="py-5 text-center text-lg font-medium tracking-wider md:text-4xl">Cargando</h1>
      <Spinner style="width: 60px; height: 60px; border-width: 6px" />
    </div>
  </template>
  <template v-else>
    <slot />
  </template>
</template>
