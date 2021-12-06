<template lang="pug">
.kanban
  .statuses
    .todo
      span To do
        .task(v-for='(task, index) in tasks' :key='task.index' :ref="`task${index}`" class="list-item")
          .card(v-if='task.status === STATUS.TODO')
            .name()
             | {{task.name}}
            .deadline
              | {{task.time}}
    .inprogress
      span In Progress
        .task(v-for='(task, index) in tasks' :key='task.index' :ref="`task${index}`" class="list-item")
          .card(v-if='task.status == STATUS.INPROGRESS')
            .name
             | {{task.name}}
            .deadline
              | {{task.time}}
    .done
      span Done
        .task(v-for='(task, index) in tasks' :key='task.index' :ref="`task${index}`" class="list-item")
          .card(v-if='task.status === STATUS.DONE')
            .name
             | {{task.name}}
            .deadline
              | {{task.time}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import STATUS from './../enums/TaskStatusEnum'
export default defineComponent({
  props: ['tasks'],
  data () {
    return {
      STATUS
    }
  }
})
</script>
