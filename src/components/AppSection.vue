<template lang="pug">
section
  .content
    router-view

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tasks from '../views/Tasks.vue'
import Kanban from '../views/Kanban.vue'
import Activity from '../views/Activity.vue'
import Calendar from '../views/Calendar.vue'
import Files from '../views/Files.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ComingSoon from '../views/ComingSoon.vue'

export default defineComponent({
  name: 'app-section',
  components: {
    Tasks,
    Kanban,
    Activity,
    Calendar,
    Files,
    PageNotFound,
    ComingSoon
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
