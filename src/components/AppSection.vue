<template lang="pug">
section
  .content()
    router-view

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app-section'
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="">

</style>
