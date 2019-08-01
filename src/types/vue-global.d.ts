import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $moment: Object
    $log: Function
  }
}
