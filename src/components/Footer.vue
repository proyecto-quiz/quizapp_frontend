<script setup lang="ts">
import Facebook from './draws/icons/Facebook.vue';
import Logo from './draws/icons/Logo.vue';

type LinkUrl = {
  nameUrl: string;
  nameLink: string;
};

type Link = {
  title: string;
  nameUrl: string;
  links: LinkUrl[];
};

const links: Link[] = [
  {
    title: 'Inicio',
    nameUrl: 'Home',
    links: [
      {
        nameUrl: '/sign',
        nameLink: 'Iniciar Sesión',
      },
      {
        nameUrl: '/sign?type=sign-up',
        nameLink: 'Registrarse',
      },
    ],
  },
  {
    title: 'Sobre Nosotros',
    nameUrl: 'AboutUs',
    links: [
      {
        nameUrl: '#our-history',
        nameLink: 'Nuestra historia',
      },
      {
        nameUrl: '#team',
        nameLink: 'Equipo de desarrollo',
      },
      {
        nameUrl: '#collaborators',
        nameLink: 'Colaboradores',
      },
    ],
  },
  {
    title: 'Comunidad',
    nameUrl: 'Blog',
    links: [
      {
        nameLink: 'Publicaciones',
        nameUrl: '#BlogPosts',
      },
    ],
  },
  {
    title: 'Contáctanos',
    nameUrl: 'ContactMe',
    links: [
      {
        nameUrl: '#contact-us',
        nameLink: 'Información de Contácto',
      },
      {
        nameUrl: '#Apoyanos',
        nameLink: 'Apoyanos',
      },
    ],
  },
];
</script>

<template>
  <footer class="footer">
    <div class="footer__links">
      <aside class="place-self-center md:self-start">
        <div class="flex flex-row justify-between gap-5">
          <div>
            <Logo />
            <h3 class="text-xl">
              <span class="text-[#09FCED]">Note</span>
              <span class="text-secondary-normal">Blue</span>
            </h3>
          </div>
        </div>
      </aside>
      <div :class="['mb-3 grid grid-cols-2 gap-3 md:gap-6', `md:grid-cols-4`]">
        <ul
          v-for="item in links"
          :key="item.title"
          class="flex flex-col items-center justify-start gap-2 md:items-end"
        >
          <li class="text-base font-medium text-secondary dark:text-contrast-01 md:text-lg">
            <router-link class="hover:underline" :to="{ name: item.nameUrl }">
              {{ item.title }}
            </router-link>
          </li>
          <li
            v-for="link in item.links"
            :key="link.nameLink.toLowerCase().concat(' ', 'link')"
            class="my-1 text-sm hover:underline dark:text-primary-light/80"
          >
            <!-- TODO: replace with router-link -->
            <a :href="link.nameUrl">
              {{ link.nameLink }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer__term-pol">
      <div class="self-start dark:text-primary-light/60">
        <h4 class="mr-4 inline-block text-xs hover:underline md:text-sm">
          <a href="#teminos-y-condiciones" class="p-1">Términos & Condiciones</a>
        </h4>
        <h4 class="ml-4 inline-block text-xs hover:underline md:text-sm">
          <a href="#privacidad-y-politica" class="p-1">Privacidad y Política</a>
        </h4>
        <h4 class="ml-4 inline-block text-xs hover:underline md:text-sm">
          <label id="Master_CopyrightFooter">
            © Copyright 2023 - Todos los Derechos Reservados
          </label>
        </h4>
      </div>
      <div>
        <!-- Socials -->
        <ul class="flex list-none">
          <li>
            <a href="https://www.facebook.com/Note-Blue-106433045536731" target="_blank">
              <Facebook />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  @apply container;
}

.footer__links {
  @apply flex w-auto justify-between;
}

.footer__term-pol {
  @apply flex justify-between border-t border-t-primary-dark/40 py-7 dark:border-t-secondary-light/40;
}
</style>
