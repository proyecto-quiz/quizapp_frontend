import { RouteRecordRaw } from 'vue-router';

export const guestRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    alias: ['/home', '/index', '/inicio'],
    meta: {
      isGuest: true,
    },
  },
  {
    path: '/temas',
    name: 'Temas',
    component: () => import('@/views/TemasView.vue'),
  },

  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('@/views/FAQView.vue'),
  },
  {
    path: '/about-me',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignInView.vue'),
    meta: {
      signIn: true,
    },
  },
];
