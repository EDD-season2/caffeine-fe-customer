<template>
  <div id="shop-list">
    <v-list>
      <template v-for="(shop, index) in shops">
        <v-subheader v-if="index === 0" :key="'subheader' + index" >주문 가능한 매장({{shops.length}})</v-subheader>
        <v-divider :key="'divider' +index"></v-divider>
        <ShopListElement :shop="shop" :key="shop.id" />
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ShopListElement from '@/components/ShopListElement.vue'

import Shop from '@/models/Shop'

@Component({
  components: {
    ShopListElement
  }
})
export default class ShopList extends Vue {
  @Prop() private shops!: Shop[];
}
</script>
