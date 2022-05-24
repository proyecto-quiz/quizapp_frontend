<script setup lang="ts">
import { ErrorResponse } from '@@/type-config-api';
import { onUnmounted, ref } from 'vue';

interface Props {
  type: 'warning' | 'success' | 'danger' | 'info';
  headTitle?: string;
  content?: ErrorResponse['detail'];
  outline?: boolean;
  showAlert?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(['on-close']);

const alertRef = ref<HTMLDivElement>();
const showRef = ref(true);

defineExpose({
  show: showRef,
});

function handleCloseClick() {
  let element = alertRef.value;

  element?.classList.add('hidden__alert');
  let time = setTimeout(() => {
    showRef.value = false;
    alertRef.value = undefined;
    emits('on-close');
    clearTimeout(time);
  }, 500);
}

onUnmounted(() => {
  alertRef.value = undefined;
});
</script>

<template>
  <div
    v-if="showRef"
    ref="alertRef"
    :class="['alert', props.type, props.outline && 'alert__outline']"
  >
    <h3 v-if="props.headTitle" class="text-base font-semibold md:text-lg">
      {{ props.headTitle }}
    </h3>
    <template v-if="props.content">
      <div class="alert--content font-medium">
        {{ props.content }}
      </div>
    </template>
    <div v-else class="alert--content">
      <slot />
    </div>
    <button
      :class="`button-close--${props.type}`"
      type="button"
      class="button button-close"
      title="Cerrar alerta"
      @click="handleCloseClick"
    >
      &#10006;
    </button>
  </div>
</template>

<style lang="css" scoped>
.alert {
  opacity: 1;
  @apply border shadow-md;
  @apply relative my-1 flex flex-col flex-nowrap justify-around rounded-md px-4 py-3;
  @apply leading-5 tracking-normal;
}

.alert--content {
  @apply whitespace-pre-line text-xs before:bg-slate-50 md:whitespace-normal md:text-sm;
}

/* Themes */
.warning {
  @apply border-amber-500/80 bg-amber-300/80 shadow-amber-300/50;
  @apply text-amber-900;
}

.info {
  @apply border-sky-500/80 bg-sky-300/80 shadow-sky-300/50;
  @apply text-sky-900;
}

.success {
  @apply border-emerald-500/80 bg-emerald-300/80 shadow-emerald-300/50;
  @apply text-emerald-900;
}

.danger {
  @apply border-rose-500/80 bg-rose-300 shadow-rose-300/50;
  @apply text-rose-700;
}

.alert__outline {
  @apply border-2 bg-transparent shadow-inherit;
  @apply dark:text-primary-light/80;
}

/* Buttons */
.button-close {
  right: 5px;
  top: 8px;
  @apply text-xs shadow-md transition-colors duration-100 md:text-sm;
  @apply absolute py-1 px-2;
}

.button-close--warning {
  @apply hover:bg-amber-200/70;
  @apply bg-amber-400/70;
}

.button-close--info {
  @apply hover:bg-sky-200/70;
  @apply bg-sky-400/70;
}

.button-close--success {
  @apply hover:bg-emerald-200/70;
  @apply bg-emerald-400/70;
}

.button-close--danger {
  @apply hover:bg-rose-200/70;
  @apply bg-rose-400/70;
}

@keyframes hidden-alert {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateX(20px);
  }
}

.hidden__alert {
  animation-name: hidden-alert;
  animation-direction: normal;
  animation-duration: 480ms;
  animation-delay: 50ms;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
