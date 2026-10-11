import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      meta: { auth: false },
      children: [
        {
          path: '/entrar',
          name: 'login',
          component: LoginView,
        },
        {
          path: '/registre-se',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
        }],
    },
    {
      path: "/receitas",
      component: AuthLayout,
      meta: { auth: true },
      children: [
        {
          path: '/',
          name: 'recipes',
          component: () => import('@/views/RecipeView.vue'),
        }],
    },
  ],
})

export default router
