// import { getRandom } from '../../utils'

/* eslint-disable no-useless-catch */
export const state = () => ({
  state: 'trips',
  all: [],
  tripData: {},
})

export const mutations = {
  SET_TRIPS(state, trips) {
    state.all = [...trips]
  },
  SET_DATA(state, data) {
    state.tripData = { ...data }
  },
  RESET(state) {
    state.tripData = {}
    state.all = []
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
    commit('SET_PROCESS', 'trips/getTrips', { root: true })
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
    console.log('freaky')
    commit('SET_PROCESS', 'trips/getVehicleTrips', { root: true })
    try {
      const resp = payload
        ? await this.$axios.$get(
            `trips/${payload?.id}?from=${payload.from}&to=${payload.to}`
          )
        : null
      if (resp.data.length !== 0) {
        const { trips, ...data } = resp.data
        commit('SET_TRIPS', trips)
        commit('SET_DATA', data)
      } else {
        commit('RESET')
      }

      return resp
    } catch (error) {
      console.log('🚀 ~ getVehicleTrips ~ error', error)
      throw error.response
    }
  },

  async getTripHistory({ commit }, payload) {
    commit('SET_PROCESS', 'trips/getTripHistory', { root: true })
    try {
      const resp = await this.$axios.$get(
        `trips/${payload?.id}/trip.history?skip=0&limit=7wh`
      )
      return resp.data
    } catch (error) {
      console.log('🚀 ~ getVehicleTrips ~ error', error)
      throw error.response
    }
  },
}
