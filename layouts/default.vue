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
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },

  created() {
    this.getUser({}).then((response) => {
      this.$auth.setUser(response)
    })

    // Websockets
    console.log('Starting connection to WebSocket Server')
    this.connection = new WebSocket('ws://3.133.13.158:8082/api/socket')

    this.connection.onmessage = function (event) {
      console.log(event)
    }

    this.connection.onopen = function (event) {
      console.log(event)
      console.log('Successfully connected to the echo websocket server...')
    }
  },

  methods: {
    ...mapActions({
      getUser: 'user/authentication/getUserInfo',
    }),
  },
}
</script>
