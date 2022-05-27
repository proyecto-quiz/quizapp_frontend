<script setup lang="ts">
import AppRoot from '@/components/AppRoot.vue';
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <AppRoot>
      <component :is="Component" :key="route.path" />
    </AppRoot>
  </router-view>
</template>
