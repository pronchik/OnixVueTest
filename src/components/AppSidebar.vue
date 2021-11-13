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
    .open-tasks(@click="goToTasks()")
      p {{numberOfOpenTasks}}
      span Open tasks
  .menu(:class='{ active: showMobileMenu }')
    span(:class='{ active: showMobileMenu }') MENU
    ul(:class='{ active: showMobileMenu }')
      li(@click="goToHome();changeAsideTab('activity')")
        | Home
      li(@click="goToTasks();")
        | My Tasks
      li(@click="coomingSoon()")
        | Notifications
        .notifications
          span {{notifications}}
  .img-menu
    img(src='../assets//home.png' alt='' :class='{ active: showMobileMenu }' @click="goToHome();changeAsideTab('activity')")
    img(src='../assets//list.png' alt='' :class='{ active: showMobileMenu }' @click="goToTasks();")
    img(src='../assets//notif.png' alt='' :class='{ active: showMobileMenu }' @click="coomingSoon()")
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { emitter } from '../main'
import Profile from '@/components/Profile.vue'
import AppModal from '@/components/AppModal.vue'
export default defineComponent({
  name: 'app-sidebar',
  components: {
    Profile,
    AppModal
  },
  data () {
    return {
      msg: 'PROJECTUS',
      numberOfOpenTasks: 2,
      numberOfCompletedTasks: 256,
      display: 'none',
      notifications: 3 as number
    }
  },
  props: ['showMobileMenu'],
  methods: {
    goToTasks () {
      if (this.numberOfOpenTasks !== 0) {
        this.$router.push('/tasks')
        emitter.emit('changeAsideTab', 'tasks')
      } else alert('Everuthing complete')
    },
    coomingSoon () {
      this.$router.push('/Notification')
    },
    goToHome () {
      this.$router.push('/activity')
    },
    click () {
      this.$emit('update:showMobileMenu', !this.showMobileMenu)
    },
    showModal () {
      if (this.numberOfOpenTasks > 0) {
        this.display = 'block'
      } else {
        alert('You haven`t open tasks!')
      }
    },
    changeAsideTab (tab) {
      emitter.emit('changeAsideTab', tab.toLowerCase())
    }
  },
  mounted () {
    emitter.on('change', notifications => {
      this.notifications = notifications as number
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
