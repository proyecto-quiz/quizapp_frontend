import { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    component: () => import('@/layouts/LayoutUser.vue'),
    meta: {
      requiredAuth: true,
    },
    children: [
      {
        path: 'me',
        name: 'Profile',
        component: () => import('@/views/users/UserProfileView.vue'),
      },
    ],
  },
];
