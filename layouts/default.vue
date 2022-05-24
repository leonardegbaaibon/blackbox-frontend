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
  },

  methods: {
    ...mapActions({
      getUser: 'user/authentication/getUserInfo',
    }),
  },
}
</script>
