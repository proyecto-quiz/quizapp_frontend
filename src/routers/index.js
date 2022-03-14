import { createRouter, createWebHistory } from 'vue-router';

/** @type{import("vue-router").RouteRecordRaw[]} */
const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
