<script setup lang="ts">
import Facebook from './draws/icons/Facebook.vue';

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
    title: 'Servicios',
    nameUrl: 'Service',
    links: [
      {
        nameUrl: '#campañas',
        nameLink: 'Campañas',
      },
    ],
  },
  {
    title: 'Sobre Nostros',
    nameUrl: 'AboutUs',
    links: [
      {
        nameUrl: '#our-history',
        nameLink: 'Nuestra historia',
      },
      {
        nameUrl: '#team',
        nameLink: 'Equipo',
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
    title: 'Ayuda',
    nameUrl: 'Help',
    links: [
      {
        nameUrl: '#FAQ',
        nameLink: 'FAQs',
      },
      {
        nameUrl: '#contact-us',
        nameLink: 'Contáctanos',
      },
    ],
  },
];
</script>

<template>
  <footer class="footer">
    <div class="footer__links">
      <aside class="place-self-center md:self-start">
        <h1 class="self-center text-3xl font-semibold">
          <span class="text-[#09FCED]">N</span>
          <span class="text-secondary-normal">B</span>
        </h1>
        <h3 class="text-xl">NoteBlue</h3>
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
      </div>
      <div>
        <!-- Socials -->
        <ul class="flex list-none">
          <li>
            <Facebook class="fill-primary-dark dark:fill-secondary-light" />
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  @apply container mt-10;
}

.footer__links {
  @apply flex w-auto justify-between;
}

.footer__term-pol {
  @apply flex justify-between border-t border-t-primary-dark/40 py-7 dark:border-t-secondary-light/40;
}
</style>
