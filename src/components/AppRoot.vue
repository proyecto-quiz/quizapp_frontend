<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
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

const divRef = ref<HTMLDivElement>();
onMounted(() => {
  divRef.value?.classList.add('show');
});
</script>

<template>
  <template v-if="!store.isReady">
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
