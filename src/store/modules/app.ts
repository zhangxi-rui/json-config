import Cookies from 'js-cookie'

// cookie key
const SIDEBAR_STATUS: string = 'SIDEBAR_STATUS'
// cookie value

const types: any = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR'
}

Cookies.set(SIDEBAR_STATUS, '0')

export default {
  state: {
    sidebar: {
      opened: Cookies.get(SIDEBAR_STATUS) === '0' // 0:打开状态，1：关闭状态
    }
  },
  mutations: {
    [types.TOGGLE_SIDEBAR] (state: any) {
      if (state.sidebar.opened) {
        Cookies.set(SIDEBAR_STATUS, '1')
      } else {
        Cookies.set(SIDEBAR_STATUS, '0')
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    [types.CLOSE_SIDEBAR] (state: any) {
      Cookies.set(SIDEBAR_STATUS, '1')
      state.sidebar.opened = false
    }
  },
  actions: {
    toogleSidebar ({ commit }: { commit: any }) {
      commit(types.TOGGLE_SIDEBAR)
    },
    closeSidebar ({ commit }: { commit: any }) {
      commit(types.CLOSE_SIDEBAR)
    }
  }
}
