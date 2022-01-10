import { createStore } from 'vuex'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'

const tasks = window.localStorage.getItem('tasks')
const notification = window.localStorage.getItem('notification')
export default createStore({
  state: {
    tasks: tasks ? JSON.parse(tasks) : [
      {
        id: 0,
        title: 'Create app',
        description1: 'Use smth',
        time: '2022-01-12',
        status: TaskStatusEnum.TODO,
        start: '2022-01-05',
        end: '2022-01-05'
      },
      {
        id: 1,
        title: 'Fix bugs',
        description1: 'Fix all bugs',
        time: '2022-01-13',
        status: TaskStatusEnum.INPROGRESS,
        start: '2021-12-11',
        end: '2021-12-11'
      },
      {
        id: 2,
        title: 'Fix bugs',
        description1: 'Fix all bugs',
        time: '2022-01-10',
        status: TaskStatusEnum.INPROGRESS,
        start: '2021-12-11',
        end: '2021-12-11'
      },
      {
        id: 3,
        title: 'Fix bugs',
        description1: 'Fix all bugs',
        time: '2022-01-09',
        status: TaskStatusEnum.INPROGRESS,
        start: '2021-12-11',
        end: '2021-12-11'
      }
    ],
    messages: [
      {
        message: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
        time: '8:40 PM',
        img: 'Icon@3x.svg'
      },
      {
        message: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
        time: '7:32 PM',
        img: 'Icon@3x.svg',
        tip: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
      },
      {
        message: 'Darika Samak uploaded 4 files on An option to search in current ',
        time: '6:02 PM',
        img: 'Icon@3x.svg',
        pictures: [
          {
            img: '1-1.jpg'
          },
          {
            img: '1-1.jpg'
          },
          {
            img: '1-1.jpg'
          },
          {
            img: '1-1.jpg'
          }
        ]
      }
    ],
    notification: notification ? JSON.parse(notification) : 2
  },
  mutations: {
    appendNewTask (state, task) {
      state.tasks.push(task as never)
      console.log(task)
      window.localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask (state, task) {
      state.tasks[state.tasks.findIndex(taskId => taskId.id === task.id)] = task as never
      window.localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    deleteTask (state, task) {
      state.tasks.splice(task, 1)
      window.localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    changeNotification (state, index) {
      state.notification = index
      window.localStorage.setItem('notification', JSON.stringify(state.notification))
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    notification (state) {
      return state.notification
    },
    files (state) {
      const imges = []
      for (let i = 0; i < state.messages.length; i++) {
        const img = state.messages[i].pictures
        if (img) {
          for (let j = 0; j < img.length; j++) {
            imges.push(img[j].img.split('.')[0] as never)
          }
        }
      }
      return imges
    }
  }
})
