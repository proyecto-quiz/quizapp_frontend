<script setup lang="ts">
import { ref } from 'vue';
import ButtonTheme from './ui/ButtonTheme.vue';
import Logo from './draws/icons/Logo.vue';
import { useAuthRef } from '@/composables/stores';

const { user, isLoggedIn } = useAuthRef();

const LINKS = [
  {
    nameRoute: 'Home',
    nameLink: 'Inicio',
  },
  {
    nameRoute: 'AboutUs',
    nameLink: 'Sobre Nosotros',
  },
  {
    nameRoute: 'CursosTemas',
    nameLink: 'Nuestros Cursos',
  },
  {
    nameRoute: 'Demo',
    nameLink: 'Demo',
  },
  {
    nameRoute: 'ContactMe',
    nameLink: 'Contáctanos',
  },
];

const ToShow = ref(true);
</script>

<template>
  <header class="container sticky top-0 z-10 min-h-full w-screen px-2 py-3 md:mb-20">
    <nav class="navigation">
      <h1 class="navigation__heading">
        <div class="flex justify-between gap-2">
          <router-link active-class="dark:text-contrast-01 text-secondary" :to="{ name: 'Home' }">
            <div class="flex gap-2">
              <Logo />
              <h3 class="hidden text-xl md:inline">
                <span class="text-[#09FCED]">Note</span>
                <span class="text-secondary-normal">Blue</span>
              </h3>
            </div>
          </router-link>
          <ButtonTheme class="md:hidden" />
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="mx-4 ml-3 inline-flex items-center rounded-lg p-2 text-sm hover:bg-secondary-normal focus:bg-secondary focus:outline-none focus:ring-2 dark:bg-secondary dark:text-secondary-light dark:focus:bg-secondary/90 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
            @click="ToShow = !ToShow"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </h1>
      <span class="flex-grow" />
      <ul class="navigation__links" :class="{ hidden: ToShow }">
        <li v-for="item of LINKS" :key="item.nameLink">
          <router-link
            active-class="dark:text-contrast-01 text-secondary"
            class="transition-colors delay-75 duration-100 hover:text-secondary/60 dark:hover:text-secondary-normal"
            :to="{ name: item.nameRoute }"
          >
            {{ item.nameLink }}
          </router-link>
        </li>
        <li>
          <ButtonTheme class="hidden md:inline" />
        </li>
        <li v-if="isLoggedIn">
          <router-link
            :to="{ name: 'Profile' }"
            class="transition-colors duration-100 hover:text-contrast-01"
          >
            {{ user?.username }}
          </router-link>
        </li>
        <li v-else>
          <router-link :to="{ name: 'Sign' }" class="button-sign-in justify-center text-center">
            <svg class="fill-secondary-normal" width="14" height="14" viewBox="0 0 14 14">
              <path
                d="M9.37658 7.55398C10.0071 7.0606 10.4674 6.38404 10.6933 5.61842C10.9192 4.85279 10.8995 4.03618 10.637 3.28218C10.3745 2.52818 9.88227 1.8743 9.2287 1.41151C8.57513 0.94871 7.79277 0.700012 6.99046 0.700012C6.18815 0.700012 5.40579 0.94871 4.75222 1.41151C4.09865 1.8743 3.60637 2.52818 3.34388 3.28218C3.08138 4.03618 3.06172 4.85279 3.28763 5.61842C3.51354 6.38404 3.97379 7.0606 4.60433 7.55398C3.52388 7.98448 2.58114 8.6985 1.87662 9.61993C1.17211 10.5414 0.732229 11.6357 0.603878 12.7862C0.594587 12.8702 0.602023 12.9552 0.625762 13.0363C0.6495 13.1174 0.689076 13.1931 0.742229 13.2591C0.849577 13.3922 1.00571 13.4775 1.17629 13.4962C1.34687 13.5148 1.51791 13.4653 1.6518 13.3586C1.78568 13.2518 1.87144 13.0965 1.8902 12.9269C2.03143 11.6765 2.63092 10.5217 3.57413 9.68318C4.51735 8.84461 5.73816 8.38104 7.00332 8.38104C8.26848 8.38104 9.4893 8.84461 10.4325 9.68318C11.3757 10.5217 11.9752 11.6765 12.1164 12.9269C12.1339 13.084 12.2093 13.2292 12.3281 13.3343C12.4469 13.4395 12.6006 13.4971 12.7596 13.4962H12.8304C12.9989 13.4769 13.153 13.3921 13.2591 13.2603C13.3651 13.1285 13.4144 12.9604 13.3963 12.7926C13.2674 11.6388 12.8251 10.5417 12.117 9.61884C11.4089 8.69599 10.4615 7.9822 9.37658 7.55398ZM6.99046 7.09984C6.48164 7.09984 5.98425 6.94978 5.56118 6.66865C5.13811 6.38752 4.80837 5.98793 4.61365 5.52042C4.41893 5.05291 4.36798 4.53848 4.46725 4.04217C4.56652 3.54587 4.81154 3.08998 5.17133 2.73216C5.53112 2.37435 5.98952 2.13067 6.48856 2.03195C6.98761 1.93323 7.50488 1.9839 7.97497 2.17755C8.44506 2.37119 8.84685 2.69913 9.12953 3.11987C9.41222 3.54062 9.5631 4.03529 9.5631 4.54131C9.5631 5.21988 9.29206 5.87065 8.80959 6.35047C8.32713 6.83028 7.67277 7.09984 6.99046 7.09984Z"
              />
            </svg>
            <span class="md:inline">Iniciar Sesión</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.navigation {
  @apply w-full flex-row items-center justify-between text-center md:flex;
  @apply rounded-sm px-2 py-1 shadow-md backdrop-blur dark:from-primary-dark/70 md:px-5 md:py-3;
}

.navigation__heading {
  @apply text-lg font-medium uppercase  md:text-3xl;
}

.navigation__links {
  @apply flex-row items-center justify-between gap-x-3 text-lg font-medium md:flex;
}

li {
  @apply mx-1 text-sm md:text-base;
}

.button-sign-in {
  @apply flex items-center gap-2 rounded-md  px-3 py-2 text-sm  shadow;
  @apply bg-secondary-light text-primary-dark transition-colors duration-100;
  @apply focus:ring-2 focus:ring-primary-dark/60 dark:focus:ring-secondary-normal;
  @apply hover:bg-primary-dark/80 dark:hover:bg-secondary-light/70;
  @apply bg-primary-dark dark:bg-secondary-light;
  @apply text-secondary-light dark:text-primary-dark;
}
</style>
