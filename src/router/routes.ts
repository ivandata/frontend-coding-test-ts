import { RouteRecordRaw } from 'vue-router'
import Home from '@views/Home.vue'
import Pexeso from '@views/Pexeso.vue'
import Scores from '@views/Scores.vue'
import Settings from '@views/Settings.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home,
  },
  {
    path: '/pexeso',
    name: 'Pexeso',
    props: true,
    component: Pexeso,
  },
  {
    path: '/scores',
    name: 'Scores',
    props: true,
    component: Scores,
  },
  {
    path: '/settings',
    name: 'Settings',
    props: true,
    component: Settings,
  },
]

export default routes
