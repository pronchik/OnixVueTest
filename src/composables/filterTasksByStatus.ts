import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'

export default function filterTasksByStatus () {
  const store = useStore()
  store.dispatch('SET_TASKS_TO_STATE')
  const taskList = computed(() => store.state.tasks.tasks)
  const task = ref('')
  const search = ref('')
  const timefirst = ref('')
  const timesecond = ref('')

  const filter = (task, status) => {
    return task.title.toLowerCase().includes(search.value.toLowerCase()) && task.status.includes(status) &&
       (+new Date(task.time) - +new Date(timefirst.value) >= 0 || isNaN(+new Date(task.time) - +new Date(timefirst.value))) &&
        (+new Date(task.time) - +new Date(timesecond.value) <= 0 || isNaN(+new Date(task.time) - +new Date(timesecond.value)))
  }
  const taskTodo = computed(() => {
    return taskList.value.filter(task => {
      return filter(task, TaskStatusEnum.TODO)
    })
  })
  const taskDone = computed(() => {
    return taskList.value.filter(task => {
      return filter(task, TaskStatusEnum.DONE)
    })
  })
  const taskInprog = computed(() => {
    return taskList.value.filter(task => {
      return filter(task, TaskStatusEnum.INPROGRESS)
    })
  })
  return {
    task,
    taskDone,
    taskInprog,
    taskTodo,
    store,
    taskList,
    timefirst,
    timesecond,
    search
  }
}
