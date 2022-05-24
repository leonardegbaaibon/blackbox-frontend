// import { getRandom } from '../../utils'

/* eslint-disable no-useless-catch */
export const state = () => ({
  state: 'trips',
  trips: [],
  tripData: {},
})

export const mutations = {
  SET_TRIPS(state, trips) {
    if (trips.trips) {
      state.trips = [...trips.trips]
    }
  },
  SET_TRIP_ITEM(state, data) {
    state.tripData = { ...data }
  },
  RESET(state) {
    state.tripData = {}
    state.all = []
  },
}

export const getters = {}

export const actions = {
  //*
  async getTrips({ commit }, payload) {
    commit('SET_PROCESS', 'trips/getTrips', { root: true })
    try {
      const resp = await this.$axios.$get(
        `trips/report/${payload.vehicleId}?from=${payload.from}&to=${payload.to}`
      )
      if (resp.meta.status === 404) {
        throw new Error(resp.meta.info)
      }
      commit('SET_TRIPS', resp.data)
      return resp
    } catch (error) {
      console.log('🚀 ~ getTrips ~ error', error)
      throw error
    }
  },

  //*
  async getSingleTrip({ commit }, payload) {
    commit('SET_PROCESS', 'trips/getSingleTrip', { root: true })
    try {
      const resp = payload
        ? await this.$axios.$get(
            `trips/${payload?.id}?from=${payload.from}&to=${payload.to}`
          )
        : null
      if (resp.data.length !== 0) {
        // console.log('🚀 ~ getSingleTrip ~ resp.data', resp.data)
        commit('SET_TRIP_ITEM', resp.data)
      } else {
        // commit('RESET')
      }

      return resp
    } catch (error) {
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
