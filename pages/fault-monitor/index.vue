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
          {
            date: '2:06 AM',
            fault: 'Engine Breakdown',
            solution: 'Find closest mechanic',
            status: 'Bad - 2 days to fix',
          },
          {
            date: '7:23 AM',
            fault: 'Discharged Battery',
            solution: 'Charge or replace battery',
            status: 'Bad - Fix immediately',
          },
          {
            date: '8:34 AM',
            fault: 'Engine Breakdown',
            solution: 'Find closest mechanic',
            status: 'Bad - 1 days to fix',
          },
          {
            date: '10:28 AM',
            fault: 'Engine Overheating',
            solution: 'Replace engine or visit closet mechanic',
            status: 'Bad - Fix immediately',
          },
          {
            date: '11:54 AM',
            fault: 'Engine Breakdown',
            solution: 'Find closest mechanic',
            status: 'Bad - 1 days to fix',
          },
          {
            date: '12:12 PM',
            fault: 'Engine Overheating',
            solution: 'Replace engine or visit closet mechanic',
            status: 'Bad - Fix immediately',
          },
          {
            date: '1:34 PM',
            fault: 'Low Engine Oil Level',
            solution: 'Service vehicle or refill engine oil',
            status: 'Bad - Fix immediately',
          },
          {
            date: '2:19 PM',
            fault: 'Engine Breakdown',
            solution: 'Find closest mechanic',
          },
          {
            date: '2:45 PM',
            fault: 'Low Engine Oil Level',
            solution: 'Service vehicle or refill engine oil',
            status: 'Bad - Fix immediately',
          },
          {
            date: '3:54 PM',
            fault: 'Engine Overheating',
            solution: 'Replace engine or visit closet mechanic',
            status: 'Bad - Fix immediately',
          },
          {
            date: '4:12 PM',
            fault: 'Low Engine Oil Level',
            solution: 'Service vehicle or refill engine oil',
            status: 'Bad - Fix immediately',
          },
        ]"
        @click="dialog = true"
      />
    </v-col>

    <!-- Dialogs -->
    <!-- spare part dialog -->
    <DialogSparePart
      v-if="dialog"
      v-model="dialog"
      title="Spare Parts Available"
      :loading="loading"
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
          this.dialog = false
          this.$toast.success('Device successfully updated')
        })
        .catch((error) => {
          this.$toast.error(error.data.message)
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
