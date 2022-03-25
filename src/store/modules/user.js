// import { getCurrentInfo } from '@/api/employees'

const getDefaultState = () => {
  return {
    token: '',
    accountType: 0,
    fullname: '',
    username: '',
    avatar: '',
    email: '',
    tenantCode: '',
    personId: '',
    expire: 0,
    mobile: '',
    userId: 0,
    orgId: '',
    orgName: '',
    hrmDeptId: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },

  SET_NAME(state, fullname) {
    state.fullname = fullname
  },

  SET_TOKEN_KEY(state, tokenKey) {
    state.tokenKey = tokenKey
  },

  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },

  SET_USER_NAME(state, userName) {
    state.username = userName
  },

  SET_USER_ID(state, userId) {
    state.userId = userId
  },

  SET_EMAIL(state, email) {
    state.email = email
  },

  SET_ACCOUNT_TYPE(state, accountType) {
    state.accountType = accountType
  }
}

const login = function() {
  // window.location.href = `//${process.env.VUE_APP_PASSPORT}/uc/login?ReturnUrl=${encodeURIComponent(window.location.href)}` || '' // passport 登录开启
  window.location.href = `//${process.env.VUE_APP_ERP}/sso/login?ReturnUrl=${encodeURIComponent(window.location.href)}` || '' // erp内网 登录开启
}

const actions = {
  login,

  async getUserInfo({ commit }) {
    // 强校验
    // const userInfo = await getCurrentInfo()
    // console.log('userInfo', userInfo)
    // if (!checkLoginRes.code) {
    //   // 成功后写入用户信息
    const checkLoginRes = {
      data: {
        fullname: 'mockFullname',
        username: 'mockUserName',
        email: 'mockEmail',
        avatar: 'https://notion-avatar.vercel.app/api' +
        '/img/eyJmYWNlIjo3LCJub3NlIjo3LCJtb3V0aCI6OCwiZXllcyI6MCwi' +
        'ZXllYnJvd3MiOjAsImdsYXNzZXMiOjEsImhhaXIiOjUsImFjY2Vzc29yaWVzIjowLCJkZXRhaWxzIjowLCJiZWFyZCI6MCwiZmxpcCI6MCwiY29sb3I' +
        'iOiJyZ2JhKDI1NSwgMCwgMCwgMCkiLCJzaGFwZSI6Im5vbmUifQ==',
        userId: '001'
      }
    }
    const { fullname, username, email, avatar, userId } = checkLoginRes.data
    commit('SET_NAME', fullname)
    commit('SET_USER_NAME', username)
    commit('SET_EMAIL', email)
    commit('SET_AVATAR', avatar)
    commit('SET_USER_ID', userId)

    //   return true
    // }
  },

  setAccountType({ commit }, no) {
    commit('SET_ACCOUNT_TYPE', no)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
