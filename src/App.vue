<template>
  <v-app light>
    <v-content>
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/shops">Shops</router-link> |
          <router-link to="/shops/1/menu">Menu</router-link> |
          <router-link to="/order">Order</router-link>
        </div>
      </div>
    </v-content>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>
