import { RouteRecordRaw } from 'vue-router'
import Home from '@views/Home.vue'
import Pexeso from '@views/Pexeso.vue'
import Scores from '@views/Scores.vue'

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
]

export default routes
