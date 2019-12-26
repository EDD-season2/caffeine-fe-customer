<template>
  <div id="shops-page">
    <SearchToolbars :title="'매장 검색'" @search-toolbars-text-updated="searchFromServer" />
      <ProgressCircular v-if="loading" />
    <ShopList :shops="shopsFromServer" />
  </div>
</template>

<script lang=ts>
import axios from 'axios'

import { Prop, Component, Vue } from 'vue-property-decorator'
import { String, StringBuilder } from 'typescript-string-operations'

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
  private static readonly SHOP_SEARCH_URL:string = '/shops/search'

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

  private updateShopsFrom (shopObjs: any[]) {
    this.shops = this.removeDuplication(shopObjs)
  }

  private removeDuplication (shopObjs: any[]) : Shop[] {
    let shopJsons = shopObjs.map(function (item: any, index: number, array: any[]) {
      return Shop.of(item).toJson()
    })

    let shopsWithoutDuplication = new Set<string>(shopJsons)

    return Array.from(shopsWithoutDuplication.values()).map(function (json: string, index: number, array: string[]) {
      return Shop.ofJson(json)
    })
  }

  private finishLoading () {
    this.loading = false
  }

  private async searchFromServer (searchText: string) {
    // [TODO] 중복제거
    try {
      const searchUrl:string = this.getAddressSearchUrl(searchText)

      const nameSearchResponse = await axios.get(this.getNameSearchUrl(searchText))
      const addressSearchResponse = await axios.get(this.getAddressSearchUrl(searchText))

      let shopJsons: any[] = nameSearchResponse.data.content
      shopJsons = shopJsons.concat(addressSearchResponse.data.content)

      this.updateShopsFrom(shopJsons)
    } catch (error) {
      console.error('search fail')
    } finally {
      this.finishLoading()
    }
  }

  private getAddressSearchUrl (searchText: string) {
    return this.getSearchUrl('address', searchText)
  }

  private getNameSearchUrl (searchText: string) {
    return this.getSearchUrl('name', searchText)
  }

  private getSearchUrl (keyword: string, searchText: string) {
    const searchBaseUrl: string = WebConfig.API_SERVER_RUL + ShopsPage.SHOP_SEARCH_URL
    const searchQuery: string = String.Format('keyword={0}&contents={1}', keyword, searchText)
    const defaultPageQuery = '&size=30&page=0'

    return searchBaseUrl + '?' + searchQuery + defaultPageQuery
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
