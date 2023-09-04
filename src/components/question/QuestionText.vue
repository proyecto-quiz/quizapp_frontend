<script setup lang="ts">
defineProps<{
  text?: string;
  image?: string;
}>();
</script>
<template>
  <div class="flex basis-1/2 items-center justify-center text-center">
    <p class="p-2 text-2xl font-light md:w-1/2 md:text-2xl">
      {{ text }}
    </p>
    <div v-if="image != null">
      <img class="imagen" :src="image" alt="imagen_pregunta" />
    </div>
  </div>
</template>
<style scoped>
.imagen {
  @apply m-5 h-auto w-52 rounded-lg outline outline-offset-2 outline-cyan-500 sm:h-auto sm:min-w-[80%];
}
</style>
