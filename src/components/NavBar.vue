<script setup>
import { useDarkTheme } from '@/composables';

const theme = useDarkTheme();
</script>

<template>
  <header class="sticky mb-5 min-h-full border p-4">
    <nav class="flex">
      <h1 class="text-4xl">
        <router-link active-class="text-amber-500" :to="{ name: 'Home' }">Logo</router-link>
      </h1>
      <span class="flex-grow" />
      <button @click="theme.handleThemeChange()">Change Theme</button>
    </nav>
  </header>
</template>
