<template>
  <div
    class="menu-container"
    :class="{'is-collapse':isCollapse}"
  >
    <el-menu
      router
      :collapse="isCollapse"
      :default-active="currentMenu"
      class="menu-content"
      v-if="menuList&&menuList.length>0"
    >
      <el-submenu
        v-for="({menuName,childrenPage,authId,frontRouterUrl},index) in menuList"
        :key="index"
        :index="frontRouterUrl"
      >
        <template slot="title">
          <i :class="defaultIcons"></i>
          <span slot="title">{{menuName}}</span>
        </template>
        <el-menu-item
          v-for="({menuName,authId,frontRouterUrl},indexItem) in childrenPage"
          :key="indexItem"
          :index="frontRouterUrl"
          :route="{path:frontRouterUrl}"
        >{{menuName}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Action } from 'vuex-class'

// 图标
const icons = {
  '10': 'zyb-icon-nav-info',
  '14': 'zyb-icon-common-order'
}

@Component
export default class SiderBar extends Vue {
  /* ====== vuex ====== */
  @Getter('sidebar') sidebar: any
  @Getter('menuList') menuList: any // 菜单

  /* ====== data start ====== */
  defaultIcons: string = 'zyb-icon-nav-order'
  // icons: any[] = icons

  /* ====== computed start ====== */
  get isCollapse () {
    return !this.sidebar.opened
  }

  get currentMenu () {
    // 如果当前路由的meta包含origin属性，则取其origin属性作为当前激活菜单，否则还是用name
    // return this.$route.frontRouterUrl ? this.$route.frontRouterUrl : this.$route.path
    return this.$route.meta.origin ? this.$route.meta.origin : this.$route.path
  }

  /* ====== hook start ====== */
  mounted () {
    console.log(this.$moment)
    this.$log()
  }

  /* ====== method start ====== */
  // 获取左侧菜单
  getMenuList () {}
}
</script>

<style lang="scss" scoped>
.menu-container {
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  width: 159px;
  position: fixed;
  left: 0;
  top: 50px;
  bottom: 0;
  z-index: 999;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s;
  .menu-content {
    border: 0;
  }
  /**/
  &.is-collapse {
    overflow: hidden;
    width: 50px;
    transition: all 0.3s;
  }
  /*menu*/
  /deep/ .el-submenu {
    &__title {
      height: 48px;
      line-height: 48px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #323233;
      font-weight: 700;
    }
  }
}
</style>
