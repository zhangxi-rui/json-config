/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @author: liujianwei (liujianwei@zuoyebang.com)
 * @Date: 2019年4月10日 14:56:02
 * @description axios实例,返回promise对象
 */

import { Message } from 'zyb-pc-ui'
import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
const qs = require('qs')

// axios 默认配置
const baseURL: string =
  process.env.NODE_ENV === 'development'
    ? 'testAddress'
    : process.env.VUE_APP_BASE_URL || '/'
export const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  baseURL: baseURL,
  withCredentials: true, // 是否允许带cookie这些
  timeout: 20000,
  maxContentLength: 2000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  }
}
// 创建axios实例
const service: AxiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)
// request interceptors
service.interceptors.request.use(
  (requestObj: AxiosRequestConfig) => {
    // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
    if (
      requestObj.method === 'post' &&
      (requestObj.url || '').indexOf('/tools/uploadfile') === -1
    ) {
      requestObj.data = qs.stringify(requestObj.data)
    }
    // 获取存储在cookie中的值，如果存在则在每个ajax请求的头部加上
    let tokens: string | null = null
    document.cookie &&
      document.cookie.split(';').forEach(e => {
        if (e && e.split('=')[0].trim() === 'token') {
          tokens = e.split('=')[1]
        }
      })
    if (tokens && typeof tokens === 'string') {
      requestObj.headers.Authorization = tokens
    }
    let api: string = requestObj.url || ''
    requestObj.url = returnApi(api)
    // console.log(requestObj)

    return requestObj
  },
  error => {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    // ...
    console.error(error) // for debug
    return Promise.reject(new Error('error'))
  }
)

// response interceptors
service.interceptors.response.use(
  (response: AxiosResponse) => {
    let res: any = response.data
    // 测试环境和开发环境 打印请求输出
    if (process.env.mode !== 'production') {
      // console.log('🍎🍎🍎--》》', res)
    }
    return checkState(res)
  },
  error => {
    console.log(error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(new Error('error'))
  }
)
// 如果是本地请求测试服务器地址 请修改cookie
let PHPSESSID = 'ST-1565419631rS-FQqQZLE93e5sYVLL'
let ZYBUUAP =
  'UUAP_Un0CU5dhW-moeSzKKnh8fV0dvXkA8cidxwoxgz73G3UggfJvPB1rL-u9xhMzuJbs'

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
  // return `${AUTHOR_API_DOMAIN[process.env.NODE_ENV]}${api}`
  return `${api}`
}
function checkState (res: any): any {
  switch (res.errNo) {
    case 0:
      return res.data
    case 3:
      Message({
        showClose: true,
        message: '用户未登录，自动跳转到登录页面~~',
        type: 'error'
      })
      window.location = res.data.loginUrl
      break
    case -1001:
      Message({
        showClose: true,
        message: '登录已过期，请重新登录',
        type: 'error'
      })
      window.location = res.data.loginUrl
      break
    case -1005:
      Message({
        showClose: true,
        message: '用户未登录，自动跳转到登录页面~~',
        type: 'error'
      })
      console.log('==========loginUrl', res.data)
      window.location = res.data.loginUrl
      break
    default:
      Message({
        message: res.errstr,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error('error'))
  }
}
// export
export default service
