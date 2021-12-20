<template lang="pug">
section
  .content()
    router-view(:tasks='tasks')

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { emitter } from '../main'
import { TaskInterface } from '@/types/task.interface'

export default defineComponent({
  name: 'app-section',

  data () {
    const tasks: TaskInterface[] = []
    return {
      tasks
    }
  },
  mounted () {
    emitter.on('giveTasks', tasks => {
      this.tasks = tasks as TaskInterface[]
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
