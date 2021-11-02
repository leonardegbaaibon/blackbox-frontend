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
  directionsMap: (state) => {
    // const arr = state.all.trips
    // let n = 23
    // const result = new Array(n)
    // let len = arr.length
    // const taken = new Array(len)
    // // if (n > len)
    // // throw new RangeError('getRandom: more elements taken than available')
    // while (n--) {
    //   const x = Math.floor(Math.random() * len)
    //   result[n] = arr[x in taken ? taken[x] : x]
    //   taken[x] = --len in taken ? taken[len] : len
    // }
    // return result
    // =========
    // const arr = getRandom(state.all.trips || [], 23)
    // arr.splice(0, 0, state.all.trips[0])
    // arr.splice(
    //   state.all.trips[state.all.trips.length - 1],
    //   0,
    //   state.all.trips[length - 1]
    // )
    // return arr
    // =========
    const n = Math.round(state.all.trips.length / 20)
    let length = state.all.trips.length - 1
    const arr = []
    while (length > 0) {
      arr.push(state.all.trips[length])
      length = length - n
    }

    console.log('🚀 ~ arr123', arr)
    if (arr.length) {
      arr.push(state.all.trips[state.all.trips.length - 1])
    }
    // arr.splice(0, 0, state.all.trips[0])
    // arr.splice(
    //   state.all.trips[state.all.trips.length - 1],
    //   0,
    //   state.all.trips[length - 1]
    // )

    console.log('🚀 ~ arr', arr)
    return arr
  },
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
      commit('SET_TRIPS', resp.data)
      return resp
    } catch (error) {
      console.log('🚀 ~ getVehicleTrips ~ error', error)
      throw error.response
    }
  },
}
