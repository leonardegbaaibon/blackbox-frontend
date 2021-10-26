<template>
  <div class=""><MapTrips /></div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {}
  },

  async fetch() {
    await this.getTrips()
  },

  computed: {
    ...mapState({ trips: (state) => state.trips }),
  },

  methods: {
    ...mapActions({ getTrips: 'trips/getTrips' }),
  },
}
</script>
