<template>
<div class="asd">
    <Nav/>
    <Section/>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Nav from '@/components/Nav.vue' // @ is an alias to /src
import Section from '@/components/Section.vue' // @ is an alias to /src
@Options({
  components: {
    Nav,
    Section
  }
})

export default class Home extends Vue {}
</script>

<style lang="scss">
</style>
