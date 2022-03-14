<script setup>
import { useAppStore } from '@/stores';
import LayoutDefault from '@/layouts/LayoutDefault.vue';

const store = useAppStore();
</script>

<template>
  <LayoutDefault>
    <h1 class="text-5xl">Home View</h1>
    <router-link
      :to="{ name: 'Temas' }"
      class="m-3 rounded bg-amber-400 px-3 py-2 text-center shadow outline-none"
      type="button"
    >
      Temas
    </router-link>

    <h1 v-if="store.isLoggedIn">
      <pre>
        {{ store.user }}
      </pre>
    </h1>

    <button
      v-if="store.isLoggedIn"
      class="inline-block rounded-sm bg-rose-600/80 px-3 py-2"
      @click="store.$reset"
    >
      Sign Out
    </button>
    <button
      v-else
      class="inline-block rounded-sm bg-green-600/80 px-3 py-2"
      @click="store.setUserAction"
    >
      Sign In
    </button>
  </LayoutDefault>
</template>
