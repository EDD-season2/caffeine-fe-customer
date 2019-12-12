<template>
  <!-- [TODO] click 에서 함수로 부를때와 함수 레퍼런스를 부를 때의 차이? (둘다 작동함) -->
  <div class="shop" @click="selectShop()">
    <v-list-item>
      <v-list-item-avatar size="72" tile>
        <v-img :src="shop.img" ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-row cols="12">
          <v-col align-self="start"><p><strong>{{shop.name}}</strong></p></v-col>
          <v-col align-self="end"><small>{{shop.phone}}</small></v-col>
        </v-row>
        <v-list-item-title>{{shop.address}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Shop from '@/models/Shop'

@Component
export default class ShopListElement extends Vue {
  @Prop() private shop!: Shop;

  private selectShop () {
    localStorage.currentShopJson = this.shop.toJson()
    this.showMenuPage()
  }

  private showMenuPage () {
    this.$router.push({ path: `/shops/${this.shop.id}/menu` })
  }
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Muli:400,800');

body {
  height: 100%;
  background: #e6ecf1;
  font-family: 'Muli', sans-serif;
}

strong {
  font-weight: 800;
}
p {
  line-height: 1.2;
  + p {
    margin-top: 5px;
  }
}
small {
  font-size: 14px;
  color: #657786;
}
</style>
