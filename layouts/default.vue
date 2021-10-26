<template>
  <v-app>
    <BaseHeader />
    <BaseSidebar />
    <v-main>
      <v-container fluid class="pt-6">
        <Nuxt />
        <v-footer absolute>
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
      </v-container>
    </v-main>
    <!-- <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->

    <!-- Snackbar -->
    <!-- <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      :key="index"
      :value="snackbar.showing"
      :timeout="-1"
      :color="snackbar.variant || 'success'"
      outlined
    >
      {{ snackbar.text }}

      <v-btn :color="snackbar.variant" text @click="close">Close</v-btn>
    </v-snackbar> -->
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

  computed: {
    // ...mapState({ snackbars: (state) => state.snackbars }),
  },

  created() {
    // this.$toast.success('Success', { position: 'top-right' })
    console.log('here')
    this.getUser({}).then((response) => {
      this.$auth.setUser(response)
    })
  },

  methods: {
    ...mapActions({
      getUser: 'user/authentication/getUserInfo',
    }),
    // close() {
    //   this.$store.dispatch('setSnackbar', { showing: false })
    // },
  },
}
</script>
