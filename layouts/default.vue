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

  async mounted() {
    try {
      const auth = {
        username: 'insurancecare@axamansard.com',
        password: 'axamansard@2022',
      }
      const params = new URLSearchParams()
      params.append('email', 'insurancecare@axamansard.com')
      params.append('password', 'axamansard@2022')

      await this.$api.get('server')
      // eslint-disable-next-line no-unused-vars
      const { data: token } = await this.$api.post('session/token', params, {
        auth,
      })
      // await this.$api.get(`session/?token=${token}`)

      const socket = new WebSocket(
        'wss://traccar.blackboxservice.monster/api/socket'
      )
      console.log('🚀 ~ mounted ~ socket', socket)
    } catch (error) {
      console.log('🚀 ~ mounted ~ error', error)
    }
  },

  methods: {
    ...mapActions({
      getUser: 'user/authentication/getUserInfo',
    }),
    ...mapMutations({
      setRealtime: 'SET_REALTIME',
    }),
  },
}
</script>
