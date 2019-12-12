<template>
  <!-- [TODO] click 에서 함수로 부를때와 함수 레퍼런스를 부를 때의 차이? (둘다 작동함) -->
  <div class="shop" @click="selectShop()">
    <v-list-item>
      <v-list-item-avatar size="72" tile class="mr-4">
        <v-img :src="shop.image" ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-container>
          <v-row>
            <v-col align-self="start" class="pa-1"><strong>{{shop.name}}</strong></v-col>
          </v-row>
          <v-row>
            <v-col align-self="start" class="pa-1"><div class="address-text">{{shop.address}}</div></v-col>
          </v-row>
        </v-container>
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
  font-size: 13px;
  color: #657786;
}

div.address-text {
  font-size: 14px;
}
</style>
