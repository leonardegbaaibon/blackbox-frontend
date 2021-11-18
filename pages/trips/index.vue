<template>
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
      <!-- Trips Stats -->
      <v-row v-if="Object.values(tripData).length > 0">
        <v-col cols="">
          <p class="text-h6 mb-0 font-weight-bold">
            {{ tripData.averageDistance }}
          </p>
          <p class="text-caption">Average Distance</p>
        </v-col>
        <v-col cols="">
          <p class="text-h6 mb-0 font-weight-bold">
            {{ tripData.averageFuelConsumption }}
          </p>
          <p class="text-caption">Average Fuel Consumption</p>
        </v-col>
        <v-col cols="">
          <p class="text-h6 mb-0 font-weight-bold">
            {{ tripData.averageSpeed }}
          </p>
          <p class="text-caption">Average Speed</p>
        </v-col>
      </v-row>
      <!-- MapTrips -->
      <v-row>
        <v-col>
          <MapTrips height="600" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-overlay :value="loading" color="white" app>
      <v-progress-circular color="primary" indeterminate />
    </v-overlay>
  </v-card>
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
    }
  },

  async fetch() {
    // await this.getVehicles()
    // await this.getTrips()
  },

  computed: {
    ...mapState({
      trips: (state) => state.trips,
      tripData: (state) => state.trips.tripData,
      vehicles: (state) => state.vehicles.all,
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
          this.loading = true
          await this.getTrip({
            id: newValue.chosenVehicle?.vehicleId,
            from: newValue.time?.value.start,
            to: newValue.time?.value.end,
          })
          this.loading = false
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
      getTrip: 'trips/getVehicleTrips',
    }),

    selectVehicle(evt) {
      // this.$nextTick(() => {
      //   this.$refs.carCard.setShow(false)
      // })
      if (evt) {
        this.form.chosenVehicle = evt
        // const data = await this.$api.get(
        //   `/GetImageUrl?searchTerm=${evt.vehicleMakee}`
        // )
        // parseString(data.data, (_, result) => {
        //   this.image = result.string._
        // })
      }
      // this.getTrips({ id: evt.vehicleId })
      // console.log('🚀 ~ selectVehicle ~ evt', evt)
    },

    setTime(evt) {
      this.form.time = { ...evt }
      // console.log('🚀 ~ evt', evt)
    },

    getTripMethod() {
      this.showDialog = true
      this.getTrip({
        id: this.form.chosenVehicle.vehicleId,
        from: this.form.time.start,
        to: this.form.time.end,
      })
    },
  },
}
</script>
