<script setup lang="ts">
let props = defineProps<{ isActive: boolean; class?: string }>();
</script>

<template>
  <div>
    <slot name="head" />
  </div>
  <div
    :class="[
      'container flex w-auto flex-col items-center border-2 px-3 py-2 shadow-sm',
      props.class,
    ]"
  >
    <slot name="child" />
  </div>
</template>
