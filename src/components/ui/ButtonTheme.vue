<script setup lang="ts">
import { useDarkTheme } from '@/composables';

type Props = {
  classIcon?: string;
};

defineProps<Props>();

const theme = useDarkTheme();
</script>
<template>
  <button
    type="button"
    class="flex items-center"
    :title="`Cambiar tema ${theme.isDark ? 'claro' : 'oscuro'}`"
    @click="theme.handleThemeChange"
  >
    <i
      :class="[
        'text-lg',
        `bx bxs-${theme.isDark ? 'sun bx-burst-hover' : 'moon bx-tada-hover'}`,
        classIcon,
      ]"
    />
    <slot />
  </button>
</template>
