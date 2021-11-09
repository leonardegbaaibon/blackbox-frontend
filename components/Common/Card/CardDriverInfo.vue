<template>
  <v-card class="mt-0 pt-0" flat>
    <v-card-text class="mt-5">
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-avatar size="60" color="primary"></v-avatar>
          <div class="ml-4">
            <p class="mb-1">Created at</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{ $dayjs(createdAt).format('Do MMMM, YYYY') }}
            </p>
          </div>
        </v-col>
        <!-- ============ -->
        <v-col cols="12">
          <div class="">
            <p class="mb-1">Full Name</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{ driverName }}
            </p>
          </div>
        </v-col>
        <!-- ============ -->
        <v-col cols="12">
          <div class="">
            <p class="mb-1">Email</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{ driverEmail }}
            </p>
          </div>
        </v-col>
        <!-- ============ -->
        <v-col cols="12">
          <div class="">
            <p class="mb-1">Address</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{ driverAddress }}
            </p>
          </div>
        </v-col>
        <!-- ============ -->
        <v-col cols="12">
          <div class="">
            <p class="mb-1">NIN</p>
            <p class="mb-0 font-weight-bold text-subtitle-1">
              {{ driverNin }}
            </p>
          </div>
        </v-col>
        <!-- ============ -->
        <v-col cols="12">
          <div class="">
            <p class="mb-1">License</p>
            <v-chip class="" color="primary" label outlined>
              {{ driverNin }}
            </v-chip>
          </div>
        </v-col>
        <!-- ============ -->
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
