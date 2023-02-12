<template>
  <v-app-bar :clipped-left="false" fixed app flat>
    <v-app-bar-nav-icon v-if="isCompoundRoute" @click.native.stop="reRoute">
      <v-icon>mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title
      v-if="isCompoundRoute"
      class="text-h6 font-weight-bold text-capitalize"
    >
      Back to {{ $route.path.split('/')[1] }}
    </v-toolbar-title>
    <v-toolbar-title v-else class="text-h6 font-weight-bold text-capitalize">
      {{ $route.name }}
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-divider vertical inset class="mx-3"></v-divider>
    <p
      v-if="$auth.user.firstName"
      class="mb-0 mr-2 font-weight-bold grey--text text--darken-2"
    >
      {{ $auth.user.firstName + ' ' + $auth.user.lastName }}
    </p>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-avatar v-bind="attrs" color="primary" size="40" v-on="on"></v-avatar>
      </template>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title class="text-h6 font-weight-bold">
              Settings
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title class="text-h6 font-weight-bold red--text">
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: 'Overview',
    },
  },

  data() {
    return {}
  },

  computed: {
    ...mapState({
      drawer: (state) => state.drawer,
    }),

    isCompoundRoute() {
      const route = this.$route.path.split('/')
      // route.length < 2 ? (state = true) : (state = false)
      if (route.length > 2) {
        return true
      } else {
        return false
      }
      // return state
    },
  },

  created() {
    // if (!this.$auth.user) {
    //   this.getUser()
    // }
  },

  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER',
    }),
    ...mapActions({
      getUser: 'user/authentication/getUserInfo',
    }),
    reRoute() {
      this.$router.go(-1)
    },
    logout() {
      this.$api.delete('session')
      this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped></style>
