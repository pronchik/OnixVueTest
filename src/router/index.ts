import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Activity from '../views/Activity.vue'
import Tasks from '../views/Tasks.vue'
import Kanban from '../views/Kanban.vue'
import Files from '../views/Files.vue'
import Calendar from '../views/Calendar.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ComingSoon from '../views/ComingSoon.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/files',
    name: 'files',
    component: Files
  },
  {
    path: '/activity',
    name: 'activity',
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
    component: Kanban
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/notification',
    name: 'cooming-soon',
    component: ComingSoon
  },
  {
    path: '/:PageNotFound(.*)*',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
