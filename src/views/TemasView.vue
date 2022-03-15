<script setup>
import LayoutDefault from '@/layouts/LayoutDefault.vue';
</script>

<template>
  <LayoutDefault title="Temas">
    <h1>Temas View</h1>
    <router-link
      :to="{ name: 'Home' }"
      class="m-3 rounded bg-amber-400 px-3 py-2 text-center shadow outline-none"
    >
      Inicio
    </router-link>
  </LayoutDefault>
</template>
