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
        path: 'temas',
        name: 'Temas',
        component: () => import('@/views/cursos/TemasView.vue'),
      },
      {
        path: 'pregunta',
        name: 'Pregunta',
        component: () => import('@/views/preguntas/PreguntaView.vue'),
      },
      {
        path: 'pregunta-tipo',
        name: 'PreguntaTipo',
        component: () => import('@/views/preguntas/PreguntaTipoView.vue'),
      },
      {
        path: 'notas',
        name: 'Notas',
        component: () => import('@/views/notas/NotaView.vue'),
      },
      {
        name: 'PreguntaAdd',
        path: '/preguntaAdd',
        component: () => import('@/views/preguntas/preguntaAddView.vue'),
      },
      {
        name: 'NotaRanking',
        path: '/notaranking',
        component: () => import('@/views/ranking/RankingView.vue'),
      },
      {
        name: 'SolucionAdd',
        path: '/solucionAdd',
        component: () => import('@/views/solucion/SolucionAddView.vue'),
      },
    ],
  },
];
