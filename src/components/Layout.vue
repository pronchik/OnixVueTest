<template lang="pug">
.wrapper
    app-sidebar(:showMobileMenu = "showMobileMenu" @update:showMobileMenu="showMobileMenu = $event")
    app-header-section(:showMobileMenu = "showMobileMenu")
</template>

<script lang="ts">
import AppSidebar from '@/components/AppSidebar.vue' // @ is an alias to /src
import AppHeaderSection from '@/components/AppHeaderSection.vue' // @ is an alias to /src
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    AppSidebar,
    AppHeaderSection
  },
  data () {
    return {
      showMobileMenu: false
    }
  }
})

</script>

<style lang="scss">
</style>
