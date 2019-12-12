<template>
  <div id="order-page">
    <h2>Order page..!!</h2>
    <v-container>
      <v-spacer></v-spacer>
      <v-row dense>
        <v-col cols="12">
          <v-card dark class="pa-3">
            <span> 주문 매장 </span>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="shop.name"
                ></v-card-title>
                <v-card-subtitle v-text="shop.address"></v-card-subtitle>
              </div>
              <v-avatar
                class="ma-3"
                size="96"
                tile
              >
                <v-img :src="shop.img"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card dark class="pa-3">
            <span> 최종 결제할 메뉴 </span>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="currentMenuItem.name"
                ></v-card-title>
                <v-card-subtitle v-text="currentMenuItem.price + '원'"></v-card-subtitle>
              </div>
              <v-avatar
                class="ma-3"
                size="92"
                tile
              >
                <v-img :src="currentMenuItem.img"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row cols="12" >
        <v-col cols="4" align-self="start" class="ma-12">
          <v-btn color="blue darken-1" text >취소</v-btn>
        </v-col>
        <v-col cols="4" align-self="end" class="ma-12">
          <v-btn color="blue darken-1" text >결제</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Shop from '@/models/Shop'
import MenuItem from '@/models/MenuItem'

@Component({
  components: {
  }
})
export default class OrderPage extends Vue {
  private shop: Shop = Shop.emptyShop;
  private currentMenuItem: MenuItem = MenuItem.emptyMenuItem;

  private mounted () {
    // console.error('mounted called')
    if (localStorage.currentShopJson) {
      this.shop = Shop.ofJson(localStorage.currentShopJson)
    }
    if (localStorage.currentMenuItemJson) {
      this.currentMenuItem = MenuItem.ofJson(localStorage.currentMenuItemJson)
    }
  }
}
</script>

<style lang="scss" scoped>
#order-page {
  max-width: 600px;
  margin: 30px auto;
}
</style>
