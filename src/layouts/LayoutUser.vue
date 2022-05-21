<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores';
import VerticalNavigation from '@/components/ui/VerticalNavigation.vue';

const authStore = useAuthStore();
const authStoreCom = computed(() => authStore);
const navigationShow = ref(true);

onMounted(() => {
  window.document.title = `Perfil - ${authStore.user?.username}`;
});
</script>

<template>
  <div :class="[navigationShow ? 'content__grid' : 'content__grid--fade']">
    <button
      :class="[
        'btn--change button--light',
        { 'left-[22%] md:left-[24%]': navigationShow, 'left-[1%]': !navigationShow },
      ]"
      title="Navigation"
      aria-label="button-navigation"
      @click.prevent="navigationShow = !navigationShow"
    >
      {{ navigationShow ? '&#9776;' : '&#10140;' }}
    </button>

    <Transition name="nav_fade">
      <VerticalNavigation v-if="navigationShow" />
    </Transition>
    <main :class="[navigationShow ? 'main-w-full' : 'w-full']">
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
  @apply fixed top-1 top-[50%] z-10;
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
  @apply opacity-0;
  transform: translateX(-25%);
}

.nav_fade-enter-to,
.nav_fade-leave-from {
  @apply opacity-100;
  transform: translateX(0);
}

/* END */

/* Main transition */
.main-w-full {
  transition: all 230ms ease-out;
  @apply ml-[25%] w-[75%];
}
</style>
