<template>
  <v-row align="center" justify="space-between">
    <v-col cols="8" class="">
      <p class="text-h4 font-weight-bold">Trip Ranking</p>
      <p class="mb-0">
        Your rank so far:
        {{ $dayjs().format('Do MMMM, YYYY') }}
      </p>
      <span>Driver is doing better than 55% of drivers today</span>
    </v-col>
    <!-- ============ -->
    <v-col cols="auto">
      <LineChart />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  props: {
    driverId: {
      type: String,
      default: '',
    },
    driverName: {
      type: String,
      default: '',
    },
    driverPhoneNumber: {
      type: String,
      default: '',
    },
    driverEmail: {
      type: String,
      default: '',
    },
    driverLicenseNumber: {
      type: String,
      default: '',
    },
    driverLicenseExpiryDate: {
      type: String,
      default: '',
    },
    driverPhoto: {
      type: String,
      default: '',
    },
    driverAddress: {
      type: String,
      default: '',
    },
    driverQuarantor: {
      type: String,
      default: '',
    },
    driverQuarantorPhoneNumber: {
      type: String,
      default: '',
    },
    driverQuarantorEmail: {
      type: String,
      default: '',
    },
    driverQuarantorAddress: {
      type: String,
      default: '',
    },
    driverNin: {
      type: String,
      default: '',
    },
    createdAt: {
      type: String,
      default: '',
    },
    updatedAt: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      show: false,
    }
  },

  computed: {
    ...mapGetters({
      gTrips: 'trips/directionsMap',
    }),
    ...mapState({
      trips: (state) => state.trips.all,
    }),
  },

  methods: {
    ...mapActions({
      getTripData: 'trips/getVehicleTrips',
    }),

    getTrip() {
      // this.setShow(true)
      this.$emit('clicked:getTrip')
    },

    setShow(arg) {
      this.show = arg
    },
  },
}
</script>

<style lang="scss" scoped></style>
