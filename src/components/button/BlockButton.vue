<template>
  <v-btn class="brown darken-1" dark block @click="clickHandler" >{{message}}</v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BlockButton extends Vue {
  @Prop() private message!: string
  @Prop() private clickHandler: any
}

</script>
