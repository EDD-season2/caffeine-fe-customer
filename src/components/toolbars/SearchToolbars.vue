<template>
  <div class="search-toolbars">
    <!-- [TODO] v-card 를 썼을 때 장점이 무엇인가? -->
    <v-card>
      <!-- v-container 를 사용하면 padding 이 추가됨, 이를 없애려고 pa-0 을 추가 -->
      <v-container fluid class="pa-0">
        <!-- no-gutters 는 테두리를 없애기 위함 -->
        <v-row no-gutters>
          <v-col>
            <v-toolbar dense class="brown darken-1 pa-0" dark>
              <v-btn icon @click="goToPreviousPage">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
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
export default class SearchToolbars extends Vue {
  @Prop() title!: string

  private goToPreviousPage () {
    this.$router.back()
  }
}
</script>
