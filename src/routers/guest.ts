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
    component: () => import('@/views/cursos/TemasView.vue'),
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
      signIn: true,
    },
  },
  {
    path: '/pregunta-tipo',
    name: 'PreguntaTipo',
    component: () => import('@/views/preguntas/PreguntaTipoView.vue'),
  },
  {
    path: '/cursos',
    name: 'Cursos',
    meta: {
      requiresAuth: false,
    },
    component: () => import('@/views/cursos/CursosView.vue'),
  },
  {
    path: '/pregunta',
    name: 'Pregunta',
    meta: {
      requiresAuth: false,
    },
    component: () => import('@/views/preguntas/PreguntaView.vue'),
  },
];
