<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores';
import ButtonTheme from '@/components/ui/ButtonTheme.vue';

const authUser = useAuthStore();
const authUserComputed = computed(() => authUser);

const links = [
  {
    value: 'Mi Perfil',
    name: 'Profile',
    path: '#/profile',
  },
  {
    value: 'Hacer el examen',
    name: 'Preguntas',
    path: '#/exam',
  },
];
</script>

<template>
  <nav class="navigate">
    <aside class="navigate__vert">
      <img
        class="navigate__img"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
        :alt="`User - ${authUserComputed.userFullName}`"
        :title="`User - ${authUserComputed.userFullName}`"
      />
      <h1 class="navigate__user">{{ authUserComputed.userFullName }}</h1>

      <div
        v-if="!authUserComputed.user?.isVerified"
        class="rounded-md bg-rose-300/70 p-2 text-[0.85rem] font-semibold text-rose-500 dark:text-red-800"
      >
        Su cuenta aun no fue verificada
        <button class="button--danger">Verificar cuenta</button>
      </div>
      <a
        v-for="(link, index) of links"
        :key="'link' + link.name + (index + 1)"
        :title="link.value"
        :href="link.path"
        class="navigate__links"
      >
        {{ link.value }}
      </a>
      <ButtonTheme class="button" class-icon="text-primary-dark dark:text-secondary-light" />
    </aside>
  </nav>
</template>

<style scoped>
.navigate {
  @apply container fixed flex h-screen w-[25%] flex-col border-r border-r-secondary-normal;
}

.navigate__vert {
  @apply mt-5 flex flex-col flex-nowrap items-start gap-y-2;
}

.navigate__img {
  @apply w-auto rounded-md opacity-90 shadow-md;
}

.navigate__user {
  @apply text-lg font-semibold capitalize text-cyan-600 dark:text-cyan-200;
}

.navigate__links {
  @apply text-[0.85rem] font-semibold transition-colors duration-75 hover:text-secondary;
}
</style>
