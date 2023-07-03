<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useNotaStore } from '@/stores';
const notaStore = useNotaStore();
const notaRanking = computed(() => {
  return notaStore.getNotasRanking;
});
onMounted(() => {
  notaStore.notaRankingAction();
});
</script>
<template>
  <div class="flex-col gap-4">
    <h1 class="text-center text-lg font-medium uppercase text-contrast-01 md:text-3xl">
      RANKING DE NOTAS
    </h1>
    <span class="m-4 py-4 text-sm">
      Para este ranking solo se consideran los puntos obtenidos en el modo de examen general
    </span>
    <table class="m-2 mt-4 w-full table-fixed border-separate p-4 text-center">
      <thead class="rounded-full bg-indigo-700">
        <tr>
          <th class="w-1/4 rounded-l-lg bg-indigo-700 p-2">Puesto</th>
          <th class="w-1/2">Nombre</th>
          <th class="w-1/4 rounded-r-lg">Puntaje</th>
        </tr>
      </thead>
      <tbody class="border-separate bg-indigo-400">
        <tr v-for="(rankingList, index) in notaRanking" :key="index">
          <td class="rounded-l-lg p-2">
            <div v-if="index === 0" class="flex justify-center">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAB8UlEQVRoge2YMW/TQBiGnzMlvqp/oUKMWfobundhZILRYmAvWzuyInVoGKjgTxQmdBlAlfojkPgDtMoQCZqXxQlJY75znDou4h7JUmTf+d4n3+dLZEgkEolEItEdrq0b65QDYABARuEKzttYJ2vjpiUDYBfYZVKKtECbAhth6/aJOyt9RjH3zRdNA8byLAnwp/SUAR41WdgVnCv4d4B3++OPTe5RJ0+VwJ2g4I9BR+Vn3P74VRvrLD8DGQXwvTwalX4+fHnmUMG/bpiweR4N87f6xM5Kc4I/VshVfawmoS9sK+RvrDH2LiSe4PNLhd5erQWXvvmlEbUroc+9Pj/zC+CpNS62jV4BfXAXCt4sXzz8bGRUQsE/J3OXwF6Z4a9EBNx08jZooGHvQ1VL1Q8/m1EpUbbMAPQepuu4dQS0OFnu2e2WWj38bOaCxFzLLFbayRSIbaM/Ks71wX3V0L9EPG4WfooOFfwYxzekE6jYMGS3kC3gdI0q/+/tIJ2tkNRAR8i8vkYLye6/jRDJUPch7o7IM2ALOFU9AxvGmRlsgcl9qMA6LeQm3QtM7AwRgax7gUgGW+DmpnuBzM5gC2T3oAK/1qnA1sPuBR7YGWyBq1H3AqPRtXU5+l5Ip/YPfdu4F3bGf/61ShJIJBKJRCLxP/MbKMPVE5P9hlMAAAAASUVORK5CYII="
                class="max-h-48 w-5 justify-center"
              />
            </div>
            <div v-else>
              {{ index + 1 }}
            </div>
          </td>
          <td>{{ rankingList.user }}</td>
          <td class="rounded-r-lg">{{ rankingList.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
