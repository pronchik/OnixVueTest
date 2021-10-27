<template>
    <div class="message">
                        <span>
                            <img src="../assets/Icon@3x.svg" alt="checkmark">
                        </span>
                        <div class="text">
                            <p>{{message}}</p>
                            <p>{{time}}</p>
                        </div>
                    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    message: String,
    time: String
  }
})

export default class Home extends Vue {}

</script>

<style lang="scss">
</style>
