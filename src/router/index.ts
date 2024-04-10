import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/entrar',
      name: 'signin',
      component: () => import('../components/SignIn.vue') 
    },

    {
      path:'/cadastrar',
      component: () => import('../components/SignUp.vue') 
    }

  ]
})

export default router
