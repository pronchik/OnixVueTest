<template lang="pug">
.wrapper
    Aside(:showMobileMenu = "showMobileMenu" @update:showMobileMenu="showMobileMenu = $event")
    Asd(:showMobileMenu = "showMobileMenu")
</template>

<script lang="ts">
import Aside from '@/components/Aside.vue' // @ is an alias to /src
import Asd from '@/components/Asd.vue' // @ is an alias to /src
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Aside,
    Asd
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
