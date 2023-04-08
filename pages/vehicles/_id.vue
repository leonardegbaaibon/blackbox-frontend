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
          @clicked:assign="dialog = true"
          @clicked:unassign="openUnassign"
          @clicked:assignDriver="driverDialog = true"
          @clicked:unassignDriver="openUnassignDriver"
        ></CardCar>
        <!-- <MapVehicle class="" height="500" :marker="trips[trips.length - 1]" /> -->

        <v-row>
          <v-col v-if="vehicle.chauffeur">
            <!-- Driver Card -->
            <v-card class="mt-4" flat>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">DRIVER DETAILS</div>
                  <v-list-item-title class="text-h5 mb-1 font-weight-bold">
                    {{ vehicle.chauffeur.driverName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ vehicle.chauffeur.driverEmail }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="grey">
                  <v-img :src="vehicle.chauffeur.driverPhoto"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn depressed :to="`/drivers/${vehicle.chauffeur.driverId}`">
                  View Driver
                </v-btn>
                <v-btn
                  depressed
                  color="error"
                  @click="
                    openUnassignDriver({ id: vehicle.chauffeur.driverId })
                  "
                >
                  <v-icon left dark>mdi-steering</v-icon>
                  Unassign Driver
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col v-if="vehicle.device">
            <!-- Device Card -->
            <v-card class="mt-4" flat>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">DEVICE DETAILS</div>
                  <v-list-item-title class="text-h5 mb-1 font-weight-bold">
                    {{ vehicle.device.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ vehicle.device.deviceSimNumber }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  depressed
                  color="error"
                  @click="openUnassign({ id: vehicle.vehicleId })"
                >
                  <v-icon left dark>mdi-tablet-cellphone</v-icon>
                  Unassign Device
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Dialogs -->
        <DialogAssignDevice
          v-if="dialog"
          v-model="dialog"
          :vehicle="$route.params.id"
          @reload="$fetch"
        />
        <DialogAssignDriver
          v-if="driverDialog"
          v-model="driverDialog"
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
      driverDialog: false,
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
      unassignDevice: 'devices/unassignDevice',
      unassignDriver: 'drivers/unassignDriver',
      getTripHistory: 'trips/getTripHistory',
      getPosition: 'trips/getSingleTrip',
    }),

    // openAssign(evt) {
    //   this.dialog = true
    // },

    openUnassign(evt) {
      this.$refs.prompt
        .show({
          title: 'Confirmation',
          message: `Are you sure you want to unassign ${this.vehicle.vehicleMake} ${this.vehicle.vehicleModel} from ${this.vehicle.device.name}`,
          okButton: 'Yes, Unassign Device',
          cancelButton: 'No',
        })
        .then(async (ok) => {
          if (ok) {
            this.loading = true
            try {
              const response = await this.unassignDevice({
                vehicleId: this.$route.params.id,
                deviceId: this.vehicle.device.deviceId,
              })
              this.$fetch()
              this.$toast.success(response.meta.message)
            } catch (error) {
              this.$toast.error(`Error Unassigning Device`)
            } finally {
              this.loading = false
            }
          } else {
            this.loading = false
          }
        })
    },

    openUnassignDriver(evt) {
      this.$refs.prompt
        .show({
          title: 'Confirmation',
          message: `Are you sure you want to unassign ${this.vehicle.vehicleMake} ${this.vehicle.vehicleModel} from driver`,
          okButton: 'Yes, Unassign Driver',
          cancelButton: 'No',
        })
        .then(async (ok) => {
          if (ok) {
            this.loading = true
            try {
              const response = await this.unassignDriver({
                vehicleId: this.$route.params.id,
                driverId: evt.id,
              })
              this.$fetch()
              this.$toast.success(response.meta.message)
            } catch (error) {
              this.$toast.error(`Error Unassigning Driver`)
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
