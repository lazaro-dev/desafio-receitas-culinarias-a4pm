import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useAuthStore } from '@/stores/useAuthStore'

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
          meta: { title: 'Entrar', auth: false },
        },
        {
          path: '/registre-se',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
          meta: { title: 'Registre-se', auth: false },
        }],
    },
    {
      path: "/",
      component: AuthLayout,
      meta: { auth: true },
      children: [
        {
          path: '/receitas',
          name: 'recipes',
          component: () => import('@/views/RecipeView.vue'),
          meta: { title: 'Receitas', auth: true },
        }],
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string;
  }

  if (to.meta.auth && !authStore.isAuth) {
    return { name: "login" };
  }

  return true
});


export default router
