<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useSolicitudStore } from '@/stores';
import { useRouter } from 'vue-router';
const solicitudStore = useSolicitudStore();
const router = useRouter();
const solicitud = computed(() => {
  return solicitudStore.getListSolicitud;
});
onMounted(async () => {
  await solicitudStore.listSolicitudAction();
});
async function DeleteSolicitud(id: any) {
  await solicitudStore.DeleteSolicitudAction(id);
  alert(solicitudStore.message);
  await router.push({ name: 'Solicitud' });
}
</script>
<template>
  <div class="container mb-4 p-4">
    <h1 class="mb-4 text-4xl font-bold text-secondary dark:text-white">
      Lista de preguntas solicitadas para agregar
    </h1>

    <table class="mb-4 w-full table-fixed text-center text-sm text-gray-500 dark:text-gray-400">
      <thead
        class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-secondary dark:text-gray-400"
      >
        <tr>
          <th class="py-4 px-6">Pregunta</th>
          <th class="py-4 px-6">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pregunta, index) in solicitud"
          :key="index"
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-secondary-normal/25 dark:hover:bg-secondary-normal/80"
        >
          <th class="py-4 px-6 font-medium text-gray-900 dark:text-white">
            {{ pregunta.texto }}
          </th>
          <td class="py-4 px-6 text-center">
            <div>
              <button
                class="button m-2 font-semibold text-red-600 hover:underline dark:text-red-500"
                @click="DeleteSolicitud(pregunta.id)"
              >
                Eliminar
              </button>
              <router-link
                :to="{
                  name: 'EditSolicitud',
                  params: { pregunta: JSON.stringify(pregunta) },
                }"
              >
                <button class="button p-2 font-semibold text-green-400 hover:underline">
                  Revisar
                </button>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
