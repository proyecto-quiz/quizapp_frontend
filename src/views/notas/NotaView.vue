<script setup lang="ts">
import { computed } from 'vue';
import { useNotaStore } from '@/stores';
const notaStore = useNotaStore();

const notas = computed(() => {
  return notaStore.getNotas;
});
const stateForm = {
  tipo: '',
};
async function handleNotaClick() {
  const tipo = stateForm.tipo;
  await notaStore.notaMeAction(tipo);
}
</script>
<template>
  <div class="container">
    <h1 class="mb-2 text-lg font-medium uppercase dark:text-contrast-01 md:text-3xl">MIS NOTAS</h1>
    <form class="mb-2 flex" @submit.prevent="handleNotaClick">
      <label class="mr-4">Filtrar por: </label>
      <select v-model="stateForm.tipo" class="mr-4 text-secondary" required>
        <option value="general">General</option>
        <option value="curso">Curso</option>
        <option value="tema">Tema</option>
      </select>
      <button type="submit" class="button--secondary">Seleccionar</button>
    </form>
    <div>
      <table class="table table-auto border-collapse border">
        <thead>
          <tr>
            <th class="border border-slate-300 p-2 dark:text-contrast-01">ESPECIFICACIÓN</th>
            <th class="border border-slate-300 p-2 dark:text-contrast-01">PUNTAJE</th>
          </tr>
        </thead>
        <tbody v-for="nota in notas" :key="nota.tipo">
          <tr>
            <td class="border border-slate-300 p-2">
              {{ nota.especificacion }}
            </td>
            <td class="border border-slate-300 p-2">
              {{ nota.puntaje }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.table {
  @apply w-full text-center text-sm shadow-2xl;
}
</style>
