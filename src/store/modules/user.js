import { getCurrentInfo } from '@/api/employees'

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

const actions = {
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // 强校验
      getCurrentInfo().then(userInfo => {
        const { account, name, avatar, userId } = userInfo.data
        commit('SET_NAME', name || 'unknown')
        commit('SET_USER_NAME', account || 'unknown')
        commit('SET_AVATAR', avatar)
        commit('SET_USER_ID', userId)
        resolve(userInfo)
      }).catch(err => {
        reject(err)
      })
    })
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
