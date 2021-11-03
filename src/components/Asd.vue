<template lang="pug">
.asd(:class='{ active: showMobileMenu }')
    Nav
    Section
</template>

<script lang="ts">
import Nav from '@/components/Nav.vue' // @ is an alias to /src
import Section from '@/components/Section.vue' // @ is an alias to /src
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Nav,
    Section
  },
  props: ['showMobileMenu']
})

</script>

<style lang="scss">
</style>
