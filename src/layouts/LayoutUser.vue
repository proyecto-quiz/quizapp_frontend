<script setup lang="ts">
import { onMounted, provide } from 'vue';
import { useAuthStore } from '@/stores';
import { useLocalStorage } from '@/composables';
import VerticalNavigation from '@/components/ui/VerticalNavigation.vue';
import ButtonTheme from '@/components/ui/ButtonTheme.vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const [minimizeNav, setMinimizeNav, minimizeNavComp] = useLocalStorage('nav-active', true);
const router = useRouter();

provide('minimizeNav', minimizeNav);
provide('user', authStore.user);

onMounted(() => {
  window.document.title = `Perfil - ${authStore.user?.username}`;
});
</script>

<template>
  <section>
    <button
      :class="[
        'btn--change button--light',
        { 'left-[22%] md:left-[24%]': minimizeNavComp, 'left-[1%]': !minimizeNavComp },
      ]"
      title="Navigation"
      aria-label="button-navigation"
      @click="setMinimizeNav(!minimizeNavComp)"
    >
      {{ minimizeNavComp ? '&#9776;' : '&#10140;' }}
    </button>

    <ButtonTheme
      class="button btn--theme"
      class-icon="text-primary-dark dark:text-secondary-light"
    />
  </section>

  <Transition name="nav_fade">
    <VerticalNavigation v-if="minimizeNavComp" />
    <aside
      v-else
      class="navigate__logo group fixed top-5 left-3 inline-flex cursor-pointer items-center gap-x-2"
      @click="router.push({ name: 'Home' })"
    >
      <h1 class="self-center text-2xl font-semibold group-hover:animate-bounce">
        <span class="text-[#09FCED]">N</span>
        <span class="text-secondary-normal">B</span>
      </h1>
      <h3 class="text-xl">NoteBlue</h3>
    </aside>
  </Transition>
  <main
    :class="['main-content', { 'main-w-full': minimizeNavComp, 'w-full pl-6': !minimizeNavComp }]"
  >
    <!-- Router Children -->
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" v-bind="$attrs" />
    </router-view>
  </main>
</template>

<style scoped>
main {
  @apply pt-5;
}

.btn--change {
  transition: left 230ms ease-out;
  @apply fixed top-[20%] z-10;
  @apply bg-secondary-light font-semibold hover:bg-secondary-light dark:bg-primary-dark;
}

.btn--theme {
  @apply fixed top-2 right-2 z-10;
  @apply bg-secondary-light font-semibold hover:bg-secondary-light dark:bg-primary-dark;
}

/*
  Transition aside (el)
*/
.nav_fade-enter-active {
  transition-property: transform opacity padding-left;
  transition-duration: 230ms;
  transition-timing-function: ease-in;
}

.nav_fade-leave-active {
  transition-property: transform opacity padding-left;
  transition-duration: 230ms;
  transition-timing-function: ease-out;
}

.nav_fade-enter-from,
.nav_fade-leave-to {
  opacity: 0;
  transform: translateX(-25%);
}

.nav_fade-enter-to,
.nav_fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* END */

/* Main transition */
.main-content {
  transition-duration: 230ms;
  transition-timing-function: ease-out;
  transition-property: padding-left width transform;
}

.main-w-full {
  @apply ml-[25%] w-[75%];
}

/* Hover */
</style>
