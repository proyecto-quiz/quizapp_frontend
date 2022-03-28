<script setup lang="ts">
import { useAppStore } from '@/stores';
import LayoutDefault from '@/layouts/LayoutDefault.vue';

const store = useAppStore();

let preguntas = [
  {
    id: 1,
    content: 'Preguntas 1',
  },
  {
    id: 2,
    content: 'Preguntas 2',
  },
  {
    id: 3,
    content: 'Preguntas 3',
  },
  {
    id: 4,
    content: 'Preguntas 4',
  },
  {
    id: 5,
    content: 'Preguntas 5',
  },
  {
    id: 6,
    content: 'Preguntas 6',
  },
  {
    id: 7,
    content: 'Preguntas 7',
  },
  {
    id: 8,
    content: 'Preguntas 8',
  },
];
</script>

<template>
  <LayoutDefault title="Inicio">
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

    <section class="grid grid-flow-col grid-rows-6 gap-4 md:grid-rows-4">
      <aside
        v-for="(pregunta, index) of preguntas"
        :key="pregunta.id + index"
        class="rounded border border-zinc-600 p-4 shadow dark:text-zinc-300"
      >
        {{ pregunta.content }}
      </aside>
    </section>
  </LayoutDefault>
</template>
