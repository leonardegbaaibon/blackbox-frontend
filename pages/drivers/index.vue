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
      <TableDrivers
        v-else
        :items="drivers"
        @clicked="dialog = true"
        @clicked:edit="openEdit"
        @clicked:delete="openDeleteDialog"
      />
    </v-col>

    <!-- Dialogs -->
    <!-- create dialog -->
    <DialogDriver
      v-if="dialog"
      v-model="dialog"
      title="Create Driver"
      :loading="loading"
      @clicked:ok="create"
    />
    <!-- edit Dialog -->
    <DialogDriver
      v-if="editDialog"
      v-model="editDialog"
      title="Edit Driver"
      :loading="loading"
      :driver="selectedDriver"
      @clicked:ok="edit"
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
      showPrompt: false,
      dialog: false,
      editDialog: false,
      loading: false,
      selectedDriver: {},
    }
  },

  async fetch() {
    await this.getDrivers()
    // this.drivers = drivers
  },

  computed: {
    ...mapState({
      drivers: (state) => state.drivers.all,
    }),
  },

  methods: {
    ...mapActions({
      getDrivers: 'drivers/getDrivers',
      createDriver: 'drivers/createDriver',
      editDriver: 'drivers/updateDriver',
      deleteDriver: 'drivers/deleteDriver',
    }),

    openEdit(evt) {
      this.editDialog = true
      this.selectedDriver = evt
    },

    create(evt) {
      this.loading = true
      this.createDriver({
        ...evt,
        driverPhoneNumber: [evt.driverPhoneNumber],
        driverDeviceDeliveryAddress: 'string',
        driverQuarantor: 'string',
        driverQuarantorPhoneNumber: ['string'],
        driverQuarantorEmail: 'string',
        driverPassword: 'password',
      })
        .then((resp) => {
          this.dialog = false
          this.$toast.success(resp.meta.info)
        })
        .catch((error) => {
          this.$toast.error(error.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },

    edit(evt) {
      console.log('🚀 ~ edit ~ evt', evt)
      this.loading = true
      this.editDriver({
        id: this.selectedDriver.driverId,
        payload: { ...evt, driverPhoneNumber: [evt.driverPhoneNumber] },
      })
        .then((resp) => {
          this.editDialog = false
          this.$toast.success('Driver successfully updated')
        })
        .catch((error) => {
          this.$toast.error(error.data.message || error.message)
        })
        .finally(() => {
          this.loading = false
        })
    },

    openDeleteDialog(evt) {
      this.$refs.prompt
        .show({
          title: 'Confirmation',
          message: `Are you sure you want to delete ${evt.driverName}`,
          okButton: 'Yes, Delete',
          cancelButton: 'No',
        })
        .then(async (ok) => {
          if (ok) {
            this.loading = true
            try {
              const response = await this.deleteDriver({ id: evt.driverId })
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
