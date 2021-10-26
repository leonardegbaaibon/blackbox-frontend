/* eslint-disable no-useless-catch */
export const state = () => ({
  state: 'trips',
  trips: [],
})

export const mutations = {
  SET_TRIPS(state, trips) {
    state.trips = trips
  },
}

export const actions = {
  async getTrips({ commit }, payload) {
    commit('SET_PROCESS', 'vehicles/getTrips', { root: true })
    try {
      const resp = await this.$axios.$get('trips/vehicles')
      console.log('🚀 ~ getTrips ~ resp', resp)
      commit('SET_TRIPS', resp.data)
      return resp
    } catch (error) {
      console.log('🚀 ~ getTrips ~ error', error)
      throw error
    }
  },

  async getVehicleTrips({ commit }, payload) {
    commit('SET_PROCESS', 'vehicles/getVehicleTrips', { root: true })
    try {
      const resp = await this.$axios.$get(`trips/${payload.id}`)
      return resp
    } catch (error) {
      console.log('🚀 ~ getVehicleTrips ~ error', error)
      throw error.response
    }
  },
}
