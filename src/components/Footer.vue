<script setup lang="ts">
import Facebook from './draws/icons/Facebook.vue';

type LinkUrl = {
  urlLink: string;
  nameLink: string;
};

type Link = {
  title: string;
  links: LinkUrl[];
};

const links: Link[] = [
  {
    title: 'Service',
    links: [
      {
        urlLink: '#campañas',
        nameLink: 'Campañas',
      },
    ],
  },
  {
    title: 'Sobre Nostros',
    links: [
      {
        urlLink: '#our-history',
        nameLink: 'Nuestra historia',
      },
      {
        urlLink: '#benefits',
        nameLink: 'Beneficios',
      },
      {
        urlLink: '#team',
        nameLink: 'Equipo',
      },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      {
        urlLink: '#faqs',
        nameLink: 'FAQs',
      },
      {
        urlLink: '#contact-us',
        nameLink: 'Contactanos',
      },
    ],
  },
];
</script>

<template>
  <footer class="footer">
    <div class="my-3 grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-6">
      <aside class="place-self-center md:self-start">
        <h1 class="self-center text-3xl font-semibold">
          <span class="text-[#09FCED]">N</span>
          <span class="text-secondary-normal">B</span>
        </h1>
        <h3 class="text-xl">NoteBlue</h3>
      </aside>
      <ul
        v-for="item in links"
        :key="item.title"
        class="flex flex-col items-center justify-start gap-2 md:items-end"
      >
        <li class="text-base font-medium text-contrast-01 md:text-lg">
          {{ item.title }}
        </li>
        <li
          v-for="link in item.links"
          :key="link.nameLink"
          class="my-1 text-sm hover:underline md:my-3"
        >
          <!-- TODO: replace with router-link -->
          <a :href="link.urlLink">
            {{ link.nameLink }}
          </a>
        </li>
      </ul>
    </div>
    <div
      class="flex justify-between border-t border-t-primary-dark/40 py-7 dark:border-t-secondary-light/40"
    >
      <div>
        <h4 class="mr-4 inline-block text-xs hover:underline md:text-sm">
          <a href="#" class="p-1"> Terminos & Condiciones </a>
        </h4>
        <h4 class="ml-4 inline-block text-xs hover:underline md:text-sm">
          <a href="#" class="p-1"> Privacidad y Politica </a>
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
</style>
