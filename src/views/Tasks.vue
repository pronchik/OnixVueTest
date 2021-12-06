<template lang="pug">
.tasks
  h2
      span Tasks
        .add-form
          input(v-model="task_name" class='input-name' placeholder="Name:")
          input(v-model="task_description" class='input-name' placeholder="Description:")
          input(v-model="task_deadline" class='input-name' placeholder="Deadline:")
          button(class='add-task' @click="submitForm(task_name,task_description,task_deadline)") +
        .nadesti
          .nades
            span Name
            span Description
          span Deadline
        .task(v-for='(task, index) in tasks' :key='task.index' :ref="`task${index}`" class="list-item")
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
import STATUS from './../enums/TaskStatusEnum'
export default defineComponent({
  data () {
    const tasks: TaskInterface[] = [
      {
        name: 'Create app',
        description1: 'Use smth ',
        time: '02.12.2021',
        status: STATUS.INPROGRESS
      },
      {
        name: 'Fix bugs',
        description1: 'Fix all bugs',
        time: '02.12.2021',
        status: STATUS.INPROGRESS
      }
    ]
    return {
      v$: useValidate(),
      tasks,
      task_name: '',
      task_deadline: '',
      task_description: '',
      task_status: '',
      STATUS // I had to add this
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
    submitForm (taskName, taskDescription, taskDeadline) {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.tasks.push({
          name: taskName,
          description1: taskDescription,
          time: taskDeadline,
          status: STATUS.TODO
        })
        this.task_name = ''
        this.task_deadline = ''
        this.task_description = ''
        emitter.emit('changeNumber', this.tasks.length)
        this.$nextTick(() => {
          Object.values(this.$refs as unknown as HTMLElement)[Object.values(this.$refs).length - 1].classList.add('blink')
          setTimeout(() => {
            Object.values(this.$refs as unknown as HTMLElement)[Object.values(this.$refs).length - 1].classList.remove('blink')
          }, 4000)
        })
      } else {
        alert('Not submited')
      }
    }
  },
  mounted () {
    this.giveTasks()
    this.blink()
    emitter.on('changeArr', () => {
      this.tasks = this.tasks.splice(1)
    })
  }
})
</script>
