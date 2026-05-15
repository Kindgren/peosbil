import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Homeview.vue')
    },
    {
      path: '/bilar',
      name: 'inventory',
      component: () => import('../views/InventoryView.vue')
    },
    {
      path: '/bilar/:id',
      name: 'car-detail',
      component: () => import('../views/CarDetailView.vue'),
      props: true
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router