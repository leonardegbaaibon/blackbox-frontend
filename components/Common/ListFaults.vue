<template>
  <div>
    <FaultItem
      v-for="(fault, index) in faults"
      :key="index"
      v-bind="fault"
      class="mb-4"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  props: {
    faults: {
      type: Array,
      default: () => [],
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
