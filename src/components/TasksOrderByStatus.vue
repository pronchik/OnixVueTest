<template lang="pug">
.asd(v-if="Object.keys(this.task).length !== 0" :v-if="showDetailsModal === true")
  task-details-modal(:showDetailsModal = 'showDetailsModal' :task = 'task' v-if="showDetailsModal === true")
.task(v-for='(task, index) in tasks' :key='task.index'  class="list-item" draggable="true" @dragstart="startDrag($event, task)" @click="openModal(index)")
      .card()
        .name()
          | {{task.name}}
        .deadline
          | {{task.time}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { emitter } from '../main'

export default defineComponent({
  name: 'tasks-order-by-status',
  props: ['tasks'],

  components: {
    TaskDetailsModal
  },
  data () {
    return {
      TaskStatusEnum,
      showDetailsModal: false,
      task: {}
    }
  },
  methods: {
    openModal (index) {
      this.showDetailsModal = true
      this.task = this.tasks[index]
    },
    startDrag (event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemName', item.name)
      event.dataTransfer.setData('itemStatus', item.status)
    }
  },
  mounted () {
    emitter.on('close', () => {
      this.showDetailsModal = false
    })
    emitter.on('save', () => {
      this.showDetailsModal = false
    })
  }

})
</script>
