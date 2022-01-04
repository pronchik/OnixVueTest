<template lang="pug">
.card(:class="{future: isFuture, failDeadline: isFailDeadline }")
    .point(:class="{soon: isSoon, }")
    .name
        | {{task.name}}
    .deadline
        | {{time}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'
export default defineComponent({
  name: 'TaskCard',
  props: ['task'],
  computed: {
    time () {
      return this.task.time
    },
    isFailDeadline () {
      const timeOftask = +moment(this.task.time)
      const currentTime = +moment()
      var milliseconds = timeOftask - currentTime
      var seconds = milliseconds / 1000
      var minutes = seconds / 60
      var hours = minutes / 60
      var days = hours / 24
      return days < 0
    },
    isSoon () {
      const timeOftask = +moment(this.task.time)
      const currentTime = +moment()
      var milliseconds = timeOftask - currentTime
      var seconds = milliseconds / 1000
      var minutes = seconds / 60
      var hours = minutes / 60
      var days = hours / 24
      return days <= 1 && days > 0
    },
    isFuture () {
      return moment(this.task.time).isAfter(moment())
    }
  }
})
</script>
<style scoped>
.future {
  background-color: #CEF9C6;
}
.soon {
  background-color: #5eff00;
}
.failDeadline {
  background-color: #ff4500;
}
.point{
  width: 10px;
  height: 10px;
  border-radius: 30px;
  position: absolute;
  margin-left: 175px;
  margin-top: 5px;
}
</style>
