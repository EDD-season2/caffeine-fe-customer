<template>
  <v-card
    class="ma-auto"
    max-width="540"
  >
    <!-- 컴포넌트로 묶기 -->
    <v-container>
      <v-row cols="12" class="ma-0">
        <v-col cols="4" class="mr-2">
          <v-avatar size="92">
            <v-img
              :src="menuItem.image"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="7" align-self="start">
          <p><strong>{{menuItem.name}}</strong></p>
          <p>{{menuItem.nameInEnglish}}</p>
          <p><strong>{{menuItem.price}} 원</strong></p>
        </v-col>
        <v-col cols="12">
          <p class="border-brown pa-4">{{menuItem.description}}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <!-- 컴포넌트로 묶기 -->
      <v-container class="pa-0">
        <v-row justify="space-around" class="ma-0">
          <v-col class="pa-0 ma-2">
            <BlockButton :message="'취소'" :clickHandler="finishDialog"/>
          </v-col>
          <v-col class="pa-0 ma-2">
            <BlockButton :message="'바로 구매'" :clickHandler="orderCurrentMenuItem"/>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import BlockButton from '@/components/button/BlockButton.vue'

import MenuItem from '@/models/MenuItem'

@Component({
  components: {
    BlockButton
  }
})
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

<style scoped>
.border-brown {
  border: solid 1px grey;
}
</style>
