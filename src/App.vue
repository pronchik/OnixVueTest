<template lang="pug">
Layout
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue' // @ is an alias to /src
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    Layout
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('SET_TASKS_TO_STATE')
    })
  }
})

</script>

<style lang="scss">
</style>
