<template>
  <v-card class="" flat>
    <v-card-text class="">
      <v-row align="center" justify="space-between">
        <v-col cols="6" class="">
          <div class="">
            <p class="font-weight-bold text-h4 mb-0">
              ₦{{ Math.round(discount * 10) / 10 }}
            </p>
            <p class="text-overline">{premium discount}</p>
          </div>
          <div class="my-6">
            <p class="font-weight-bold text-h4 mb-0">
              {{ Math.round(percent * 10) / 10 }} %
            </p>
            <p class="text-overline">premium percentage</p>
          </div>
        </v-col>
        <!-- ============ -->
        <v-col class="text-right">
          <div class="mb-2">
            <p class="text-caption font-weight-bold mb-1 text-black">
              Distance Travelled
            </p>
            <h3 class="text-h5">{{ Math.round(distance * 10) / 10 }} km</h3>
          </div>
          <div class="mb-2">
            <p class="text-caption font-weight-bold mb-1 text-black">
              Position
            </p>
            <h3 class="text-h5">{{ position }}</h3>
          </div>
        </v-col>
        <v-col
          cols="auto"
          class="d-flex flex-column justify-center align-center"
        >
          <v-progress-circular
            size="140"
            :value="score"
            :color="scoreColor"
            rotate="-90"
            :indeterminate="score === 0"
          >
            <span class="text-h3 font-weight-bold">
              {{ Math.round(score * 10) / 10 }}
            </span>
          </v-progress-circular>
          <h3 class="mb-0 mt-3">{{ safetyClass }}</h3>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  props: {
    score: {
      type: Number,
      default: 32.4,
    },
    distance: {
      type: Number,
      default: 0,
    },
    position: {
      type: Number,
      default: 0,
    },
    percent: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    safetyClass: {
      type: String,
      default: 'Loading',
    },
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
    scoreColor() {
      let tmp = ''
      switch (true) {
        case this.score === 0:
          tmp = 'grey darken-4'
          break
        case this.score < 35:
          tmp = 'error'
          break
        case this.score < 50:
          tmp = 'warning'
          break
        default:
          tmp = 'success'
      }
      return tmp
    },
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
