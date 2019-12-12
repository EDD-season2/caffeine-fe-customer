<template>
  <div id="shops">
    <div class="view">
      <SearchToolbars :title="'매장 검색'" />
      <ShopList :shops="shopsFromServer" />
    </div>
  </div>
</template>

<script lang=ts>
import { Prop, Component, Vue } from 'vue-property-decorator'
import ShopList from '@/components/ShopList.vue'
import SearchToolbars from '@/components/toolbars/SearchToolbars.vue'

import Shop from '@/models/Shop'

// 이것도 컴포넌트?
// 결국 데이터를 서버에서 가져오는 역할?
@Component({
  components: {
    ShopList,
    SearchToolbars
  }
})
export default class ShopsPage extends Vue {
  @Prop({ default: 'shops' }) name!: string;

  // 바인드 관련해서도 고민을 해보자
  // 서버에서 데이터를 받아올 경우... 데이터가 바뀌게 되면 받아온 데이터가 적용되도록 (결국에 잘 바인딩을 해놓으면 '빈 값' -> '서버에서 받은 값' 일 때 작 적용될 것이기에)
  get shopsFromServer () : Shop[] {
    const shopJsons = [
      {
        id: 1,
        name: '석촌호수',
        img: 'https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_%EC%84%9D%EC%B4%8C%ED%98%B8%EC%88%98.jpg?raw=true',
        address: '서울특별시 송파구 석촌호수로 262 (송파동)',
        phone: '02-758-8693'
      },
      {
        id: 2,
        name: '송파나루역DT',
        img: 'https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_%EC%86%A1%ED%8C%8C%EA%B5%AC%EC%B2%AD.jpeg?raw=true',
        address: '서울특별시 송파구 오금로 142 (송파동)',
        phone: '02-421-3622'
      },
      {
        id: 3,
        name: '송파구청',
        img: 'https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_%EC%86%A1%ED%8C%8C%EB%82%98%EB%A3%A8%EC%97%ADDT.jpg?raw=true',
        address: '서울특별시 송파구 오금로 87 (방이동)',
        phone: '02-2145-0300'
      },
      {
        id: 4,
        name: '잠실시그마타워',
        img: 'https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_%EC%9E%A0%EC%8B%A4%EC%8B%9C%EA%B7%B8%EB%A7%88%ED%83%80%EC%9B%8C.jpg?raw=true',
        address: '서울특별시 송파구 올림픽로 289 (신천동)',
        phone: '02-417-3614'
      },
      {
        id: 5,
        name: '잠실푸르지오월드',
        img: 'https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_%EC%9E%A0%EC%8B%A4%ED%91%B8%EB%A5%B4%EC%A7%80%EC%98%A4%EC%9B%94%EB%93%9C.jpg?raw=true',
        address: '서울특별시 송파구 올림픽로35가길 9, 잠실푸르지오월드마크 1층 (신천동)',
        phone: '02-758-8652'
      }]

    const shops = shopJsons.map(function (item, index, array) {
      return Shop.of(item)
    })
    return shops
  }
}

</script>
