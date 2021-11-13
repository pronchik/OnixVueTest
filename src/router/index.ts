import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Activity from '../views/Activity.vue'
import Tasks from '../views/Tasks.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ComingSoon from '../views/ComingSoon.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/files',
    name: 'files',
    component: ComingSoon
  },
  {
    path: '/activity',
    component: Activity
  },
  {
    path: '/',
    redirect: '/tasks'
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/kanban',
    name: 'kanban',
    component: ComingSoon
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: ComingSoon
  },
  {
    path: '/:PageNotFound(.*)*',
    component: PageNotFound
  },
  {
    path: '/notification',
    component: ComingSoon
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
