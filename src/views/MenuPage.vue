<template>
  <div class="menu-page">
    <CartToolbars :title="'전체 메뉴'" />
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

import MenuItem from '@/models/MenuItem'

import WebConfig from '@/WebConfig'

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

  mounted () {
    this.findMenuItemsFromServer()
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
