<template lang="pug">
.tasks
  .asd(v-if="Object.keys(this.task).length !== 0")
    task-details-modal( :task = 'task' :showEditButton='showEditButton' v-if="showDetailsModal")
  task-modal(:showModal = 'showModal' :tasks = 'taskList'
  @close-modal="showModal = $event")
  h2
      span Tasks
        button(class='add-task' @click="openModal()") +
        .nadesti
          .nades
            span Name
            span Description
          span Deadline
        .task(v-for='(task, index) in taskList' :key='task.index' :ref="setItemRef" class="list-item" )
          .name(@click="openTaskModal(index)")
            | {{task.title}}
          .description(@click="openTaskModal(index)")
            | {{task.description1}}
          .time(@click="openTaskModal(index)")
            | {{task.time}}
          button(class='delete-task' @click="deleteCart(task.id)") -
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, computed } from 'vue'
import { emitter } from '../main'
import TaskModal from '@/components/TaskModal.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import openTaskDescription from '@/composables/openTaskDescription'
export default defineComponent({
  components: {
    TaskModal,
    TaskDetailsModal
  },
  setup () {
    const { store, taskList, task, showDetailsModal, openTaskModal } = openTaskDescription('')
    const showModal = ref('none')
    const showEditButton = true
    const openModal = () => {
      showModal.value = 'block'
    }
    const deleteCart = index => {
      store.dispatch('deleteTask', index)
    }
    const itemRefs = ref(computed(() => []))
    const setItemRef = (el: never) => {
      if (el) {
        itemRefs.value.push(el)
      }
    }
    onMounted(() => {
      emitter.on('blinkLastTask', () => {
        showModal.value = 'none'
        nextTick(() => {
          const element = (itemRefs.value as unknown as HTMLElement)[itemRefs.value.length - 1]
          element.classList.add('blink')
          setTimeout(() => {
            if (element) {
              element.classList.remove('blink')
            }
          }, 4000)
        })
      })

      for (let i = 0; i < itemRefs.value.length; i++) {
        setTimeout(() => {
          if (itemRefs.value[i]) {
            (itemRefs.value as unknown as HTMLElement)[i].classList.add('increase')
          }
        }, 2000 * i)
        setTimeout(() => {
          if ((itemRefs.value as unknown as HTMLElement)[i]) {
            (itemRefs.value as unknown as HTMLElement)[i].classList.remove('increase')
          }
        }, 2000 * itemRefs.value.length)
      }
    })
    return {
      taskList,
      openModal,
      showModal,
      task,
      showDetailsModal,
      openTaskModal,
      deleteCart,
      setItemRef,
      showEditButton
    }
  }
})
</script>
