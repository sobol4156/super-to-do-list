import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue') },
    { path: '/settings', component: () => import('@/views/SettingsView.vue') },
    { path: '/about', component: () => import('@/views/AboutView.vue') },
  ],
})

export default router
