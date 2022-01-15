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
import { defineComponent } from 'vue'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import TasksOrderByStatus from '@/components/TasksOrderByStatus.vue'
import { mapState, useStore, mapMutations } from 'vuex'
import { TaskInterface } from '@/types/task.interface'
export default defineComponent({
  components: {
    TasksOrderByStatus
  },
  data () {
    return {
      TaskStatusEnum,
      showDetailsModal: false,
      task: '',
      search: '',
      timefirst: '',
      timesecond: ''
    }
  },
  computed: {
    ...mapState(['tasks']),
    taskTodo () {
      return useStore().state.tasks.tasks.filter(task => {
        return this.filterByStatus(task, TaskStatusEnum.TODO)
      })
    },
    taskDone () {
      return useStore().state.tasks.tasks.filter(task => {
        return this.filterByStatus(task, TaskStatusEnum.DONE)
      })
    },
    taskInprog () {
      return useStore().state.tasks.tasks.filter(task => {
        return this.filterByStatus(task, TaskStatusEnum.INPROGRESS)
      })
    }
  },
  methods: {
    ...mapMutations(['updateTask']),
    filterByStatus (task:TaskInterface, status) {
      return task.title.toLowerCase().includes(this.search.toLowerCase()) && task.status.includes(status) &&
         (+new Date(task.time) - +new Date(this.timefirst) >= 0 || isNaN(+new Date(task.time) - +new Date(this.timefirst))) &&
          (+new Date(task.time) - +new Date(this.timesecond) <= 0 || isNaN(+new Date(task.time) - +new Date(this.timesecond)))
    },
    checkStatus (i:number, itemStatus:TaskStatusEnum) {
      if (itemStatus === TaskStatusEnum.TODO) {
        const index = this.taskTodo.indexOf(this.tasks.tasks[i])
        this.taskTodo.splice(index, 1)
      }
      if (itemStatus === TaskStatusEnum.DONE) {
        const index = this.taskDone.indexOf(this.tasks.tasks[i])
        this.taskDone.splice(index, 1)
      }
      if (itemStatus === TaskStatusEnum.INPROGRESS) {
        const index = this.taskInprog.indexOf(this.tasks.tasks[i])
        this.taskInprog.splice(index, 1)
      }
    },
    onDrop (event, list) {
      const itemId = +event.dataTransfer.getData('itemId')
      const itemStatus = event.dataTransfer.getData('itemStatus')
      for (let i = 0; i < this.tasks.tasks.length; i++) {
        if (!(this.tasks.tasks[i].status === TaskStatusEnum.DONE && list === TaskStatusEnum.TODO)) {
          if (this.tasks.tasks[i].id === itemId && list === TaskStatusEnum.INPROGRESS) {
            this.checkStatus(i, itemStatus)
            this.taskInprog.push(this.tasks.tasks[i])
            this.tasks.tasks[i].status = TaskStatusEnum.INPROGRESS
            this.updateTask(this.tasks.tasks[i])
          }
          if (this.tasks.tasks[i].id === itemId && list === TaskStatusEnum.DONE) {
            this.checkStatus(i, itemStatus)
            this.taskDone.push(this.tasks.tasks[i])
            this.tasks.tasks[i].status = TaskStatusEnum.DONE
            this.updateTask(this.tasks.tasks[i])
          }
          if (this.tasks.tasks[i].id === itemId && list === TaskStatusEnum.TODO) {
            this.checkStatus(i, itemStatus)
            this.taskTodo.push(this.tasks.tasks[i])
            this.tasks.tasks[i].status = TaskStatusEnum.TODO
            this.updateTask(this.tasks.tasks[i])
          }
        }
      }
    }
  }
})
</script>
