<template lang="pug">
aside(ref='aside' :class='{ active: showMobileMenu }')
  .modal(:style="{display: display}")
    .modal-content
      p Are you sure you want to change the number of tasks?
      .buttons
        button.yes(@click='btnYes()') Yes
        button.no(@click='btnNo()') No
  .project-logo
    a(href='#' @click="$emit('update:showMobileMenu', !this.showMobileMenu)")
      img#project-logo(src='../assets/Logo@3x.svg' alt='logo' :class='{ active: showMobileMenu }')
      span(:class='{ active: showMobileMenu }') {{msg}}
    img#search(src='../assets/Search@3x.svg' alt='search' :class='{ active: showMobileMenu }')
  .introduction(:class='{ active: showMobileMenu }')
    .profile-info
      img.user-img(:src='require(`../assets/${img}`)' alt='user-img')
      .name-position
        p(:class='{ active: showMobileMenu }')
          | {{fullName}}
        span(:class='{ active: showMobileMenu }')
          | {{position}}
    .circle(:class='{ active: showMobileMenu }')
      span
      span
      span
  .statistic(:class='{ active: showMobileMenu }')
    .completed-tasks(@click='showModal()')
      p {{numberOfCompletedTasks}}
      span Completed tasks
    .open-tasks
      p {{numberOfOpenTasks}}
      span Open tasks
  .menu(:class='{ active: showMobileMenu }')
    span(:class='{ active: showMobileMenu }') MENU
    ul(:class='{ active: showMobileMenu }')
      li
        | Home
      li
        | My Tasks
      li
        | Notifications
        .notifications
          span {{notifications}}
  .img-menu
    img(src='../assets//home.png' alt='' :class='{ active: showMobileMenu }')
    img(src='../assets//list.png' alt='' :class='{ active: showMobileMenu }')
    img(src='../assets//notif.png' alt='' :class='{ active: showMobileMenu }')
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { emitter } from '../main'
export default defineComponent({
  data () {
    return {
      msg: 'PROJECTUS',
      fullName: 'Maksym Pron',
      position: 'Devepoler',
      numberOfOpenTasks: 1,
      numberOfCompletedTasks: 256,
      img: 'me.png',
      display: 'none',
      notifications: 3 as number
    }
  },
  props: ['showMobileMenu'],
  methods: {
    click () {
      console.log('a')
      this.$emit('update:showMobileMenu', !this.showMobileMenu)
    },
    showModal () {
      this.display = 'block'
    },
    btnYes () {
      if (this.numberOfOpenTasks > 0) {
        this.numberOfOpenTasks--
        this.numberOfCompletedTasks++
        this.display = 'none'
      } else {
        alert('Error!')
        this.display = 'none'
      }
    },
    btnNo () {
      this.display = 'none'
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
