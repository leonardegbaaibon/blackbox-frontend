// import cookie from 'cookie'
export const state = () => ({
  drawer: true,
  process: '',
})

export const mutations = {
  SET_DRAWER(state, payload) {
    state.drawer = payload
  },
  SET_PROCESS(state, payload) {
    state.process = payload
  },
}

export const actions = {}
