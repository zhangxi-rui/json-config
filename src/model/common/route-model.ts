/*
 * @Copyright: Copyright (c) 2019 Zybang, All rights reserved
 * @Name: RouteModel
 * @Description: 自定义路由模型
 * @Author: liujianwei(liujianwei@zuoyebang.com)
 * @LastEditors: liujianwei
 * @LastEditContent: 初始化文件
 * @LastEditTime: 2019-05-09 10:37:11
 */

import { Component } from 'vue-router/types/router'

// class RouteModel {
//   path: string
//   name: string
//   component: Component
//   constructor (path: string, component: Component, name: string) {
//     this.path = path
//     this.name = name
//     this.component = component
//   }

//   static new (path: string, component: Component, name: string) {
//     let i = new this(path, component, name)
//     return i
//   }
// }
interface RouteModel {
  path: string
  name: string
  component: Component
}

export default RouteModel
