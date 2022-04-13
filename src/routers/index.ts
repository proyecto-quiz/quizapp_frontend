import { computed } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores';

// Routes
import { guestRoutes } from './guest';
import { userRoutes } from './users';

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

router.beforeEach(async (to, _from, next) => {
  const auth = computed(() => useAuthStore()).value;

  if (to.meta.requiredAuth && !auth.isAuth) {
    next({ name: 'SignIn' });
  } else {
    next();
  }
});

export default router;
