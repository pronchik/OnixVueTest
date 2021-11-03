<template lang="pug">
nav
  .website-redesign
    .left-part
      img(src='../assets/Shapes@2x.png' alt='Redesign')
      span Website Redesign
      .circle
        span
        span
        span
    .right-part
      .users-online(v-for='user in users' :key='user')
        img(:src='require(`../assets/${user.img}`)' alt='user-img')
      .share
        span Share
      .chat
        img(src='../assets/CombinedShape@1x.svg' alt='chat')
        span Chat
  .navigation
    ul
      li
        a(href='#' @click="selectTasks('block')") Tasks
      li
        a(href='#'  @click="selectKanban('block')") Kanban
      li
        a(href='#'  @click="selectActivity('block')") Activity
      li
        a(href='#'  @click="selectCalendar('block')") Calendar
      li
        a(href='#' @click="selectFiles('block')") Files
  .marker
    span(:style='{ display: spanTasks }')
    span(:style='{ display: spanKanban }')
    span.third-marker(:style='{ display: spanActivity }')
    span.fourth-marker(:style='{ display: spanCalendar}')
    span(:style='{ display: spanFiles }')
  select#select(name='Select page' onchange='selectContentSelector()')
    option Activity
    option Tasks
    option Kanban
    option Calendar
    option Files

</template>

<script lang="ts">
import { emitter } from '../main'
import { defineComponent } from 'vue'
export default defineComponent({
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      spanActivity: 'block',
      spanTasks: 'none',
      spanCalendar: 'none',
      spanFiles: 'none',
      spanKanban: 'none',
      users: [
        {
          img: 'me.png'
        },
        {
          img: 'me.png'
        },
        {
          img: 'me.png'
        }
      ]
    }
  },
  methods: {
    selectTasks (display : string): void {
      emitter.emit('selectTasks', display)
      this.spanTasks = 'block'
      this.spanActivity = 'none'
      this.spanCalendar = 'none'
      this.spanFiles = 'none'
      this.spanKanban = 'none'
    },
    selectActivity (display : string): void {
      emitter.emit('selectActivity', display)
      this.spanTasks = 'none'
      this.spanActivity = 'block'
      this.spanCalendar = 'none'
      this.spanFiles = 'none'
      this.spanKanban = 'none'
    },
    selectKanban (display : string): void {
      emitter.emit('selectKanban', display)
      this.spanTasks = 'none'
      this.spanActivity = 'none'
      this.spanCalendar = 'none'
      this.spanFiles = 'none'
      this.spanKanban = 'block'
    },
    selectCalendar (display : string): void {
      emitter.emit('selectCalendar', display)
      this.spanTasks = 'none'
      this.spanActivity = 'none'
      this.spanCalendar = 'block'
      this.spanFiles = 'none'
      this.spanKanban = 'none'
    },
    selectFiles (display : string): void {
      emitter.emit('selectFiles', display)
      this.spanTasks = 'none'
      this.spanActivity = 'none'
      this.spanCalendar = 'none'
      this.spanFiles = 'block'
      this.spanKanban = 'none'
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
