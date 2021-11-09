<template>
  <v-card flat>
    <v-card-title class="py-5">
      <p class="mb-0 font-weight-bold">All Terminals</p>
      <v-spacer></v-spacer>
      <FormInput
        v-model="search"
        class="mr-3"
        type="text"
        placeholder="Search Terminals"
        :hide-details="true"
      />
      <FormButton @click.native="$emit('clicked')">New Terminal</FormButton>
      <!-- <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field> -->
    </v-card-title>
    <v-data-table
      no-data-text="No terminals created"
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template #[`item.createdAt`]="{ item }">
        {{ $dayjs(item.createdAt).format('DD MMMM, YYYY • hh:mm A') }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="$emit('clicked:edit', item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="$emit('clicked:delete', item)">mdi-delete</v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Terminal Name',
          align: 'start',
          sortable: false,
          value: 'terminalName',
        },
        { text: 'Terminal Address', value: 'terminalAddress' },
        { text: 'State', value: 'terminalState' },
        { text: 'Manager', value: 'terminalManager' },
        { text: 'Email', value: 'terminalEmail' },
        { text: 'Phone Number', value: 'terminalPhoneNumber' },
        { text: 'Created', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },

  methods: {},
}
</script>

<style lang="scss" scoped></style>
