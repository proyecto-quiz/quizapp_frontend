import { RouteRecordRaw } from 'vue-router';

export const guestRoutes: RouteRecordRaw[] = [
  // Errors views
  {
    name: 'NotFound',
    path: '/:patchMatch(.*)*',
    component: () => import('@/views/page-errors/NotFound.vue'),
  },

  // Guest views
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    alias: ['/home', '/index', '/inicio'],
  },

  {
    name: 'CursosTemas',
    path: '/Cursos-Temas',
    component: () => import('@/views/CursosTemasView.vue'),
  },

  {
    name: 'Service',
    path: '/services',
    component: () => import('@/views/services/ServiceView.vue'),
    children: [],
  },

  {
    name: 'ContactMe',
    path: '/contact-me',
    component: () => import('@/views/help/ContactMeView.vue'),
    children: [
      {
        name: 'FAQ',
        path: 'faq',
        component: () => import('@/views/help/FAQView.vue'),
      },
    ],
  },

  {
    name: 'AboutUs',
    path: '/about-us',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    name: 'Sign',
    path: '/sign',
    component: () => import('@/views/SignInAndUpView.vue'),
  },
  {
    name: 'Verify',
    path: '/email/verify',
    component: () => import('@/views/VerifyEmailView.vue'),
  },
  {
    name: 'Demo',
    path: '/demo',
    component:()=> import('@/views/DemoView.vue')
  }
];
