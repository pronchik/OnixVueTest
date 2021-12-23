<template lang="pug">
.kanban
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
      taskTodo: [] as any,
      taskInprog: [] as any,
      taskDone: [] as any
    }
  },
  methods: {
    onDrop (event, list) {
      const itemName = event.dataTransfer.getData('itemName')
      const itemStatus = event.dataTransfer.getData('itemStatus')
      for (let i = 0; i < this.tasks.length; i++) {
        if (!(this.tasks[i].status === TaskStatusEnum.DONE && list === TaskStatusEnum.TODO)) {
          if (this.tasks[i].name === itemName && list === TaskStatusEnum.INPROGRESS) {
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
            this.taskInprog.push(this.tasks[i])
            this.tasks[i].status = TaskStatusEnum.INPROGRESS
          }
          if (this.tasks[i].name === itemName && list === TaskStatusEnum.DONE) {
            if (itemStatus === TaskStatusEnum.TODO) {
              const index = this.taskTodo.indexOf(this.tasks[i])
              this.taskTodo.splice(index, 1)
            }
            if (itemStatus === TaskStatusEnum.INPROGRESS) {
              const index = this.taskInprog.indexOf(this.tasks[i])
              this.taskInprog.splice(index, 1)
            }
            if (itemStatus === TaskStatusEnum.DONE) {
              const index = this.taskDone.indexOf(this.tasks[i])
              this.taskDone.splice(index, 1)
            }
            this.taskDone.push(this.tasks[i])
            this.tasks[i].status = TaskStatusEnum.DONE
          }
          if (this.tasks[i].name === itemName && list === TaskStatusEnum.TODO) {
            if (itemStatus === TaskStatusEnum.INPROGRESS) {
              const index = this.taskInprog.indexOf(this.tasks[i])
              this.taskInprog.splice(index, 1)
            }
            if (itemStatus === TaskStatusEnum.TODO) {
              const index = this.taskTodo.indexOf(this.tasks[i])
              this.taskTodo.splice(index, 1)
            }
            this.taskTodo.push(this.tasks[i])
            this.tasks[i].status = TaskStatusEnum.TODO
          }
        }
      }
    },
    setArrayByStatuses () {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].status === TaskStatusEnum.INPROGRESS) {
          const item = this.tasks[i]
          this.taskInprog.push(item)
        }
        if (this.tasks[i].status === TaskStatusEnum.TODO) {
          const item = this.tasks[i]
          this.taskTodo.push(item)
        }
        if (this.tasks[i].status === TaskStatusEnum.DONE) {
          const item = this.tasks[i]
          this.taskDone.push(item)
        }
      }
    }
  },
  mounted () {
    this.setArrayByStatuses()
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
