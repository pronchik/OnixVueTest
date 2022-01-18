<template lang="pug">
.files
    span() Files
        table(v-for='pictures in files')
            tr
                td
                  |{{pictures}}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const files = computed(() => store.getters.files)
    return {
      files
    }
  }
})
</script>

<style lang="css">
table {
  table-layout: fixed !important;
  width: 300px !important;
  border: 3px double black !important;
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

th, td {
  padding: 5px !important;
}
</style>
