<script setup lang="ts">
import { useDarkTheme } from '@/composables';
import { useAppStore } from '@/stores';

const theme = useDarkTheme();
const store = useAppStore();

let isDark = theme.isDark;
</script>

<template>
  <header class="sticky mb-5 min-h-full p-4">
    <nav class="flex">
      <h1 class="text-4xl">
        <router-link active-class="text-amber-500" :to="{ name: 'Home' }">Logo</router-link>
      </h1>
      <span class="flex-grow" />
      <router-link v-if="store.isLoggedIn" :to="{ name: 'Profile' }" active-class="text-amber-500">
        My profile
      </router-link>
      <button
        class="rounded bg-slate-600 px-4 py-2 text-sm font-medium tracking-wide text-white shadow"
        @click="theme.handleThemeChange"
      >
        Change Theme {{ isDark ? 'Light' : 'Dark' }}
      </button>
    </nav>
  </header>
</template>
