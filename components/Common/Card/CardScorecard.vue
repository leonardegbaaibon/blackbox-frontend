<template>
  <v-card class="" flat>
    <v-card-text class="">
      <v-row align="center" justify="space-between">
        <v-col cols="8" class="">
          <div class="">
            <p class="font-weight-bold text-h4 mb-0">₦25,000.00</p>
            <p class="text-overline">discount acquired</p>
          </div>
          <div class="my-6">
            <p class="font-weight-bold text-h4 mb-0">₦25,000.00</p>
            <p class="text-overline">discount attainable</p>
          </div>
          <div class="">
            <p class="font-weight-bold text-h4 mb-0">₦25,000.00</p>
            <p class="text-overline mb-0">discount lost</p>
          </div>
        </v-col>
        <!-- ============ -->
        <v-col cols="auto">
          <v-progress-circular
            size="140"
            value="23"
            color="success"
            rotate="-90"
          >
            <span class="text-h3 font-weight-bold">23</span>
          </v-progress-circular>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
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
