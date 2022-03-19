<template>
  <!-- <v-container fluid class="fill-height"> -->
  <v-row justify="center" align="center">
    <v-col md="12" class="">
      <v-progress-circular
        v-if="$fetchState.pending"
        indeterminate
      ></v-progress-circular>
      <CardNoState
        v-else-if="terminals.length === 0"
        title="No terminals created yet"
        button-text="New Terminal"
        @clicked="dialog = true"
      ></CardNoState>
      <TableTerminals
        v-else
        :items="terminals"
        @clicked="dialog = true"
        @clicked:edit="openEdit"
        @clicked:delete="openDeleteDialog"
      />
    </v-col>

    <!-- Dialogs -->
    <!-- create dialog -->
    <DialogTerminal
      v-if="dialog"
      v-model="dialog"
      title="Create Terminal"
      :loading="loading"
      @clicked:ok="create"
    />
    <!-- edit Dialog -->
    <DialogTerminal
      v-if="editDialog"
      v-model="editDialog"
      title="Edit Terminal"
      :loading="loading"
      :terminal="selectedTerminal"
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
      selectedTerminal: {},
    }
  },

  async fetch() {
    await this.getTerminals()
    // this.terminals = terminals
  },

  computed: {
    ...mapState({
      terminals: (state) => state.terminals.all,
    }),
  },

  methods: {
    ...mapActions({
      getTerminals: 'terminals/getTerminals',
      createTerminal: 'terminals/createTerminal',
      editTerminal: 'terminals/updateTerminal',
      deleteTerminal: 'terminals/deleteTerminal',
    }),

    openEdit(evt) {
      this.editDialog = true
      this.selectedTerminal = evt
    },

    create(evt) {
      console.log('🚀 ~ create ~ evt', evt)
      this.loading = true
      this.createTerminal({
        ...evt,
        terminalPhoneNumber: [evt.terminalPhoneNumber],
      })
        .then(() => {
          this.dialog = false
          this.$toast.success('Terminal successfully created')
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
      this.editTerminal({
        id: this.selectedTerminal.terminalId,
        payload: { ...evt, terminalPhoneNumber: [evt.terminalPhoneNumber] },
      })
        .then((resp) => {
          console.log('🚀 ~ .then ~ resp', resp)
          this.editDialog = false
          this.$toast.success('Terminal successfully updated')
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
          message: `Are you sure you want to delete ${evt.terminalName}`,
          okButton: 'Yes, Delete',
          cancelButton: 'No',
        })
        .then(async (ok) => {
          if (ok) {
            this.loading = true
            try {
              const response = await this.deleteTerminal({ id: evt.terminalId })
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
