<template>
  <div class="cart-toolbars">
    <v-card>
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col>
            <v-toolbar dense class="brown darken-1 pa-0" dark>
              <v-btn icon @click="goToPreviousPage">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-badge
                color="red"
                overlap
              >
                <template v-slot:badge>
                  <span v-if="0 < numCartMenuItems"> {{ numCartMenuItems }} </span>
                </template>
                <v-icon @click="goToCartPage" >mdi-cart</v-icon>
              </v-badge>
            </v-toolbar>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class CartToolbars extends Vue {
  @Prop() title!: string
  @Prop() numCartMenuItems!: number

  private goToPreviousPage () {
    this.$router.back()
  }

  private goToCartPage () {
    this.$router.push({ path: `/cart` })
  }
}
</script>
