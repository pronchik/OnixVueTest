import { TaskStatusEnum } from './../../enums/TaskStatusEnum'
import { TaskInterface } from '@/types/task.interface'
export const state = {
  tasks: [
    {
      id: 0,
      title: 'Create app',
      description1: 'Use smth',
      time: '2022-01-12',
      status: TaskStatusEnum.TODO,
      start: '2022-02-02',
      end: '2022-02-02'
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
  ]
}
export const mutations = {
  appendNewTask (state, task: TaskInterface):void {
    state.tasks.push(task as never)
  },
  updateTask (state, task: TaskInterface):void {
    state.tasks[state.tasks.findIndex(taskId => taskId.id === task.id)] = task as never
  },
  deleteTask (state, task:TaskInterface):void {
    state.tasks.splice(task, 1)
  }
}
export const actions = {

}
export const getters = {
  tasks (state):void {
    return state.tasks
  }
}
