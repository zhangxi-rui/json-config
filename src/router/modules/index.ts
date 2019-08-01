/*
 * @Copyright: Copyright (c) 2019 Zybang, All rights reserved
 * @Name: getRoutes
 * @Description: 获取去中心化的路由
 * @Author: liujianwei(liujianwei@zuoyebang.com)
 * @LastEditors: liujianwei
 * @LastEditContent: 初始化文件
 * @LastEditTime: 2019-05-09 10:11:43
 */

export default function () {
  let all: any[] = []
  const requireRouter = require.context('../views/', true, /index.ts/)
  // 读取当前路径子文件夹所有index.js
  requireRouter.keys().forEach(fileName => {
    const requireConfig = requireRouter(fileName)
    const routerArr = requireConfig.default || requireConfig
    all = [...all, ...routerArr]
  })
  return all
}
