<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-row justify="center" align="center">
    <v-col md="12" class="">
      <v-progress-circular
        v-if="$fetchState.pending"
        indeterminate
      ></v-progress-circular>
      <div v-else class=""><CardDriverInfo v-bind="driver" /></div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {
      driver: null,
      loading: false,
    }
  },

  async fetch() {
    this.driver = await this.getDriver({ id: this.$route.params.id })
    // this.history = await this.getTripHistory({ id: this.$route.params.id })
    // this.vehicles = vehicles
  },

  computed: {
    ...mapState({
      // vehicles: (state) => state.vehicles.all,
    }),
  },

  methods: {
    ...mapActions({
      getDriver: 'drivers/getOneDriver',
    }),
  },
}
</script>
