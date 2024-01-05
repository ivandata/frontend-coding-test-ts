import { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Pexeso from '../views/Pexeso.vue'

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
]

export default routes
