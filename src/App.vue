<template>
  <v-app light>
    <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" top>
      {{notificationMessage}}
    </v-snackbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { String, StringBuilder } from 'typescript-string-operations'
import firebase from 'firebase/app'
import axios from 'axios'

import WebConfig from './WebConfig'

@Component
export default class App extends Vue {
  private static readonly NOTIFICATION_READY: string = 'READY';

  @Prop({ default: 'App' }) private name!: string;

  private eventSource!: EventSource;
  private notificationMessage: string = App.NOTIFICATION_READY;

  private snackbar: boolean = false;
  private snackbarTimeout: number = 7000;

  mounted () {
    console.log('new app instance mounted')
    this.subscribe()
    this.showShopPage()
  }

  private subscribe () {
    const messaging = firebase.messaging()
    Notification.requestPermission()
      .then((permission: string) => {
        if (permission !== 'granted') {
          alert('알림을 허용해주세요')
          return ''
        }
        return messaging.getToken()
      })
      .then((token: string) => {
        if (token.length === 0) {
          return
        }
        axios.post(this.subscribeUrl, { token }, { withCredentials: true })
        console.log('token:' + token)
        messaging.onTokenRefresh(() => {
          console.log('refreshing token')
          messaging.getToken()
            .then((token: string) => {
              // [TODO] 현재는 두번째 이후는 처리가 되고 있지 않음
              // 조금 파악하고 고치자 (막 했다가 무한 반복 될 수 있기에)
              axios.post(this.subscribeUrl, { token }, { withCredentials: true })
            })
        })
      })
    firebase.messaging().onMessage(payload => {
      alert(payload.data.message)
      this.notificationMessage = payload.data.message
    })
  }

  private get subscribeUrl () {
    return WebConfig.API_SERVER_RUL + '/subscribe/customers'
  }

  private getSubscribeUrl () {
    return WebConfig.API_SERVER_RUL + '/subscribe/customers'
  }

  private showShopPage () {
    this.$router.push('/shops')
  }
}

</script>
