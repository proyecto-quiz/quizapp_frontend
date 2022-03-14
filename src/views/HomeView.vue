<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
</script>

<template>
  <LayoutDefault>
    <template #layout-default>
      <h1 class="text-5xl">Home View</h1>
      <img alt="Vue logo" src="@/assets/logo.png" />
      <HelloWorld msg="Quiz App" />
    </template>
  </LayoutDefault>
</template>
