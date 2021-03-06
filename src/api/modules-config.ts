import request from '@/utils/request'
// paymis初始化拉取模块列表
export function getModules (params: Object) {
  return request({
    url: '/paybalance/tools/formconflist',
    method: 'GET',
    params
  })
}

// 通过formKey和systemId获取数据
export function getModuleConfig (params: Object) {
  return request({
    url: '/paybalance/tools/formconf',
    method: 'GET',
    params
  })
}

// 创建更新模块
export function createUpdate (data: object) {
  return request({
    url: '/paybalance/tools/updateform',
    method: 'post',
    data
  })
}
