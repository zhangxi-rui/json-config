const delay = require('mocker-api/utils/delay')

//用户信息module
const user = require('./modules/userMock/index')
//菜单管理module
const adminManage = require('./modules/adminManage/index')

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true'

const proxy = {
  ...user,
  ...adminManage
}
module.exports = noProxy ? {} : delay(proxy, 1000)
