<script setup>
import { useAppStore } from '@/stores';
import { useRouter } from 'vue-router';

const store = useAppStore();
const router = useRouter();
</script>
<template>
  <div class="container">
    <h1 class="text-4xl">Other User</h1>
    <pre>
      {{ store.user }}
    </pre>
    <button
      class="rounded-sm bg-amber-300/50 px-3 py-2 font-semibold tracking-wide shadow shadow-blue-800 ring-1 ring-amber-400 transition-colors duration-100 hover:bg-amber-400"
      @click="router.back"
    >
      Regresar
    </button>
  </div>
</template>
