const getters = {
  sidebar: (state: any) => state.app.sidebar,
  userInfo: (state: any) => state.user.userInfo,
  menuList: (state: any) => state.user.menuList || []
}
export default getters
