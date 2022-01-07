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
import { computed, defineComponent } from 'vue'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import TasksOrderByStatus from '@/components/TasksOrderByStatus.vue'
import { useStore } from 'vuex'
import { emitter } from '../main'
import { TaskInterface } from '@/types/task.interface'
export default defineComponent({
  setup () {
    const store = useStore()
    const tasks = computed(() => store.state.tasks)
    return {
      tasks
    }
  },
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
    taskTodo () {
      return useStore().state.tasks.filter(task => {
        return this.filterByStatus(task, TaskStatusEnum.TODO)
      })
    },
    taskDone () {
      return useStore().state.tasks.filter(task => {
        return this.filterByStatus(task, TaskStatusEnum.DONE)
      })
    },
    taskInprog () {
      return useStore().state.tasks.filter(task => {
        return this.filterByStatus(task, TaskStatusEnum.INPROGRESS)
      })
    }
  },
  methods: {
    filterByStatus (task:TaskInterface, status:TaskStatusEnum) {
      return task.name.toLowerCase().includes(this.search.toLowerCase()) && task.status.includes(status) &&
         (+new Date(task.time) - +new Date(this.timefirst) >= 0 || isNaN(+new Date(task.time) - +new Date(this.timefirst))) &&
          (+new Date(task.time) - +new Date(this.timesecond) <= 0 || isNaN(+new Date(task.time) - +new Date(this.timesecond)))
    },
    checkStatus (i:number, itemStatus:TaskStatusEnum) {
      if (itemStatus === TaskStatusEnum.TODO) {
        const index = this.taskTodo.indexOf(this.tasks[i])
        this.taskTodo.splice(index, 1)
      }
      if (itemStatus === TaskStatusEnum.DONE) {
        const index = this.taskDone.indexOf(this.tasks[i])
        this.taskDone.splice(index, 1)
      }
      if (itemStatus === TaskStatusEnum.INPROGRESS) {
        const index = this.taskInprog.indexOf(this.tasks[i])
        this.taskInprog.splice(index, 1)
      }
    },
    onDrop (event, list) {
      const itemId = +event.dataTransfer.getData('itemId')
      const itemStatus = event.dataTransfer.getData('itemStatus')
      for (let i = 0; i < this.tasks.length; i++) {
        if (!(this.tasks[i].status === TaskStatusEnum.DONE && list === TaskStatusEnum.TODO)) {
          if (this.tasks[i].id === itemId && list === TaskStatusEnum.INPROGRESS) {
            this.checkStatus(i, itemStatus)
            this.taskInprog.push(this.tasks[i])
            this.tasks[i].status = TaskStatusEnum.INPROGRESS
          }
          if (this.tasks[i].id === itemId && list === TaskStatusEnum.DONE) {
            this.checkStatus(i, itemStatus)
            this.taskDone.push(this.tasks[i])
            this.tasks[i].status = TaskStatusEnum.DONE
          }
          if (this.tasks[i].id === itemId && list === TaskStatusEnum.TODO) {
            this.checkStatus(i, itemStatus)
            this.taskTodo.push(this.tasks[i])
            this.tasks[i].status = TaskStatusEnum.TODO
          }
        }
      }
    }
  },
  mounted () {
    emitter.on('save', task => {
      const index = task as TaskInterface
      this.tasks[index.id].name = index.name
      this.tasks[index.id].description1 = index.description1
      this.tasks[index.id].time = index.time
      this.tasks[index.id].status = index.status
      this.showDetailsModal = false
    })
  }
})
</script>
