<script setup lang="ts">
interface Props {
  type: 'primary' | 'secondary' | 'light' | 'contrast' | 'green' | 'amber' | 'rose';
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="['shadow', props.type]" />
</template>

<style scoped>
.primary {
  border-width: 4px;
  border-radius: 50%;
  @apply border-slate-300/50 dark:border-primary-light/50;
  @apply border-t-primary-dark dark:border-t-primary-dark;

  animation: spin linear 0.3s infinite;
}

.secondary {
  border-width: 4px;
  border-radius: 50%;
  @apply border-slate-300/50 dark:border-primary-light/50;
  @apply border-t-secondary dark:border-t-secondary;

  animation: spin ease-in 0.3s infinite;
}

.light {
  border-width: 4px;
  border-radius: 50%;
  @apply border-slate-300/80 dark:border-primary-light/40;
  @apply border-t-primary-light dark:border-t-primary-light;

  animation: spin ease-in 0.3s infinite;
}

.contrast {
  border-width: 4px;
  border-radius: 50%;
  @apply border-slate-300/50 dark:border-primary-light/50;
  @apply border-t-contrast-01 dark:border-t-contrast-01;

  animation: spin ease-in 0.3s infinite;
}

.green {
  border-width: 4px;
  border-radius: 50%;
  @apply border-slate-300/50 dark:border-primary-light/50;
  @apply border-t-emerald-600 dark:border-t-emerald-300;

  animation: spin ease-in 0.3s infinite;
}

.amber {
  border-width: 4px;
  border-radius: 50%;
  @apply border-slate-300/50 dark:border-primary-light/50;
  @apply border-t-amber-600 dark:border-t-amber-300;

  animation: spin ease-in 0.3s infinite;
}

.rose {
  border-width: 4px;
  border-radius: 50%;
  @apply border-slate-300/50 dark:border-primary-light/50;
  @apply border-t-rose-600 dark:border-t-rose-300;

  animation: spin ease-in 0.3s infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
