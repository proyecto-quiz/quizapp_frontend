<script setup lang="ts">
interface Props {
  width?: number | string;
  height?: number | string;
}

defineProps<Props>();
</script>

<template>
  <div class="spinner" />
</template>

<style scoped>
.spinner {
  @apply border-secondary/40 dark:border-primary-light/40;
  @apply border-t-primary-dark dark:border-t-secondary-normal;
  border-width: 4px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  animation: spin ease-in 0.3s infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
