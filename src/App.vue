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
import WebConfig from './WebConfig'

@Component
export default class App extends Vue {
  private static readonly NOTIFICATION_READY: string = 'READY';

  @Prop({ default: 'App' }) private name!: string;

  private eventSource!: EventSource;
  private notificationMessage: string = App.NOTIFICATION_READY;

  private snackbar: boolean = false;
  private snackbarTimeout: number = 7000;

  private dummyCustomerId!: string;

  mounted () {
    console.log('new app instance mounted')

    this.dummyCustomerId = new Date().getUTCMilliseconds().toString()
    console.log('dummyCustomerId: ' + this.dummyCustomerId)

    this.eventSource = this.subscribeNotification()
    this.showShopPage()
  }

  private subscribeNotification () :EventSource {
    console.log('subscribeNotification begin')

    const eventSource: EventSource = new EventSource(this.getSubscribeUrl(), { withCredentials: true })

    eventSource.onmessage = event => {
      console.log('on message event, message: ' + event.data)
      // if (this.notificationMessage === App.NOTIFICATION_READY) {
      //   this.notificationMessage = ''
      //   return
      // }
      this.notificationMessage = event.data
      this.snackbar = true
    }

    eventSource.onerror = event => {
      console.log('on error event, error: ')
      console.log(event)
      this.notificationMessage = App.NOTIFICATION_READY
    }

    console.log('subscribeNotification end')
    return eventSource
  }

  private getSubscribeUrl () {
    return WebConfig.API_SERVER_RUL + '/subscribe/customers'
  }

  private showShopPage () {
    this.$router.push('/shops')
  }
}

</script>
