/* eslint-disable no-useless-catch */
export const state = () => ({
  state: 'terminals',
  all: [],
})

export const mutations = {
  SET_TERMINALS(state, terminals) {
    state.all = [...terminals]
  },
}

export const actions = {
  async getTerminals({ commit }) {
    commit('SET_PROCESS', 'terminals/getterminals', { root: true })
    try {
      const resp = await this.$axios.$get('terminals')
      commit('SET_TERMINALS', resp.data)
      return resp
    } catch (error) {
      throw error
    }
  },

  async createTerminal({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'terminals/createTerminal', { root: true })
    try {
      const resp = await this.$axios.$post('terminals', payload)
      dispatch('getTerminals')
      return resp
    } catch (error) {
      throw error.response
    }
  },

  async getOneTerminal({ commit }, payload) {
    commit('SET_PROCESS', 'terminals/getOneTerminal', { root: true })
    try {
      const resp = await this.$axios.$get(`terminals/${payload.id}`)
      return resp
    } catch (error) {
      throw error
    }
  },

  async updateTerminal({ commit, dispatch }, { id, payload }) {
    commit('SET_PROCESS', 'terminals/updateTerminal', { root: true })
    try {
      const resp = await this.$axios.$patch(`terminals/${id}`, payload)
      dispatch('getTerminals')
      return resp
    } catch (error) {
      throw error
    }
  },

  async deleteTerminal({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'terminals/deleteTerminal', { root: true })
    try {
      const resp = await this.$axios.$delete(`terminals/${payload.id}`)
      dispatch('getTerminals')
      return resp
    } catch (error) {
      throw error
    }
  },
}
