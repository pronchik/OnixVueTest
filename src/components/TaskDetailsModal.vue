<template lang="pug">
.modal-task(v-if="showDetailsModal === true")
    .modal-task-details
        .task
            button(class='close' v-on:click="close()") x
            .name(v-if="show")
                |Name: {{task.name}}
            .text(v-if="!show" @change="handleChange")
                textarea(v-model='updatedTask.name')
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
            .text(v-if="!show" @change="handleChange")
                textarea(v-model='updatedTask.description1')
        button(class='add-task' v-on:click="show=!show" v-if="show") Edit
        button(class='add-task' v-if="!show" @click="cancleForm()") Cancle
        button(class='add-task' v-if="showSaveButton" @click="saveTask(task)") Save
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { emitter } from '../main'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'

export default defineComponent({
  name: 'task-details-modal',
  props: ['showDetailsModal', 'task'],
  data () {
    return {
      show: true,
      showSaveButton: false,
      updatedTask: {
        name: '',
        description1: '',
        time: '',
        status: ''
      },
      TaskStatusEnum
    }
  },
  methods: {
    cancleForm () {
      this.show = true
    },
    close () {
      emitter.emit('close')
    },
    saveTask () {
      if (new Date(this.updatedTask.time) > new Date()) {
        emitter.emit('save', this.updatedTask)
      }
      if (new Date(this.updatedTask.time) < new Date()) {
        alert('Wrong date')
      }
    },
    handleChange () {
      this.showSaveButton = true
    }
  },
  created () {
    this.updatedTask = JSON.parse(JSON.stringify(this.task))
    // console.log(this.updatedTask)
  }
})
</script>
