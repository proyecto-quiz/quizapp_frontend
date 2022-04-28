import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores';

// Routes
import { guestRoutes } from './guest';
import { userRoutes } from './users';
import { computed } from 'vue';

const routes: RouteRecordRaw[] = [
  // Public routes
  ...guestRoutes,

  // User routes
  ...userRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = computed(() => useAuthStore()).value;

  const requiredAuth = (to.meta.requiredAuth || from.meta.requiredAuth) as boolean;
  const signRoute = to.name === 'SignIn' || to.name === 'SignUp';

  if (requiredAuth && !authStore.isAuth) {
    next({ name: 'SignIn', replace: true });
  } else if (authStore.isAuth && signRoute) {
    next({ name: 'Profile', replace: true });
  } else {
    next();
  }
});

export default router;
