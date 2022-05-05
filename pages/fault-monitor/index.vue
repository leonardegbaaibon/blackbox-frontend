<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-row justify="center" align="center">
    <v-col md="12" class="">
      <v-progress-circular
        v-if="$fetchState.pending"
        indeterminate
      ></v-progress-circular>
      <CardNoState
        v-else-if="devices.length === 0"
        title="No devices created yet"
        button-text="New Device"
        @clicked="dialog = true"
      ></CardNoState>
      <ListFaults
        v-else
        :faults="[
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
          { fault: 'Engine Breakdown', solution: 'Find closest mechanic' },
        ]"
      />
    </v-col>

    <!-- Dialogs -->
    <!-- create dialog -->
    <DialogDevice
      v-if="dialog"
      v-model="dialog"
      title="Create Device"
      :loading="loading"
      @clicked:ok="create"
    />
    <!-- edit Dialog -->
    <DialogDevice
      v-if="editDialog"
      v-model="editDialog"
      title="Edit Device"
      :loading="loading"
      :device="selectedDevice"
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
      // terminals: [],
      dialog: false,
      editDialog: false,
      loading: false,
      showPrompt: false,
      selectedDevice: {},
    }
  },

  async fetch() {
    await this.getDevices()
    // this.terminals = terminals
  },

  computed: {
    ...mapState({
      devices: (state) => state.devices.all,
    }),
  },

  methods: {
    ...mapActions({
      getDevices: 'devices/getDevices',
      createDevice: 'devices/createDevice',
      editDevice: 'devices/updateDevice',
      deleteDevice: 'devices/deleteDevice',
    }),

    openEdit(evt) {
      this.editDialog = true
      this.selectedDevice = evt
    },

    create(evt) {
      this.loading = true
      this.createDevice(evt)
        .then(() => {
          this.dialog = false
          this.$toast.success('Device successfully created')
        })
        .catch((error) => {
          this.$toast.error(error.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },

    edit(evt) {
      this.loading = true
      this.editDevice(evt)
        .then((resp) => {
          console.log('🚀 ~ .then ~ resp', resp)
          this.dialog = false
          this.$toast.success('Device successfully updated')
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

    openDeleteDialog(evt) {
      this.$refs.prompt
        .show({
          title: 'Confirmation',
          message: `Are you sure you want to delete ${evt.deviceId}`,
          okButton: 'Yes, Delete',
          cancelButton: 'No',
        })
        .then(async (ok) => {
          if (ok) {
            this.loading = true
            try {
              const response = await this.deleteDevice({ id: evt.deviceId })
              this.$fetch()
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
