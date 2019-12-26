import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import 'firebase/messaging'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyDZXTnA3yjOaZQ8JMajcAWiXtXpdoLK1OI',
  authDomain: 'caffeine-fe-shop.firebaseapp.com',
  databaseURL: 'https://caffeine-fe-shop.firebaseio.com',
  projectId: 'caffeine-fe-shop',
  storageBucket: 'caffeine-fe-shop.appspot.com',
  messagingSenderId: '92007077963',
  appId: '1:92007077963:web:495e3cd4ab6e927e4455ce'
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.usePublicVapidKey('BM1MU-VZ4F2iFFsMoxHKfxm35FTOFVWLSTUTJXtZ4Z-17m66Cdcwsn6jJ7sknIYeQS-OLMCavC_AJUjVMKpFLMw')

// 알림 수신을 위한 사용자 권한 요청
Notification.requestPermission()
  .then((permission) => {
    if (permission !== 'granted') {
      alert('알림을 허용해주세요')
    }
  })

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
