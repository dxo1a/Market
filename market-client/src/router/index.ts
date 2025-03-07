// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/views/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { layout: 'entry' } },
  { path: '/register', name: 'register', component: Register, meta: { layout: 'entry' } },
  { path: '/', name: 'home', component: Home, meta: { layout: 'entry' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
