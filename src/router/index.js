import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import PageA from '../components/PageA.vue'
import PageB from '../components/PageB.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/a', component: PageA },
  { path: '/b', component: PageB }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router