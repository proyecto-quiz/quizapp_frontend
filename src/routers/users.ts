import { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/users/UserProfileView.vue'),
    meta: {
      requiredAuth: true,
    },
  },
];
