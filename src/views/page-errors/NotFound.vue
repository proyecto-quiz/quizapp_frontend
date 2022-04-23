<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(() => {
  document.title = 'BlueNote - No se encontro la página';
});
</script>

<template>
  <main class="container py-10">
    <h2 class="text-2xl">La página no fue encontrada</h2>
    <button class="button--contrast-01 block" @click="router.back()">Regresar</button>
  </main>
</template>
