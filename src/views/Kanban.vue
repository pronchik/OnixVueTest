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
import { defineComponent } from 'vue'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import TasksOrderByStatus from '@/components/TasksOrderByStatus.vue'
import { emitter } from '../main'

export default defineComponent({
  components: {
    TasksOrderByStatus
  },
  props: ['tasks'],
  data () {
    return {
      TaskStatusEnum,
      showDetailsModal: 'none',
      task: '',
      taskTodo: [] as any,
      taskInprog: [] as any,
      taskDone: [] as any
    }
  },
  methods: {
    func (index) {
      this.showDetailsModal = 'block'
      this.task = this.tasks[index]
    },
    onDrop (event, list) {
      const itemName = event.dataTransfer.getData('itemName')
      const itemStatus = event.dataTransfer.getData('itemStatus')
      for (let i = 0; i < this.tasks.length; i++) {
        if (!(this.tasks[i].status === 'done' && list === 'todo')) {
          if (this.tasks[i].name === itemName && list === 'inprogress') {
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
            // eslint-disable-next-line vue/no-mutating-props
            this.tasks[i].status = TaskStatusEnum.INPROGRESS
          }
          if (this.tasks[i].name === itemName && list === 'done') {
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
            // eslint-disable-next-line vue/no-mutating-props
            this.tasks[i].status = TaskStatusEnum.DONE
          }
          if (this.tasks[i].name === itemName && list === 'todo') {
            if (itemStatus === TaskStatusEnum.INPROGRESS) {
              const index = this.taskInprog.indexOf(this.tasks[i])
              this.taskInprog.splice(index, 1)
            }
            if (itemStatus === TaskStatusEnum.TODO) {
              const index = this.taskTodo.indexOf(this.tasks[i])
              this.taskTodo.splice(index, 1)
            }
            this.taskTodo.push(this.tasks[i])
            // eslint-disable-next-line vue/no-mutating-props
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
  }
})
</script>
