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

  // async mounted() {
  //   const userRef = this.$fire.database.ref(`user`)
  //   console.log('this.$auth.user', this.$auth.user)
  //   // write data to the database
  //   try {
  //     await userRef.set({
  //       message: 'Nuxt-Fire with Firebase Realtime Database rocks!',
  //     })
  //   } catch (e) {
  //     alert(e)
  //     return
  //   }
  //   alert('Success.')
  //   // recieve
  //   try {
  //     const snapshot = await userRef.once('value')
  //     alert(snapshot.val().message)
  //   } catch (e) {
  //     alert(e)
  //   }
  // },

  methods: {
    ...mapActions({
      getUser: 'user/authentication/getUserInfo',
    }),
  },
}
</script>
