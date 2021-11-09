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
        @clicked="openCreateDialog"
      ></CardNoState>
      <TableVehicles
        v-else
        :items="vehicles"
        @clicked="openCreateDialog"
        @clicked:edit="openEditDialog"
        @clicked:delete="openDeleteDialog"
      />
    </v-col>

    <!-- Dialogs -->
    <DialogVehicle
      v-model="dialog"
      :loading="loading"
      :model="vehicleModel"
      :edited-index="editedIndex"
      @clicked:ok="create"
      @clicked:edit="edit"
    />
    <DialogPrompt ref="prompt" v-model="showPrompt" />
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {
      // vehicles: '',
      showPrompt: false,
      editedIndex: -1,
      dialog: false,
      loading: false,
      vehicleModel: {
        model: '',
        year: '',
        vin: '',
        color: '',
        registrationNumber: '',
        make: '',
        name: '',
        // owner info
        vehicleOwnerAddress: '',
        vehicleOwnerPhoneNumber: '',
        vehicleOwnerName: '',
      },
      defaultVehicleModel: {
        model: '',
        year: '',
        vin: '',
        color: '',
        registrationNumber: '',
        make: '',
        name: '',
        // owner info
        vehicleOwnerAddress: '',
        vehicleOwnerPhoneNumber: '',
        vehicleOwnerName: '',
      },
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
      editVehicle: 'vehicles/updateVehicle',
      deleteVehicle: 'vehicles/deleteVehicle',
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

    edit(evt) {
      this.loading = true
      this.editVehicle(evt)
        .then((resp) => {
          console.log('🚀 ~ .then ~ resp', resp)
          this.dialog = false
          this.$toast.success('Vehicle successfully updated')
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

    openCreateDialog() {
      this.editedIndex = -1
      this.vehicleModel = Object.assign({}, this.defaultVehicleModel)
      this.dialog = true
    },

    openEditDialog(evt) {
      this.editedIndex = this.vehicles
        .map((e) => e.vehicleId)
        .indexOf(evt.vehicleId)
      this.vehicleModel = Object.assign({}, evt)
      this.dialog = true
    },

    openDeleteDialog(evt) {
      this.$refs.prompt
        .show({
          title: 'Confirmation',
          message: `Are you sure you want to delete ${evt.vehicleMake} ${evt.vehicleModel}`,
          okButton: 'Yes, Delete',
          cancelButton: 'No',
        })
        .then(async (ok) => {
          if (ok) {
            this.loading = true
            try {
              const response = await this.deleteVehicle({ id: evt.vehicleId })
              this.$toast.success(response.meta.info)
            } catch (error) {
              this.$toast.error(`Delete failed`)
            } finally {
              this.loading = false
            }
          } else {
            this.loading = false
          }
        })
    },
  },
}
</script>
