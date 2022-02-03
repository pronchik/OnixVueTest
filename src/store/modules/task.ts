/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TaskInterface } from '@/types/task.interface'
import {
  getTasks,
  postTask,
  deleteTask,
  updateTask
} from '@/services/tasksApi'
export const state = {
  tasks: [] as TaskInterface[]
}
export const mutations = {
  SET_TASKS_TO_STATE: (state, response: TaskInterface[]) => {
    state.tasks = response
  }
}
export const actions = {
  SET_TASKS_TO_STATE ({ commit }) {
    getTasks()
      .then(function (response) {
        commit('SET_TASKS_TO_STATE', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  appendNewTask ({ dispatch }, newCard: TaskInterface) {
    postTask(newCard)
      .then(function () {
        dispatch('SET_TASKS_TO_STATE')
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  deleteTask ({ dispatch }, id: number) {
    deleteTask(id)
      .then(function () {
        dispatch('SET_TASKS_TO_STATE')
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  updateTask ({ dispatch }, changedTask: TaskInterface) {
    updateTask(changedTask)
      .then(function () {
        dispatch('SET_TASKS_TO_STATE')
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
export const getters = {
  tasks (state):void {
    return state.tasks
  }
}
