<template>
  <div>
    <DeleteToolbars :title="'장바구니'" @on-delete="deleteCartmenuItems" />
    <v-container>
      <v-card class="brown darken-4" dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="headline"
              v-text="cart.shop.name"
            ></v-card-title>
            <v-card-subtitle v-text="cart.shop.address"></v-card-subtitle>
          </div>
        </div>
      </v-card>
      <v-card>
        <DeletableMenuList :menuItems="cart.menuItems" @delete-element="deleteCartMenuItem" />
      </v-card>
      <v-card class="brown lighten-4">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="4" class="font-weight-bold" >
            총 {{this.cart.numCartMenuItems}}개
            </v-col>
            <v-col cols="4" class="font-weight-bold">
            {{this.cart.totalMenuPrice}}원
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-row>
        <v-col>
          <BlockButton :message="'주문하기'" :clickHandler="orderCurrentCart" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

import Cart from '@/models/Cart'
import MenuItem from '@/models/MenuItem'
import Order from '@/models/Order'

import DeleteToolbars from '@/components/toolbars/DeleteToolbars.vue'
import DeletableMenuList from '@/components/DeletableMenuList.vue'
import BlockButton from '@/components/button/BlockButton.vue'

@Component({
  components: {
    DeleteToolbars,
    DeletableMenuList,
    BlockButton
  }
})
export default class CartPage extends Vue {
  private cart: Cart = Cart.emptyCart

  mounted () {
    if (localStorage.currentCartJson) {
      this.cart = Cart.ofJson(localStorage.currentCartJson)
    }
  }

  private orderCurrentCart () {
    const order: Order = Order.from(this.cart.shop, this.cart.menuItems)
    localStorage.currentOrderJson = order.toJson()
    this.$router.push({ path: `/order` })
  }

  private deleteCartMenuItem (index: number) {
    this.cart.menuItems.splice(index, 1)
    // [TODO] localStorage 로 접근하는 애들을 한 곳으로 모으기
    localStorage.currentCartJson = this.cart.toJson()
  }

  private deleteCartmenuItems () {
    this.cart.clearMenuItems()
    localStorage.currentCartJson = this.cart.toJson()
  }
}
</script>
