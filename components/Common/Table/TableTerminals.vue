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
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
