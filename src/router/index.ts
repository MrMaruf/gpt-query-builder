import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import QuerySelectorView from '@/views/query/QuerySelectorView.vue';
import QueryEditorView from '@/views/query/QueryEditorView.vue';
import SignInView from "@/views/SignInView.vue";
import RegisterView from "@/views/RegisterView.vue";

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
      path: '/queries',
      name: 'queries selection',
      component: QuerySelectorView,
    },
    {
      path: '/queries/:queryName',
      name: 'query editor',
      component: QueryEditorView,
    },
    {
      path: '/sign-in',
      name: "sign in",
      component: SignInView
    },
    {
      path: '/register',
      name: "register",
      component: RegisterView
    }
  ],
});

export default router;
