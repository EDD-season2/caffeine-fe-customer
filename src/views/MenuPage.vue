<template>
  <div class="menu-page">
    <h2>Menu page..!!</h2>
    <CartToolbars :title="'전체 메뉴'" />
    <MenuList :menuItems="menuItemsFromServer" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MenuList from '@/components/MenuList.vue'
import CartToolbars from '@/components/toolbars/CartToolbars.vue'

import MenuItem from '@/models/MenuItem'

@Component({
  components: {
    MenuList,
    CartToolbars
  }
})
export default class MenuPage extends Vue {
  @Prop({ default: 'menu' }) private name!: string;

  // [TODO] 실제로 shop_id 가 변경될 때만 서버에서 가져오도록 구현해야 함
  get menuItemsFromServer () :MenuItem[] {
    let jsonStr: string = '{ "shops_menu": [ { "shop_id": "1", "menu": [{ "id": "1", "name": "프리미엄 바나나", "nameInEnglish": "Preminum Banana", "price": "1500", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_banana.jpeg?raw=true", "category": "food" }, { "id": "2", "name": "아메리카노", "nameInEnglish": "Americano", "price": "4100", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_hot_americano.jpg?raw=true", "category": "beverage" }, { "id": "3", "name": "아이스 아메리카노", "nameInEnglish": "Ice Americano", "price": "4100", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_ice_americano.jpg?raw=true", "category": "beverage" }, { "id": "4", "name": "카페 라떼", "nameInEnglish": "Caffe Latte", "price": "4600", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_hot_latte.jpg?raw=true", "category": "beverage" }, { "id": "5", "name": "아이스 카페 라떼", "nameInEnglish": "Ice Caffe Latte", "price": "4600", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_ice_latte.jpg?raw=true", "category": "beverage" }, { "id": "6", "name": "카라멜 마키아또", "nameInEnglish": "Caramel Macchiato", "price": "5600", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_hot_caramel_macchiato.jpg?raw=true", "category": "beverage" }, { "id": "7", "name": "카라멜 마키아또", "nameInEnglish": "Ice Caramel Macchiato", "price": "5600", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_ice_caramel_macchiato.jpg?raw=true", "category": "beverage" }, { "id": "8", "name": "자몽 허니 블랙 티", "nameInEnglish": "Grapefruit Honey Black Tea", "price": "5300", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_hot_grapefruit_honey_black_tea.jpg?raw=true", "category": "beverage" }, { "id": "9", "name": "아이스 자몽 허니 블랙 티", "nameInEnglish": "Ice Grapefruit Honey Black Tea", "price": "5300", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_ice_grapefruit_honey_black_tea.jpg?raw=true", "category": "beverage" }, { "id": "10", "name": "그린 티 라떼", "nameInEnglish": "Green Tea Latte", "price": "5900", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_hot_green_tea_latte.jpg?raw=true", "category": "beverage" }, { "id": "11", "name": "아이스 그린 티 라떼", "nameInEnglish": "Ice Green Tea Latte", "price": "5900", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_ice_green_tea_latte.jpg?raw=true", "category": "beverage" }] }, { "shop_id": "2", "menu": [{ "id": "1", "name": "프리미엄 바나나", "nameInEnglish": "Preminum Banana", "price": "1500", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_banana.jpeg?raw=true", "category": "food" }] }, { "shop_id": "3", "menu": [{ "id": "1", "name": "프리미엄 바나나", "nameInEnglish": "Preminum Banana", "price": "1500", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_banana.jpeg?raw=true", "category": "food" }] }, { "shop_id": "4", "menu": [{ "id": "1", "name": "프리미엄 바나나", "nameInEnglish": "Preminum Banana", "price": "1500", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_banana.jpeg?raw=true", "category": "food" }] }, { "shop_id": "5", "menu": [{ "id": "1", "name": "프리미엄 바나나", "nameInEnglish": "Preminum Banana", "price": "1500", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_banana.jpeg?raw=true", "category": "food" }] }, { "shop_id": "6", "menu": [{ "id": "1", "name": "프리미엄 바나나", "nameInEnglish": "Preminum Banana", "price": "1500", "img": "https://github.com/eunsukko/TIL/blob/master/201912/caffeine/pictures/starbucks_banana.jpeg?raw=true", "category": "food" }] } ] }'
    const json: any = JSON.parse(jsonStr)

    // <shop_id, menuItemObjs: any[]>
    let menusObjs = new Map<string, any[]>()
    for (let item of json.shops_menu) {
      let shopId: string = item.shop_id
      let menuObjs: any[] = item.menu
      menusObjs.set(shopId, menuObjs)
    }

    let shopId:string = this.$route.params.shop_id
    const menuObjs = menusObjs.get(shopId)
    if (!menuObjs) {
      return []
    }
    const menuItems = menuObjs.map(function (item, index, array) {
      return MenuItem.of(item)
    })

    return menuItems
  }
}
</script>
