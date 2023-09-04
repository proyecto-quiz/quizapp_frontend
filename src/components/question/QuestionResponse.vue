<script setup lang="ts">
defineProps<{
  color: string;
  message: string;
  status: string;
}>();
</script>
<template>
  <div>
    <div
      class="container mx-auto flex-row items-center justify-between rounded-lg py-4 text-center md:flex md:w-2/3 lg:px-4"
      :class="color + '-response-content-1'"
    >
      <div
        class="m-2 flex items-center p-2 leading-none text-indigo-100 lg:inline-flex lg:rounded-full"
        :class="color + '-response-content-2'"
        role="alert"
      >
        <span
          class="mr-3 flex rounded-full px-2 py-1 text-xs font-bold uppercase"
          :style="{ background: color }"
        >
          {{ status }}
        </span>
        <span class="mr-2 flex-auto text-left font-semibold">
          {{ message }}
        </span>
        <svg
          class="h-4 w-4 fill-current opacity-75"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<style>
.red-response-content-1 {
  @apply bg-red-400;
}
.red-response-content-1:hover {
  filter: drop-shadow(0 0 1em #f38e8eaa);
}
.red-response-content-2 {
  @apply bg-red-500;
}
.green-response-content-1 {
  @apply bg-green-400;
}
.green-response-content-1:hover {
  filter: drop-shadow(0 0 1em #62fa6faa);
}
.green-response-content-2 {
  @apply bg-green-600;
}
</style>
