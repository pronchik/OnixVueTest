<template lang="pug">
.tasks
  h2
      span Tasks
        .nadesti
          .nades
            span Name
            span Description
          span Deadline
        .task(v-for='task in tasks' :key='task')
          .name
            | {{task.name}}
          .description
            | {{task.description1}}
          .time
            | {{task.time}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TaskInterface } from '@/types/task.interface'
export default defineComponent({
  data () {
    const tasks: TaskInterface[] = [
      {
        name: 'Create app',
        description1: 'Use smth ',
        time: '02.12.2021'
      },
      {
        name: 'Fix bugs',
        description1: 'Fix all bugs',
        time: '02.12.2021'
      }
    ]
    return {
      tasks
    }
  }
})
</script>
