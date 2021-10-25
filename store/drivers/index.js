/* eslint-disable no-useless-catch */
// console.log('this :>> ', this)
export const state = () => ({
  state: 'drivers',
  drivers: [],
})

export const mutations = {
  SET_DRIVERS(state, drivers) {
    state.drivers = [...drivers]
  },
}

export const actions = {
  async getDrivers({ commit }, payload) {
    commit('SET_PROCESS', 'drivers/getDrivers', { root: true })
    try {
      const resp = await this.$axios.$get('drivers')
      return resp
    } catch (error) {
      throw error
    }
  },

  async createDriver({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'drivers/createDriver', { root: true })
    try {
      const resp = await this.$axios.$post('drivers', payload)
      dispatch('getDrivers')
      return resp
    } catch (error) {
      console.log('🚀 ~ createDriver ~ error', error)
      throw error.response
    }
  },

  async getOneDriver({ commit }, payload) {
    commit('SET_PROCESS', 'drivers/getOneDriver', { root: true })
    try {
      const resp = await this.$axios.$get(`drivers/${payload.id}`)
      return resp
    } catch (error) {
      throw error
    }
  },

  async updateDriver({ commit }, payload) {
    commit('SET_PROCESS', 'drivers/updateDriver', { root: true })
    try {
      const resp = await this.$axios.$patch(`drivers/${payload.id}`, payload)
      return resp
    } catch (error) {
      throw error
    }
  },

  async deleteDriver({ commit }, payload) {
    commit('SET_PROCESS', 'drivers/deleteDriver', { root: true })
    try {
      const resp = await this.$axios.$delete(`drivers/${payload.id}`)
      return resp
    } catch (error) {
      throw error
    }
  },
}
