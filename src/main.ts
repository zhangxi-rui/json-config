import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ZybPcUi from 'zyb-pc-ui'
import 'zyb-pc-ui/lib/theme-chalk/index.css'

import './permission.ts'
import '@/assets/styles/index.scss'
// 挂在属性或者方法
import Moment from './inject' // global css
// 作业帮pc组件库  http://fe.suanshubang.com/npm/#/detail/zyb-pc-ui
Vue.use(ZybPcUi)
Vue.use(Moment)
// Vue.prototype.$moment = { a: 1 }

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
