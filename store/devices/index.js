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
      const resp = await this.$axios.$get('admin.devices')
      commit('SET_DEVICES', resp.data)
      return resp
    } catch (error) {
      throw error
    }
  },

  async createDevice({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'devices/createDevices', { root: true })
    try {
      const resp = await this.$axios.$post('admin.devices', payload)
      dispatch('getDevices')
      return resp
    } catch (error) {
      throw error.response
    }
  },

  async getOneDevice({ commit }, payload) {
    commit('SET_PROCESS', 'devices/getOneDevice', { root: true })
    try {
      const resp = await this.$axios.$get(`admin.devices/${payload.id}`)
      return resp
    } catch (error) {
      throw error
    }
  },

  async updateDevice({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'devices/updateDevice', { root: true })
    try {
      const resp = await this.$axios.$patch(
        `admin.devices/${payload.id}`,
        payload
      )
      dispatch('getDevices')
      return resp
    } catch (error) {
      throw error
    }
  },

  async assignDevice({ commit, dispatch }, { vehicleId, deviceId }) {
    commit('SET_PROCESS', 'devices/assignDevice', { root: true })
    try {
      const resp = await this.$axios.$put(`admin.devices/${vehicleId}`, {
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
      const resp = await this.$axios.$delete(`admin.devices/${payload.id}`)
      dispatch('getDevices')
      return resp
    } catch (error) {
      throw error.response
    }
  },
}
