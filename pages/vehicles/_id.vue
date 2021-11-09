<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-row justify="center" align="center">
    <v-col md="12" class="">
      <v-progress-circular
        v-if="$fetchState.pending"
        indeterminate
      ></v-progress-circular>
      <div v-else class="">
        <CardCar v-bind="{ ...vehicle, ...trips[trips.length - 1] }"></CardCar>
        <MapVehicle class="" height="500" :marker="trips[trips.length - 1]" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {
      vehicle: null,
      history: null,
      dialog: false,
      loading: false,
    }
  },

  async fetch() {
    this.vehicle = await this.getVehicle({ id: this.$route.params.id })
    // this.history = await this.getTripHistory({ id: this.$route.params.id })
    await this.getPosition({
      id: this.$route.params.id,
      from: this.$dayjs().startOf('day').toISOString(),
      to: this.$dayjs().toISOString(),
    })
    // this.vehicles = vehicles
  },

  computed: {
    ...mapState({
      trips: (state) => state.trips.all,
      // vehicles: (state) => state.vehicles.all,
    }),
  },

  methods: {
    ...mapActions({
      getVehicle: 'vehicles/getOneVehicle',
      getTripHistory: 'trips/getTripHistory',
      getPosition: 'trips/getVehicleTrips',
    }),
  },
}
</script>
