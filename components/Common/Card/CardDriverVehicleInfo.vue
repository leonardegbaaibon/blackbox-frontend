<template>
  <v-card class="" flat>
    <v-img
      height="100"
      class="ma-5"
      src="data:image/jpeg;base64,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"
    ></v-img>
    <v-card-text class="">
      <v-row>
        <v-col cols="12">
          <div class="">
            <p class="mb-1">Vehicle</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{
                chauffeurVehicle?.vehicleMake +
                ' ' +
                chauffeurVehicle?.vehicleModel
              }}
            </p>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="">
            <p class="mb-1">Vehicle Year</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{ chauffeurVehicle?.vehicleYear }}
            </p>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="">
            <p class="mb-1">Color</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{ chauffeurVehicle?.vehicleColor }}
            </p>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="">
            <p class="mb-1">Reg. Number</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{ chauffeurVehicle?.vehicleRegistrationNumber }}
            </p>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="">
            <p class="mb-1">VIN</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{ chauffeurVehicle?.vehicleVin }}
            </p>
          </div>
        </v-col>
        <v-col cols="12">
          <v-btn
            color="primary"
            depressed
            @click="$router.push(`/vehicles/${chauffeurVehicle.vehicleId}`)"
          >
            View Vehicle
          </v-btn>
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
    chauffeurVehicle: {
      type: Object,
      default: () => {},
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
