<template lang="pug">
.tasks
  .asd(v-if="Object.keys(this.task).length !== 0")
    task-details-modal(:showDetailsModal = 'showDetailsModal' :task = 'task')
  task-modal(:showModal = 'showModal' :tasks = 'tasks'
  @close-modal="showModal = $event")
  h2
      span Tasks
        button(class='add-task' @click="openModal()") +
        .nadesti
          .nades
            span Name
            span Description
          span Deadline
        .task(v-for='(task, index) in tasks' :key='task.index' :ref="`task${index}`" class="list-item" @click="taskModal(index)")
          .name
            | {{task.name}}
          .description
            | {{task.description1}}
          .time
            | {{task.time}}
          button(class='delete-task' @click="deleteCart(index)") -
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TaskInterface } from '@/types/task.interface'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { emitter } from '../main'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import TaskModal from '@/components/TaskModal.vue'
export default defineComponent({
  components: {
    TaskModal
  },
  data () {
    const tasks: TaskInterface[] = [
      {
        id: 0,
        name: 'Create app',
        description1: 'Use smth',
        time: '02.12.2021',
        status: TaskStatusEnum.TODO
      },
      {
        id: 1,
        name: 'Fix bugs',
        description1: 'Fix all bugs',
        time: '02.12.2021',
        status: TaskStatusEnum.INPROGRESS
      },
      {
        id: 2,
        name: 'Fixx bugs',
        description1: 'Fix all bugs',
        time: '02.12.2021',
        status: TaskStatusEnum.DONE
      }
    ]
    return {
      v$: useValidate(),
      tasks,
      task_name: '',
      task_deadline: '',
      task_description: '',
      task_status: '',
      TaskStatusEnum,
      showModal: 'none',
      showDetailsModal: 'none',
      task: ''
    }
  },
  validations: {
    task_name: { required },
    task_deadline: {
      required,
      minValue (val) {
        return new Date(val) > new Date()
      }
    },
    task_description: { required }
  },
  methods: {
    taskModal (index) {
      this.showDetailsModal = 'block'
      this.task = this.tasks[index] as unknown as string
    },
    openModal () {
      this.showModal = 'block'
    },
    giveTasks () {
      emitter.emit('giveTasks', this.tasks)
    },
    blink () {
      for (let i = 0; i < Object.values(this.$refs).length; i++) {
        setTimeout(() => {
          Object.values(this.$refs as unknown as HTMLElement)[i].classList.add('increase')
        }, 2000 * i)
        setTimeout(() => {
          Object.values(this.$refs as unknown as HTMLElement)[i].classList.remove('increase')
        }, 2000 * Object.values(this.$refs).length)
      }
    },
    deleteCart (task) {
      this.tasks.splice(task, 1)
      emitter.emit('changeNumber', this.tasks.length)
    },
    takeTask () {
      emitter.on('task', task => {
        this.tasks.push({
          id: this.tasks.length,
          name: Object.values(task as string)[0] as string,
          description1: Object.values(task as string)[1] as string,
          time: Object.values(task as string)[2] as string,
          status: TaskStatusEnum.TODO
        })
        this.showModal = 'none'
        emitter.emit('changeNumber', this.tasks.length)
        this.$nextTick(() => {
          Object.values(this.$refs as unknown as HTMLElement)[Object.values(this.$refs).length - 1].classList.add('blink')
          setTimeout(() => {
            Object.values(this.$refs as unknown as HTMLElement)[Object.values(this.$refs).length - 1].classList.remove('blink')
          }, 4000)
        })
      })
    }
  },
  mounted () {
    this.giveTasks()
    this.blink()
    emitter.on('removeLastElementFromTaskArray', () => {
      this.tasks = this.tasks.splice(1)
    })
    this.takeTask()
  }
})
</script>
