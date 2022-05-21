import { RouteRecordRaw } from 'vue-router';

export const coursesRoutes: RouteRecordRaw[] = [
  {
    path: '/examen/',
    component: () => import('@/layouts/LayoutUser.vue'),
    meta: {
      requiredAuth: true,
    },
    children: [
      {
        path: 'cursos',
        name: 'Cursos',
        component: () => import('@/views/cursos/CursosView.vue'),
      },
      {
        path: 'pregunta',
        name: 'Pregunta',
        component: () => import('@/views/preguntas/PreguntaView.vue'),
      },
    ],
  },
];
