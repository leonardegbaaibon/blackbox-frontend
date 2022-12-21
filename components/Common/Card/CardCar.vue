<template>
  <v-card class="mt-0 pt-0" flat>
    <!-- <MapTrips :items="trips" class="mb-6" height="400" /> -->
    <v-img
      class="white--text align-end rounded-lg"
      :src="image"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :height="'200px'"
      position="center center"
    >
      <div style="position: absolute; top: 16px; right: 16px">
        <!-- Assign Device  -->
        <v-btn
          v-if="!device"
          depressed
          color="primary"
          @click="$emit('clicked:assign', { id: vehicleId })"
        >
          <v-icon left dark>mdi-tablet-cellphone</v-icon>
          Assign Device
        </v-btn>
        <v-btn
          v-else
          depressed
          color="error"
          @click="$emit('clicked:unassign', { id: vehicleId })"
        >
          <v-icon left dark>mdi-tablet-cellphone</v-icon>
          Unassign Device
        </v-btn>
        <!-- Assign Driver -->
        <v-btn
          v-if="!chauffeur"
          depressed
          color="primary"
          @click="$emit('clicked:assignDriver', { id: vehicleId })"
        >
          <v-icon left dark>mdi-steering</v-icon>
          Assign Driver
        </v-btn>
        <v-btn
          v-else
          depressed
          color="error"
          @click="$emit('clicked:unassignDriver', { id: chauffeur })"
        >
          <v-icon left dark>mdi-steering</v-icon>
          Unassign Driver
        </v-btn>
      </div>

      <v-card-title class="font-weight-bold text-h3">
        {{ vehicleMake ? `${vehicleMake} ${vehicleModel}` : 'Loading....' }}
      </v-card-title>
    </v-img>

    <v-card-text class="mt-5">
      <v-row>
        <v-col cols="">
          <p class="text-h6 mb-0 font-weight-bold">
            {{ vehicleYear ? `${vehicleYear}` : '' }}
          </p>
          <p class="text-caption">Year</p>
        </v-col>
        <v-col cols="">
          <div class="d-flex">
            <p class="text-h6 mb-0 font-weight-bold mr-1">
              {{ vehicleColor ? `${vehicleColor}` : '' }}
            </p>
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
          </div>
          <p class="text-caption">Vehicle Color</p>
        </v-col>
        <v-col cols="">
          <p class="text-h6 mb-0 font-weight-bold">
            #{{
              vehicleRegistrationNumber ? `${vehicleRegistrationNumber}` : ''
            }}
          </p>
          <p class="text-caption">Reg. Number</p>
        </v-col>
        <v-col cols="">
          <p class="text-h6 mb-0 font-weight-bold">
            <!-- {{ attributes.totalDistance }} -->
            0
          </p>
          <p class="text-caption">Total Distance Travelled</p>
        </v-col>
        <v-col cols="">
          <p class="text-h6 mb-0 font-weight-bold">
            <!-- {{ attributes.fuelConsumption }} -->
            0
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
    driver: {
      type: String,
      default: null,
    },
    chauffeur: {
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
    attributes: {
      type: Object,
      default: () => {},
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
