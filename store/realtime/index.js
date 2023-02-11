/* eslint-disable no-useless-catch */
export const state = () => ({
  state: 'realtime',
  positions: [],
  events: [],
  devices: [],
})

export const mutations = {
  SAVE_REALTIME_DATA(state, { payload }) {
    console.log('🚀 ~ payload', payload)
    // if(payload.devices)state.devices=
  },
}

export const getters = {}

export const actions = {}
