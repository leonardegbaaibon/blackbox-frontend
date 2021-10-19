<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="false"
    fixed
    dark
    app
    color="secondary"
  >
    <Logo style="margin: 80px 0 50px 24px" class="" />

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
          icon: 'mdi-chart-bubble',
          title: 'Drivers',
          to: '/drivers',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Terminals',
          to: '/terminals',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Trips',
          to: '/trips',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Vehicles',
          to: '/vehicles',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Faults Monitor',
          to: '/faults',
        },
      ],
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

<style lang="scss" scoped></style>
