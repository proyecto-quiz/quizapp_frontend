<script setup>
import { useAppStore } from '@/stores';

const store = useAppStore();
</script>
<template>
  <div>
    <h1 class="text-4xl">Other User</h1>
    <pre>
      {{ store.user }}
    </pre>
  </div>
</template>
