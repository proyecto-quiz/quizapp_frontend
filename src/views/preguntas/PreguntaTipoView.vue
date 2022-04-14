<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import CursoImage from '@/assets/images/Geometria.jpg';
</script>

<template>
  <LayoutDefault title="Pregunta Tipo">
    <div class="container">
      <h1 class="py-5 text-lg font-medium uppercase md:text-3xl">Selecciona un tipo de pregunta</h1>
      <div class="listCard">
        <div class="card">
          <router-link :to="{ name: 'Pregunta', params: { tipo: 'general' } }">
            <img class="image" :src="CursoImage" alt="imagen pregunta general" />
            <strong class="text-lg font-bold text-contrast-01">Pregunta de manera General</strong>
            <section class="m-2 px-2 py-2">
              <strong>Descripción</strong>
              <p class="text-base">
                Genera una pregunta de manera general de los cursos y temas existentes en la base de
                datos.
              </p>
            </section>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="{ name: 'Cursos', params: { tipo: 'curso' } }">
            <img class="image" :src="CursoImage" alt="imagen pregunta por curso" />
            <strong class="text-lg font-bold text-contrast-01">Pregunta por curso</strong>
            <section class="m-2 px-2 py-2">
              <strong>Descripción</strong>
              <p class="text-base">
                Genera una pregunta de un curso de su elección exitentes en la base de datos.
              </p>
            </section>
          </router-link>
        </div>
        <div class="card">
          <router-link :to="{ name: 'Cursos', params: { tipo: 'tema' } }">
            <img class="image" :src="CursoImage" alt="imagen pregunta por tema" />
            <strong class="text-lg font-bold text-contrast-01">Pregunta por tema</strong>
            <section class="m-2 px-2 py-2">
              <strong>Descripción</strong>
              <p class="text-base">
                Genera una pregunta de un tema de los cursos existentes en la base de datos.
              </p>
            </section>
          </router-link>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>
<style>
.image {
  @apply w-full;
}
.card {
  @apply w-full transform overflow-hidden
  rounded bg-blue-400 text-center shadow-lg shadow-blue-500/50 transition duration-500 ease-in-out hover:-translate-y-1
  hover:bg-blue-500;
}

.listCard {
  @apply grid grid-cols-1 gap-8 overflow-auto py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  xl:grid-cols-5;
}
</style>
