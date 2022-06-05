import { RouteRecordRaw } from 'vue-router';

export const blogsRoutes: RouteRecordRaw[] = [
  {
    path: '/blogs',
    name: 'Blog',
    component: () => import('@/views/blogs/BlogsView.vue'),
    children: [
      {
        path: 'posts',
        name: 'BlogPosts',
        component: () => import('@/views/blogs/PostsView.vue'),
      },
    ],
  },
];
