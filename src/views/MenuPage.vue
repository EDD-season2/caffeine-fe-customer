<template>
  <div class="menu-page">
    <CartToolbars :title="'전체 메뉴'" :numCartMenuItems="numCartMenuItems"/>
    <ProgressCircular v-if="loading"/>
    <MenuList :menuItems="menuItemsFromServer" />
  </div>
</template>

<script lang="ts">
import axios from 'axios'

import { Component, Prop, Vue } from 'vue-property-decorator'
import { String, StringBuilder } from 'typescript-string-operations'

import MenuList from '@/components/MenuList.vue'
import CartToolbars from '@/components/toolbars/CartToolbars.vue'
import ProgressCircular from '@/components/progress/ProgressCircular.vue'

// [TODO] 왜 { } 사이에 있어야 되는걸까?
import { cartEventBus } from '@/components/bus/CartEventBus'

import MenuItem from '@/models/MenuItem'

import WebConfig from '@/WebConfig'
import Cart from '../models/Cart'

@Component({
  components: {
    MenuList,
    CartToolbars,
    ProgressCircular
  }
})
export default class MenuPage extends Vue {
  @Prop({ default: 'menu' }) private name!: string;

  private menuItems: MenuItem[] = [];
  private loading: boolean = true;

  private numCartMenuItems: number = 0;

  mounted () {
    this.findMenuItemsFromServer()
    this.registerUpdateCartCallback()
    this.updateNumCartMenuItems()
  }

  private async findMenuItemsFromServer () {
    try {
      const response = await axios.get(this.menuPageUrl)
      const data:any = response.data

      this.updateMenuItemsFrom(response.data)
    } catch (error) {
      // [TODO] 예외처리
      // console.log(error)
    } finally {
      this.finishLoading()
    }
  }

  private updateMenuItemsFrom (menuItemJsons: any[]) {
    this.menuItems = menuItemJsons.map(function (item: any, index: number, array: any[]) {
      return MenuItem.of(item)
    })
  }

  private finishLoading () {
    this.loading = false
  }

  private registerUpdateCartCallback () {
    console.log('registerUpdateCartCallback called')
    cartEventBus.$on('update-cart', (event: Event) => {
      console.log('update-cart event called')
      this.updateNumCartMenuItems()
    })
  }

  private updateNumCartMenuItems () {
    if (localStorage.currentCartJson) {
      const cart = Cart.ofJson(localStorage.currentCartJson)
      this.numCartMenuItems = cart.menuItems.length
      return
    }
    this.numCartMenuItems = 0
  }

  get menuItemsFromServer () :MenuItem[] {
    return this.menuItems
  }

  get menuPageUrl () :string {
    return WebConfig.API_SERVER_RUL + String.Format('/shops/{0}/menus', this.currentShopId)
  }

  get currentShopId () :string {
    return this.$route.params.shop_id
  }
}
</script>

<style lang="scss" scoped>
.menu-page {
  width: 100%;
  height: 100%;
}
</style>
