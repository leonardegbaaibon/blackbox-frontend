<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-row justify="center" align="center">
    <v-col md="12" class="">
      <v-progress-circular
        v-if="$fetchState.pending"
        indeterminate
      ></v-progress-circular>
      <CardNoState
        v-else-if="vehicles.length === 0"
        title="No vehicles created yet"
        button-text="New Vehicle"
        @clicked="dialog = true"
      ></CardNoState>
      <TableVehicles v-else :items="vehicles" @clicked="dialog = true" />
    </v-col>

    <!-- Dialogs -->
    <DialogVehicle v-model="dialog" :loading="loading" @clicked:ok="create" />
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {
      // vehicles: '',
      dialog: false,
      loading: false,
    }
  },

  async fetch() {
    await this.getVehicles()
    // this.vehicles = vehicles
  },

  computed: {
    ...mapState({
      vehicles: (state) => state.vehicles.all,
    }),
  },

  methods: {
    ...mapActions({
      getVehicles: 'vehicles/getVehicles',
      createVehicle: 'vehicles/createVehicle',
    }),

    create(evt) {
      this.loading = true
      this.createVehicle(evt)
        .then((resp) => {
          this.dialog = false
          this.$toast.success('Vehicle successfully created')
        })
        .catch((error) => {
          // console.log('🚀 ~ create ~ errors', errors)
          // errors.data.message.forEach((error) => {
          this.$toast.error(error.data.message)
          // })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
