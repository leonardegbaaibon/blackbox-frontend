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
import { mapActions, mapMutations } from 'vuex'
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
  //   this.getUser({}).then(async (response) => {
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
  methods: {
    ...mapActions({
      getUser: 'user/authentication/getUserInfo',
    }),
    ...mapMutations({
      setRealtime: 'realtime/SAVE_REALTIME_DATA',
    }),
  },

  // eslint-disable-next-line vue/order-in-components
  created() {
    this.connection = new WebSocket(
      process.env.NODE_ENV === 'development'
        ? 'ws://localhost:8082/api/socket'
        : 'wss://traccar.blackboxservice.monster/api/socket'
    )
    this.connection.onmessage = (event) => {
      console.log('onmessage', JSON.parse(event.data))
      this.setRealtime(JSON.parse(event.data))
    }

    this.connection.onopen = (event) => {
      console.log('onopen', event)
      // this.setRealtime(JSON.parse(event.data))
      console.log('Successfully connected to the traccar websocket server...')
    }
    this.connection.onerror = (event) => {
      console.log('onError', event)
    }
  },
}
</script>
