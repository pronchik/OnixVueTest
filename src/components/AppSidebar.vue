<template lang="pug">
aside(ref='aside' :class='{ active: showMobileMenu }')
  app-modal(:display = 'display'
    :numberOfOpenTasks = 'numberOfOpenTasks'
    :numberOfCompletedTasks = 'numberOfCompletedTasks'
    @incr-tasks="numberOfCompletedTasks += $event; numberOfOpenTasks -= $event"
    @close-modal="display = $event")
  .project-logo
    a(href='#' @click="$emit('update:showMobileMenu', !this.showMobileMenu)")
      img#project-logo(src='../assets/Logo@3x.svg' alt='logo' :class='{ active: showMobileMenu }')
      span(:class='{ active: showMobileMenu }') {{msg}}
    img#search(src='../assets/Search@3x.svg' alt='search' :class='{ active: showMobileMenu }')
  Profile(:showMobileMenu = "showMobileMenu")
  .statistic(:class='{ active: showMobileMenu }')
    .completed-tasks(@click='showModal()')
      p {{numberOfCompletedTasks}}
      span Completed tasks
    router-link(style="text-decoration: none;" :to="{ name: 'tasks'} ")
      .open-tasks
        p {{numberOfOpenTasks}}
        span Open tasks
  .menu(:class='{ active: showMobileMenu }')
    span(:class='{ active: showMobileMenu }') MENU
    ul(:class='{ active: showMobileMenu }')
      li
        router-link(:to="{path: '/activity'}" exact='' tag='li')
          a Home
      li(v-if='numberOfOpenTasks > 0')
        router-link(:to="{path: '/tasks'}" exact='' tag='li')
          a My Tasks
      li
        router-link(:to="{ name: 'cooming-soon'}") Notification
        .notifications
          span {{activity.notification}}
  .img-menu
    router-link(:to="{path: '/activity'}")
      img(src='../assets//home.png' alt='' :class='{ active: showMobileMenu }')
    router-link(:to="{path: '/tasks'}" v-if='numberOfOpenTasks > 0')
      img(src='../assets//list.png' alt='' :class='{ active: showMobileMenu }')
    router-link(:to="{ name: 'cooming-soon'}")
      img(src='../assets//notif.png' alt='' :class='{ active: showMobileMenu }')
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import Profile from '@/components/Profile.vue'
import AppModal from '@/components/AppModal.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'app-sidebar',
  components: {
    Profile,
    AppModal
  },
  props: ['showMobileMenu'],
  setup () {
    const store = useStore()
    const activity = store.state.activity
    const msg = 'PROJECTUS'
    const numberOfOpenTasks = ref(2)
    const numberOfCompletedTasks = ref(256)
    const display = ref('none')
    const showModal = () => {
      if (numberOfOpenTasks.value > 0) {
        display.value = 'block'
      } else {
        alert('You haven`t open tasks!')
      }
    }
    return {
      msg,
      numberOfCompletedTasks,
      numberOfOpenTasks,
      display,
      activity,
      showModal
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
