<template>
  <DialogHandler
    title="Trip Profile"
    :subtitle="subtitle"
    :value="value"
    fullscreen
    :loading="loading"
    :ok-button="'Done'"
    :cancel-disabled="false"
    @input="$emit('input', $event)"
    @clicked:ok="$emit('input', false)"
  >
    <v-row>
      <v-col cols="">
        <p class="text-h6 mb-0 font-weight-bold">{{ averageDistance }}</p>
        <p class="text-caption">Average Distance</p>
      </v-col>
      <v-col cols="">
        <p class="text-h6 mb-0 font-weight-bold">
          <!-- {{ attributes.totalDistance }} -->
          {{ averageSpeed }}
        </p>
        <p class="text-caption">Average Speed Travelled</p>
      </v-col>
      <v-col cols="">
        <p class="text-h6 mb-0 font-weight-bold">
          <!-- {{ attributes.fuelConsumption }} -->
          {{ averageFuelConsumption }}
        </p>
        <p class="text-caption">Fuel Consumed</p>
      </v-col>
      <v-col cols="">
        <p class="text-h6 mb-0 font-weight-bold">
          {{ duration }}
        </p>
        <p class="text-caption">Trip Duration</p>
      </v-col>
    </v-row>
    <!-- for events  -->
    <v-expansion-panels class="mb-4" popout>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <p class="font-weight-bold mb-0 primary--text">View Events</p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-timeline dense align-top>
            <v-timeline-item
              v-for="(event, index) in events"
              :key="index"
              class=""
              :color="event.type === 'alarm' ? 'error' : 'success'"
              :icon="
                event.type === 'alarm'
                  ? 'mdi-alert-rhombus'
                  : 'mdi-arrow-down-thin'
              "
            >
              <v-row class="pt-1">
                <v-col cols="3">
                  <strong>
                    {{ $dayjs(event.eventTime).format('hh:mm A') }}
                  </strong>
                </v-col>
                <v-col>
                  <strong v-if="event.type === 'alarm'" class="red--text">
                    <span>Alarm:</span>
                    {{
                      event.attributes.alarm.replace(/([a-z])([A-Z])/g, '$1 $2')
                    }}
                  </strong>
                  <strong v-else>
                    {{ event.type.replace(/([a-z])([A-Z])/g, '$1 $2') }}
                  </strong>
                  <!-- <div class="text-caption">{{ event.type }}</div> -->
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <MapTrips height="90%" :items="trips" />
  </DialogHandler>
</template>

<script>
// import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  model: {
    event: 'input',
    prop: 'value',
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      type: String,
      default: '',
    },
    trips: {
      type: Array,
      default: () => [],
    },
    events: {
      type: Array,
      default: () => [],
    },
    stats: {
      type: Object,
      default: () => {},
    },
    averageSpeed: String,
    averageDistance: String,
    averageFuelConsumption: String,
    duration: String,
  },

  // created() {
  //   this.getTrip({ id: this.vehicleId, from: this.from, to: this.to })
  // },

  // methods: {
  //   ...mapActions({
  //     getTrip: 'trips/getSingleTrip',
  //   }),
  // },
}
</script>

<style lang="scss" scoped></style>
