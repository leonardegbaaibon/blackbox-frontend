<template>
  <v-card class="mt-0 pt-0" flat>
    <MapTrips :items="gTrips" class="mb-6" height="400" />
    <v-img
      class="white--text align-end rounded-lg"
      :src="image"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :height="'200px'"
      position="center center"
    >
      <v-chip
        style="position: absolute; top: 16px; right: 16px"
        :color="device ? 'success' : 'error'"
        label
      >
        {{ device ? `Connected` : 'Disconnected' }}
      </v-chip>

      <v-card-title class="font-weight-bold text-h3">
        {{ vehicleMake ? `${vehicleMake} ${vehicleModel}` : 'Loading....' }}
      </v-card-title>
    </v-img>

    <v-card-text class="mt-5">
      <v-row>
        <v-col cols="">
          <p class="text-h4 mb-0 font-weight-bold">
            {{ vehicleYear ? `${vehicleYear}` : '' }}
          </p>
          <p class="text-caption">Year</p>
        </v-col>
        <v-col cols="">
          <div class="d-flex">
            <v-avatar
              size="24"
              class="mr-3"
              :color="
                vehicleColor
                  .split(/(?=[A-Z])/)
                  .join('-')
                  .toLowerCase()
              "
            ></v-avatar>
            <p class="text-h4 mb-0 font-weight-bold">
              {{ vehicleColor ? `${vehicleColor}` : '' }}
            </p>
          </div>

          <p class="text-caption">Vehicle Color</p>
        </v-col>
        <v-col cols="">
          <p class="text-h4 mb-0 font-weight-bold">
            {{
              vehicleRegistrationNumber ? `${vehicleRegistrationNumber}` : ''
            }}
          </p>
          <p class="text-caption">Reg. Number</p>
        </v-col>
        <!-- <v-col cols="">
          <p class="text-h4 mb-0 font-weight-bold">
            {{ device ? `Connected` : 'Disconnected' }}
          </p>
          <p class="text-caption">Status</p>
        </v-col> -->
      </v-row>
    </v-card-text>
    <!-- <v-card-actions>
      <FormButton v-if="device" large @click.native="getTrip">
        Get Trip Data
      </FormButton>
    </v-card-actions> -->
    <!-- <v-expand-transition>
      <div v-if="show">
        <v-divider class="my-6"></v-divider>
        <MapTrips :items="trips.trips" />
      </div>
    </v-expand-transition> -->
  </v-card>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  props: {
    image: {
      type: String,
      default: '',
    },
    vehicleMake: {
      type: String,
      default: '',
    },
    device: {
      type: String,
      default: null,
    },
    vehicleYear: {
      type: Number,
      default: 0,
    },
    vehicleRegistrationNumber: {
      type: String,
      default: '',
    },
    vehicleModel: {
      type: String,
      default: '',
    },
    vehicleColor: {
      type: String,
      default: '',
    },
    vehicleId: {
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
