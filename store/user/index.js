/* eslint-disable no-useless-catch */
export const state = () => ({
  state: 'users',
})

export const actions = {
  async getUser({ commit }, payload) {
    commit('SET_PROCESS', 'drivers/getDrivers', { root: true })
    try {
      const resp = await this.$axios.$get('drivers')
      return resp
    } catch (error) {
      throw error
    }
  },
}
