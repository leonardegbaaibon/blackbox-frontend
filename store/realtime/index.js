/* eslint-disable no-useless-catch */
export const state = () => ({
  state: 'realtime',
  positions: [],
  events: [],
  devices: [],
})

export const mutations = {
  SAVE_REALTIME_DATA(state, payload) {
    if (payload.positions) {
      if (state.positions.length === 0) {
        state.positions = payload.positions
      } else {
        const tmp = state.positions.map((item) => {
          const item2 = payload.positions.find(
            (i2) => i2.deviceId === item.deviceId
          )
          return item2 ? { ...item, ...item2 } : item
        })
        console.log('🚀 ~ SAVE_REALTIME_DATA ~ payload.positions', tmp)
        state.positions = [...tmp]
      }
    }
    if (payload.devices) {
      state.devices = [...state.devices, ...payload.devices]
      console.log('🚀 ~ SAVE_REALTIME_DATA ~ payload.devices', payload.devices)
    }
    if (payload.events) {
      state.events = [...state.events, ...payload.events]
      console.log('🚀 ~ SAVE_REALTIME_DATA ~ payload.events', payload.events)
    }
  },
}

export const getters = {}

export const actions = {}
