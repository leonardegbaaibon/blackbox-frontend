<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card flat rounded outlined>
        <v-card-text>
          <v-row>
            <!-- trip time -->
            <v-col cols="12" class="overline d-flex justify-space-between">
              <p class="mb-0">
                {{ $dayjs(trip.startTime).format('DD MMMM, YYYY. HH:mmA') }}
                -
                {{ $dayjs(trip.endTime).format('DD MMMM, YYYY. HH:mmA') }}
              </p>
              <v-scale-transition leave-absolute>
                <v-chip v-show="hover">{{ trip.deviceName }}</v-chip>
              </v-scale-transition>
            </v-col>
            <!-- trip details -->
            <v-col cols="12" class="d-flex">
              <v-icon size="64">mdi-send-circle</v-icon>
              <v-timeline dense>
                <v-timeline-item>
                  {{ trip.startAddress }}
                  <!-- <MapAddressRender :lat="trip.startLat" :lon="trip.startLon" /> -->
                </v-timeline-item>
                <v-timeline-item>
                  {{ trip.endAddress }}

                  <!-- <MapAddressRender :lat="trip.endLat" :lon="trip.endLon" /> -->
                </v-timeline-item>
              </v-timeline>
            </v-col>
            <!-- trip stats -->
            <v-col cols="8" class="d-flex justify-space-between">
              <!-- <div class="">
                <p class="mb-0">Distance travelled</p>
                <p class="mb-0 text-h5">
                  {{ (trip.distance / 1000).toFixed(2) }}km
                </p>
              </div>
              <div class="">
                <p class="mb-0">Average Speed</p>
                <p class="mb-0 text-h5">{{ trip.averageSpeed.toFixed(2) }}kn</p>
              </div>
              <div class="">
                <p class="mb-0">Fuel Spent</p>
                <p class="mb-0 text-h5">{{ trip.spentFuel }}</p>
              </div> -->
              <div class="">
                <p class="mb-0">Trip Duration</p>
                <p class="mb-0 text-h5">{{ timeComputed }}</p>
              </div>
            </v-col>
          </v-row>
          <v-row></v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn outlined @click="handleClick">View Trip</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    trip: {
      type: Object,
      default: () => {},
    },
  },
  // filters: {
  //   calculateTime(value) {
  //     console.log('🚀 ~ calculateTime ~ value', value)
  //     if (!value) return ''
  //     const hour = this.$dayjs.duration(value).hours()
  //     const minutes = this.$dayjs.duration(value).minutes()
  //     return `${hour}h ${minutes}m`
  //   },
  // },
  data() {
    return {
      date: this.$dayjs,
      timezone: this.$dayjs.tz.guess(),
    }
  },

  computed: {
    timeComputed() {
      if (!this.trip.duration) return ''
      // console.log(`this.trip.duration`, this.trip.duration)
      const hour = this.date.duration(this.trip.duration).hours()
      const minutes = this.date.duration(this.trip.duration).minutes()
      return `${hour}h ${minutes}m`
    },
  },

  methods: {
    handleClick() {
      this.$emit('clicked:open', {
        time: this.timeComputed,
        from: this.trip.startTime,
        to: this.trip.endTime,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
