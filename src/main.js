import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.config.devtools = true

import {BootstrapVue, ModalPlugin, ToastPlugin, TooltipPlugin} from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(ModalPlugin)
Vue.use(ToastPlugin)
Vue.use(TooltipPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
