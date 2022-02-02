/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vue/no-mutating-props */
<template lang="pug">
.modal(:style="{display: showModal}")
    .modal-content
      input(v-model="state.task_name" class='input-name' placeholder="Name:")
      input(v-model="state.task_description" class='input-name' placeholder="Description:")
      input( type='date' v-model="state.task_deadline" class='input-name' placeholder="Deadline:")
      button(class='add-task' @click="submitForm()") +
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { emitter } from '../main'
import { useStore } from 'vuex'
import { TaskStatusEnum } from '@/enums/TaskStatusEnum'

export default defineComponent({
  name: 'task-modal',
  props: ['showModal', 'tasks'],
  setup (props) {
    const store = useStore()
    const state = reactive({
      task_name: '',
      task_deadline: '',
      task_description: ''
    })
    const id = ref(0)
    const rules = {
      task_name: { required },
      task_deadline: {
        required,
        minValue (val) {
          return new Date(val) > new Date()
        }
      },
      task_description: { required }
    }
    const v$ = ref(useValidate(rules, state))
    // get id
    const getId = () => {
      if (props.tasks.length === 0) {
        id.value = 0
      } else {
        id.value = props.tasks[props.tasks.length - 1].id + 1
      }
    }
    const submitForm = () => {
      v$.value.$validate()
      if (!v$.value.$error) {
        getId()
        store.dispatch('appendNewTask', {
          id: id.value,
          title: state.task_name,
          description1: state.task_description,
          time: state.task_deadline,
          status: TaskStatusEnum.TODO,
          start: new Date().toISOString().split('T')[0],
          end: new Date().toISOString().split('T')[0]
        })
        emitter.emit('blinkLastTask')
        state.task_name = ''
        state.task_deadline = ''
        state.task_description = ''
      } else {
        alert('Not submited')
      }
    }
    return {
      state,
      v$,
      submitForm
    }
  }
})
</script>
