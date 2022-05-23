<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    dark
    app
    color="secondary"
  >
    <v-list-item
      class="px-2 d-flex justify-space-between align-center mt-12 mb-8"
    >
      <Logo v-if="!mini" style="margin-left: 8px" />
      <img v-else class="pa-2" src="~/assets/svg/icon-white.svg" />
      <v-btn fab x-small @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-list class="">
      <v-list-item-group color="white">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Overview',
          to: '/dashboard',
        },
        {
          icon: 'mdi-account-multiple-outline',
          title: 'Drivers',
          to: '/drivers',
        },
        {
          icon: 'mdi-bus-marker',
          title: 'Terminals',
          to: '/terminals',
        },
        {
          icon: 'mdi-map-marker-distance',
          title: 'Trips',
          to: '/trips',
        },
        {
          icon: 'mdi-car-settings',
          title: 'Vehicles',
          to: '/vehicles',
        },
        {
          icon: 'mdi-devices',
          title: 'Devices',
          to: '/devices',
        },
        {
          icon: 'mdi-alert',
          title: 'Faults Monitor',
          to: '/fault-monitor',
        },
      ],
      mini: true,
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(val) {
        this.$store.commit('SET_DRAWER', val)
      },
    },
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.collapse-button {
  position: absolute;
  right: -7%;
}
</style>
