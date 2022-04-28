import { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/me',
    name: 'Profile',
    component: () => import('@/views/users/UserProfileView.vue'),
    meta: {
      requiredAuth: true,
    },
  },
];
