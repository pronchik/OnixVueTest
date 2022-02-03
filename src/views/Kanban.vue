<template lang="pug">
.kanban
  input(type='text' v-model='search' placeholder='Search name..')
  input( type='date' v-model="timefirst" class='input-name')
  input( type='date' v-model="timesecond" class='input-name')
  .statuses
    .todo(@drop="onDrop($event,'todo')"
    @dragenter.prevent
    @dragover.prevent)
      span To do
        tasks-order-by-status(:tasks = 'taskTodo')
    .inprogress(@drop="onDrop($event,'inprogress')"
    @dragenter.prevent
    @dragover.prevent)
      span In Progress
        tasks-order-by-status(:tasks = 'taskInprog')
    .done(@drop="onDrop($event,'done')"
    @dragenter.prevent
    @dragover.prevent)
      span Done
        tasks-order-by-status(:tasks = 'taskDone')
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import filterTasksByStatus from '@/composables/filterTasksByStatus'
import TasksOrderByStatus from '@/components/TasksOrderByStatus.vue'
export default defineComponent({
  components: {
    TasksOrderByStatus
  },
  setup () {
    const { taskDone, taskInprog, taskTodo, taskList, store, task, timefirst, timesecond, search } = filterTasksByStatus()
    const showDetailsModal = ref(false)

    const checkStatus = (i, itemStatus) => {
      if (itemStatus === TaskStatusEnum.TODO) {
        const index = taskTodo.value.indexOf(taskList[i])
        taskTodo.value.splice(index, 1)
      }
      if (itemStatus === TaskStatusEnum.DONE) {
        const index = taskDone.value.indexOf(taskList[i])
        taskDone.value.splice(index, 1)
      }
      if (itemStatus === TaskStatusEnum.INPROGRESS) {
        const index = taskInprog.value.indexOf(taskList[i])
        taskInprog.value.splice(index, 1)
      }
    }
    const onDrop = (event, list) => {
      const itemId = +event.dataTransfer.getData('itemId')
      const itemStatus = event.dataTransfer.getData('itemStatus')
      for (let i = 0; i < taskList.value.length; i++) {
        if (!(taskList.value[i].status === TaskStatusEnum.DONE && list === TaskStatusEnum.TODO)) {
          if (taskList.value[i].id === itemId && list === TaskStatusEnum.INPROGRESS) {
            checkStatus(i, itemStatus)
            taskInprog.value.push(taskList.value[i])
            taskList.value[i].status = TaskStatusEnum.INPROGRESS
            store.dispatch('updateTask', taskList.value[i])
          }
          if (taskList.value[i].id === itemId && list === TaskStatusEnum.DONE) {
            checkStatus(i, itemStatus)
            taskDone.value.push(taskList[i])
            taskList.value[i].status = TaskStatusEnum.DONE
            store.dispatch('updateTask', taskList.value[i])
          }
          if (taskList.value[i].id === itemId && list === TaskStatusEnum.TODO) {
            checkStatus(i, itemStatus)
            taskTodo.value.push(taskList[i])
            taskList.value[i].status = TaskStatusEnum.TODO
            store.dispatch('updateTask', taskList.value[i])
          }
        }
      }
    }
    return {
      showDetailsModal,
      taskTodo,
      taskInprog,
      taskDone,
      task,
      timefirst,
      timesecond,
      search,
      onDrop
    }
  }
})
</script>
