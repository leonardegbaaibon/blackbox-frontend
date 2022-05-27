// import cookie from 'cookie'
export const state = () => ({
  drawer: true,
  process: '',
  snackbar: [],
  realtime: {},
})

export const mutations = {
  SET_DRAWER(state, payload) {
    state.drawer = payload
  },
  SET_PROCESS(state, payload) {
    state.process = payload
  },
  SET_SNACKBAR(state, snackbar) {
    state.snackbar = snackbar
  },
  SET_REALTIME(state, realtime) {
    state.realtime = realtime
  },
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    commit('SET_SNACKBAR', snackbar)
  },
}
