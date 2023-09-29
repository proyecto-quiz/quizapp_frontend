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
          class="peer hidden"
          type="radio"
          name="alternativaId"
          :value="alternativa?.id"
          :disabled="selectDisabled"
          @click="$emit('click-label')"
          @click.once="$emit('select-item', alternativa.id)"
        />
        <label
          id="btn"
          name="alternativaId"
          class="label peer-checked flex justify-center rounded-xl bg-secondary bg-opacity-90 p-2 text-sky-500 shadow-xl hover:bg-opacity-75"
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
  @apply m-1 rounded-md border-cyan-500 px-3 outline outline-1 outline-offset-2;
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 500;
  text-shadow: none;
  background: transparent;
  box-shadow: transparent;
  border: 1px solid #0abcf880;
  transition: 0.5s ease;
  user-select: none;
}

.peer:checked ~ .peer-checked {
  color: #ffffff;
  background: #008cff;
  border: 1px solid #008cff;
  text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
  box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff, 0 0 100px #008cff;
}

#btn:hover,
:focus {
  color: #ffffff;
  background: #008cff;
  border: 1px solid #008cff;
  text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
  box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff, 0 0 100px #008cff;
}
</style>
