// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/views/Login.vue'
import Home from '@/components/views/Home.vue'
import Register from '@/components/views/Register.vue'

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { layout: 'entry' } },
  { path: '/register', name: 'register', component: Register, meta: { layout: 'entry' } },
  { path: '/', name: 'home', component: Home, meta: { layout: 'entry', requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
