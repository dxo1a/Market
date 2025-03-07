import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

import '@unocss/reset/tailwind.css'
import '@/assets/styles/main.scss'

import 'virtual:uno.css'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(router).use(pinia).mount('#app')
