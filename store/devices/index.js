/* eslint-disable no-useless-catch */
// console.log('this :>> ', this)
export const state = () => ({
  state: 'devices',
  all: [],
})

export const mutations = {
  SET_DEVICES(state, devices) {
    state.all = [...devices]
  },
}

export const actions = {
  async getDevices({ commit }) {
    commit('SET_PROCESS', 'devices/getDevices', { root: true })
    try {
      const resp = await this.$axios.$get('devices')
      commit('SET_DEVICES', resp.data)
      return resp
    } catch (error) {
      throw error
    }
  },

  async createDevice({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'devices/createDevices', { root: true })
    try {
      const resp = await this.$axios.$post('devices', payload)
      dispatch('getDevices')
      return resp
    } catch (error) {
      throw error.response
    }
  },

  async getOneDevice({ commit }, payload) {
    commit('SET_PROCESS', 'devices/getOneDevice', { root: true })
    try {
      const resp = await this.$axios.$get(`devices/${payload.id}`)
      return resp
    } catch (error) {
      throw error
    }
  },

  async updateDevice({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'devices/updateDevice', { root: true })
    try {
      const resp = await this.$axios.$patch(`devices/${payload.id}`, payload)
      dispatch('getDevices')
      return resp
    } catch (error) {
      throw error
    }
  },

  async assignDevice({ commit, dispatch }, { vehicleId, deviceId }) {
    commit('SET_PROCESS', 'devices/assignDevice', { root: true })
    try {
      const resp = await this.$axios.$put(`devices/${vehicleId}`, {
        deviceId,
      })
      dispatch('getDevices')
      return resp
    } catch (error) {
      throw error.response
    }
  },

  async unassignDevice({ commit, dispatch }, { vehicleId, deviceId }) {
    commit('SET_PROCESS', 'devices/unassignDevice', { root: true })
    try {
      const resp = await this.$axios.$put(`devices/unassign/${vehicleId}`, {
        deviceId,
      })
      dispatch('getDevices')
      return resp
    } catch (error) {
      throw error.response
    }
  },

  async deleteDevice({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'devices/deleteDevice', { root: true })
    try {
      const resp = await this.$axios.$delete(`devices/${payload.id}`)
      dispatch('getDevices')
      return resp
    } catch (error) {
      throw error.response
    }
  },

  async getUnassignedDevices({ commit }) {
    commit('SET_PROCESS', 'devices/getUnassignedDevices', { root: true })
    try {
      const resp = await this.$axios.$get('devices/unassigned/fetch')
      commit('SET_DEVICES', resp.data)
      return resp.data
    } catch (error) {
      throw error
    }
  },
}
