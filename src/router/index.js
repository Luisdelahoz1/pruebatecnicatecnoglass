import { createRouter, createWebHistory } from 'vue-router'
import app from '../App.vue'


const routes = [
  {
    path: '/',
    name: 'app',
    component: app
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
