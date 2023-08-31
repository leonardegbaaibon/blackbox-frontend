<template>
  <v-app>
    <BaseHeader />
    <BaseSidebar />
    <v-main>
      <v-container fluid class="pt-6 pb-16">
        <Nuxt />
        <v-footer absolute>
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      connection: null,
    }
  },

  // created() {

  // this.getUser({}).then(async (response) => {
  //     this.$auth.setUser(response)
  //     const dataRef = this.$fire.database.ref(`users/${response.userId}`)
  //     // recieve data
  //     try {
  //       // const snapshot = await dataRef.once('value')
  //       await dataRef.on('value', (snapshot) => {
  //         this.setRealtime(snapshot.val())
  //       })
  //     } catch (e) {
  //       alert(e)
  //     }
  //   })
  // },

  computed: {
    ...mapState({
      vehicles: (state) => state.vehicles.all,
    }),
  },
  methods: {
    ...mapActions({
      // // getUser: 'user/authentication/getUserInfo',
      // getDevices: 'devices/getDevices',
      getVehicles: 'vehicles/getVehicles',
    }),
    ...mapMutations({
      setRealtime: 'realtime/SAVE_REALTIME_DATA',
    }),
  },

  // eslint-disable-next-line vue/order-in-components
  async created() {
    await this.getVehicles()
    // console.log(this.vehicles, 'vehicles')
    this.connection = new WebSocket(
      process.env.NODE_ENV === 'development'
        ? 'ws://localhost:8082/api/socket'
        : 'wss://traccar.blackboxservice.monster/api/socket'
    )
    this.connection.onmessage = (event) => {
      // console.log('onmessage', JSON.parse(event.data))
      const wsVehicles = JSON.parse(event.data)
      const vehicles = wsVehicles.positions?.map(vehicle => {
        console.log(vehicle, 'vehicle')
        const vMatch = this.vehicles?.find(device => {
          console.log(device, 'each device')
          return vehicle.id === device?.device?.traccarDeviceId
        })
        if (vMatch) {
          console.log(vMatch, 'vmatch')
          return {
            ...vMatch, ...vehicle
          }
        }
        return vehicle
      })
      this.setRealtime({ positions: vehicles })
    }

    this.connection.onopen = (event) => {
      // console.log('onopen', event)
      // this.setRealtime(JSON.parse(event.data))
      console.log('Successfully connected to the traccar websocket server...')
    }
    this.connection.onerror = (event) => {
      console.log('onError', event)
    }
  },
}
</script>
