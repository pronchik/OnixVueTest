<template lang="pug">
.tasks
  .asd(v-if="Object.keys(this.task).length !== 0")
    task-details-modal(:showDetailsModal = 'showDetailsModal' :task = 'task' :showEditButton='showEditButton' v-if="showDetailsModal")
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
          button(class='delete-task' @click="deleteCart(index)") -
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { emitter } from '../main'
import TaskModal from '@/components/TaskModal.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    TaskModal,
    TaskDetailsModal
  },
  setup () {
    const store = useStore()
    const taskList = store.state.tasks.tasks
    const showModal = ref('none')
    const task = ref('')
    const showDetailsModal = ref(false)
    const showEditButton = true

    const openModal = () => {
      showModal.value = 'block'
    }
    const openTaskModal = (index) => {
      task.value = taskList[index]
      showDetailsModal.value = true
    }
    // deleteTask
    const deleteCart = index => {
      store.commit('deleteTask', index)
    }
    // blink 3 tasks
    const itemRefs = ref([])
    const setItemRef = (el: never) => {
      if (el) {
        itemRefs.value.push(el)
      }
    }
    const blink = () => {
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
    }
    onMounted(blink)
    // add task
    const takeTask = () => {
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
    }
    onMounted(takeTask)
    const closeModal = () => {
      emitter.on('close', () => {
        showDetailsModal.value = false
      })
    }
    onMounted(closeModal)
    return {
      taskList,
      openModal,
      showModal,
      task,
      showDetailsModal,
      openTaskModal,
      deleteCart,
      itemRefs,
      setItemRef,
      showEditButton
    }
  }
})
</script>
