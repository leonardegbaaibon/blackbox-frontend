<template>
  <v-card flat>
    <v-card-title class="py-5">
      <p class="mb-0 font-weight-bold">All Devices</p>
      <v-spacer></v-spacer>
      <FormInput
        v-model="search"
        class="mr-3"
        type="text"
        placeholder="Search Devices"
        :hide-details="true"
      />
      <!-- <FormButton @click.native="$emit('clicked')">New Device</FormButton> -->
      <!-- <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field> -->
    </v-card-title>
    <v-data-table
      no-data-text="No devices created"
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template #[`item.lastUpdate`]="{ item }">
        {{ item.lastUpdate ? $dayjs(item.lastUpdate).fromNow() : '' }}
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip
          v-if="item.status === 'offline'"
          small
          class="text-overline"
          color="error"
        >
          {{ item.status }}
        </v-chip>
        <v-chip
          v-else-if="item.status === 'online'"
          small
          class="text-overline"
          color="success"
        >
          {{ item.status }}
        </v-chip>
        <v-chip v-else small class="text-overline" color="warning">
          {{ item.status }}
        </v-chip>
      </template>
      <!-- <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="$emit('clicked:edit', item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="$emit('clicked:delete', item)">mdi-delete</v-icon>
      </template> -->
      <template #[`item.disabled`]="{ item }">
        <v-icon v-if="!item.disabled" small class="mr-2">
          mdi-close-circle-outline
        </v-icon>
        <v-icon v-else small class="mr-2">mdi-check-circle-outline</v-icon>
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
        // {
        //   text: 'Device Id',
        //   align: 'start',
        //   sortable: false,
        //   value: 'deviceId',
        // },
        { text: 'Name', value: 'name', align: 'start' },
        // { text: 'Position Id', value: 'positionId' },
        { text: 'Status', value: 'status' },
        { text: 'Unique ID', value: 'uniqueId' },
        { text: 'Phone Number', value: 'phone' },
        { text: 'Last Update', value: 'lastUpdate' },
        // { text: 'Disabled', value: 'disabled' },
        // { text: 'Actions', value: 'actions', sortable: false, width: 150 },
      ],
    }
  },

  computed: {
    computedColor() {
      let color
      // if()
      return color
    },
  },

  methods: {},
}
</script>

<style lang="scss" scoped></style>
