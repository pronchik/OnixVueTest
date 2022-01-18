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
import { computed, defineComponent, ref } from 'vue'
import moment from 'moment'
import { TaskStatusEnum } from './../enums/TaskStatusEnum'
export default defineComponent({
  name: 'TaskCard',
  props: ['task'],
  setup (props) {
    const time = ref(props.task.time)
    const isFailDeadline = computed(() => {
      const currentDate = Date.now()
      const taskDate = Date.parse(props.task.time)
      return (taskDate - currentDate) / 86400000 < -1
    })
    const isSoon = computed(() => {
      const timeOftask = +new Date(props.task.time)
      const currentTime = +new Date()
      var milliseconds = timeOftask - currentTime
      var seconds = milliseconds / 1000
      var minutes = seconds / 60
      var hours = minutes / 60
      var days = hours / 24
      return days <= 1 && days >= -1
    })
    const isFuture = computed(() => {
      return moment(props.task.time).isAfter(moment())
    })
    const isStatusInprogress = computed(() => {
      return props.task.status === TaskStatusEnum.INPROGRESS
    })
    const isStatusTodo = computed(() => {
      return props.task.status === TaskStatusEnum.TODO
    })
    const isStatusDone = computed(() => {
      return props.task.status === TaskStatusEnum.DONE
    })
    return {
      time,
      isFailDeadline,
      isSoon,
      isFuture,
      isStatusInprogress,
      isStatusTodo,
      isStatusDone
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
