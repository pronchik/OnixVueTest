<template lang="pug">
.error
  h1 Cooming soon...
router-link(:to="{ name: 'tasks'}")
  button( class='go-home') Go to home page
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'cooming-soon'
})
</script>
