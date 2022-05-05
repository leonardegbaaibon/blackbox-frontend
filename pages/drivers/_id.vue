<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-progress-circular
    v-if="$fetchState.pending"
    indeterminate
  ></v-progress-circular>
  <v-row v-else justify="center" align="start">
    <v-col md="8"><CardScorecard /></v-col>
    <v-col md="4" class="">
      <div class=""><CardDriverInfo v-bind="driver" /></div>
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
