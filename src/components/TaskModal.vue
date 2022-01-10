/* eslint-disable vue/no-mutating-props */
<template lang="pug">
.modal(:style="{display: showModal}")
    .modal-content
      input(v-model="task_name" class='input-name' placeholder="Name:")
      input(v-model="task_description" class='input-name' placeholder="Description:")
      input( type='date' v-model="task_deadline" class='input-name' placeholder="Deadline:")
      button(class='add-task' @click="submitForm()") +
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { emitter } from '../main'
import { mapMutations } from 'vuex'
import { TaskStatusEnum } from '@/enums/TaskStatusEnum'

export default defineComponent({
  name: 'task-modal',
  props: ['showModal', 'tasks'],
  data () {
    return {
      v$: useValidate(),
      task_name: '',
      task_deadline: '',
      task_description: '',
      id: 0
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
    ...mapMutations(['appendNewTask']),
    getId (): void {
      if (this.tasks.length === 0) {
        this.id = 0
      } else {
        this.id = this.tasks[this.tasks.length - 1].id + 1
      }
    },
    submitForm () {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.getId()
        this.appendNewTask({
          id: this.id,
          title: this.task_name,
          description1: this.task_description,
          time: this.task_deadline,
          status: TaskStatusEnum.TODO,
          start: new Date().toISOString().split('T')[0],
          end: new Date().toISOString().split('T')[0]
        })
        emitter.emit('blinkLastTask')
        this.task_name = ''
        this.task_deadline = ''
        this.task_description = ''
      } else {
        alert('Not submited')
      }
    }
  }
})
</script>
