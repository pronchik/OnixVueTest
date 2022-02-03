<template lang="pug">
.asd()
    task-details-modal(:showEditButton = false :task='task' v-if="showDetailsModal === true")
.calendar
    VueCal.vuecal--blue-theme(
    selected-date=""
    :time-from="9 * 60"
    :disable-views="['years', 'year', 'week', 'day']"
    active-view="month"
    hide-weekends=false
    passive=true
    events-on-month-view="short"
    :events="taskList"
    :on-event-click="onEventClick"
    style="height: 500px")
      template(v-slot:no-event=""  ) No event 👌
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueCal from 'vue-cal'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import openTaskDescription from '@/composables/openTaskDescription'
export default defineComponent({
  name: 'calendar',
  components: {
    VueCal,
    TaskDetailsModal
  },
  setup () {
    const { taskList, task, showDetailsModal } = openTaskDescription('')
    const onEventClick = e => {
      task.value = taskList.value.find(task => task.id === e.id)
      showDetailsModal.value = true
    }
    return {
      showDetailsModal,
      task,
      taskList,
      onEventClick
    }
  }
})
</script>
