<script setup lang="ts">
import { inject, ref } from 'vue';
import { UserResponse } from '@@/types-response-users';
import Scores from '@/components/ui/Scores.vue';

const valueRef = ref<string>();
const user = inject<UserResponse>('user');
</script>

<template>
  <div class="container grid grid-cols-1 grid-rows-2 gap-5 md:grid-cols-2">
    <section>
      <ul>
        <li class="text-4xl text-red-500">
          {{ user?.email }}
        </li>
        <li>
          {{ user?.username }}
        </li>
        <li class="font-semibold text-yellow-700">
          {{ user?.role }}
        </li>
      </ul>
      <p>{{ valueRef }}</p>
      <input
        v-model="valueRef"
        class="rounded text-sm text-secondary"
        placeholder="Ingrese la url de imagen"
        type="url"
        name="url-image"
      />
      <img v-if="!!valueRef" :src="valueRef" alt="image-user" />
    </section>
    <Scores />
  </div>
</template>
