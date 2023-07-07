<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useNotaStore } from '@/stores';
const notaStore = useNotaStore();

const notas = computed(() => {
  return notaStore.getNotas;
});
onMounted(() => {
  notaStore.notaMeAction();
});
</script>
<template>
  <div class="container">
    <h1 class="mb-2 text-lg font-medium dark:text-contrast-01 md:text-3xl">MIS NOTAS</h1>

    <table class="m-2 mt-4 w-full table-fixed border-separate p-4 text-center">
      <thead class="rounded-full bg-indigo-700 dark:text-contrast-01">
        <tr>
          <th class="w-1/2 rounded-l-lg border-slate-300 bg-indigo-700 p-2">Nivel</th>
          <th class="w-1/2 rounded-l-lg border-slate-300 bg-indigo-700 p-2">Especificación</th>
          <th class="w-1/4 rounded-r-lg border-slate-300 bg-indigo-700 p-2">Puntaje</th>
        </tr>
      </thead>
      <tbody class="bg-indigo-400">
        <tr v-for="nota in notas" :key="nota.id">
          <td class="rounded-l-lg p-2">
            {{ nota.level }}
          </td>
          <td class="rounded-l-lg p-2">
            {{ nota.detail }}
          </td>
          <td class="rounded-r-lg p-2">
            {{ nota.score }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
