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
        @clicked="openCreateDialog"
        @clicked:edit="openEditDialog"
        @clicked:delete="openDeleteDialog"
      />
    </v-col>

    <!-- Dialogs -->
    <DialogTerminal
      v-model="dialog"
      :model="terminalModel"
      :edited-index="editedIndex"
      :loading="loading"
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
      // terminals: [],
      dialog: false,
      loading: false,
      showPrompt: false,
      editedIndex: -1,
      terminalModel: {
        terminalName: '',
        terminalAddress: '',
        terminalState: '',
        terminalManager: '',
        terminalEmail: '',
        // to turn to array
        terminalPhoneNumber: ['', ''],
      },
      defaultTerminalModel: {
        terminalName: '',
        terminalAddress: '',
        terminalState: '',
        terminalManager: '',
        terminalEmail: '',
        // to turn to array
        terminalPhoneNumber: ['', ''],
      },
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

    create(evt) {
      this.loading = true
      this.createTerminal(evt)
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
      this.loading = true
      this.editTerminal(evt)
        .then((resp) => {
          console.log('🚀 ~ .then ~ resp', resp)
          this.dialog = false
          this.$toast.success('Terminal successfully updated')
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
      this.terminalModel = Object.assign({}, this.defaultTerminalModel)
      this.dialog = true
    },

    openEditDialog(evt) {
      this.editedIndex = this.terminals
        .map((e) => e.terminalId)
        .indexOf(evt.terminalId)
      this.terminalModel = Object.assign({}, evt)
      this.dialog = true
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
