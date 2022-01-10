<template lang="pug">
.card(:class="{future: isFuture, failDeadline: isFailDeadline }")
    .point(:class="{soon: isSoon, }")
    .name
        | {{task.title}}
    .deadline
        | {{time}}
        .imgStatus(v-if="isStatusInprogress")
           img( src='../assets//statusInprog.png' width='15' height='15' alt='statusInprog')
        .imgStatus(v-if="isStatusTodo")
           img( src='../assets//statusTodo.png' width='15' height='15'  alt='statusTodo')
        .imgStatus(v-if="isStatusDone" )
         img(src='../assets//statusDone.png' width='15' height='15' alt='statusDone')

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
export default defineComponent({
  name: 'TaskCard',
  props: ['task'],
  computed: {
    time () {
      return this.task.time
    },
    isFailDeadline () {
      const timeOftask = +new Date(this.task.time)
      const currentTime = +new Date()
      var milliseconds = timeOftask - currentTime
      var seconds = milliseconds / 1000
      var minutes = seconds / 60
      var hours = minutes / 60
      var days = hours / 24
      return days < -1
    },
    isSoon () {
      const timeOftask = +new Date(this.task.time)
      const currentTime = +new Date()
      var milliseconds = timeOftask - currentTime
      var seconds = milliseconds / 1000
      var minutes = seconds / 60
      var hours = minutes / 60
      var days = hours / 24
      return days <= 1 && days >= -1
    },
    isFuture () {
      return moment(this.task.time).isAfter(moment())
    },
    isStatusInprogress () {
      return this.task.status === TaskStatusEnum.INPROGRESS
    },
    isStatusDone () {
      return this.task.status === TaskStatusEnum.DONE
    },
    isStatusTodo () {
      return this.task.status === TaskStatusEnum.TODO
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
