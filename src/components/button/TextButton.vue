<template>
  <v-btn class="brown darken-1" dark text>{{message}}</v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TextButton extends Vue {
  @Prop() private message!: string
}

</script>
