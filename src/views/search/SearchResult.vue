<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const paramPregunta = route.params.pregunta;
const pregunta = JSON.parse(paramPregunta);
</script>
<template>
  <div class="container">
    <button class="button button--contrast-01" onclick="history.back()">Atras</button>
    <br />
    <label class="text-lg opacity-50">
      {{ pregunta.curso.nombre }} >
      <span class> {{ pregunta.tema.nombre }}</span>
    </label>
    <br />
    <label class="text-2xl">{{ pregunta.texto }}</label>
    <br />
    <div v-for="alternativa in pregunta.alternativas" :key="alternativa.altId">
      <label>{{ alternativa.contenido }}</label>
      <label v-if="alternativa.isAnswer == true" class="text-green-500">
        <strong class="px-2">(respuesta)</strong>
      </label>
    </div>
  </div>
</template>
