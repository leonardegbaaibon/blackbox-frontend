<template>
  <v-card flat outlined>
    <v-card-text>
      <v-row justify="center" align="center">
        <v-col sm="12" class="">
          <v-form>
            <!-- <v-container> -->
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
            <!-- </v-container> -->
          </v-form>
        </v-col>
        <v-col sm="12">
          <CardCar
            ref="carCard"
            v-bind="form.chosenVehicle"
            :image="image"
            @clicked:getTrip="getTripMethod"
          />
        </v-col>
        <!-- <DialogMap
          v-model="showDialog"
          :subtitle="`Trip Profile for ${form.time.rendered || form.time.text}`"
        /> -->
        <!-- <v-col sm="12">
          <MapTrips />
        </v-col> -->
      </v-row>
    </v-card-text>
    <v-overlay :value="loading" color="white" app>
      <v-progress-circular color="primary" indeterminate />
    </v-overlay>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const { parseString } = require('xml2js')

export default {
  name: 'Trips',

  middleware: 'auth',

  data() {
    return {
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

    async selectVehicle(evt) {
      this.$nextTick(() => {
        this.$refs.carCard.setShow(false)
      })
      if (evt) {
        this.form.chosenVehicle = evt
        const data = await this.$api.get(
          `/GetImageUrl?searchTerm=${evt.vehicleMakee}`
        )
        parseString(data.data, (_, result) => {
          this.image = result.string._
        })
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
