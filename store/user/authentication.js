/* eslint-disable no-useless-catch */
// import cookie from 'cookie'
export const state = () => ({
  state: 'user/authentication',
  userId: '',
})

export const mutations = {
  SET_USER_ID(state, id) {
    state.userId = id
  },
}

export const actions = {
  async register({ commit }, payload) {
    commit('SET_PROCESS', 'user/authentication/register', { root: true })
    try {
      const resp = await this.$axios.$post('auth/sign.up', payload)
      return resp
    } catch (error) {
      throw error
    }
  },

  async requestPasswordChange({ commit }, payload) {
    commit('SET_PROCESS', 'user/authentication/requestPasswordChange', {
      root: true,
    })
    try {
      const resp = await this.$axios.$post(`auth/change.password`, payload)
      return resp
    } catch (error) {
      throw error
    }
  },

  async passwordReset({ commit }, payload) {
    commit('SET_PROCESS', 'user/authentication/passwordReset', {
      root: true,
    })
    try {
      const resp = await this.$axios.$post(
        `auth/confirm.change.password`,
        payload
      )
      return resp
    } catch (error) {
      throw error
    }
  },

  async getUserInfo({ commit, state }, payload) {
    commit('SET_PROCESS', 'user/authentication/getUserInfo', { root: true })
    if (payload.id) commit('SET_USER_ID', payload.id)
    try {
      const resp = await this.$axios.$get(`users/${payload.id || state.userId}`)
      return resp.data
    } catch (error) {
      throw error
    }
  },

  // ------------------------------ old

  async resendVerificationEmail({ commit }) {
    commit('SET_PROCESS', 'user/authentication/resendVerificationEmail', {
      root: true,
    })
    try {
      const resp = await this.$axios.$get('email/resend')
      return resp
    } catch (error) {
      throw error
    }
  },

  // payload:{email}
  async sendForgotPasswordEmail({ commit }, { email }) {
    commit('SET_PROCESS', 'user/authentication/sendForgotPasswordEmail', {
      root: true,
    })
    try {
      const resp = await this.$axios.$post(`password/email`, { email })
      return resp
    } catch (error) {
      throw error
    }
  },
}
