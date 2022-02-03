<template lang="pug">
.modal-task(v-if="showDetailsModal === true")
    .modal-task-details
        .task
            button(class='close' v-on:click="close()") x
            .name(v-if="show")
                |Name: {{task.title}}
            .text(v-if="!show" @change="handleChange")
                textarea(v-model='updatedTask.title')
            .status(v-if="show")
                |Status: {{task.status}}
            .text(v-if="!show" @change="handleChange")
                select(v-model='updatedTask.status')
                    option {{TaskStatusEnum.TODO}}
                    option {{TaskStatusEnum.DONE}}
                    option {{TaskStatusEnum.INPROGRESS}}
            .deadline
                |Deadline: {{task.time}}
            .text(v-if="!show" @change="handleChange")
                input(type='date' v-model='updatedTask.time')
            .description(v-if="show" @change="handleChange")
                |Description: {{task.description1}}
            .created
                |Created : {{task.start}}
            .text(v-if="!show" @change="handleChange")
                textarea(v-model='updatedTask.description1')
        button(class='add-task' v-on:click="show=!show" v-if="showEditButton && show") Edit
        button(class='add-task' v-if="!show" @click="cancleForm()") Cancle
        button(class='add-task' v-if="showSaveButton" @click="saveTask(task)") Save
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { useStore } from 'vuex'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'

export default defineComponent({
  name: 'task-details-modal',
  props: ['task', 'showEditButton'],
  setup (props) {
    const store = useStore()
    const show = ref(true)
    const showDetailsModal = ref(inject('showDetailsModal'))
    const showSaveButton = ref(false)
    const updatedTask = ref(JSON.parse(JSON.stringify(props.task)))
    const cancleForm = () => {
      show.value = true
      showSaveButton.value = false
    }
    const close = () => {
      showDetailsModal.value = false
    }
    const saveTask = () => {
      if (new Date(updatedTask.value.time) > new Date()) {
        store.dispatch('updateTask', updatedTask.value)
        showDetailsModal.value = false
      } else {
        alert('Wrong date')
      }
    }
    const handleChange = () => {
      showSaveButton.value = true
    }
    return {
      showDetailsModal,
      cancleForm,
      close,
      saveTask,
      handleChange,
      show,
      showSaveButton,
      updatedTask,
      TaskStatusEnum
    }
  }
})
</script>
