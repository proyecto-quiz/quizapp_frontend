import { useAppStore } from '@/stores';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      isGuest: true,
    },
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignInView.vue'),
  },
  {
    path: '/temas',
    name: 'Temas',
    component: () => import('@/views/TemasView.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/UserProfileView.vue'),
  },
  {
    path: '/faq',
    name: 'FAQ',
    meta: {
      requiresAuth: false,
    },
    component: () => import('@/views/FAQView.vue'),
  },
  {
    path: '/about-me',
    name: 'About',
    meta: {
      requiresAuth: false,
    },
    component: () => import('@/views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, _from, next) => {
  const store = useAppStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
