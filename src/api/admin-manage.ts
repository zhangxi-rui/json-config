/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @author: liujianwei (liujianwei@zuoyebang.com)
 * @Date: 2018-08-22 16:51:49
 * @description 权限管理 API
 */

// 获取菜单列表
import request from '@/utils/request'

export default {
  getTerms () {
    return request({
      url: '/wms/warehouse/getproductlist',
      method: 'get'
    })
  },
  getList () {
    return request({
      url: '/api/getList',
      method: 'get'
    })
  }
}
