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
        @clicked="openCreateDialog"
      ></CardNoState>
      <TableDrivers
        v-else
        :items="drivers"
        @clicked="openCreateDialog"
        @clicked:edit="openEditDialog"
        @clicked:delete="openDeleteDialog"
      />
    </v-col>

    <!-- Dialogs -->
    <DialogDriver
      v-model="dialog"
      :loading="loading"
      :model="driverModel"
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
      // drivers: '',
      showPrompt: false,
      editedIndex: -1,
      dialog: false,
      loading: false,
      driverModel: {
        driverName: '',
        driverNin: '',
        driverEmail: '',
        driverLicenseNumber: '',
        driverLicenseExpiryDate: '',
        driverAddress: '',
        // to turn to array
        driverPhoneNumber: ['', ''],
        driverPhoto: [''],
        driverQuarantorPhoneNumber: ['', ''],
        // guarantor info
        driverQuarantor: '',
        driverQuarantorEmail: '',
      },
      defaultDriverModel: {
        driverName: '',
        driverNin: '',
        driverEmail: '',
        driverLicenseNumber: '',
        driverLicenseExpiryDate: '',
        driverAddress: '',
        // to turn to array
        driverPhoneNumber: ['', ''],
        driverPhoto: [''],
        driverQuarantorPhoneNumber: ['', ''],
        // guarantor info
        driverQuarantor: '',
        driverQuarantorEmail: '',
      },
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

    create(evt) {
      this.loading = true
      this.createDriver(evt)
        .then((resp) => {
          this.dialog = false
          this.$toast.success(resp.meta.info)
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
      this.editDriver(evt)
        .then((resp) => {
          console.log('🚀 ~ .then ~ resp', resp)
          this.dialog = false
          this.$toast.success('Driver successfully updated')
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
      this.driverModel = Object.assign({}, this.defaultDriverModel)
      this.dialog = true
    },

    openEditDialog(evt) {
      this.editedIndex = this.drivers
        .map((e) => e.driverId)
        .indexOf(evt.driverId)
      this.driverModel = Object.assign({}, evt)
      this.dialog = true
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
