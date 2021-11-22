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
          span {{notifications}}
  .img-menu
    router-link(:to="{path: '/activity'}")
      img(src='../assets//home.png' alt='' :class='{ active: showMobileMenu }')
    router-link(:to="{path: '/tasks'}" v-if='numberOfOpenTasks > 0')
      img(src='../assets//list.png' alt='' :class='{ active: showMobileMenu }')
    router-link(:to="{ name: 'cooming-soon'}")
      img(src='../assets//notif.png' alt='' :class='{ active: showMobileMenu }')
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
    click () {
      this.$emit('update:showMobileMenu', !this.showMobileMenu)
    },
    showModal () {
      if (this.numberOfOpenTasks > 0) {
        this.display = 'block'
      } else {
        alert('You haven`t open tasks!')
      }
    }
  },
  mounted () {
    emitter.on('change', notifications => {
      this.notifications = notifications as number
    })
    emitter.on('changeNumber', numberOfOpenTasks => {
      this.numberOfOpenTasks = numberOfOpenTasks as number
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
