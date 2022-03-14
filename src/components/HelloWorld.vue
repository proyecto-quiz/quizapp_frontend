<script setup>
import { ref } from 'vue';

const props = defineProps({
  msg: {
    type: String,
    default: '',
  },
});

const count = ref(0);
</script>

<template>
  <h1>{{ props.msg }}</h1>
  <button
    class="rounded bg-slate-600 px-3 py-1 text-white shadow-md"
    type="button"
    @click="count++"
  >
    count is: {{ count }}
  </button>
</template>
