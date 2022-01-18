<template lang="pug">
.asd()
    task-details-modal(:showDetailsModal = 'showDetailsModal' :showEditButton = false :task='task' v-if="showDetailsModal === true")
.calendar
    VueCal.vuecal--blue-theme(
    selected-date=""
    :time-from="9 * 60"
    :disable-views="['years', 'year', 'week', 'day']"
    active-view="month"
    hide-weekends=false
    passive=true
    events-on-month-view="short"
    :events="tasks.tasks"
    :on-event-click="onEventClick"
    style="height: 500px")
      template(v-slot:no-event=""  ) No event 👌
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import VueCal from 'vue-cal'
import { useStore } from 'vuex'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { emitter } from '../main'
export default defineComponent({
  name: 'calendar',
  components: {
    VueCal,
    TaskDetailsModal
  },
  setup () {
    const showDetailsModal = ref(false)
    const task = ref('')
    const store = useStore()
    const tasks = store.state.tasks
    const onEventClick = e => {
      task.value = tasks.tasks.find(task => task.id === e.id)
      showDetailsModal.value = true
    }
    onMounted(() => {
      emitter.on('close', () => {
        showDetailsModal.value = false
      })
    })
    return {
      showDetailsModal,
      task,
      tasks,
      onEventClick
    }
  }
})
</script>
