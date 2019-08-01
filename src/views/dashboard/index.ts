/*
 * @Copyright: Copyright (c) 2019 Zybang, All rights reserved
 * @Name: dashboard-router
 * @Description: 一级路由的引入页
 * @Author: liujianwei(liujianwei@zuoyebang.com)
 * @LastEditors: liujianwei
 * @LastEditContent: 初始化文件
 * @LastEditTime: 2019-05-09 17:58:09
 */

export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => { import('./index.vue') }
  }
]
