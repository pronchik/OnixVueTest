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
        router-link(:to="{ name: 'tasks'}" active-class="selecttasks") Tasks
          span
      li
        router-link(:to="{ name: 'kanban'}" active-class="selectkanban") Kanban
          span
      li
        router-link(:to="{ name: 'activity'}" active-class="selectactivity") Activity
          span.third-marker( )
      li
        router-link(:to="{ name: 'calendar'}" active-class="selectcalendar") Calendar
          span.fourth-marker( )
      li
        router-link(:to="{ name: 'files'}" active-class="selectfiles") Files
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
export default defineComponent({
  name: 'app-header',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      currentTab: 'tasks',
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
    changeRoute (event) {
      const path = event.target.value
      this.$router.push({ path: `/${path}` })
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
