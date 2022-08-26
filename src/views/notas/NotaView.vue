<script setup lang="ts">
import { computed } from 'vue';
import { useNotaStore } from '@/stores';
const notaStore = useNotaStore();
const tipos = [
  { value: 'general', name: 'General' },
  { value: 'curso', name: 'Curso' },
  { value: 'tema', name: 'Tema' },
];

const notas = computed(() => {
  return notaStore.getNotas;
});
async function handleNotaClick(tipo: string) {
  await notaStore.notaMeAction(tipo);
}
</script>
<template>
  <div class="container">
    <h1 class="mb-2 text-lg font-medium dark:text-contrast-01 md:text-3xl">MIS NOTAS</h1>
    <ul class="flex place-items-center border-b border-secondary dark:border-secondary-light">
      <li v-for="item in tipos" :key="item.id" class="hover:-mb-px">
        <a
          class="inline-block cursor-pointer rounded-t border-l border-t border-r bg-white py-2 px-4 font-semibold text-blue-700 hover:border-blue-500 hover:bg-secondary-light focus:ring-2 focus:ring-blue-500"
          @click="handleNotaClick(item.value)"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
    <table class="m-2 mt-4 w-full table-fixed border-separate p-4 text-center">
      <thead class="rounded-full bg-indigo-700 dark:text-contrast-01">
        <tr>
          <th class="w-1/2 rounded-l-lg border-slate-300 bg-indigo-700 p-2">Especificación</th>
          <th class="w-1/4 rounded-r-lg border-slate-300 bg-indigo-700 p-2">Puntaje</th>
        </tr>
      </thead>
      <tbody class="bg-indigo-400">
        <tr v-for="nota in notas" :key="nota.tipo">
          <td class="rounded-l-lg p-2">
            {{ nota.especificacion }}
          </td>
          <td class="rounded-r-lg p-2">
            {{ nota.puntaje }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
