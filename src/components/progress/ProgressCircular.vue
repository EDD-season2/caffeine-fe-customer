<template>
  <div class="progress-circular">
    <v-container id="progress-view" v-if="loading" class="height-100">
      <v-row align-content="center" align="center" class="height-100">
        <v-col align-self="center" class="text-center">
          <v-progress-circular
            color="brown"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProgressCircular extends Vue {
  @Prop({ default: true }) private loading!: boolean

  public finish () {
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.progress-circular {
  width: 100%;
  height: 100%;
}

.height-100 {
  height: 100%;
}
</style>
