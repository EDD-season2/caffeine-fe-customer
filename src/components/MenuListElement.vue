<template>
  <div class="menu-list-element">
    <div class="menu-list-item">
      <v-dialog v-model="dialog" persistent scrollable max-width="540px">
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-avatar size="62" tile>
               <v-img :src="menuItem.img"></v-img>
               </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title><strong>{{menuItem.name}}</strong></v-list-item-title>
              <v-list-item-subtitle v-text="menuItem.nameInEnglish"></v-list-item-subtitle>
              <v-spacer></v-spacer>
              <v-list-item-title><strong>{{menuItem.price}} 원</strong></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <MenuItemModal :menuItem="menuItem" v-on:finishDialog="dialog = false" />
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MenuItemModal from '@/components/MenuItemModal.vue'

import MenuItem from '@/models/MenuItem'

// Component 가 없으면 menuItem 을 템플릿에서 사용하지 못하는 것 같음
@Component({
  components: {
    MenuItemModal
  }
})
export default class MenuListElement extends Vue {
  @Prop() private menuItem!: MenuItem;
  @Prop({ default: false }) private dialog!: boolean;
}
</script>

<style lang="scss" scoped>
strong {
  font-weight: 800;
}
</style>
