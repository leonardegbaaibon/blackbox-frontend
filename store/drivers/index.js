/* eslint-disable no-useless-catch */
// console.log('this :>> ', this)
export const state = () => ({
  state: 'drivers',
  all: [],
})

export const mutations = {
  SET_DRIVERS(state, drivers) {
    state.all = [...drivers]
  },
}

export const actions = {
  async getDrivers({ commit }, payload) {
    commit('SET_PROCESS', 'drivers/getDrivers', { root: true })
    try {
      const resp = await this.$axios.$get('drivers')
      commit('SET_DRIVERS', resp.data)
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
      return resp.data
    } catch (error) {
      throw error
    }
  },

  async updateDriver({ commit, dispatch }, { id, payload }) {
    commit('SET_PROCESS', 'drivers/updateDriver', { root: true })
    try {
      const resp = await this.$axios.$patch(`drivers/${id}`, payload)
      dispatch('getDrivers')
      return resp
    } catch (error) {
      throw error
    }
  },

  async deleteDriver({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'drivers/deleteDriver', { root: true })
    try {
      const resp = await this.$axios.$delete(`drivers/${payload.id}`)
      dispatch('getDrivers')
      return resp
    } catch (error) {
      throw error
    }
  },

  async getUnassignedDrivers({ commit }) {
    commit('SET_PROCESS', 'drivers/getUnassignedDrivers', { root: true })
    try {
      const resp = await this.$axios.$get('drivers/unassigned/fetch')
      return resp.data
    } catch (error) {
      throw error
    }
  },

  async assignDriver({ commit, dispatch }, { vehicleId, driverId }) {
    commit('SET_PROCESS', 'drivers/assignDriver', { root: true })
    try {
      const resp = await this.$axios.$put(`drivers/${vehicleId}`, {
        driverId,
      })
      dispatch('getDrivers')
      return resp
    } catch (error) {
      throw error.response
    }
  },

  async unassignDriver({ commit, dispatch }, { vehicleId, driverId }) {
    commit('SET_PROCESS', 'drivers/unassignDriver', { root: true })
    try {
      const resp = await this.$axios.$put(`drivers/unassign/${vehicleId}`, {
        driverId,
      })
      dispatch('getDrivers')
      return resp
    } catch (error) {
      throw error.response
    }
  },
}
