/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @author: liujianwei (liujianwei@zuoyebang.com)
 * @Date: 2018-08-22 16:51:49
 * @description 用户信息 API
 */
import request from '@/utils/request'

// 获取用户信息
export function getUserinfo () {
  return request({
    url: '/api/author',
    method: 'get'
  })
}
