import { useAppStore } from '@/stores';
import { createRouter, createWebHistory } from 'vue-router';

/** @type{import("vue-router").RouteRecordRaw[]} */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
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
    path: '/profile',
    name: 'Profile',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/UserProfileView.vue'),
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
