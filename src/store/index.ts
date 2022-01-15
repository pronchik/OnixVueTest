import { createStore } from 'vuex'
import * as tasks from './modules/task'
import * as activity from './modules/activity'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tasks,
    activity
  },
  getters: {
  }
})
