import { Route } from 'vue-router'
import Vue from 'vue'

// 声明一个接口Route
export default interface VueWidthRoute extends Vue {
  $route: Route
}
