<template>
  <div class="deletable-menu-list-element">
    <v-list-item>
      <v-list-item-avatar size="62" tile>
         <v-img :src="menuItem.image"></v-img>
         </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title><strong>{{menuItem.name}}</strong></v-list-item-title>
        <v-list-item-subtitle v-text="menuItem.nameInEnglish"></v-list-item-subtitle>
        <v-spacer></v-spacer>
        <v-list-item-title><strong>{{menuItem.price}} 원</strong></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon>
          <v-icon @click="clickDelete" class="font-weight-bold" color="brown darken-1">mdi-close-circle</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MenuItem from '@/models/MenuItem'

// Component 가 없으면 menuItem 을 템플릿에서 사용하지 못하는 것 같음
@Component
export default class DeletableMenuListElement extends Vue {
  @Prop() private menuItem!: MenuItem;
  @Prop() private index!: number;

  private clickDelete () {
    this.$emit('delete-element', this.index)
  }
}
</script>

<style lang="scss" scoped>
strong {
  font-weight: 800;
}
</style>
