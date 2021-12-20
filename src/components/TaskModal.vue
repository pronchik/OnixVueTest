/* eslint-disable vue/no-mutating-props */
<template lang="pug">
.modal(:style="{display: showModal}")
    .modal-content
      input(v-model="task_name" class='input-name' placeholder="Name:")
      input(v-model="task_description" class='input-name' placeholder="Description:")
      input(v-model="task_deadline" class='input-name' placeholder="Deadline:")
      button(class='add-task' @click="submitForm(task_name,task_description,task_deadline)") +
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { emitter } from '../main'

export default defineComponent({
  name: 'task-modal',
  props: ['showModal', 'tasks'],
  data () {
    return {
      v$: useValidate(),
      task_name: '',
      task_deadline: '',
      task_description: ''
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
    submitForm (taskName, taskDescription, taskDeadline) {
      this.v$.$validate()
      if (!this.v$.$error) {
        emitter.emit('task', { taskName, taskDescription, taskDeadline })
      } else {
        alert('Not submited')
      }
    }
  }
})
</script>
