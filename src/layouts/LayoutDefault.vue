<script setup lang="ts">
import { onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';

type Props = {
  title?: string;
  class?: string;
};

const props = defineProps<Props>();

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
