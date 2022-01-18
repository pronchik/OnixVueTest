<template lang="pug">
.modal(:style="{display: display}")
    .modal-content
      p Are you sure you want to change the number of tasks?
      .buttons
        button.yes(@click='btnYes()') Yes
        button.no(@click='btnNo()') No
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'app-modal',
  props: ['display', 'numberOfOpenTasks', 'numberOfCompletedTasks'],
  setup (props, { emit }) {
    const btnYes = () => {
      emit('incr-tasks', 1)
      emit('close-modal', 'none')
    }
    const btnNo = () => {
      emit('close-modal', 'none')
    }
    return {
      btnNo,
      btnYes
    }
  }
})
</script>
