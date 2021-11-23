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
        .task(v-for='task in tasks' :key='task')
          .name
            | {{task.name}}
          .description
            | {{task.description1}}
          .time
            | {{task.time}}
          button(class='delete-task' @click="deleteCart(task)") -
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TaskInterface } from '@/types/task.interface'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { emitter } from '../main'
export default defineComponent({
  data () {
    const tasks: TaskInterface[] = [
      {
        name: 'Create app',
        description1: 'Use smth ',
        time: '02.12.2021'
      },
      {
        name: 'Fix bugs',
        description1: 'Fix all bugs',
        time: '02.12.2021'
      }
    ]
    return {
      v$: useValidate(),
      tasks,
      task_name: '',
      task_deadline: '',
      task_description: ''
    }
  },
  validations: {
    task_name: { required },
    task_deadline: { required },
    task_description: { required }
  },
  methods: {
    deleteCart (task) {
      this.tasks.splice(this.tasks.indexOf(task), 1)
      emitter.emit('changeNumber', this.tasks.length)
    },
    submitForm (taskName, taskDescription, taskDeadline) {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.tasks.push({
          name: taskName,
          description1: taskDescription,
          time: taskDeadline
        })
        this.task_name = ''
        this.task_deadline = ''
        this.task_description = ''
        emitter.emit('changeNumber', this.tasks.length)
      } else {
        alert('Not submited')
      }
    }
  },
  mounted () {
    emitter.on('changeArr', () => {
      this.tasks = this.tasks.splice(1)
    })
  }
})
</script>
