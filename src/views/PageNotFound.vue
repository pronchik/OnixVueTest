<template lang="pug">
.error
  h1 Page not found
button( class='go-home' href='#' @click="goToHome()" ) Go to home page
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { emitter } from '../main'
export default defineComponent({
  name: 'page-not-found',
  methods: {
    goToHome () {
      this.$router.push('/activity')
      emitter.emit('changeAsideTab', 'activity')
    }
  }
})
</script>
