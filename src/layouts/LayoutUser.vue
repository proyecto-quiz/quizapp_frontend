<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores';
import { useLocalStorage } from '@/composables';
import VerticalNavigation from '@/components/ui/VerticalNavigation.vue';
import ButtonTheme from '@/components/ui/ButtonTheme.vue';

const authStore = useAuthStore();
const authStoreCom = computed(() => authStore);
const [_, setMinimizeNav, minimizeNavComp] = useLocalStorage('nav-active', true);

onMounted(() => {
  window.document.title = `Perfil - ${authStore.user?.username}`;
});
</script>

<template>
  <div :class="[minimizeNavComp ? 'content__grid' : 'content__grid--fade']">
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
    <Transition name="nav_fade">
      <VerticalNavigation v-if="minimizeNavComp" />
    </Transition>
    <main :class="['main-content', minimizeNavComp ? 'main-w-full' : 'w-full']">
      <!-- Router Children -->
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" :user="authStoreCom.user" v-bind="$attrs" />
      </router-view>
    </main>
  </div>
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
  transition-property: all;
  transition-duration: 230ms;
  transition-timing-function: ease-in;
}

.nav_fade-leave-active {
  transition-property: all;
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
  transition: all 230ms ease-out;
}

.main-w-full {
  @apply ml-[25%] w-[75%];
}
</style>
