import { createRouter, createWebHistory } from 'vue-router';

/** @type{import("vue-router").RouteRecordRaw[]} */
const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    name: 'Home',
    meta: {
      isGuest: true,
    },
  },
  {
    path: '/temas',
    component: () => import('@/views/TemasView.vue'),
    name: 'Temas',
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
