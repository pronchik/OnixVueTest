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
        a(href='#' @click="$router.push('/tasks'); changeTab('tasks')" ) Tasks
      li
        a(href='#'  @click="$router.push('/kanban') ; changeTab('kanban')") Kanban
      li
        a(href='#'  @click="$router.push('/activity'); changeTab('activity')") Activity
      li
        a(href='#'   @click="$router.push('/calendar'); changeTab('calendar')") Calendar
      li
        a(href='#' @click="$router.push('/files'); changeTab('files')") Files
  .marker
    .selecttasks(v-if="currentTab === 'tasks'")
      span
    .selectkanban(v-if="currentTab === 'kanban'" )
      span
    .selectactivity(v-if="currentTab === 'activity'")
      span.third-marker( )
    .selectcalendar(v-if="currentTab === 'calendar'" )
      span.fourth-marker( )
    .selectfiles(v-if="currentTab === 'files'")
      span
  select(name='Select page' @change="changeRoute($event)")
    option Activity
    option Tasks
    option Kanban
    option Calendar
    option Files
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { emitter } from '../main'
export default defineComponent({
  name: 'app-header',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      currentTab: 'activity',
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
    changeTab (tab :string) {
      this.currentTab = tab.toLowerCase()
    },
    changeRoute (event) {
      const path = event.target.value
      this.$router.push({ path: `/${path}` })
    }
  },
  mounted () {
    emitter.on('changeAsideTab', currentTab => {
      this.currentTab = currentTab as string
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
