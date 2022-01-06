import { createStore } from 'vuex'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'

export default createStore({
  state: {
    tasks: [
      {
        id: 0,
        name: 'Create app',
        description1: 'Use smth',
        time: '2022-01-06',
        status: TaskStatusEnum.TODO
      },
      {
        id: 1,
        name: 'Fix bugs',
        description1: 'Fix all bugs',
        time: '2021-12-12',
        status: TaskStatusEnum.INPROGRESS
      },
      {
        id: 2,
        name: 'Fixx bugs',
        description1: 'Fix all bugs',
        time: '2021-02-17',
        status: TaskStatusEnum.DONE
      },
      {
        id: 4,
        name: 'Create app',
        description1: 'Use smth',
        time: '2022-01-05',
        status: TaskStatusEnum.TODO
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    tasks (state) {
      return state.tasks
    }
  }
})
