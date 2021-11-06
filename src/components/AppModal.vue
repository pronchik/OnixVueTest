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
  methods: {
    btnYes () {
      this.$emit('incr-tasks', 1)
      this.$emit('close-modal', 'none')
    },
    btnNo () {
      this.$emit('close-modal', 'none')
    }
  }
})
</script>
