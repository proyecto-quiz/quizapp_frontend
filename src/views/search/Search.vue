<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSearchStore } from '@/stores';
const searchStore = useSearchStore();
const getListPregunta = computed(() => {
  return searchStore.getListPregunta;
});
const text = ref('');

async function search(text: string) {
  searchStore.SearchPreguntaAction(text);
}
</script>
<template>
  <div class="container mb-4 p-4">
    <h1 class="mb-4 text-4xl font-bold text-secondary dark:text-white">Buscar Preguntas</h1>
    <div
      class="flex w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-cyan-100 dark:bg-secondary dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
    >
      <div class="mx-0 flex w-full items-center">
        <div class="p-2">
          <svg
            class="h-5 w-5 text-blue-600 dark:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          id="search"
          v-model="text"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-cyan-200 dark:bg-secondary dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search..."
        />
        <button class="button mx-2 px-2 hover:bg-blue-400" @click="search(text)">Buscar</button>
      </div>
    </div>
    <section v-if="searchStore.isError == true">
      <label>No se encontraron resultados</label>
    </section>
    <section v-else>
      <div class="m-4 p-4">
        <ul v-for="pregunta in getListPregunta" :key="pregunta.id" class="list-none">
          <li class="m-2 flex-col items-stretch rounded-lg p-2 dark:hover:bg-secondary-normal/80">
            <router-link
              class="p-2 font-semibold hover:underline"
              :to="{
                name: 'SearchResult',
                params: { pregunta: JSON.stringify(pregunta) },
              }"
            >
              {{ pregunta.texto }}
            </router-link>
            <span class="opacity-50">({{ pregunta.curso.nombre }})</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
