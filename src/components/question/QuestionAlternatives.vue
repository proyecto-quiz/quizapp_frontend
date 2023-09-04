<script setup lang="ts">
defineProps<{
  alternativas: [
    {
      id: string;
      text: string;
    }
  ];
  selectDisabled?: boolean;
}>();
defineEmits(['select-item', 'click-label']);
</script>
<template>
  <div class="container mx-auto">
    <div
      v-for="alternativa in alternativas"
      :key="alternativa.id"
      class="flex items-center justify-center"
    >
      <div class="w-full items-center px-2 py-1 md:w-1/2">
        <input
          :id="alternativa?.id"
          class="btn-select peer hidden"
          type="radio"
          name="alternativaId"
          :value="alternativa?.id"
          :disabled="selectDisabled"
          @click="$emit('click-label')"
          @click.once="$emit('select-item', alternativa.id)"
        />
        <label
          class="label show flex justify-center gap-1 rounded-xl bg-secondary bg-opacity-90 p-2 text-sky-300 shadow-xl hover:bg-opacity-75 peer-checked:bg-secondary peer-checked:text-white"
          :for="alternativa?.id"
        >
          <strong>
            {{ alternativa?.text }}
          </strong>
        </label>
      </div>
    </div>
  </div>
</template>
<style scoped>
.label {
  @apply m-1 rounded-md px-3 outline outline-1 outline-offset-2;
}
.btn-select {
  filter: drop-shadow(0 0 1em #646cffaa);
}
</style>
