// import { getRandom } from '../../utils'

/* eslint-disable no-useless-catch */
export const state = () => ({
  state: 'trips',
  all: { trips: [] },
})

export const mutations = {
  SET_TRIPS(state, trips) {
    state.all = trips
  },
}

export const getters = {
  // directionsMap: (state) => {
  //   const n = Math.round(state.all.trips.length / 20)
  //   let length = state.all.trips.length - 1
  //   const arr = []
  //   while (length > 0) {
  //     arr.push(state.all.trips[length])
  //     length = length - n
  //   }
  //   if (arr.length) {
  //     arr.push(state.all.trips[state.all.trips.length - 1])
  //   }
  //   return arr
  // },
}

export const actions = {
  async getTrips({ commit }, payload) {
    commit('SET_PROCESS', 'vehicles/getTrips', { root: true })
    try {
      const resp = await this.$axios.$get('trips/vehicles')
      console.log('🚀 ~ getTrips ~ resp', resp)
      // commit('SET_TRIPS', resp.data)
      return resp
    } catch (error) {
      console.log('🚀 ~ getTrips ~ error', error)
      throw error
    }
  },

  async getVehicleTrips({ commit }, payload) {
    commit('SET_PROCESS', 'vehicles/getVehicleTrips', { root: true })
    try {
      const resp = payload
        ? await this.$axios.$get(
            `trips/${payload?.id}?from=${payload.from}&to=${payload.to}`
          )
        : null
      // commit('SET_TRIPS', resp.data)
      if (resp.data.length !== 0) {
        commit('SET_TRIPS', resp.data)
      } else {
        commit('SET_TRIPS', null)
      }
      return resp
    } catch (error) {
      console.log('🚀 ~ getVehicleTrips ~ error', error)
      throw error.response
    }
  },
}
