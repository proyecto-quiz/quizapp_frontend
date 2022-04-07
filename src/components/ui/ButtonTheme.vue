<script setup lang="ts">
import { useDarkTheme } from '@/composables';

const theme = useDarkTheme();

let isDark = theme.isDark;
</script>
<template>
  <button class="rounded-full p-1 shadow" @click="theme.handleThemeChange">
    {{ isDark ? '☀️' : '🌛' }}
  </button>
</template>
