<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-row justify="center" align="center">
    <v-col md="12" class="">
      <v-progress-circular
        v-if="$fetchState.pending"
        indeterminate
      ></v-progress-circular>
      <CardNoState
        v-else-if="drivers.length === 0"
        button-text="New Driver"
        @clicked="dialog = true"
      ></CardNoState>
      <TableDrivers v-else :items="drivers" @clicked="dialog = true" />
    </v-col>

    <!-- Dialogs -->
    <DialogDriver v-model="dialog" @clicked:ok="create" />
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {
      drivers: '',
      dialog: false,
    }
  },

  async fetch() {
    const { data: drivers } = await this.getDrivers()
    this.drivers = drivers
  },

  methods: {
    ...mapActions({
      getDrivers: 'drivers/getDrivers',
      createDriver: 'drivers/createDriver',
    }),

    create(evt) {
      this.createDriver(evt).then(() => {
        this.dialog = false
        this.$toast.success('Driver successfully created')
      })
    },
  },
}
</script>
