<template lang="pug">
.error
  h1 Page not found
router-link(:to="{ name: 'tasks'}")
  button( class='go-home') Go to home page
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'page-not-found'
})
</script>
