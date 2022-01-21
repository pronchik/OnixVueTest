<template lang="pug">
.activity
  h2
      span Today
        .message(v-for='item1 in messageList' :key='item1')
          .message1(style='display: flex')
            span
              img(:src='require(`../assets/${item1.img}`)' alt='checkmark')
            .text
              p {{item1.message}}
              p {{item1.time}}
          .tip(v-if='item1.tip')
            span {{item1.tip}}
          .pictures(v-if='item1.pictures')
            .picture(v-for='(picture,index) in item1.pictures' :key='index' @click="selectImg(index)")
              img(:src='require(`../assets/${picture.img}`)' alt='')
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const messageList = store.state.activity.messages
    const selectImg = index => {
      store.commit('changeNotification', index)
    }
    return {
      messageList,
      selectImg
    }
  }
})
</script>
