
/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @Author: liujianwei (liujianwei@zuoyebang.com)
 * @Date: 2018-07-19 21:13:43
 * @Description: [logistics] - Layout.vue 框架主页
 */
<template>
  <div class="app-wrapper">
    <app-header />
    <sidebar />
    <app-main />
  </div>
</template>

<script lang="ts">
import Sidebar from './components/sidebar/index.vue'
import AppHeader from './components/header/index.vue'
import AppMain from './components/app-main/index.vue'

import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  components: {
    AppHeader,
    Sidebar,
    AppMain
  }
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/variables.scss';
.app-wrapper {
  background: #f0f2f5;
  font-family: Microsoft YaHei;
  font-size: 14px;
  color: #333333;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
