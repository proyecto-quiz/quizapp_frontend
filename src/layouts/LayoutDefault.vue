<script setup lang="ts">
import { onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Inicio',
  },
  class: {
    type: String,
    default: '',
  },
});

onMounted(() => {
  window.document.title = `Quiz - ${props.title}`;
});
</script>

<template>
  <NavBar />
  <main :class="['container', props.class]">
    <slot />
  </main>
</template>
