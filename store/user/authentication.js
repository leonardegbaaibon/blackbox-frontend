/* eslint-disable no-useless-catch */
// import cookie from 'cookie'
export const state = () => ({
  state: 'user/authentication',
})

export const mutations = {}

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

  // payload:{signature,expires}
  async verifyEmail({ commit }, payload) {
    commit('SET_PROCESS', 'user/authentication/verifyEmail', {
      root: true,
    })
    try {
      const resp = await this.$axios.$get(
        `email/verify/4/984238d5f4e5888cc3d266dac0cf940b53c9f0e1?expires=${payload.expires}&signature=${payload.signature}`
      )
      return resp
    } catch (error) {
      throw error
    }
  },

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

  // payload:{token,email,password,password_confirmation}
  async passwordReset({ commit }, payload) {
    commit('SET_PROCESS', 'user/authentication/passwordReset', {
      root: true,
    })
    try {
      const resp = await this.$axios.$post(
        `password/reset/${payload.token}`,
        payload
      )
      return resp
    } catch (error) {
      throw error
    }
  },
}
