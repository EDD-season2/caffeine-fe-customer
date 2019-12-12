<template>
  <v-card
    class="ma-auto"
    max-width="540"
  >
    <v-container
      class="pa-0 ma-12"
    >
      <v-row class="xs12 mr-10">
        <v-col class="xs2" >
          <v-avatar size="92">
            <v-img
              :src="menuItem.img"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col class="xs6" align-self="start">
          <v-text><p><strong>{{menuItem.name}}</strong></p></v-text>
          <v-text><p>{{menuItem.nameInEnglish}}</p></v-text>
          <v-text><p><strong>{{menuItem.price}} 원</strong></p></v-text>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-btn color="blue darken-1" text @click="finishDialog">취소</v-btn>
      <v-btn color="blue darken-1" text @click="orderCurrentMenuItem">바로구매</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MenuItem from '@/models/MenuItem'

@Component
export default class MenuItemModal extends Vue {
  @Prop() private menuItem!: MenuItem

  private orderCurrentMenuItem () {
    localStorage.currentMenuItemJson = this.menuItem.toJson()
    this.finishDialog()
    this.$router.push({ path: `/order` })
  }
  // 부모 컴포넌트에게 'finishDialog' 이벤트를 전달
  // 부모 컴포넌트에게 무언가 발생했다는 신호만 보냄
  private finishDialog () {
    this.$emit('finishDialog')
  }
}
</script>
