/*
 * @Copyright: Copyright (c) 2019 Zybang, All rights reserved
 * @Name: router
 * @Description: 路由入口
 * @Author: liujianwei(liujianwei@zuoyebang.com)
 * @LastEditors: liujianwei
 * @LastEditContent: 初始化文件
 * @LastEditTime: 2019-05-09 10:17:40
 */

import Vue from 'vue'
import Router from 'vue-router'

// sync
import Admin from './modules/admin'
import getRoutes from './modules/index'
import OrderCenter from './modules/order-center'
import CourseCenter from './modules/course-center'
import JsonConfig from './modules/json-config'
Vue.use(Router)
// 常量路由
export const constantRouterMap = [Admin, OrderCenter, CourseCenter, JsonConfig]
// 去路由中心化的 路由
// export const otherRouter = getRoutes()

export default new Router({
  routes: [
    ...constantRouterMap,
    {
      path: '*',
      redirect: '/admin/user-manage'
    }
  ]
})
