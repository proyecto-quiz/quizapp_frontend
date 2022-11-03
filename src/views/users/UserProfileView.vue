<script setup lang="ts">
import { inject, ref } from 'vue';
import { UserResponse } from '@@/types-response-users';
//import Scores from '@/components/ui/Scores.vue';

//const valueRef = ref<string>();
const user = inject<UserResponse>('user');
</script>

<template>
  <div class="container grid grid-cols-1 grid-rows-2 gap-5 md:grid-cols-2">
    <section>
      <h1 class="text-4xl text-red-500">Bienvenido a Note Blue</h1>
      <h1 class="text-3xl text-violet-800">Modo Prueba v.1</h1>
      <h1 class="text-2xl text-violet-400">Gracias por su apoyo</h1>
    </section>
    <section>
      <ul>
        <li class="text-1xl text-2xl text-red-500">
          <label class="text-blue-600"> Correo: </label>
          {{ user?.email }}
        </li>
        <li>
          <label class="text-blue-500"> Username: </label>
          {{ user?.username }}
        </li>
        <li class="font-semibold text-yellow-700">
          <label class="text-blue-400"> Tipo de Usuario: </label>
          {{ user?.role }}
        </li>
      </ul>
      <!--
      <p>{{ valueRef }}</p>
      <input
        v-model="valueRef"
        class="rounded text-sm text-secondary"
        placeholder="Ingrese la url de imagen"
        type="url"
        name="url-image"
      />
      <img v-if="!!valueRef" :src="valueRef" alt="image-user" />
      <Scores />
      -->
    </section>
  </div>
</template>
