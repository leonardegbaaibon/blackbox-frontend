<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-row justify="center" align="center">
    <v-col md="12" class="">
      <v-progress-circular
        v-if="$fetchState.pending"
        indeterminate
      ></v-progress-circular>
      <div v-else class="">
        <CardCar
          v-bind="{ ...vehicle, ...trips[trips.length - 1] }"
          @clicked:assign="openAssign"
          @clicked:unassign="openUnassign"
        ></CardCar>
        <!-- <MapVehicle class="" height="500" :marker="trips[trips.length - 1]" /> -->

        <!-- Dialogs -->
        <DialogAssignDevice
          v-if="dialog"
          v-model="dialog"
          :vehicle="$route.params.id"
          @reload="$fetch"
        />
        <DialogPrompt ref="prompt" v-model="showPrompt" />
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
      showPrompt: false,
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
      trips: (state) => state.trips.tripData,
      // vehicles: (state) => state.vehicles.all,
    }),
  },

  methods: {
    ...mapActions({
      getVehicle: 'vehicles/getOneVehicle',
      unassign: 'devices/unassignDevice',
      getTripHistory: 'trips/getTripHistory',
      getPosition: 'trips/getSingleTrip',
    }),

    openAssign(evt) {
      this.dialog = true
    },

    openUnassign(evt) {
      this.$refs.prompt
        .show({
          title: 'Confirmation',
          message: `Are you sure you want to unassign ${this.vehicle.vehicleMake} ${this.vehicle.vehicleModel} from ${this.vehicle.device}`,
          okButton: 'Yes, Delete',
          cancelButton: 'No',
        })
        .then(async (ok) => {
          if (ok) {
            this.loading = true
            try {
              const response = await this.unassign({
                vehicleId: this.$route.params.id,
                deviceId: this.vehicle.device,
              })
              this.$fetch()
              this.$toast.success(response.meta.message)
            } catch (error) {
              this.$toast.error(`Delete failed`)
            } finally {
              this.loading = false
            }
          } else {
            this.loading = false
          }
        })
    },
  },
}
</script>
