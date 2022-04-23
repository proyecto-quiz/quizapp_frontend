<script setup lang="ts">
import AppRoot from './components/AppRoot.vue';
</script>
<template>
  <AppRoot>
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </AppRoot>
</template>
