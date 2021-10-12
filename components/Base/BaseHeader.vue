<template>
  <v-app-bar :clipped-left="false" fixed app flat>
    <!-- <v-app-bar-nav-icon @click.native.stop="setDrawer(!drawer)" /> -->
    <v-toolbar-title class="text-h5 font-weight-bold">Overview</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-menu</v-icon>
    </v-btn>
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
