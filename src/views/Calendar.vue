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
    :events="tasks"
    :on-event-click="onEventClick"
    style="height: 500px")
      template(v-slot:no-event=""  ) No event 👌
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueCal from 'vue-cal'
import { mapState } from 'vuex'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { emitter } from '../main'
export default defineComponent({
  name: 'calendar',
  components: {
    VueCal,
    TaskDetailsModal
  },
  data () {
    return {
      showDetailsModal: false,
      task: ''
    }
  },
  computed: {
    ...mapState(['tasks'])
  },
  methods: {
    onEventClick (e) {
      this.task = this.tasks.find(task => task.id === e.id)
      this.showDetailsModal = true
    }
  },
  mounted () {
    emitter.on('close', () => {
      this.showDetailsModal = false
    })
  }
})
</script>
