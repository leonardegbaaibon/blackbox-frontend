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
      <TableTerminals v-else :items="terminals" @clicked="dialog = true" />
    </v-col>

    <!-- Dialogs -->
    <DialogTerminal v-model="dialog" @clicked:ok="create" />
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'auth',

  data() {
    return {
      terminals: [],
      dialog: false,
      loading: false,
    }
  },

  async fetch() {
    const { data: terminals } = await this.getTerminals()
    this.terminals = terminals
  },

  methods: {
    ...mapActions({
      getTerminals: 'terminals/getTerminals',
      createTerminal: 'terminals/createTerminal',
    }),

    create(evt) {
      this.createTerminal(evt)
        .then(() => {
          this.dialog = false
          this.$toast.success('Terminal successfully created')
        })
        .catch((error) => {
          this.$toast.error(error.data.message)
        })
    },
  },
}
</script>
