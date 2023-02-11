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

  created() {
    this.getUser({}).then(async (response) => {
      this.$auth.setUser(response)
      const dataRef = this.$fire.database.ref(`users/${response.userId}`)
      // recieve data
      try {
        // const snapshot = await dataRef.once('value')
        await dataRef.on('value', (snapshot) => {
          this.setRealtime(snapshot.val())
        })
      } catch (e) {
        alert(e)
      }
    })
  },

  mounted() {
    try {
      this.connection = new WebSocket('ws://localhost:8082/api/socket')
      this.connection.onmessage = function (event) {
        // console.log('onmessage', JSON.parse(event.data))
        this.setRealtime(JSON.parse(event.data))
      }

      this.connection.onopen = function (event) {
        console.log('onopen', event)
        console.log('Successfully connected to the traccar websocket server...')
      }
      this.connection.onerror = function (event) {
        console.log('onError', event)
      }
    } catch (error) {
      console.log('🚀 ~ mounted ~ error', error)
    }
  },

  methods: {
    ...mapActions({
      getUser: 'user/authentication/getUserInfo',
    }),
    ...mapMutations({
      setRealtime: 'realtime/SAVE_REALTIME_DATA',
    }),
  },
}
</script>
