import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores';

// Routes
import { guestRoutes } from './guest';
import { userRoutes } from './users';
import { coursesRoutes } from './courses';
import { blogsRoutes } from '@/routers/blogs';

const routes: RouteRecordRaw[] = [
  // Public routes
  ...guestRoutes,

  // Blogs routes
  ...blogsRoutes,

  // User routes
  ...userRoutes,

  //  Cursos
  ...coursesRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  !authStore.isReadyApp && (await authStore.meAction());

  const requiredAuth = (to.meta.requiredAuth || from.meta.requiredAuth) as boolean;
  const signRoute = to.name === 'Sign';

  if (requiredAuth && !authStore.isAuth) {
    next({ name: 'Sign', replace: true, query: { type: 'sign-in' } });
  } else if (authStore.isAuth && signRoute) {
    next({ name: 'Profile', replace: true });
  } else {
    next();
  }
});

export default router;
