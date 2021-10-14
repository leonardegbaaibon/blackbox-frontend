<template>
  <v-app-bar :clipped-left="false" fixed app flat>
    <!-- <v-app-bar-nav-icon @click.native.stop="setDrawer(!drawer)" /> -->
    <v-toolbar-title class="text-h5 font-weight-bold">Overview</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-divider vertical inset class="mx-3"></v-divider>
    <p class="mb-0 mr-2 font-weight-bold grey--text text--darken-2">
      Richard Saseun
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
          <v-list-item @click="$auth.logout()">
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
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      drawer: (state) => state.drawer,
    }),
  },

  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
