<template>
  <div id="shops-page">
    <SearchToolbars :title="'매장 검색'" />
      <ProgressCircular v-if="loading" />
    <ShopList :shops="shopsFromServer" />
  </div>
</template>

<script lang=ts>
import axios from 'axios'

import { Prop, Component, Vue } from 'vue-property-decorator'

import ShopList from '@/components/ShopList.vue'
import SearchToolbars from '@/components/toolbars/SearchToolbars.vue'
import ProgressCircular from '@/components/progress/ProgressCircular.vue'

import Shop from '@/models/Shop'

import WebConfig from '@/WebConfig'

// 이것도 컴포넌트?
// 결국 데이터를 서버에서 가져오는 역할?
@Component({
  components: {
    ShopList,
    SearchToolbars,
    ProgressCircular
  }
})
export default class ShopsPage extends Vue {
  private static readonly SHOP_PAGE_URL:string = '/shops'

  @Prop({ default: 'shops' }) name!: string;
  private shops: Shop[] = [];
  private loading: boolean = true;

  mounted () {
    this.findShopsFromServer()
  }

  private async findShopsFromServer () {
    try {
      const response = await axios.get(WebConfig.API_SERVER_RUL + ShopsPage.SHOP_PAGE_URL)
      // { "shopResponses" : json }
      this.updateShopsFrom(response.data.shopResponses)
    } catch (error) {
      // [TODO] 예외처리
      // console.error(error)
    } finally {
      this.finishLoading()
    }
  }

  private updateShopsFrom (shopJsons: any[]) {
    this.shops = shopJsons.map(function (item: any, index: number, array: any[]) {
      return Shop.of(item)
    })
  }

  private finishLoading () {
    this.loading = false
  }

  get shopsFromServer () : Shop[] {
    return this.shops
  }
}

</script>

<style scoped>
.shops-page {
  width: 100%;
  height: 100%;
}
</style>
