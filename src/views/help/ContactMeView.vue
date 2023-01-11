<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import imgYape from '@/assets/images/yape.png';
</script>

<template>
  <LayoutDefault title="Contactame">
    <div class="container flex-row md:flex">
      <section class="section-contac w-1/2 justify-center">
        <div class="h-full w-full p-3">
          <div class="h-full w-max bg-secondary-normal p-4">
            <h1 class="p-4 text-center text-2xl"><strong>Información de Contacto </strong></h1>
            <h3 class="pt-2 text-lg">Celular</h3>
            <strong>+15 986 306 800</strong>
            <h3 class="pt-4 text-lg">Whatsapp</h3>
            <strong>+15 986 306 800</strong>
            <h3 class="pt-4 text-lg">Correo</h3>
            <strong>note.blue.app@gmail.com</strong>
            <h3 class="pt-4 text-lg">Messenger</h3>
            <a href="https://m.me/106433045536731" target="_blank"> <strong> Note Blue</strong></a>
          </div>
        </div>
      </section>
      <section class="section-apoyo w-1/8 flex">
        <div class="h-full justify-center p-3">
          <div class="h-full justify-center">
            <h1 class="text-center text-2xl">Puedes apoyarnos enviando una colaboración</h1>
            <h2 class="text-sm opacity-70">
              Los ingresos obtenidos son asignados para el mantenimiento y mejoras de la aplicación.
            </h2>
            <h3 class="text-center text-2xl">Gracias por apoyarnos</h3>
            <div class="items-center justify-center">
              <img
                class="m-auto my-3 flex w-80 rounded-lg outline outline-offset-2 outline-cyan-500"
                :src="imgYape"
                alt="yape"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </LayoutDefault>
</template>
