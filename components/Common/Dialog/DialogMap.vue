<template>
  <DialogHandler
    title="Trip Profile"
    :subtitle="subtitle"
    :value="value"
    fullscreen
    :loading="loading"
    :ok-button="'Done'"
    @input="$emit('input', $event)"
    @clicked:ok="$emit('input', false)"
    @clicked:cancel="$emit('input', false)"
  >
    <v-row>
      <v-col cols="">
        <p class="text-h6 mb-0 font-weight-bold">{{ averageDistance }}</p>
        <p class="text-caption">Average Distance</p>
      </v-col>
      <v-col cols="">
        <p class="text-h6 mb-0 font-weight-bold">
          <!-- {{ attributes.totalDistance }} -->
          {{ averageSpeed }}
        </p>
        <p class="text-caption">Average Speed Travelled</p>
      </v-col>
      <v-col cols="">
        <p class="text-h6 mb-0 font-weight-bold">
          <!-- {{ attributes.fuelConsumption }} -->
          {{ averageFuelConsumption }}
        </p>
        <p class="text-caption">Fuel Consumed</p>
      </v-col>
      <!-- <v-col cols="">
          <p class="text-h6 mb-0 font-weight-bold">
            {{ device ? `Connected` : 'Disconnected' }}
          </p>
          <p class="text-caption">Status</p>
        </v-col> -->
    </v-row>
    <MapTrips height="800" :items="trips" />
    <!-- <v-row>
      <v-col class="overline d-flex justify-space-between">
        <p class="mb-0">
          {{ $dayjs(trip.startTime).format('DD MMMM, YYYY. HH:mmA') }}
          -
          {{ $dayjs(trip.endTime).format('DD MMMM, YYYY. HH:mmA') }}
        </p>
      </v-col>
    </v-row> -->
  </DialogHandler>
</template>

<script>
// import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  model: {
    event: 'input',
    prop: 'value',
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      type: String,
      default: '',
    },
    trips: {
      type: Array,
      default: () => [],
    },
    stats: {
      type: Object,
      default: () => {},
    },
    averageSpeed: String,
    averageDistance: String,
    averageFuelConsumption: String,
  },

  // created() {
  //   this.getTrip({ id: this.vehicleId, from: this.from, to: this.to })
  // },

  // methods: {
  //   ...mapActions({
  //     getTrip: 'trips/getSingleTrip',
  //   }),
  // },
}
</script>

<style lang="scss" scoped></style>
