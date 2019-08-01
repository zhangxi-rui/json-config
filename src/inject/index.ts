// 需要挂载的都放在这里;

import _Vue from 'vue'

export default {
  install (Vue: typeof _Vue, options: any) {
    Vue.prototype.$moment = { one: 1, two: 2 }
    Vue.prototype.$log = () => {
      console.log(new Date())
    }
  }
}
