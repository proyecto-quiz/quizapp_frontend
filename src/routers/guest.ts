import { RouteRecordRaw } from 'vue-router';

export const guestRoutes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    alias: ['/home', '/index', '/inicio'],
    meta: {
      isGuest: true,
    },
  },

  {
    name: 'Temas',
    path: '/temas',
    component: () => import('@/views/TemasView.vue'),
  },

  {
    name: 'Service',
    path: '/services',
    component: () => import('@/views/services/ServiceView.vue'),
    children: [],
  },

  {
    name: 'Help',
    path: '/help',
    component: () => import('@/views/help/HelpView.vue'),
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
    name: 'SignIn',
    path: '/sign-in',
    component: () => import('@/views/SignInView.vue'),
    meta: {
      sign: true,
    },
  },
  {
    name: 'SignUp',
    path: '/sign-up',
    component: () => import('@/views/SignUpView.vue'),
    meta: {
      sign: true,
    },
  },
];
