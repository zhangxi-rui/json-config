/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @author: liujianwei (liujianwei@zuoyebang.com)
 * @Date: 2019年4月10日 14:56:02
 * @description axios实例,返回promise对象
 */

import axios from 'axios'
import { Message } from 'zyb-pc-ui'
import Cookies from 'js-cookie'

// 权限相关API接口
const qs = require('qs')

// 开发和测试环境变量
const envArray: string[] = ['development', 'test']

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  withCredentials: true, // 是否允许带cookie这些
  timeout: 20000,
  maxContentLength: 2000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
// 创建axios实例
const service = axios.create(AXIOS_DEFAULT_CONFIG)

// request interceptors
service.interceptors.request.use(
  requestObj => {
    // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
    if (requestObj.method === 'post') {
      requestObj.data = qs.stringify(requestObj.data)
    }

    // 获取存储在cookie中的值，如果存在则在每个ajax请求的头部加上
    let tokens: string | null = null
    document.cookie &&
      document.cookie.split(';').forEach((e, i) => {
        if (e && e.split('=')[0].trim() === 'token') {
          tokens = e.split('=')[1]
        }
      })
    if (tokens && typeof tokens === 'string') {
      requestObj.headers.Authorization = tokens
    }
    let api: string = requestObj.url || ''
    requestObj.url = returnApi(api)
    return requestObj
  },
  error => {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    // ...
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptors
service.interceptors.response.use(
  response => {
    let res = response.data
    // 测试环境和开发环境 打印请求输出
    if (envArray.indexOf(process.env.NODE_ENV) !== -1) {
      console.log(res)
    }

    if (res.errNo === 0) {
      return res.data
    } else if (res.errNo === 10003) {
      // 未登录
      window.location.href =
        'https://cas.zuoyebang.cc/login?service=' + encodeURIComponent('http://sellmis.zuoyebang.cc/static/permission/index.html?#/system-manage/index')
    } else {
      Message({
        message: res.errStr,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error('error'))
    }
  },
  error => {
    console.log(error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

// 如果是本地请求测试服务器地址 请修改cookie
let PHPSESSID = 'ST-1536226312rc9zfQtFADqDGy7qw1p'
let ZYBUUAP = 'UUAP_UHwGXph4XL74USPRBXtscF0dvXnhxRuZxwoxg7_j23N5v85meUAfIuiZwRQ_7tmq'

// 返回生成的API接口
function returnApi (api: string): string {
  if (!api) {
    console.error('api is undefined')
    return ''
  }

  if (process.env.NODE_ENV === 'development') {
    Cookies.set('PHPSESSID', PHPSESSID)
    Cookies.set('ZYBUUAP', ZYBUUAP)
  }
  return `${process.env.VUE_APP_HOSTAPI}${api}`
}

// export
export default service
