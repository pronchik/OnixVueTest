<template lang="pug">
.numberOfTasks()
  |{{numberOfTasks}}
.asd(v-if="Object.keys(this.task).length !== 0 && showDetailsModal === true")
  task-details-modal(:showDetailsModal = 'showDetailsModal' :showEditButton='showEditButton' :task = 'task' v-if="showDetailsModal === true")
.task(v-for='(task, index) in tasks' :key='task.index'  class="list-item" draggable="true" @dragstart="startDrag($event, task)" @click="openModalWithProps(index)")
      TaskCard(:task='task')
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { TaskInterface } from '@/types/task.interface'
import TaskCard from '@/components/TaskCard.vue'
import openTaskDescription from '@/composables/openTaskDescription'
export default defineComponent({
  name: 'tasks-order-by-status',
  props: ['tasks'],
  components: {
    TaskDetailsModal,
    TaskCard
  },
  setup (props) {
    const { task, showDetailsModal, openModalWithProps } = openTaskDescription(props)
    const showEditButton = ref(true)
    const numberOfTasks = computed(() => {
      return props.tasks.length
    })
    const startDrag = (event, item:TaskInterface) => {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemId', item.id)
      event.dataTransfer.setData('itemStatus', item.status)
    }
    return {
      TaskStatusEnum,
      openModalWithProps,
      startDrag,
      showEditButton,
      numberOfTasks,
      showDetailsModal,
      task
    }
  }
})
</script>
