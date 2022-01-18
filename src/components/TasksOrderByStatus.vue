<template lang="pug">
.numberOfTasks()
  |{{numberOfTasks}}
.asd(v-if="Object.keys(this.task).length !== 0 && showDetailsModal === true")
  task-details-modal(:showDetailsModal = 'showDetailsModal' :showEditButton='showEditButton' :task = 'task' v-if="showDetailsModal === true")
.task(v-for='(task, index) in tasks' :key='task.index'  class="list-item" draggable="true" @dragstart="startDrag($event, task)" @click="openModal(index)")
      TaskCard(:task='task')
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { emitter } from '../main'
import { TaskInterface } from '@/types/task.interface'
import TaskCard from '@/components/TaskCard.vue'

export default defineComponent({
  name: 'tasks-order-by-status',
  props: ['tasks'],
  components: {
    TaskDetailsModal,
    TaskCard
  },
  setup (props) {
    const showDetailsModal = ref(false)
    const task = ref({}as TaskInterface)
    const showEditButton = ref(true)
    const numberOfTasks = computed(() => {
      return props.tasks.length
    })
    const openModal = index => {
      task.value = props.tasks[index]
      if (task.value.status !== TaskStatusEnum.DONE) {
        showDetailsModal.value = true
      } else {
        alert('You can`t edit this task')
      }
    }
    const startDrag = (event, item:TaskInterface) => {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemId', item.id)
      event.dataTransfer.setData('itemStatus', item.status)
    }
    const close = () => {
      emitter.on('close', () => {
        showDetailsModal.value = false
      })
    }
    const save = () => {
      emitter.on('save', () => {
        showDetailsModal.value = false
      })
    }
    onMounted(save)
    onMounted(close)
    return {
      TaskStatusEnum,
      openModal,
      startDrag,
      showEditButton,
      numberOfTasks,
      showDetailsModal,
      task
    }
  }
})
</script>
