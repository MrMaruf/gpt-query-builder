import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import QueryView from '@/views/query/QueryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/query',
      name: 'query',
      component: QueryView,
    },
    {
      path: '/query/:queryName',
      name: 'query builder',
      component: QueryView,
    },
  ],
});

export default router;
