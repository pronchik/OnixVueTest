<template lang="pug">
.introduction(:class='{ active: showMobileMenu }')
    .profile-info
      img.user-img(:src='require(`../assets/${img}`)' alt='user-img')
      .name-position
        p(:class='{ active: showMobileMenu }')
          | {{fullName}}
        span(:class='{ active: showMobileMenu }')
          | {{position}}
    .circle(:class='{ active: showMobileMenu }')
      span
      span
      span
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'profile',
  data () {
    return {
      fullName: 'Maksym Pron',
      position: 'Devepoler',
      img: 'me.png'
    }
  },
  props: ['showMobileMenu']
})
</script>
