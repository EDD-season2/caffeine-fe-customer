<template>
  <div id="deletable-menu-list">
    <v-list>
      <template v-for="(menuItem, index) in menuItems">
        <!-- <v-subheader v-if="index === 0" :key="'subheader' + index" ></v-subheader> -->
        <v-divider
          :key="'divider' + index"
        ></v-divider>
        <DeletableMenuListElement :menuItem="menuItem" :index="index" :key="menuItem.id + index" @delete-element="deleteElement" />
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import DeletableMenuListElement from '@/components/DeletableMenuListElement.vue'

import MenuItem from '@/models/MenuItem'

@Component({
  components: {
    DeletableMenuListElement
  }
})
export default class DeletableMenuList extends Vue {
  @Prop() private menuItems!: MenuItem[];

  private deleteElement (deletedIndex: number) {
    this.$emit('delete-element', deletedIndex)
  }
}
</script>

<style lang="scss" scoped>

</style>
