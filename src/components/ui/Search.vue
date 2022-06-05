<script setup lang="ts">
import { ref } from 'vue';

const searchTextRef = ref<string>();
</script>

<template>
  <div class="search group">
    <i class="search__icon bx bx-search text-lg" />
    <input
      v-model="searchTextRef"
      placeholder="buscar..."
      class="search__input"
      type="text"
      role="searchbox"
    />
  </div>
</template>

<style scoped>
.search {
  @apply container relative;
  display: flex;
  align-items: center;
  width: auto;
}

.search__icon {
  @apply absolute left-[2.30rem] text-transparent group-focus-within:text-primary-dark;
  @apply dark:group-focus-within:text-secondary-light;
}

.search__input {
  @apply rounded border border-secondary-normal/70 bg-transparent py-1 pl-6 font-medium tracking-wide shadow;
}

.search__input::placeholder {
  @apply drop-shadow;
}
</style>
