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
        <v-col cols="12" class="pa-0">
          <p class="border-grey pa-4 ma-0">{{menuItem.description}}</p>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <!-- 컴포넌트로 묶기 -->
      <v-container class="pa-0">
        <v-row justify="space-around" class="ma-0">
          <v-col class="pa-1 ma-0" cols="6">
            <BlockButton :message="'취소'" :clickHandler="finishDialog"/>
          </v-col>
          <v-col class="pa-1 ma-0" cols="6">
            <BlockButton :message="'바로 구매'" :clickHandler="orderMenuItem"/>
          </v-col>
          <v-col class="pa-1 ma-0" cols="12">
            <BlockButton :message="'담기'" class="brown darken-4" :clickHandler="addMenuItemToCart"/>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import BlockButton from '@/components/button/BlockButton.vue'
import { cartEventBus } from '@/components/bus/CartEventBus'

import MenuItem from '@/models/MenuItem'
import Order from '@/models/Order'
import Cart from '@/models/Cart'

@Component({
  components: {
    BlockButton
  }
})
export default class MenuItemModal extends Vue {
  @Prop() private menuItem!: MenuItem

  private dialog: boolean = false

  private orderMenuItem () {
    this.addMenuItemToOrder()
    this.finishDialog()
    this.$router.push({ path: `/order` })
  }

  private addMenuItemToOrder () {
    let currentOrder: Order = Order.ofJson(localStorage.currentOrderJson)
    currentOrder.menuItems = [this.menuItem]
    localStorage.currentOrderJson = currentOrder.toJson()
  }

  private addMenuItemToCart () {
    // [TODO] cart 에 담긴 가게와 현재 담을 아이템의 가게가 다른 경우처리
    if (!localStorage.currentCartJson) {
      console.log('empty currentCartJson')
      localStorage.currentCartJson = Cart.emptyCart.toJson()
    }
    let cart: Cart = Cart.ofJson(localStorage.currentCartJson)
    cart.shop = this.getCurrentShop()
    cart.pushMenuItem(this.menuItem)
    localStorage.currentCartJson = cart.toJson()
    cartEventBus.$emit('update-cart')
    this.$emit('finish-dialog')
  }

  private getCurrentShop () {
    let currentOrder: Order = Order.ofJson(localStorage.currentOrderJson)
    return currentOrder.shop
  }

  private handleClick (click: any) {
    console.log('clicked')
  }

  private closeModal () {
    this.dialog = false
  }

  // 부모 컴포넌트에게 'finishDialog' 이벤트를 전달
  // 부모 컴포넌트에게 무언가 발생했다는 신호만 보냄
  private finishDialog () {
    this.$emit('finish-dialog')
  }
}
</script>

<style scoped>
.border-grey {
  border: solid 1px grey;
}
</style>
