<template lang="pug">
.files
    span() Files
        table(v-for='pictures in files')
            tr
                td
                  |{{pictures}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapGetters } from 'vuex'
export default defineComponent({
  computed: {
    ...mapState(['messages']),
    ...mapGetters(['files'])
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
