<template lang="pug">
.header-section(:class='{ active: showMobileMenu }')
    app-header
    app-section
</template>

<script lang="ts">
import AppHeader from '@/components/AppHeader.vue' // @ is an alias to /src
import AppSection from '@/components/AppSection.vue' // @ is an alias to /src
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'app-header-section',
  components: {
    AppHeader,
    AppSection
  },
  props: ['showMobileMenu']
})

</script>

<style lang="scss">
</style>
