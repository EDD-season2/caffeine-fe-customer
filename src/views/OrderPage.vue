<template>
  <div id="order-page">
    <Toolbars title="주문"/>
    <v-container>
      <v-spacer></v-spacer>
      <v-row dense>
        <v-col cols="12">
          <v-card dark class="pa-3 brown darken-4">
            <span> 주문 매장 </span>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="order.shop.name"
                ></v-card-title>
                <v-card-subtitle v-text="order.shop.address"></v-card-subtitle>
              </div>
              <v-avatar
                class="ma-3"
                size="96"
                tile
              >
                <v-img :src="order.shop.image"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card dark class="pa-3 brown darken-4">
            <span> 최종 결제할 메뉴 </span>
          </v-card>
        </v-col>
        <template v-for="(menuItem, index) in order.menuItems" >
          <v-col cols="12" :key=index>
            <v-card>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="menuItem.name"
                  ></v-card-title>
                  <v-card-subtitle v-text="menuItem.price + '원'"></v-card-subtitle>
                </div>
                <v-avatar
                  class="ma-3"
                  size="64"
                  tile
                >
                  <v-img :src="menuItem.image"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </template>
      </v-row>
      <v-card class="brown lighten-4">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="4" class="font-weight-bold" >
            총 {{this.order.numMenuItems}}개
            </v-col>
            <v-col cols="4" class="font-weight-bold">
            {{this.order.totalPrice}}원
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-spacer></v-spacer>
      <v-row cols="12" justify="space-between" >
        <v-col cols="12" justify-self="stretch" class="text-center full-button">
          <!-- 일단 보내는 로직 구현하고 프로그레스 적용  -->
          <v-btn class="brown darken-1" dark block @click="sendOrder">바로 주문하기</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <ProgressCircular v-if="loading" class="middle-absolute-layout"/>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

import { Component, Prop, Vue } from 'vue-property-decorator'
import { String, StringBuilder } from 'typescript-string-operations'

import Toolbars from '@/components/toolbars/Toolbars.vue'
import ProgressCircular from '@/components/progress/ProgressCircular.vue'

import Shop from '@/models/Shop'
import MenuItem from '@/models/MenuItem'
import Order from '@/models/Order'
import Cart from '@/models/Cart'

import WebConfig from '../WebConfig'

@Component({
  components: {
    Toolbars,
    ProgressCircular
  }
})
export default class OrderPage extends Vue {
  private static readonly DUMMY_CUSTOMER_ID: string = '100'

  private order: Order = Order.emptyOrder
  // private shop: Shop = Shop.emptyShop;
  // private menuItems: MenuItem[] = [];
  private loading: boolean = false;

  // 매번 화면이 띄워질 때 호출되는 건지 파악 필요
  private mounted () {
    // console.error('mounted called')
    if (localStorage.currentOrderJson) {
      this.order = Order.ofJson(localStorage.currentOrderJson)
    }
  }

  private async sendOrder () {
    this.beginLoading()
    try {
      const orderCreationRequestBody: any = {
        menuItemIds: this.menuItemIds
      }

      const response = await axios.post(this.orderPageUrl, orderCreationRequestBody, { withCredentials: true })

      alert(response)
    } catch (error) {
      console.log(error)
    } finally {
      this.finishLoading()
      this.cleanCartIfUsed()
      this.showShopsPage()
    }
  }

  get menuItemIds () {
    return this.order.menuItems.map(function (menuItem: MenuItem, index: number, array: any[]) {
      return menuItem.id
    })
  }

  get orderPageUrl () {
    return WebConfig.API_SERVER_RUL + String.Format('/shops/{0}/orders', this.order.shop.id)
  }

  private beginLoading () {
    this.loading = true
  }

  private finishLoading () {
    this.loading = false
  }

  private cleanCartIfUsed () {
    if (!localStorage.currentOrderJson) {
      return
    }
    const currentOrder: Order = Order.ofJson(localStorage.currentOrderJson)

    if (!localStorage.currentCartJson) {
      return
    }
    const currentCart: Cart = Cart.ofJson(localStorage.currentCartJson)

    if (this.equalsOrderAndCart(currentOrder, currentCart)) {
      console.log('erase cart')
      localStorage.currentCartJson = Cart.emptyCart.toJson()
    }
  }

  private equalsOrderAndCart (order: Order, cart: Cart) {
    // 현재는 값의 비교를 json 문자열로 진행
    // 이 경우 각각의 property 순서가 달라지면 비교에 영향을 미침
    if (order.shop.toJson() !== cart.shop.toJson()) {
      return false
    }
    if (order.menuItems.length !== cart.menuItems.length) {
      return false
    }

    return order.menuItems.every((orderMenuItem: MenuItem, index: number) => orderMenuItem.toJson() === cart.menuItems[index].toJson())
  }

  private showShopsPage () {
    this.$router.push({ path: `/shops` })
  }
}
</script>

<style lang="scss" scoped>
#order-page {
  width: 100%;
  height: 100%;
}

.full-button {
  width: 100%;
}

.middle-absolute-layout {
  z-index: 10;
  position: absolute;
  width: 50%;
  height: 50%;
}
</style>
