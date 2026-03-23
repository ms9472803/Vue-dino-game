import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import GamePage from '../components/GamePage.vue'
import SettingsPage from '../components/SettingsPage.vue'
import { ROUTE_PATHS } from '../constants/routes'

const routes = [
  { path: ROUTE_PATHS.HOME, component: Home },
  { path: ROUTE_PATHS.GAME, component: GamePage },
  { path: ROUTE_PATHS.SETTINGS, component: SettingsPage }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
