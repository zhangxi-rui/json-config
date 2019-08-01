import { getUserinfo } from '@/api/user-info'

// 枚举类型
const types = {
  SET_USER_INFO: 'SET_USER_INFO',
  SET_MENU_LIST: 'SET_MENU_LIST'
}

const user = {
  state: {
    userInfo: {
      memberId: '', // 权限系统里面唯一的用户编号
      uName: '', // 用户实名
      realName: '', // 真实姓名
      phone: '', // 手机号
      email: '', // 邮箱
      employeeId: '', // 员工编号
      datetime: '' // 当前日期
    },
    menuList: [] // 菜单
  },
  mutations: {
    [types.SET_USER_INFO] (state: any, userInfo: any) {
      state.userInfo = userInfo
    },
    [types.SET_MENU_LIST] (state: any, menuList: any[]) {
      state.menuList = menuList
    }
  },
  actions: {
    GetUserInfo ({ commit }: { commit: any }) {
      // 获取用户信息
      return new Promise((resolve, reject) => {
        getUserinfo()
          .then((res: any) => {
            let { memberId, uName, realName, phone, email, employeeId, datetime } = res.userInfo
            let userInfo: UserInfo = {
              memberId,
              uName,
              realName,
              phone,
              email,
              employeeId,
              datetime
            }
            commit(types.SET_USER_INFO, userInfo)
            commit(types.SET_MENU_LIST, res.menuAuth)
            resolve(res)
          })
          .catch((error: Error) => {
            reject(error)
          })
      })
    }
  }
}

export const abc = []
export default user
