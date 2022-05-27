<script setup lang="ts">
import { inject, ref } from 'vue';
import { UserResponse } from '@@/types-response-users';

const valueRef = ref<string>();
const user = inject<UserResponse>('user');
</script>

<template>
  <div class="container">
    <ul>
      <li class="text-4xl text-red-500">
        {{ user.email }}
      </li>
      <li>
        {{ user.username }}
      </li>
      <li class="font-semibold text-yellow-700">
        {{ user.role }}
      </li>
    </ul>
    <p>{{ valueRef }}</p>
    <input v-model="valueRef" type="url" name="url-image" class="rounded" />
    <img v-if="!!valueRef" :src="valueRef" alt="image-user" />
  </div>
</template>
