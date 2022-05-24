<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';
import Spinner from '@/components/ui/Spinner.vue';

const authStore = useAuthStore();
const authUserComp = computed(() => authStore);
const router = useRouter();

const links = [
  {
    value: 'Mi Perfil',
    name: 'Profile',
  },
  {
    value: 'Ver los cursos',
    name: 'Cursos',
  },
  {
    value: 'Hacer el examen',
    name: 'Pregunta',
  },
];

async function handleSignOutClick() {
  await authStore.signOutAction(async () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('username');
    await router.push({ name: 'Home' });
  });
}

function handleVerifyClick() {
  alert('Por favor estamos haciendo lo posible para verificar su cuenta ☺️');
}
</script>

<template>
  <nav class="navigate">
    <aside
      class="navigate__logo inline-flex cursor-pointer items-center gap-x-2"
      @click="router.push({ name: 'Home' })"
    >
      <h1 class="self-center text-2xl font-semibold">
        <span class="text-[#09FCED]">N</span>
        <span class="text-secondary-normal">B</span>
      </h1>
      <h3 class="text-xl">NoteBlue</h3>
    </aside>
    <aside class="navigate__content">
      <img
        class="navigate__img"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
        :alt="`User - ${authUserComp.userFullName}`"
        :title="`User - ${authUserComp.userFullName}`"
      />
      <h1 class="navigate__user">{{ authUserComp.userFullName }}</h1>
      <div
        v-if="!authUserComp.user?.isVerified"
        class="rounded-md bg-rose-300/70 p-2 text-[0.85rem] font-semibold text-rose-500 dark:text-red-800"
      >
        Su cuenta aun no fue verificada
        <button class="button--danger" @click="handleVerifyClick">Verificar cuenta</button>
      </div>
      <router-link
        v-for="(link, index) of links"
        :key="'link' + link.name + (index + 1)"
        :title="link.value"
        :to="{ name: link.name }"
        class="navigate__links"
      >
        {{ link.value }}
      </router-link>
    </aside>
    <div class="flex-grow" />
    <button
      :disabled="authUserComp.isLoading"
      title="Cerrar sesión"
      type="button"
      class="button--sm button--danger--outline button__sign-out"
      @click="handleSignOutClick"
    >
      <Spinner v-if="authUserComp.isLoading" type="rose" class="mr-2 h-5 w-5" />
      <i v-else class="bx bx-log-out-circle mr-2 text-xl" />
      {{ authUserComp.isLoading ? 'Cerrando sesión' : 'Cerrar sesión' }}
    </button>
  </nav>
</template>

<style scoped>
.navigate {
  @apply container fixed flex h-full w-[25%] flex-col justify-start border-r-2 border-r-secondary-normal/20;
  @apply pb-5 pt-2;
}

.navigate__logo {
  @apply transition-colors duration-150 hover:text-secondary-normal;
}

.navigate__content {
  @apply mt-2 flex flex-col flex-nowrap items-start gap-y-2;
}

.navigate__img {
  @apply w-[10%] rounded-md opacity-90 shadow-md md:w-auto;
}

.navigate__user {
  @apply text-lg font-semibold capitalize text-cyan-600 dark:text-cyan-200;
}

.navigate__links {
  @apply text-[0.85rem] font-semibold transition-colors duration-75 hover:text-secondary dark:hover:text-secondary-light;
}

.button__sign-out {
  @apply flex items-center justify-center disabled:cursor-not-allowed disabled:border-slate-400/60 disabled:bg-slate-300/60;
}
</style>
