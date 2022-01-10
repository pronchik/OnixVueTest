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
import { mapState } from 'vuex'
export default defineComponent({
  computed: {
    ...mapState(['messages']),
    files () {
      const imges = []
      for (let i = 0; i < this.messages.length; i++) {
        const img = this.messages[i].pictures
        if (img !== undefined) {
          for (let j = 0; j < img.length; j++) {
            imges.push(img[j].img.split('.')[0] as never)
          }
        }
      }
      return imges
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
