<template>
<div class="wrapper">
    <Aside/>
    <Asd/>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Aside from '@/components/Aside.vue' // @ is an alias to /src
import Asd from '@/components/Asd.vue' // @ is an alias to /src
@Options({
  components: {
    Aside,
    Asd
  }
})

export default class Home extends Vue {}

</script>

<style lang="scss">
</style>
