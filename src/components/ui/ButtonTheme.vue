<script setup lang="ts">
import { useDarkTheme } from '@/composables';

const theme = useDarkTheme();
</script>
<template>
  <button
    type="button"
    title="Cambiar tema"
    class="flex items-center"
    @click="theme.handleThemeChange"
  >
    <i
      :class="['text-lg', `bx bxs-${theme.isDark ? 'sun bx-burst-hover' : 'moon bx-tada-hover'}`]"
    />
  </button>
</template>
