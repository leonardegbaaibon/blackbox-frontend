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
      <TableVehicles
        v-else
        :items="vehicles"
        @clicked="dialog = true"
        @clicked:edit="openEdit"
        @clicked:delete="openDeleteDialog"
      />
    </v-col>

    <!-- Dialogs -->
    <!-- create dialog -->
    <DialogVehicle
      v-if="dialog"
      v-model="dialog"
      title="Create Vehicle"
      :loading="loading"
      @clicked:ok="create"
    />
    <!-- edit Dialog -->
    <DialogVehicle
      v-if="editDialog"
      v-model="editDialog"
      title="Edit Vehicle"
      :loading="loading"
      :vehicle="selectedVehicle"
      @clicked:ok="edit"
    />
    <DialogPrompt ref="prompt" v-model="showPrompt" />
    <!-- <v-btn @click="getMessage">Send message</v-btn> -->
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
      dialog: false,
      editDialog: false,
      loading: false,
      selectedVehicle: {},

      message: '',
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

  // mounted() {
  //   this.socket = this.$nuxtSocket({
  //     persist: 'chatSocket',
  //     channel: '/',
  //   })

  //   this.socket.on('chat_message', (msg, cb) => {
  //     /* Handle event */
  //     console.log('🚀 ~ this.socket.on ~ msg', msg)
  //     console.log('🚀 ~ this.socket.on ~ cb', cb)
  //   })
  // },

  // async mounted() {
  //   const currentToken = await this.$fire.messaging.getToken()
  //   const data = JSON.stringify({
  //     notification: {
  //       title: 'firebase',
  //       body: 'firebase is awesome',
  //       click_action: 'http://localhost:3000/',
  //       icon: 'http://localhost:3000/assets/images/brand-logo.png',
  //     },
  //     to: currentToken,
  //   })
  //   const config = {
  //     method: 'post',
  //     url: 'https://fcm.googleapis.com/fcm/send',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'key=<yourServerKey>',
  //     },
  //     data,
  //   }
  //   const response = await this.$axios(config)
  //   this.$fire.messaging.onMessage((payload) => {
  //     console.info('Message received: ', payload)
  //   })
  //   this.$fire.messaging.onTokenRefresh(async () => {
  //     const refreshToken = await this.$fire.messaging.getToken()
  //     console.log('Token Refreshed', refreshToken)
  //   })
  // },

  // created() {
  //   console.log('dayjs', this.$dayjs().startOf('day').toISOString())
  // },

  methods: {
    // getMessage() {
    //   return new Promise((resolve) => {
    //     this.socket.emit('chat_message', { id: 'abc123' }, (resp) => {
    //       console.log('🚀 ~ this.socket.emit ~ resp', resp)
    //       // this.messageRxd = resp
    //       resolve()
    //     })
    //   })
    // },

    ...mapActions({
      getVehicles: 'vehicles/getVehicles',
      createVehicle: 'vehicles/createVehicle',
      editVehicle: 'vehicles/updateVehicle',
      deleteVehicle: 'vehicles/deleteVehicle',
    }),

    openEdit(evt) {
      this.editDialog = true
      this.selectedVehicle = evt
    },

    create(evt) {
      this.loading = true
      this.createVehicle({ ...evt, make: evt.make.name })
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
      this.editVehicle({ id: this.selectedVehicle.vehicleId, payload: evt })
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
