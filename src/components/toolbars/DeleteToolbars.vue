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
              <v-icon @click="clickDelete" >mdi-trash-can-outline</v-icon>
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
export default class DeleteToolbars extends Vue {
  @Prop() title!: string

  private goToPreviousPage () {
    this.$router.back()
  }

  private clickDelete () {
    this.$emit('on-delete')
  }
}
</script>
