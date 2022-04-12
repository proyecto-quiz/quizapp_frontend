<script setup lang="ts">
import { onMounted } from 'vue';
import Navigation from '@/components/Navigation.vue';

type Props = {
  title?: string;
  class?: string;
};

const props = defineProps<Props>();

onMounted(() => {
  window.document.title = `NoteBlue - ${props.title}`;
});
</script>

<template>
  <Navigation />
  <main :class="['container', props.class]">
    <slot />
  </main>
</template>
