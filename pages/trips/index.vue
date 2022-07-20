<template>
  <div>
    <v-card flat outlined>
      <v-card-text>
        <!-- Select Vehicle and Time -->
        <v-row justify="center" align="center">
          <v-col sm="12" class="">
            <v-form>
              <v-row>
                <v-col>
                  <FormSelectVehicle
                    label="Select Vehicle"
                    :items="vehicles"
                    @change="selectVehicle"
                  />
                </v-col>
                <v-col cols="auto">
                  <FormSelectTime label="Period" @change="setTime" />
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
        <!-- Trips List -->
        <div v-if="trips.length === 0">
          <v-alert type="warning">{{ error }}</v-alert>
        </div>
        <div v-else>
          <div class="text-h4 text-center my-8">
            <span class="font-weight-medium primary--text">
              {{ trips.length }}
            </span>
            trips found
          </div>

          <CardTrip
            v-for="(trip, index) in trips"
            :key="index"
            :trip="trip"
            class="mb-5"
            @clicked:open="openTripDialog"
          />
        </div>
      </v-card-text>
      <v-overlay :value="loading" color="white" app>
        <v-progress-circular color="primary" indeterminate />
      </v-overlay>
    </v-card>
    <DialogMap
      v-if="showDialog"
      v-model="showDialog"
      v-bind="{ ...tripData }"
      :duration="singleTripDuration"
      :events="events"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import { Datetime } from 'vue-datetime'
// const { parseString } = require('xml2js')

export default {
  name: 'Trips',

  // components: {
  //   datetime: Datetime,
  // },

  middleware: 'auth',

  data() {
    return {
      date: '',
      form: { chosenVehicle: '', time: '' },
      image: '',
      loading: false,
      showDialog: false,
      error: 'No trips found',
      singleTripDuration: null,
    }
  },

  async fetch() {
    // await this.getVehicles()
    // await this.getTrips()
  },

  computed: {
    ...mapState({
      trips: (state) => state.trips.trips,
      tripData: (state) => state.trips.tripData,
      vehicles: (state) => state.vehicles.all,
      events: (state) => state.events.events,
    }),
  },

  // mounted() {
  //   this.$nextTick(() => {
  //     this.chosenVehicle = { ...this.vehicles[0] }
  //   })
  // },

  watch: {
    form: {
      immediate: true,
      deep: true,
      async handler(newValue, oldValue) {
        if (Object.keys(newValue).every((x) => newValue[x])) {
          try {
            this.loading = true
            await this.getTrip({
              vehicleId: newValue.chosenVehicle?.vehicleId,
              from: newValue.time?.value.start,
              to: newValue.time?.value.end,
            })
            this.error = 'No trips found'
            this.loading = false
          } catch (error) {
            this.error = error.message
            this.loading = false
          }
        }
      },
    },
  },

  created() {
    this.selectVehicle()
    this.loading = true
  },

  methods: {
    ...mapActions({
      // getTrips: 'trips/getTrips',
      getVehicles: 'vehicles/getVehicles',
      getTrip: 'trips/getTrips',
      getSingleTrip: 'trips/getSingleTrip',
      getEvents: 'events/getEvents',
    }),

    selectVehicle(evt) {
      if (evt) {
        this.form.chosenVehicle = evt
      }
    },

    setTime(evt) {
      this.form.time = { ...evt }
    },

    async openTripDialog(evt) {
      this.loading = true
      this.singleTripDuration = evt.time
      const payload = {
        id: this.form.chosenVehicle.vehicleId,
        from: this.$dayjs(evt.from).toISOString(),
        to: this.$dayjs(evt.to).toISOString(),
      }
      try {
        await Promise.all([
          this.getSingleTrip(payload),
          this.getEvents(payload),
        ])
        this.showDialog = true
        this.loading = false
      } catch (error) {
        console.error('🚀 ~ openTripDialog ~ error', error)
      }
    },
  },
}
</script>
