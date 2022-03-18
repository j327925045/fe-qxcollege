const getters = {
  roles: state => state.user.roles,
  name: state => state.user.fullname,
  ename: state => state.user.username,
  avatar: state => state.user.avatar,

  menus: state => state.app.menus,
  sidebar: state => state.app.sidebar,
  themeColor: state => state.app.themeColor,
  currentTab: state => state.app.currentTab,
  editableTabs: state => state.app.editableTabs,
  editableTabsValue: state => state.app.editableTabsValue,
  topMenuActiveIndex: state => state.app.topMenuActiveIndex,
  showCommonView: state => state.app.showCommonView,
  showTab: state => state.app.showTab,
  theme: state => state.app.themeColor,
  maxPageNumber: state => state.app.maxPageNumber,
  isRouterAlive: state => state.app.isRouterAlive,
  keepAliveComponents: state => state.app.keepAliveComponents
}
export default getters
