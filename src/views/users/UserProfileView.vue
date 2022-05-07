<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

// TODO: Complete with computed
const authStore = useAuthStore();

const router = useRouter();

async function handleSignOutClick() {
  await authStore.signOutAction(async () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('username');
    await router.push({ name: 'Home' });
  });
}
</script>

<template>
  <div class="container">
    <h1 class="text-4xl">{{ authStore.user?.username }}</h1>
    <pre>
      {{ authStore.user }}
    </pre>
    <button type="button" class="button--contrast-01" @click="router.back">Regresar</button>
    <button type="button" class="button--secondary" @click="handleSignOutClick">
      Cerrar sesión
    </button>
  </div>
</template>
