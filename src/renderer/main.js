import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$API_URL = (process.env.API_URL || 'http://localhost:3000')
Vue.prototype.$PING_FREQUENCY = (process.env.PING_FREQUENCY || 10000)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
