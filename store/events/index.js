// import { getRandom } from '../../utils'

/* eslint-disable no-useless-catch */
export const state = () => ({
  state: 'events',
  events: [],
  tripData: {},
})

export const mutations = {
  SET_EVENTS(state, events) {
    state.events = [...events]
  },
}

export const getters = {}

export const actions = {
  async getEvents({ commit }, payload) {
    commit('SET_PROCESS', 'events/getEvents', { root: true })
    try {
      const resp = await this.$axios.$get(
        `trips/report/events/${payload.id}?from=${payload.from}&to=${payload.to}`
      )
      commit('SET_EVENTS', resp.data)
      return resp
    } catch (error) {
      throw error
    }
  },

  async getSingleEvent({ commit }, payload) {
    commit('SET_PROCESS', 'events/getSingleEvent', { root: true })
    try {
      const resp = await this.$axios.$get(`trips/events/${payload.eventId}`)

      return resp
    } catch (error) {
      throw error.response
    }
  },
}
