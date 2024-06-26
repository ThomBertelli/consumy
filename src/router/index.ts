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
      path:'/signin',
      name: 'signin',
      component: () => import('../components/SignIn.vue') 
    },

    {
      path:'/signup',
      name:'signup',
      component: () => import('../components/SignUp.vue') 
    },
    {
      path:'/stores',
      name:'stores',
      component: () => import('../components/StoresContainerComponent.vue') 
    },
    {
      path:'/store/:storeId',
      name:'store-products',
      component: () => import('../components/StoreProductsContainer.vue')
    },
    {
      path:'/checkout',
      name:'checkout',
      component: () => import('../components/CheckoutComponent.vue')
    },
    {
      path:'/order/:orderId',
      name:'order',
      component: () => import('../components/OrderStatusComponent.vue'),
      props:true
    },
    {
      path:'/user',
      name:'user',
      component: () => import('../components/UserProfileEdit.vue'),
    }

  ]
})

export default router
