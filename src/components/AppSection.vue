<template lang="pug">
section
  .content(v-if="changeTab === 'activity'")
    Activity
  .content(v-if="changeTab === 'tasks'")
    Tasks
  .content(v-if="changeTab === 'kanban'")
    Kanban
  .content(v-if="changeTab === 'calendar'")
    Calendar
  .content(v-if="changeTab === 'files'")
    Files

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { emitter } from '../main'
import Tasks from '@/components/Tasks.vue'
import Kanban from '@/components/Kanban.vue'
import Activity from '@/components/Activity.vue'
import Calendar from '@/components/Calendar.vue'
import Files from '@/components/Files.vue'

export default defineComponent({
  name: 'app-section',
  components: {
    Tasks,
    Kanban,
    Activity,
    Calendar,
    Files
  },
  data () {
    return {
      changeTab: 'activity'
    }
  },
  mounted () {
    emitter.on('changeTab', changeTab => {
      this.changeTab = changeTab as string
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
