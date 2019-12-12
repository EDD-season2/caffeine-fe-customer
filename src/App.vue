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

  mounted () {
    this.eventSource = this.subscribeNotification()
    this.showShopPage()
  }

  private subscribeNotification () :EventSource {
    // console.log('subscribeNotification begin')

    const dummyCustomerId: string = '100'
    const subscribeUrl: string = WebConfig.API_SERVER_RUL + '/subscribe/customers/' + dummyCustomerId

    const eventSource: EventSource = new EventSource(subscribeUrl, { withCredentials: true })

    eventSource.onmessage = event => {
      // console.log('on event')
      if (this.notificationMessage === App.NOTIFICATION_READY) {
        this.notificationMessage = ''
        // 여기서 리턴하면 안되느 것 같음
      } else {
        this.snackbar = true
        this.notificationMessage = event.data
      }
    }

    eventSource.onerror = event => {
      this.notificationMessage = App.NOTIFICATION_READY
      this.eventSource = this.subscribeNotification()
    }

    // console.log('subscribeNotification end')
    return eventSource
  }

  private showShopPage () {
    this.$router.push('/shops')
  }
}

// console.log('hello app')

// const subscribe = function () {
//   console.log('start subscribe')

//   const dummyCustomerId: string = '100'

//   const subscribeUrl: string = WebConfig.API_SERVER_RUL + '/subscribe/customers/' + dummyCustomerId

//   const eventSource: EventSource = new EventSource(subscribeUrl, { withCredentials: true })

//   eventSource.onmessage = event => {
//     alert(event.data)
//   }

//   console.log('end subscribe')
// }

// subscribe()

</script>
