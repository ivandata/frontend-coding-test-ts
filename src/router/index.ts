import type { App } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import LayoutMain from '../components/layout/LayoutMain.vue'
import Error from '../views/Error.vue'
import mainRoutes from './routes'

export default function initializeRouter(app: App): Router {
  const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/error',
        alias: '/:pathMatch(.*)*',
        name: 'Error',
        props: true,
        component: Error,
      },
      {
        path: '/',
        props: true,
        component: LayoutMain,
        children: mainRoutes,
      },
    ],
  })

  app.use(router)

  return router
}
