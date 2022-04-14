import { useAuthStore } from '@/stores';
import { computed } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
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
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignInView.vue'),
    meta: {
      signIn: true,
    },
  },
  {
    path: '/temas',
    name: 'Temas',
    component: () => import('@/views/cursos/TemasView.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/users/UserProfileView.vue'),
    meta: {
      requiredAuth: true,
    },
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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const auth = computed(() => useAuthStore()).value;

  if (to.meta.requiredAuth && !auth.isAuth) {
    next({ name: 'SignIn' });
  } else {
    next();
  }
});

export default router;
