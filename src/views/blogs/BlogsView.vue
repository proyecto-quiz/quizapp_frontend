<script setup lang="ts">
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import Facebook from '@/components/draws/icons/Facebook.vue';
</script>

<template>
  <LayoutDefault title="Blogs">
    <h1 class="text-4xl">Encuentranos en nuestras redes sociales</h1>
    <div>
      <!-- Socials -->
      <ul class="flex list-none">
        <li>
          <a href="https://www.facebook.com/Note-Blue-106433045536731" target="_blank">
            <Facebook class="h-14 w-14" />
          </a>
        </li>
      </ul>
    </div>
  </LayoutDefault>
</template>

<style scoped></style>
