<template lang="pug">
.modal-task(:style="{display: showDetailsModal}")
    .modal-task-details
        .task
            | {{task.id}}
            .name(v-show="show")
                |Name: {{task.name}}
            .text(v-show="!show")
                textarea(v-model='task.name')
            .status
                |Status: {{task.status}}
            .text(v-show="!show")
              textarea(v-model='task.status')
            .deadline
                |Deadline: {{task.time}}
            .description(v-show="show")
              |description: {{task.description1}}
            .text(v-show="!show" @change="handleChange")
                textarea(v-model='task.description1')
        button(class='add-task' v-on:click="show=!show" v-show="show") Edit
        button(class='add-task' v-on:click="show=!show" v-show="!show" @click="closeForm()") Close
        button(class='add-task' v-show="showSaveButton" @click="saveTask(task)") Save
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { emitter } from '../main'

export default defineComponent({
  name: 'task-details-modal',
  props: ['showDetailsModal', 'task'],
  data () {
    return {
      show: true,
      showSaveButton: true,
      updatedTask: {
        name: '',
        description1: '',
        time: '',
        status: ''
      }
    }
  },
  methods: {
    closeForm () {
      emitter.emit('close', this.updatedTask)
      console.log(this.updatedTask)
    },
    saveTask () {
      emitter.emit('save', this.updatedTask)
    },
    handleChange () {
      this.showSaveButton = true
    }
  },
  created () {
    this.updatedTask = JSON.parse(JSON.stringify(this.task))
  }
})
</script>
