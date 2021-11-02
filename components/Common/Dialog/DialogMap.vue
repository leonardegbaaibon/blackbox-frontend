<template>
  <DialogHandler
    title="Trip Profile"
    :subtitle="subtitle"
    :value="value"
    fullscreen
    :loading="loading"
    :ok-button="'Done'"
    @input="$emit('input', $event)"
    @clicked:ok="$emit('input', false)"
    @clicked:cancel="$emit('input', false)"
  >
    <MapTrips height="700" :items="gTrips" />
  </DialogHandler>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
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
  },

  data() {
    return {
      form: {},
    }
  },

  computed: {
    ...mapState({
      trips: (state) => state.trips.all,
    }),
    ...mapGetters({
      gTrips: 'trips/directionsMap',
    }),
  },

  methods: {
    ...mapActions({
      getTripData: 'trips/getVehicleTrips',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
