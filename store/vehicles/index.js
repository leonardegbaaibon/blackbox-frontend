/* eslint-disable no-useless-catch */
// console.log('this :>> ', this)
export const state = () => ({
  state: 'vehicles',
  all: [],
})

export const mutations = {
  SET_VEHICLES(state, vehicles) {
    state.all = [...vehicles]
  },
}

export const actions = {
  async getVehicles({ commit }, payload) {
    commit('SET_PROCESS', 'vehicles/getVehicles', { root: true })
    try {
      const resp = await this.$axios.$get('vehicles')
      commit('SET_VEHICLES', resp.data)
      return resp
    } catch (error) {
      throw error
    }
  },

  async createVehicle({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'vehicles/createVehicle', { root: true })
    try {
      const resp = await this.$axios.$post('vehicles', payload)
      dispatch('getVehicles')
      return resp
    } catch (error) {
      console.log('🚀 ~ createVehicle ~ error', error)
      throw error.response
    }
  },

  async getOneVehicle({ commit }, payload) {
    commit('SET_PROCESS', 'vehicles/getOneVehicle', { root: true })
    try {
      const resp = await this.$axios.$get(`vehicles/${payload.id}`)
      return resp.data
    } catch (error) {
      throw error
    }
  },

  async updateVehicle({ commit, dispatch }, { id, payload }) {
    commit('SET_PROCESS', 'vehicles/updateVehicle', { root: true })
    try {
      const resp = await this.$axios.$patch(`vehicles/${id}`, payload)
      dispatch('getVehicles')
      return resp
    } catch (error) {
      throw error
    }
  },

  async deleteVehicle({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'vehicles/deleteVehicle', { root: true })
    try {
      const resp = await this.$axios.$delete(`vehicles/${payload.id}`)
      dispatch('getVehicles')
      return resp
    } catch (error) {
      throw error
    }
  },

  async getMakes({ commit, dispatch }) {
    commit('SET_PROCESS', 'vehicles/getMakes', { root: true })
    try {
      const resp = await this.$api.$get(`Generic/cheki/car-make`, {
        baseUrl: 'https://api.axamansard.com/api/insurance',
      })
      return resp
    } catch (error) {
      throw error
    }
  },

  async getModels({ commit, dispatch }, payload) {
    commit('SET_PROCESS', 'vehicles/getModels', { root: true })
    try {
      const resp = await this.$api.$get(`Generic/cheki/car-model/${payload}`, {
        baseUrl: 'https://api.axamansard.com/api/insurance',
      })
      return resp
    } catch (error) {
      throw error
    }
  },
}
